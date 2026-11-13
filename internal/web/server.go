package web

import (
	"io/fs"
	"log"
	"net/http"
	"time"

	"github.com/aserto-dev/go-topaz-ui/internal/web/authorizer"
	"github.com/aserto-dev/go-topaz-ui/internal/web/backend"
	"github.com/aserto-dev/go-topaz-ui/internal/web/directory"
)

const (
	directoryPath           = "/ui/directory"
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

	return serveWeb(addr, newWebMux(client), closeClients)
}

// ServeWebWithConfig starts the web server with explicit Topaz client settings
// and embedded static assets supplied by the caller.
func ServeWebWithConfig(addr string, cfg *backend.Config, staticFS fs.FS) error {
	client, closeClients, err := backend.NewFromConfig(cfg)
	if err != nil {
		return err
	}

	mux := newWebMuxWithStaticHandler(client, http.FileServer(http.FS(staticFS)))
	return serveWeb(addr, mux, closeClients)
}

func serveWeb(addr string, mux *http.ServeMux, closeClients func() error) error {
	defer func() {
		if err := closeClients(); err != nil {
			log.Printf("close Topaz clients: %v", err)
		}
	}()

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

	log.Printf("serving web UI on http://%s", addr)

	return server.ListenAndServe()
}

// RegisterHandlersWithClient registers all handlers given a client
func RegisterHandlersWithClient(mux *http.ServeMux, client *backend.Client) error {
	authorizerHandler := authorizer.NewHandler(client.Authorizer)
	directoryHandler := directory.NewHandler(client.DirectoryReader, client.DirectoryWriter)

	mux.HandleFunc(directoryPath, redirectToDirectoryModel)
	mux.HandleFunc(directoryPath+"/", redirectToDirectoryModel)
	mux.HandleFunc(authorizerEvaluatorPath, authorizerHandler.Evaluator)
	mux.HandleFunc(authorizerModulesPath, authorizerHandler.Modules)
	mux.HandleFunc(directoryDangerPath, directoryHandler.DangerZone)
	mux.HandleFunc(directoryDangerZonePath, directoryHandler.DangerZone)
	mux.HandleFunc(directoryEvaluatorPath, directoryHandler.Evaluator)
	mux.HandleFunc(directoryModelPath, directoryHandler.Model)
	mux.HandleFunc(directoryObjectsPath, directoryHandler.Objects)
	mux.HandleFunc(directoryRelationsPath, directoryHandler.Relations)

	return nil
}

func newWebMux(client *backend.Client) *http.ServeMux {
	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("static")))
	return newWebMuxWithStaticHandler(client, staticHandler)
}

func newWebMuxWithStaticHandler(client *backend.Client, staticHandler http.Handler) *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("/static/", staticHandler)
	mux.HandleFunc("/", handleIndex)

	authorizerHandler := authorizer.NewHandler(client.Authorizer)
	directoryHandler := directory.NewHandler(client.DirectoryReader, client.DirectoryWriter)

	mux.HandleFunc(directoryPath, redirectToDirectoryModel)
	mux.HandleFunc(directoryPath+"/", redirectToDirectoryModel)
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

func redirectToDirectoryModel(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, directoryModelPath, http.StatusFound)
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)

		return
	}

	http.Redirect(w, r, authorizerModulesPath, http.StatusFound)
}
