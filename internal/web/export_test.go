package web

import (
	"net/http"
	"planbee/internal/web/backend"
)

const (
	AuthorizerModulesPath   = authorizerModulesPath
	DirectoryDangerPath     = directoryDangerPath
	DirectoryDangerZonePath = directoryDangerZonePath
)

func NewWebMux(client *backend.Client) *http.ServeMux {
	return newWebMux(client)
}
