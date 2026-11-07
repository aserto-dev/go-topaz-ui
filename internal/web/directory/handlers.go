package directory

import (
	"fmt"
	"net/http"
	"planbee/internal/web/domain"
	"planbee/internal/web/render"
	"planbee/internal/web/templates/base"
	"strings"

	graphmodel "planbee/internal/graphviewer"
	directorypages "planbee/internal/web/templates/pages/directory"
	evaluatorpages "planbee/internal/web/templates/pages/directory/evaluator"

	"github.com/a-h/templ"
	"go.yaml.in/yaml/v3"
)

const (
	directoryDangerPath    = "/ui/directory/danger"
	directoryObjectsPath   = "/ui/directory/objects"
	directoryRelationsPath = "/ui/directory/relations"
)

type Handler struct {
	reader domain.DirectoryReader
	writer domain.DirectoryWriter
}

func NewHandler(reader domain.DirectoryReader, writer domain.DirectoryWriter) Handler {
	return Handler{reader: reader, writer: writer}
}

// Model handles the directory model route.
func (h Handler) Model(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		h.modelSave(w, r)

		return
	}

	h.modelView(w, r)
}

// handleDirectoryEvaluator handles the directory evaluator route.
func (h Handler) Evaluator(w http.ResponseWriter, r *http.Request) {
	manifest, err := h.reader.GetManifest(r.Context())
	if err != nil {
		h.renderContent(w, r, "evaluator", evaluatorpages.EvaluatorError(err.Error()), base.SectionActions(r.URL.RequestURI(), "#content"))

		return
	}

	view, err := h.newEvaluatorView(r, manifest)
	if err != nil {
		view = emptyDirectoryEvaluatorView(r)
		view.Error = err.Error()
	}

	h.renderContent(w, r, "evaluator", evaluatorpages.EvaluatorPage(view), base.SectionActions(r.URL.RequestURI(), "#content"))
}

func (h Handler) DangerZone(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodDelete {
		if err := h.writer.DeleteManifest(r.Context()); err != nil {
			h.renderContent(
				w, r, "danger", directorypages.DangerZonePage(directoryDangerPath, "", err.Error()),
				base.SectionActions(directoryDangerPath, "#content"),
			)

			return
		}

		h.renderContent(
			w, r, "danger", directorypages.DangerZonePage(directoryDangerPath, "Directory deleted successfully.", ""),
			base.SectionActions(directoryDangerPath, "#content"),
		)

		return
	}

	h.renderContent(w, r, "danger", directorypages.DangerZonePage(directoryDangerPath, "", ""), base.SectionActions(directoryDangerPath, "#content"))
}

func (h Handler) modelView(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	document, err := h.reader.GetManifestDocument(ctx)
	if err != nil {
		h.renderContent(w, r, "model", directorypages.ModelError(err.Error()), base.ModelSectionActions(r.URL.RequestURI()))

		return
	}

	model, err := h.fetchGraphModel(ctx)
	if err != nil {
		h.renderContent(w, r, "model", directorypages.ModelError(err.Error()), base.ModelSectionActions(r.URL.RequestURI()))

		return
	}

	graph, err := graphmodel.Build(model)
	if err != nil {
		h.renderContent(w, r, "model", directorypages.ModelError(err.Error()), base.ModelSectionActions(r.URL.RequestURI()))

		return
	}

	view := graphmodel.NewView(graph, graphmodel.Options{Variant: graphmodel.VariantFullPage, Key: "directory-model"})
	editing := r.URL.Query().Get("edit") == "1"
	h.renderContent(w, r, "model", directorypages.ModelDetail(document.RawYAML, view, "", editing), base.ModelSectionActions(r.URL.RequestURI()))
}

func (h Handler) modelSave(w http.ResponseWriter, r *http.Request) {
	rawYAML := r.FormValue("manifest")

	var manifest domain.DirectoryManifest

	if strings.TrimSpace(rawYAML) == "" {
		h.renderContent(w, r, "model", directorypages.ModelEditor(rawYAML, "Manifest cannot be empty."), base.ModelSectionActions(r.URL.RequestURI()))

		return
	}

	if err := yaml.Unmarshal([]byte(rawYAML), &manifest); err != nil {
		h.renderContent(w, r,
			"model",
			directorypages.ModelEditor(rawYAML, fmt.Sprintf("Invalid YAML: %v", err)),
			base.ModelSectionActions(r.URL.RequestURI()))

		return
	}

	if err := h.writer.SetManifest(r.Context(), rawYAML); err != nil {
		h.renderContent(w, r, "model", directorypages.ModelEditor(rawYAML, err.Error()), base.ModelSectionActions(r.URL.RequestURI()))

		return
	}

	h.modelView(w, r)
}

// renderContent renders a directory screen with its own toolbar component.
func (h Handler) renderContent(w http.ResponseWriter, r *http.Request, active string, content templ.Component, toolbar templ.Component) {
	render.SectionPage(w, r, "directory", base.DirectoryWorkspace(active, content, toolbar), content, toolbar)
}
