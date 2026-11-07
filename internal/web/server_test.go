package web

import (
	"context"
	"net/http"
	"net/http/httptest"
	"planbee/internal/web/backend"
	"strings"
	"testing"
)

func TestWebMuxPreservesIndexAndDangerRoutes(t *testing.T) {
	mux := newWebMux(&backend.Client{})

	tests := []struct {
		name       string
		path       string
		header     bool
		wantStatus int
		want       string
		wantAbsent string
	}{
		{
			name:       "index redirect",
			path:       "/",
			wantStatus: http.StatusFound,
			want:       authorizerModulesPath,
		},
		{
			name:       "current danger route",
			path:       directoryDangerPath,
			wantStatus: http.StatusOK,
			want:       "Danger Zone",
		},
		{
			name:       "legacy danger zone route",
			path:       directoryDangerZonePath,
			header:     true,
			wantStatus: http.StatusOK,
			want:       `hx-swap-oob="true"`,
			wantAbsent: "<!doctype html>",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			request := httptest.NewRequestWithContext(context.Background(), http.MethodGet, tt.path, nil)
			if tt.header {
				request.Header.Set("Hx-Request", "true")
				request.Header.Set("Hx-Target", "#content")
			}

			recorder := httptest.NewRecorder()
			mux.ServeHTTP(recorder, request)

			if recorder.Code != tt.wantStatus {
				t.Fatalf("status = %d, want %d", recorder.Code, tt.wantStatus)
			}

			if tt.path == "/" {
				if got := recorder.Header().Get("Location"); got != tt.want {
					t.Fatalf("Location = %q, want %q", got, tt.want)
				}
			} else if !strings.Contains(recorder.Body.String(), tt.want) {
				t.Fatalf("response does not contain %q", tt.want)
			}

			if tt.wantAbsent != "" && strings.Contains(recorder.Body.String(), tt.wantAbsent) {
				t.Fatalf("response unexpectedly contains %q", tt.wantAbsent)
			}
		})
	}
}
