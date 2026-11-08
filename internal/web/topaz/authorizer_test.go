package topaz_test

import (
	"planbee/internal/web/domain"
	"planbee/internal/web/topaz"
	"testing"

	authz "github.com/aserto-dev/go-authorizer/aserto/authorizer/v2"
)

func TestAuthorizerIsRequestConversion(t *testing.T) {
	identity := "alice"
	identityType := domain.AuthorizerIdentityType("IDENTITY_TYPE_SUB")
	path := "todoApp.GET.todos"
	decisions := []string{"allowed"}
	resource := map[string]any{"owner_id": "alice"}

	request, err := topaz.NewAuthorizerIsRequest(domain.AuthorizerIsRequest{
		IdentityContext: &domain.AuthorizerIdentityContext{Identity: &identity, Type: &identityType},
		PolicyContext:   &domain.AuthorizerPolicyContext{Path: &path, Decisions: &decisions},
		ResourceContext: &resource,
	})
	if err != nil {
		t.Fatal(err)
	}

	if request.GetIdentityContext().GetIdentity() != identity || request.GetPolicyContext().GetPath() != path {
		t.Fatalf("request conversion = %#v", request)
	}
}

func TestAuthorizerIsResponseConversion(t *testing.T) {
	response := topaz.NewAuthorizerIsResponse(&authz.IsResponse{
		Decisions: []*authz.Decision{{Decision: "allowed", Is: true}},
	})

	if response.Decisions == nil || len(*response.Decisions) != 1 || !*(*response.Decisions)[0].Is {
		t.Fatalf("response conversion = %#v", response)
	}
}

func TestAuthorizerQueryOptionsConversion(t *testing.T) {
	trace := domain.AuthorizerTraceLevelFull

	options, err := topaz.NewAuthorizerQueryOptions(&domain.AuthorizerQueryOptions{
		Metrics:      true,
		Trace:        &trace,
		TraceSummary: true,
	})
	if err != nil {
		t.Fatal(err)
	}

	if !options.GetMetrics() || !options.GetTraceSummary() || options.GetTrace() != authz.TraceLevel_TRACE_LEVEL_FULL {
		t.Fatalf("query options conversion = %#v", options)
	}
}

func TestAuthorizerQueryOptionsRejectsUnknownTraceLevel(t *testing.T) {
	trace := domain.AuthorizerTraceLevel("invalid")
	if _, err := topaz.NewAuthorizerQueryOptions(&domain.AuthorizerQueryOptions{Trace: &trace}); err == nil {
		t.Fatal("expected unknown trace level error")
	}
}
