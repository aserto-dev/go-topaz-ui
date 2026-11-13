package authorizer_test

import (
	"context"
	"net/http"
	"net/http/httptest"
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"strings"
	"testing"

	. "github.com/aserto-dev/go-topaz-ui/internal/web/authorizer"
)

func TestAuthorizerEvaluatorIdentityControls(t *testing.T) {
	tests := []struct {
		identityType string
		label        string
		hint         string
	}{
		{identityType: "IDENTITY_TYPE_NONE", label: "Identity", hint: "identity value"},
		{identityType: "IDENTITY_TYPE_SUB", label: "Subject", hint: "user@example.com"},
		{identityType: "IDENTITY_TYPE_JWT", label: "JWT", hint: "eyJ..."},
		{identityType: "IDENTITY_TYPE_MANUAL", label: "Identity", hint: "identity value"},
	}

	for _, test := range tests {
		t.Run(test.identityType, func(t *testing.T) {
			if got := AuthorizerEvaluatorIdentityLabel(test.identityType); got != test.label {
				t.Fatalf("identity label = %q, want %q", got, test.label)
			}

			if got := AuthorizerEvaluatorIdentityHint(test.identityType); got != test.hint {
				t.Fatalf("identity hint = %q, want %q", got, test.hint)
			}
		})
	}
}

type queryRecordingAuthorizer struct {
	fakeAuthorizer

	queryCalls int
	request    domain.AuthorizerQueryRequest
}

func (a *queryRecordingAuthorizer) Query(_ context.Context, request domain.AuthorizerQueryRequest) (*domain.AuthorizerQueryResponse, error) {
	a.queryCalls++
	a.request = request
	response := map[string]any{"executed": true}

	return &domain.AuthorizerQueryResponse{Response: &response}, nil
}

// TestAuthorizerEvaluatorRunsTypedQuery verifies that the evaluator correctly submits typed queries to the authorizer and handles trace options.
//
//nolint:gocognit
func TestAuthorizerEvaluatorRunsTypedQuery(t *testing.T) {
	for _, trace := range []bool{false, true} {
		t.Run(map[bool]string{false: "without trace", true: "with trace"}[trace], func(t *testing.T) {
			authorizer := &queryRecordingAuthorizer{}
			handler := NewHandler(authorizer)

			requestURL := "/ui/authorizer/evaluator?operation=QUERY&identity_type=IDENTITY_TYPE_NONE&query=x%20%3D%20data%3B%20y%20%3D%20input&run=1"
			if trace {
				requestURL += "&trace=1"
			}

			request := httptest.NewRequestWithContext(context.Background(), http.MethodGet, requestURL, nil)
			recorder := httptest.NewRecorder()
			handler.Evaluator(recorder, request)

			if authorizer.queryCalls != 1 {
				t.Fatalf("Query() calls = %d, want 1", authorizer.queryCalls)
			}

			if authorizer.request.Query == nil || *authorizer.request.Query != "x = data; y = input" {
				t.Fatalf("Query() value = %v, want typed query", authorizer.request.Query)
			}

			traceEnabled := authorizer.request.Options != nil && authorizer.request.Options.Trace != nil
			if traceEnabled != trace {
				t.Fatalf("Query() trace enabled = %t, want %t", traceEnabled, trace)
			}

			if !strings.Contains(recorder.Body.String(), "executed") {
				t.Fatal("Evaluator response does not contain the Query output")
			}

			body := recorder.Body.String()
			for _, title := range []string{"Resource Context", "Query", "Input (JSON)"} {
				if !strings.Contains(body, `<span class="evaluator-section-title">`+title+`</span>`) {
					t.Errorf("Evaluator response does not use the editor title style for %q", title)
				}
			}

			if trace {
				if !strings.Contains(body, `<header class="evaluator-panel-header">Trace Details</header>`) {
					t.Error("Evaluator response does not contain the Trace Details panel")
				}

				if strings.Contains(body, "<strong>Trace</strong>") {
					t.Error("Evaluator response contains the redundant Trace subheading")
				}
			}
		})
	}
}

func TestAuthorizerEvaluatorDoesNotSubmitSuggestedQuery(t *testing.T) {
	authorizer := &queryRecordingAuthorizer{}
	handler := NewHandler(authorizer)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/authorizer/evaluator?operation=QUERY&identity_type=IDENTITY_TYPE_NONE&run=1",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Evaluator(recorder, request)

	if authorizer.queryCalls != 0 {
		t.Fatalf("Query() calls = %d, want 0 without a typed query", authorizer.queryCalls)
	}

	body := recorder.Body.String()
	if !strings.Contains(body, `placeholder="x = data; y = input"`) {
		t.Fatal("Evaluator response does not contain the query suggestion")
	}

	if strings.Contains(body, `name="query" rows="5" placeholder="x = data; y = input">x = data; y = input`) {
		t.Fatal("Evaluator populated the query suggestion as request data")
	}
}
