package render_test

import (
	"context"
	"net/http"
	"net/http/httptest"
	"github.com/aserto-dev/go-topaz-ui/internal/web/render"
	"github.com/aserto-dev/go-topaz-ui/internal/web/templates/base"
	"github.com/aserto-dev/go-topaz-ui/internal/web/templates/partials"
	"strings"
	"testing"
)

// TestPageRenderModeFor tests the response shape selected for browser and HTMX requests.
func TestPageRenderModeFor(t *testing.T) {
	tests := []struct {
		name   string
		header string
		target string
		want   render.PageRenderMode
	}{
		{name: "full request", want: render.PageRenderFull},
		{name: "htmx request without target", header: "true", want: render.PageRenderFull},
		{name: "workspace target id", header: "true", target: "#workspace", want: render.PageRenderWorkspace},
		{name: "workspace target element", header: "true", target: "div#workspace", want: render.PageRenderWorkspace},
		{name: "content target id", header: "true", target: "#content", want: render.PageRenderContent},
		{name: "content target element", header: "true", target: "main#content", want: render.PageRenderContent},
		{name: "unknown target", header: "true", target: "#other", want: render.PageRenderFull},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			request := httptest.NewRequestWithContext(context.Background(), http.MethodGet, "/ui/directory/model", nil)
			if tt.header != "" {
				request.Header.Set("Hx-Request", tt.header)
			}

			if tt.target != "" {
				request.Header.Set("Hx-Target", tt.target)
			}

			if got := render.PageRenderModeFor(request); got != tt.want { //#
				t.Fatalf("PageRenderModeFor() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSectionPageResponseContract(t *testing.T) {
	content := partials.PanelHeader("Content marker", "Rendered content")
	toolbar := base.SectionActions("/refresh", "#content")
	workspace := base.DirectoryWorkspace("relations", content, toolbar)

	tests := []struct {
		name       string
		setup      func(*http.Request)
		want       []string
		wantAbsent []string
	}{
		{
			name: "full page",
			want: []string{"<!doctype html>", `id="workspace"`, "Content marker"},
		},
		{
			name: "workspace navigation",
			setup: func(r *http.Request) {
				r.Header.Set("Hx-Request", "true")
				r.Header.Set("Hx-Target", "#workspace")
			},
			want:       []string{`class="sidebar"`, "Content marker"},
			wantAbsent: []string{"<!doctype html>", `hx-swap-oob="true"`},
		},
		{
			name: "content navigation",
			setup: func(r *http.Request) {
				r.Header.Set("Hx-Request", "true")
				r.Header.Set("Hx-Target", "main#content")
			},
			want:       []string{`id="section-actions"`, `hx-swap-oob="true"`, "Content marker"},
			wantAbsent: []string{"<!doctype html>", `id="workspace"`},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			request := httptest.NewRequestWithContext(context.Background(), http.MethodGet, "/ui/directory/relations", nil)
			if tt.setup != nil {
				tt.setup(request)
			}

			recorder := httptest.NewRecorder()
			render.SectionPage(recorder, request, "directory", workspace, content, toolbar) //
			body := recorder.Body.String()

			for _, want := range tt.want {
				if !strings.Contains(body, want) {
					t.Errorf("response does not contain %q", want)
				}
			}

			for _, absent := range tt.wantAbsent {
				if strings.Contains(body, absent) {
					t.Errorf("response unexpectedly contains %q", absent)
				}
			}
		})
	}
}
