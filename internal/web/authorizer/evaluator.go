package authorizer

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"planbee/internal/web/domain"
	"planbee/internal/web/jsonview"
	"planbee/internal/web/templates/base"
	"sort"
	"strings"

	authorizerpages "planbee/internal/web/templates/pages/authorizer"
)

// - authorizer_evaluator.go contains the complete Authorizer Evaluator feature
// - parsing evaluator selections
// - building options
// - validating input
// - constructing API payloads
// - executing checks
// - formatting evaluator output

const (
	authorizerEvaluatorIs           = "IS"
	authorizerEvaluatorDecisionTree = "DECISIONTREE"
	authorizerEvaluatorQuery        = "QUERY"
)

type authorizerEvaluatorSelection struct {
	Operation       string
	Identity        string
	IdentityType    string
	PolicyPath      string
	Decisions       string
	ResourceContext string
	Query           string
	Input           string
	PathSeparator   string
	Trace           bool
	TraceSummary    bool
	Metrics         bool
}

func (h Handler) newEvaluatorView(r *http.Request, modules *domain.AuthorizerListPoliciesResponse) authorizerpages.EvaluatorView {
	query := r.URL.Query()
	selection := authorizerEvaluatorSelection{
		Operation:       authorizerEvaluatorOperation(query.Get("operation")),
		Identity:        query.Get("identity"),
		IdentityType:    query.Get("identity_type"),
		PolicyPath:      query.Get("policy_path"),
		Decisions:       query.Get("decisions"),
		ResourceContext: query.Get("resource_context"),
		Query:           query.Get("query"),
		Input:           query.Get("input"),
		PathSeparator:   query.Get("path_separator"),
		Trace:           query.Get("trace") == "1",
		TraceSummary:    query.Get("trace_summary") == "1",
		Metrics:         query.Get("metrics") == "1",
	}

	paths := authorizerEvaluatorPolicyPaths(modules)

	if selection.IdentityType == "" {
		selection.IdentityType = "IDENTITY_TYPE_NONE"
	}

	if selection.PathSeparator == "" {
		selection.PathSeparator = "PATH_SEPARATOR_DOT"
	}

	if selection.Operation == authorizerEvaluatorIs && selection.Decisions == "" {
		selection.Decisions = `["allowed"]`
	}

	if selection.PolicyPath == "" && len(paths) > 0 {
		selection.PolicyPath = paths[0]
	}

	view := authorizerpages.EvaluatorView{
		Operation:        selection.Operation,
		OperationOptions: authorizerEvaluatorOperationOptions(selection.Operation),
		IdentityTypes:    authorizerEvaluatorIdentityTypes(selection.IdentityType),
		PathSeparators:   authorizerEvaluatorPathSeparators(selection.PathSeparator),
		PolicyPaths:      authorizerEvaluatorOptions(paths, selection.PolicyPath),
		Identity:         selection.Identity,
		IdentityType:     selection.IdentityType,
		IdentityLabel:    authorizerEvaluatorIdentityLabel(selection.IdentityType),
		IdentityHint:     authorizerEvaluatorIdentityHint(selection.IdentityType),
		PolicyPath:       selection.PolicyPath,
		Decisions:        selection.Decisions,
		ResourceContext:  selection.ResourceContext,
		Query:            selection.Query,
		Input:            selection.Input,
		PathSeparator:    selection.PathSeparator,
		Trace:            selection.Trace,
		TraceSummary:     selection.TraceSummary,
		Metrics:          selection.Metrics,
		CanRun:           authorizerEvaluatorCanRun(selection),

		RequestJSON: authorizerEvaluatorJSON(authorizerEvaluatorPayload(selection)),
	}

	if query.Get("run") != "1" || !view.CanRun {
		return view
	}

	h.populateEvaluatorResult(r.Context(), selection, &view)

	return view
}

func (h Handler) populateEvaluatorResult(ctx context.Context, selection authorizerEvaluatorSelection, view *authorizerpages.EvaluatorView) {
	result, err := h.executeEvaluation(ctx, selection)
	if err != nil {
		view.Error = err.Error()

		return
	}

	view.ResultJSON = authorizerEvaluatorJSON(result)

	queryResult, ok := result.(*domain.AuthorizerQueryResponse)
	if !ok {
		return
	}

	if queryResult.Trace != nil {
		view.TraceJSON = authorizerEvaluatorJSON(*queryResult.Trace)
	}

	if queryResult.TraceSummary != nil {
		view.TraceSummaryJSON = authorizerEvaluatorJSON(*queryResult.TraceSummary)
	}
}

// executeEvaluation executes the evaluation based on the selected operation and payload.
func (h Handler) executeEvaluation(ctx context.Context, selection authorizerEvaluatorSelection) (any, error) {
	payload := authorizerEvaluatorPayload(selection)

	switch selection.Operation {
	case authorizerEvaluatorDecisionTree:
		request, ok := payload.(domain.AuthorizerDecisionTreeRequest)
		if !ok {
			return nil, fmt.Errorf("invalid decision tree evaluator payload: %T", payload)
		}

		return h.authorizer.DecisionTree(ctx, request)
	case authorizerEvaluatorQuery:
		request, ok := payload.(domain.AuthorizerQueryRequest)
		if !ok {
			return nil, fmt.Errorf("invalid query evaluator payload: %T", payload)
		}

		return h.authorizer.Query(ctx, request)
	default:
		request, ok := payload.(domain.AuthorizerIsRequest)
		if !ok {
			return nil, fmt.Errorf("invalid Is evaluator payload: %T", payload)
		}

		return h.authorizer.Is(ctx, request)
	}
}

func (h Handler) handleEvaluator(w http.ResponseWriter, r *http.Request) {
	modules, err := h.authorizer.ListPolicies(r.Context())

	view := h.newEvaluatorView(r, modules)
	if err != nil {
		view.Error = fmt.Sprintf("could not load policy modules: %v", err)
	}

	h.renderContent(w, r, "evaluator", authorizerpages.EvaluatorPage(view), base.SectionActions(authorizerEvaluatorPath, "#content"))
}

func authorizerEvaluatorOperation(value string) string {
	switch value {
	case authorizerEvaluatorDecisionTree, authorizerEvaluatorQuery:
		return value
	default:
		return authorizerEvaluatorIs
	}
}

func authorizerEvaluatorOperationOptions(selected string) []authorizerpages.Option {
	options := []authorizerpages.Option{
		{Value: authorizerEvaluatorIs, Label: "Is"},
		{Value: authorizerEvaluatorDecisionTree, Label: "Decision tree"},
		{Value: authorizerEvaluatorQuery, Label: "Query"},
	}
	markAuthorizerEvaluatorOption(options, selected)

	return options
}

func authorizerEvaluatorIdentityTypes(selected string) []authorizerpages.Option {
	options := []authorizerpages.Option{
		{Value: "IDENTITY_TYPE_NONE", Label: "Anonymous"},
		{Value: "IDENTITY_TYPE_JWT", Label: "JWT"},
		{Value: "IDENTITY_TYPE_SUB", Label: "Subject"},
		{Value: "IDENTITY_TYPE_MANUAL", Label: "Manual"},
	}
	markAuthorizerEvaluatorOption(options, selected)

	return options
}

func authorizerEvaluatorIdentityLabel(identityType string) string {
	switch identityType {
	case "IDENTITY_TYPE_SUB":
		return "Subject"
	case "IDENTITY_TYPE_JWT":
		return "JWT"
	default:
		return "Identity"
	}
}

func authorizerEvaluatorIdentityHint(identityType string) string {
	switch identityType {
	case "IDENTITY_TYPE_SUB":
		return "user@example.com"
	case "IDENTITY_TYPE_JWT":
		return "eyJ..."
	default:
		return "identity value"
	}
}

func authorizerEvaluatorPathSeparators(selected string) []authorizerpages.Option {
	options := []authorizerpages.Option{
		{Value: "PATH_SEPARATOR_DOT", Label: "PATH_SEPARATOR_DOT"},
		{Value: "PATH_SEPARATOR_SLASH", Label: "PATH_SEPARATOR_SLASH"},
	}
	markAuthorizerEvaluatorOption(options, selected)

	return options
}

func authorizerEvaluatorPolicyPaths(response *domain.AuthorizerListPoliciesResponse) []string {
	if response == nil || response.Result == nil {
		return nil
	}

	paths := make([]string, 0, len(*response.Result))
	for _, module := range *response.Result {
		path := moduleDisplayPath(stringValue(module.PackagePath))
		if path != "" {
			paths = append(paths, path)
		}
	}

	sort.Strings(paths)

	return paths
}

func authorizerEvaluatorOptions(values []string, selected string) []authorizerpages.Option {
	options := make([]authorizerpages.Option, 0, len(values))
	for _, value := range values {
		options = append(options, authorizerpages.Option{Value: value, Label: value, Selected: value == selected})
	}

	return options
}

func markAuthorizerEvaluatorOption(options []authorizerpages.Option, selected string) {
	for i := range options {
		options[i].Selected = options[i].Value == selected
	}
}

func authorizerEvaluatorCanRun(selection authorizerEvaluatorSelection) bool {
	if selection.Operation == authorizerEvaluatorQuery {
		return strings.TrimSpace(selection.Query) != ""
	}

	return true
}

func authorizerEvaluatorPayload(selection authorizerEvaluatorSelection) any {
	identityType := domain.AuthorizerIdentityType(selection.IdentityType)
	identityContext := &domain.AuthorizerIdentityContext{
		Identity: &selection.Identity,
		Type:     &identityType,
	}
	policyContext := authorizerEvaluatorPolicyContext(selection)
	resourceContext := authorizerEvaluatorObject(selection.ResourceContext)

	switch selection.Operation {
	case authorizerEvaluatorDecisionTree:
		pathSeparator := domain.AuthorizerPathSeparator(selection.PathSeparator)

		return domain.AuthorizerDecisionTreeRequest{
			IdentityContext: identityContext,
			Options: &domain.AuthorizerDecisionTreeOptions{
				PathSeparator: &pathSeparator,
			},
			PolicyContext:   policyContext,
			ResourceContext: resourceContextPointer(resourceContext),
		}
	case authorizerEvaluatorQuery:
		options := domain.AuthorizerQueryOptions{
			Metrics:      selection.Metrics,
			TraceSummary: selection.TraceSummary,
		}
		if selection.Trace {
			traceLevel := domain.AuthorizerTraceLevelFull
			options.Trace = &traceLevel
		}

		return domain.AuthorizerQueryRequest{
			IdentityContext: identityContext,
			Input:           stringPointer(selection.Input),
			Options:         &options,
			PolicyContext:   policyContext,
			Query:           stringPointer(selection.Query),
			ResourceContext: resourceContextPointer(resourceContext),
		}
	default:
		return domain.AuthorizerIsRequest{
			IdentityContext: identityContext,
			PolicyContext:   policyContext,
			ResourceContext: resourceContextPointer(resourceContext),
		}
	}
}

func authorizerEvaluatorPolicyContext(selection authorizerEvaluatorSelection) *domain.AuthorizerPolicyContext {
	decisions := authorizerEvaluatorDecisions(selection.Decisions)
	if selection.PolicyPath == "" && decisions == nil {
		return nil
	}

	context := &domain.AuthorizerPolicyContext{
		Decisions: &decisions,
		Path:      stringPointer(selection.PolicyPath),
	}
	if decisions == nil {
		context.Decisions = nil
	}

	return context
}

func stringPointer(value string) *string {
	if value == "" {
		return nil
	}

	return &value
}

func resourceContextPointer(value map[string]any) *map[string]any {
	if value == nil {
		return nil
	}

	converted := value

	return &converted
}

func authorizerEvaluatorDecisions(raw string) []string {
	if strings.TrimSpace(raw) == "" {
		return nil
	}

	var decisions []string
	if json.Unmarshal([]byte(raw), &decisions) != nil {
		return nil
	}

	return decisions
}

func authorizerEvaluatorObject(raw string) map[string]any {
	if strings.TrimSpace(raw) == "" {
		return nil
	}

	var value map[string]any
	if json.Unmarshal([]byte(raw), &value) != nil {
		return nil
	}

	return value
}

func authorizerEvaluatorJSON(value any) []authorizerpages.JSONLine {
	sharedLines := jsonview.HighlightJSON(jsonview.PrettyJSON(value))

	lines := make([]authorizerpages.JSONLine, 0, len(sharedLines))
	for _, sharedLine := range sharedLines {
		line := authorizerpages.JSONLine{Tokens: make([]authorizerpages.JSONToken, 0, len(sharedLine.Tokens))}
		for _, sharedToken := range sharedLine.Tokens {
			line.Tokens = append(line.Tokens, authorizerpages.JSONToken{
				Text:  sharedToken.Text,
				Class: sharedToken.Class,
			})
		}

		lines = append(lines, line)
	}

	return lines
}
