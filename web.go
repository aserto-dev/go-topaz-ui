package console

import (
	"fmt"
	"net/http"

	"github.com/aserto-dev/go-topaz-ui/internal/web"
	"github.com/aserto-dev/go-topaz-ui/internal/web/backend"
)

// Config contains the authorizer and directory client settings used by the UI.
type Config = backend.Config

// RegisterHandlers registers the console UI on an existing HTTP server mux.
// The returned cleanup function closes the gRPC clients used by the handlers.
// this is the topaz-to-wingmans boundary.
func RegisterHandlers(mux *http.ServeMux, cfg *Config) (func() error, error) {
	client, closeClients, err := backend.NewFromConfig(cfg)
	if err != nil {
		return nil, err
	}

	if err := web.RegisterHandlersWithClient(mux, client); err != nil {
		if closeErr := closeClients(); closeErr != nil {
			return nil, fmt.Errorf("register handlers: %w (close clients: %v)", err, closeErr)
		}

		return nil, err
	}

	mux.Handle("/static/", http.FileServer(http.FS(FS)))

	return closeClients, nil
}
