package topaz

import (
	"context"
	"errors"
	"fmt"
	"planbee/internal/web/domain"

	"github.com/aserto-dev/go-aserto/az"
	authz "github.com/aserto-dev/go-authorizer/aserto/authorizer/v2"
	api "github.com/aserto-dev/go-authorizer/aserto/authorizer/v2/api"
	"google.golang.org/protobuf/types/known/structpb"
)

var (
	errUnknownPathSeparator  = errors.New("unknown path separator")
	errUnsupportedTraceLevel = errors.New("unsupported trace level")
	errUnknownIdentityType   = errors.New("unknown identity type")
)

type Authorizer struct {
	client *az.Client
}

func NewAuthorizer(client *az.Client) Authorizer {
	return Authorizer{client: client}
}

func (a Authorizer) Is(ctx context.Context, request domain.AuthorizerIsRequest) (*domain.AuthorizerIsResponse, error) {
	return executeAuthorizerIs(ctx, a.client, request)
}

func (a Authorizer) DecisionTree(ctx context.Context, request domain.AuthorizerDecisionTreeRequest) (*domain.AuthorizerDecisionTreeResponse, error) {
	return executeAuthorizerDecisionTree(ctx, a.client, request)
}

func (a Authorizer) Query(ctx context.Context, request domain.AuthorizerQueryRequest) (*domain.AuthorizerQueryResponse, error) {
	return executeAuthorizerQuery(ctx, a.client, request)
}

func (a Authorizer) ListPolicies(ctx context.Context) (*domain.AuthorizerListPoliciesResponse, error) {
	response, err := a.client.ListPolicies(ctx, &authz.ListPoliciesRequest{})
	if err != nil {
		return nil, fmt.Errorf("list authorizer policies over gRPC: %w", err)
	}

	modules := make([]domain.AuthorizerModule, 0, len(response.GetResult()))
	for _, module := range response.GetResult() {
		modules = append(modules, domain.AuthorizerModule{
			ID: module.Id, PackagePath: module.PackagePath, PackageRoot: module.PackageRoot, Raw: module.Raw,
		})
	}

	return &domain.AuthorizerListPoliciesResponse{Result: &modules}, nil
}

// executeAuthorizerIs handles the gRPC call to the Authorizer Is endpoint and maps the response to the internal domain model.
// this is the actual execution of the Authorizer Is request.
func executeAuthorizerIs(ctx context.Context, client *az.Client, payload domain.AuthorizerIsRequest) (*domain.AuthorizerIsResponse, error) {
	request, err := authorizerIsRequest(payload)
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC Is: %w", err)
	}

	response, err := client.Is(ctx, request)
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC Is: %w", err)
	}

	return authorizerIsResponse(response), nil
}

func authorizerIsRequest(request domain.AuthorizerIsRequest) (*authz.IsRequest, error) {
	identityContext, policyContext, resourceContext, err := authorizerCommonRequestFields(
		request.IdentityContext,
		request.PolicyContext,
		request.ResourceContext,
	)
	if err != nil {
		return nil, err
	}

	return &authz.IsRequest{
		IdentityContext: identityContext,
		PolicyContext:   policyContext,
		ResourceContext: resourceContext,
	}, nil
}

//nolint:staticcheck
func executeAuthorizerDecisionTree(ctx context.Context,
	client *az.Client, request domain.AuthorizerDecisionTreeRequest,
) (*domain.AuthorizerDecisionTreeResponse, error) {
	identityContext, policyContext, resourceContext, err := authorizerCommonRequestFields(
		request.IdentityContext,
		request.PolicyContext,
		request.ResourceContext,
	)
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC DecisionTree: %w", err)
	}

	pathSeparator, err := authorizerPathSeparator(request.Options)
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC DecisionTree: %w", err)
	}

	response, err := client.DecisionTree(ctx, &authz.DecisionTreeRequest{
		IdentityContext: identityContext,
		PolicyContext:   policyContext,
		ResourceContext: resourceContext,
		Options:         &authz.DecisionTreeOptions{PathSeparator: pathSeparator},
	})
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC DecisionTree: %w", err)
	}

	result := &domain.AuthorizerDecisionTreeResponse{PathRoot: new(response.GetPathRoot())}
	if response.GetPath() != nil {
		path := response.GetPath().AsMap()
		result.Path = &path
	}

	return result, nil
}

func executeAuthorizerQuery(ctx context.Context, client *az.Client, request domain.AuthorizerQueryRequest) (*domain.AuthorizerQueryResponse, error) {
	identityContext, policyContext, resourceContext, err := authorizerCommonRequestFields(
		request.IdentityContext,
		request.PolicyContext,
		request.ResourceContext,
	)
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC Query: %w", err)
	}

	options, err := authorizerQueryOptions(request.Options)
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC Query: %w", err)
	}

	response, err := client.Query(ctx, &authz.QueryRequest{
		Query:           stringValue(request.Query),
		Input:           stringValue(request.Input),
		Options:         options,
		IdentityContext: identityContext,
		PolicyContext:   policyContext,
		ResourceContext: resourceContext,
	})
	if err != nil {
		return nil, fmt.Errorf("authorizer gRPC Query: %w", err)
	}

	result := &domain.AuthorizerQueryResponse{TraceSummary: new(response.GetTraceSummary())}
	if response.GetResponse() != nil {
		value := response.GetResponse().AsMap()
		result.Response = &value
	}

	if response.GetMetrics() != nil {
		value := response.GetMetrics().AsMap()
		result.Metrics = &value
	}

	if len(response.GetTrace()) > 0 {
		trace := make([]map[string]any, 0, len(response.GetTrace()))
		for _, entry := range response.GetTrace() {
			trace = append(trace, entry.AsMap())
		}

		result.Trace = &trace
	}

	return result, nil
}

func authorizerCommonRequestFields(
	identity *domain.AuthorizerIdentityContext,
	policy *domain.AuthorizerPolicyContext,
	resource *map[string]any,
) (*api.IdentityContext, *api.PolicyContext, *structpb.Struct, error) {
	var identityContext *api.IdentityContext

	if identity != nil {
		identityType, err := authorizerIdentityType(identity.Type)
		if err != nil {
			return nil, nil, nil, err
		}

		identityContext = &api.IdentityContext{Identity: stringValue(identity.Identity), Type: identityType}
	}

	var policyContext *api.PolicyContext
	if policy != nil {
		policyContext = &api.PolicyContext{Path: stringValue(policy.Path), Decisions: stringSliceValue(policy.Decisions)}
	}

	var resourceContext *structpb.Struct

	if resource != nil {
		converted, err := structpb.NewStruct(*resource)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("convert resource context: %w", err)
		}

		resourceContext = converted
	}

	return identityContext, policyContext, resourceContext, nil
}

func authorizerPathSeparator(options *domain.AuthorizerDecisionTreeOptions) (authz.PathSeparator, error) {
	if options == nil || options.PathSeparator == nil {
		return authz.PathSeparator_PATH_SEPARATOR_UNKNOWN, nil
	}

	values := map[domain.AuthorizerPathSeparator]authz.PathSeparator{
		"PATH_SEPARATOR_UNKNOWN": authz.PathSeparator_PATH_SEPARATOR_UNKNOWN,
		"PATH_SEPARATOR_DOT":     authz.PathSeparator_PATH_SEPARATOR_DOT,
		"PATH_SEPARATOR_SLASH":   authz.PathSeparator_PATH_SEPARATOR_SLASH,
	}

	value, ok := values[*options.PathSeparator]
	if !ok {
		return authz.PathSeparator_PATH_SEPARATOR_UNKNOWN, fmt.Errorf("%w %q", errUnknownPathSeparator, *options.PathSeparator)
	}

	return value, nil
}

func authorizerQueryOptions(options *domain.AuthorizerQueryOptions) (*authz.QueryOptions, error) {
	if options == nil {
		return &authz.QueryOptions{}, nil
	}

	result := &authz.QueryOptions{
		Metrics:      options.Metrics,
		Instrument:   options.Instrument,
		TraceSummary: options.TraceSummary,
	}

	if options.Trace != nil {
		values := map[domain.AuthorizerTraceLevel]authz.TraceLevel{
			domain.AuthorizerTraceLevelUnknown: authz.TraceLevel_TRACE_LEVEL_UNKNOWN,
			domain.AuthorizerTraceLevelOff:     authz.TraceLevel_TRACE_LEVEL_OFF,
			domain.AuthorizerTraceLevelFull:    authz.TraceLevel_TRACE_LEVEL_FULL,
			domain.AuthorizerTraceLevelNotes:   authz.TraceLevel_TRACE_LEVEL_NOTES,
			domain.AuthorizerTraceLevelFails:   authz.TraceLevel_TRACE_LEVEL_FAILS,
		}

		value, ok := values[*options.Trace]
		if !ok {
			return nil, fmt.Errorf("%w %q", errUnsupportedTraceLevel, *options.Trace)
		}

		result.Trace = value
	}

	return result, nil
}

func authorizerIdentityType(value *domain.AuthorizerIdentityType) (api.IdentityType, error) {
	if value == nil {
		return api.IdentityType_IDENTITY_TYPE_UNKNOWN, nil
	}

	identityTypes := map[domain.AuthorizerIdentityType]api.IdentityType{
		"IDENTITY_TYPE_UNKNOWN": api.IdentityType_IDENTITY_TYPE_UNKNOWN,
		"IDENTITY_TYPE_NONE":    api.IdentityType_IDENTITY_TYPE_NONE,
		"IDENTITY_TYPE_SUB":     api.IdentityType_IDENTITY_TYPE_SUB,
		"IDENTITY_TYPE_JWT":     api.IdentityType_IDENTITY_TYPE_JWT,
		"IDENTITY_TYPE_MANUAL":  api.IdentityType_IDENTITY_TYPE_MANUAL,
	}

	identityType, ok := identityTypes[*value]
	if !ok {
		return api.IdentityType_IDENTITY_TYPE_UNKNOWN, fmt.Errorf("%w %q", errUnknownIdentityType, *value)
	}

	return identityType, nil
}

func stringSliceValue(value *[]string) []string {
	if value == nil {
		return nil
	}

	return *value
}

func authorizerIsResponse(response *authz.IsResponse) *domain.AuthorizerIsResponse {
	decisions := make([]domain.AuthorizerDecision, 0, len(response.GetDecisions()))
	for _, decision := range response.GetDecisions() {
		decisionName := decision.GetDecision()
		decisionValue := decision.GetIs()
		decisions = append(decisions, domain.AuthorizerDecision{
			Decision: &decisionName,
			Is:       &decisionValue,
		})
	}

	return &domain.AuthorizerIsResponse{Decisions: &decisions}
}

func stringValue(value *string) string {
	if value == nil {
		return ""
	}

	return *value
}

var _ domain.Authorizer = Authorizer{}
