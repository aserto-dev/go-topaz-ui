package console

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/aserto-dev/go-aserto"
)

func TestRegisterHandlersOnExistingMux(t *testing.T) {
	mux := http.NewServeMux()
	cfg := &Config{
		Authorizer: aserto.Config{Address: "localhost:1", NoTLS: true},
		Directory:  aserto.Config{Address: "localhost:1", NoTLS: true},
	}

	cleanup, err := RegisterHandlers(mux, cfg)
	if err != nil {
		t.Fatalf("register handlers: %v", err)
	}
	t.Cleanup(func() {
		if err := cleanup(); err != nil {
			t.Errorf("close clients: %v", err)
		}
	})

	for _, path := range []string{
		"/ui/authorizer/modules",
		"/ui/directory/model",
		"/ui/directory/objects",
		"/static/css/app.css",
	} {
		request := httptest.NewRequest(http.MethodGet, path, nil)
		_, pattern := mux.Handler(request)
		if pattern == "" {
			t.Errorf("no handler registered for %q", path)
		}
	}
}
