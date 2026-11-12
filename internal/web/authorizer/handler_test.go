package authorizer_test

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"strings"
	"testing"

	. "github.com/aserto-dev/go-topaz-ui/internal/web/authorizer"
)

var errFakeAuthorizerNotImplemented = errors.New("fake authorizer method not implemented")

type fakeAuthorizer struct {
	modules []domain.AuthorizerModule
}

func (f fakeAuthorizer) Is(context.Context, domain.AuthorizerIsRequest) (*domain.AuthorizerIsResponse, error) {
	return nil, errFakeAuthorizerNotImplemented
}

func (f fakeAuthorizer) DecisionTree(context.Context, domain.AuthorizerDecisionTreeRequest) (*domain.AuthorizerDecisionTreeResponse, error) {
	return nil, errFakeAuthorizerNotImplemented
}

func (f fakeAuthorizer) Query(context.Context, domain.AuthorizerQueryRequest) (*domain.AuthorizerQueryResponse, error) {
	return nil, errFakeAuthorizerNotImplemented
}

func (f fakeAuthorizer) ListPolicies(context.Context) (*domain.AuthorizerListPoliciesResponse, error) {
	return &domain.AuthorizerListPoliciesResponse{Result: &f.modules}, nil
}

func TestModulesHandlerUsesInjectedBackend(t *testing.T) {
	id := "policy-id"
	raw := "package todo"
	path := "todo"

	handler := NewHandler(fakeAuthorizer{modules: []domain.AuthorizerModule{{
		ID:          &id,
		Raw:         &raw,
		PackagePath: &path,
	}}})

	request := httptest.NewRequestWithContext(context.Background(), http.MethodGet, "/ui/authorizer/modules", nil)
	recorder := httptest.NewRecorder()

	handler.Modules(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("Modules() status = %d, want %d", recorder.Code, http.StatusOK)
	}

	if !strings.Contains(recorder.Body.String(), "todo") {
		t.Fatalf("Modules() response does not contain the injected module")
	}
}
