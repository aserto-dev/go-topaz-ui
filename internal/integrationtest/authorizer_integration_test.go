package integrationtest

import (
	"context"
	"os"
	"path/filepath"
	"planbee/internal/web/domain"
	"testing"
	"time"

	topaz "planbee/internal/web/topaz"

	"github.com/aserto-dev/go-aserto"
	"github.com/aserto-dev/go-aserto/az"
)

func TestAuthorizerIntegration(t *testing.T) {
	if os.Getenv("PLANBEE_RUN_TOPAZ_INTEGRATION") != "1" {
		t.Skip("set PLANBEE_RUN_TOPAZ_INTEGRATION=1 to test against a running local Topaz")
	}

	caPath, err := integrationCACertPath()
	if err != nil {
		t.Fatal(err)
	}

	addr := os.Getenv("PLANBEE_AUTHORIZER_ADDR")
	if addr == "" {
		addr = "localhost:8282"
	}

	client, err := az.New(aserto.WithAddr(addr), aserto.WithCACertPath(caPath))
	if err != nil {
		t.Fatalf("create Authorizer client: %v", err)
	}
	defer func() { _ = client.Close() }()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	authorizer := topaz.NewAuthorizer(client)

	policies, err := authorizer.ListPolicies(ctx)
	if err != nil {
		t.Fatalf("ListPolicies() error = %v", err)
	}

	if policies == nil || policies.Result == nil || len(*policies.Result) == 0 {
		t.Fatal("ListPolicies() returned no policy modules")
	}

	request := domain.AuthorizerIsRequest{
		IdentityContext: &domain.AuthorizerIdentityContext{
			Identity: new("integration-test-subject"),
			Type:     integrationIdentityTypePointer("IDENTITY_TYPE_MANUAL"),
		},
		PolicyContext: &domain.AuthorizerPolicyContext{
			Path:      new("rebac.check"),
			Decisions: new([]string{"allowed"}),
		},
		ResourceContext: new(map[string]any{
			"relation": "member", "object_type": "group", "object_id": "integration-test-object-does-not-exist", "subject_type": "user",
		}),
	}

	response, err := authorizer.Is(ctx, request)
	if err != nil {
		t.Fatalf("Is() error = %v", err)
	}

	if response == nil || response.Decisions == nil || len(*response.Decisions) == 0 {
		t.Fatalf("Is() result = %#v, want decisions", response)
	}
}

func integrationCACertPath() (string, error) {
	if path := os.Getenv("PLANBEE_GRPC_CA_CERT"); path != "" {
		return path, nil
	}

	home, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	return filepath.Join(home, ".local", "share", "topaz", "certs", "grpc-ca.crt"), nil
}

func integrationIdentityTypePointer(value string) *domain.AuthorizerIdentityType {
	converted := domain.AuthorizerIdentityType(value)

	return &converted
}
