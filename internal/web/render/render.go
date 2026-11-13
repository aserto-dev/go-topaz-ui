package render

import (
	"fmt"
	"net/http"
	"os"
	"github.com/aserto-dev/go-topaz-ui/internal/web/templates/base"
	"strings"

	"github.com/a-h/templ"
)

// Render writes a templ component as an HTML response.
func Render(w http.ResponseWriter, r *http.Request, component templ.Component) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	if err := component.Render(r.Context(), w); err != nil {
		http.Error(w, fmt.Sprintf("render page: %v", err), http.StatusInternalServerError)
	}
}

type PageRenderMode uint8

const (
	PageRenderFull PageRenderMode = iota
	PageRenderWorkspace
	PageRenderContent
)

// SectionPage owns the response contract shared by every console section:
// full requests receive the document, top-level navigation receives the
// workspace, and in-section navigation receives the content plus its toolbar
// out-of-band update.
func SectionPage(
	w http.ResponseWriter,
	r *http.Request,
	section string,
	workspace templ.Component,
	content templ.Component,
	toolbar templ.Component,
) {
	switch PageRenderModeFor(r) {
	case PageRenderWorkspace:
		Render(w, r, workspace)
	case PageRenderContent:
		Render(w, r, base.ContentUpdate(toolbar, content))
	default:
		Render(w, r, base.IndexPage(section, ConfiguredTheme(), workspace))
	}
}

// PageRenderModeFor determines the rendering mode for the current request
// based on the Hx-Request and Hx-Target headers.
func PageRenderModeFor(r *http.Request) PageRenderMode {
	if !strings.EqualFold(r.Header.Get("Hx-Request"), "true") {
		return PageRenderFull
	}

	target := r.Header.Get("Hx-Target")
	if _, id, ok := strings.Cut(target, "#"); ok {
		target = id
	}

	switch target {
	case "workspace":
		return PageRenderWorkspace
	case "content":
		return PageRenderContent
	default:
		return PageRenderFull
	}
}

func ConfiguredTheme() string {
	if strings.EqualFold(os.Getenv("PLANBEE_THEME"), "light") {
		return "light"
	}

	return "dark"
}
