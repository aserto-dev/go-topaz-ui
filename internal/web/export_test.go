package web

import (
	"net/http"

	"github.com/aserto-dev/go-topaz-ui/internal/web/backend"
)

const (
	AuthorizerModulesPath   = authorizerModulesPath
	DirectoryDangerPath     = directoryDangerPath
	DirectoryDangerZonePath = directoryDangerZonePath
	DirectoryModelPath      = directoryModelPath
)

func NewWebMux(client *backend.Client) *http.ServeMux {
	return newWebMux(client)
}
