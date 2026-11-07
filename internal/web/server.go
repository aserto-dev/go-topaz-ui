package web

import (
	"log"
	"net/http"
	"planbee/internal/web/authorizer"
	"planbee/internal/web/backend"
	"planbee/internal/web/directory"
	"time"
)

const (
	directoryRelationsPath  = "/ui/directory/relations"
	directoryModelPath      = "/ui/directory/model"
	directoryEvaluatorPath  = "/ui/directory/evaluator"
	directoryDangerPath     = "/ui/directory/danger"
	directoryDangerZonePath = "/ui/directory/danger-zone"
	directoryObjectsPath    = "/ui/directory/objects"
	authorizerModulesPath   = "/ui/authorizer/modules"
	authorizerEvaluatorPath = "/ui/authorizer/evaluator"
)

func ServeWeb(addr string) error {
	client, closeClients, err := backend.NewFromEnv()
	if err != nil {
		return err
	}
	defer func() {
		if err := closeClients(); err != nil {
			log.Printf("close Topaz clients: %v", err)
		}
	}()

	mux := newWebMux(client)

	server := new(http.Server)
	server.Addr = addr
	server.Handler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestTarget := r.URL.EscapedPath()
		if query := r.URL.Query().Encode(); query != "" {
			requestTarget += "?" + query
		}

		log.Printf("incoming HTTP request: %s %s", r.Method, requestTarget) //nolint:gosec // Path and query are escaped before logging.

		mux.ServeHTTP(w, r)
	})
	server.ReadHeaderTimeout = 5 * time.Second

	log.Printf("serving web UI on http://localhost%s", addr)

	return server.ListenAndServe()
}

func newWebMux(client *backend.Client) *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	mux.HandleFunc("/", handleIndex)

	authorizerHandler := authorizer.NewHandler(client.Authorizer)
	directoryHandler := directory.NewHandler(client.DirectoryReader, client.DirectoryWriter)

	mux.HandleFunc(authorizerEvaluatorPath, authorizerHandler.Evaluator)
	mux.HandleFunc(authorizerModulesPath, authorizerHandler.Modules)
	mux.HandleFunc(directoryDangerPath, directoryHandler.DangerZone)
	mux.HandleFunc(directoryDangerZonePath, directoryHandler.DangerZone)
	mux.HandleFunc(directoryEvaluatorPath, directoryHandler.Evaluator)
	mux.HandleFunc(directoryModelPath, directoryHandler.Model)
	mux.HandleFunc(directoryObjectsPath, directoryHandler.Objects)
	mux.HandleFunc(directoryRelationsPath, directoryHandler.Relations)

	return mux
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)

		return
	}

	http.Redirect(w, r, authorizerModulesPath, http.StatusFound)
}
