package console

import (
	"net/http"

	"github.com/aserto-dev/go-topaz-ui/internal/web"
	"github.com/aserto-dev/go-topaz-ui/internal/web/backend"
)

// type TopazCfg = backend.TopazCfg

func RegisterHandlers(mux *http.ServeMux, cfg *TopazCfg) error {
	client, _, err := backend.NewFromTopazCfg(cfg)
	if err != nil {
		return err
	}

	return web.RegisterHandlersWithClient(mux, client)
}

type TopazCfg = backend.TopazCfg

func ServeWeb(addr string, cfg *TopazCfg) error {
	return web.ServeWeb(addr, (*TopazCfg)(cfg))
}
