package graphviewer_test

import (
	"reflect"
	"strings"
	"testing"

	. "planbee/internal/graphviewer"
)

func TestBuildRejectsInvalidExpressionsBeforeConstruction(t *testing.T) {
	tests := []struct {
		name      string
		model     Model
		wantError string
	}{
		{
			name: "permission",
			model: Model{Entities: []Entity{{
				Name:        "resource",
				Permissions: []Rule{{Name: "can_read", Expression: "viewer |"}},
			}}},
			wantError: `parse permission "can_read" on entity "resource"`,
		},
		{
			name: "relation",
			model: Model{Entities: []Entity{{
				Name:      "resource",
				Relations: []Rule{{Name: "viewer", Expression: "user |"}},
			}}},
			wantError: `parse relation "viewer" on entity "resource"`,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			graph, err := Build(test.model)
			if err == nil {
				t.Fatal("Build() error = nil, want parse error")
			}

			if !strings.Contains(err.Error(), test.wantError) {
				t.Fatalf("Build() error = %q, want it to contain %q", err, test.wantError)
			}

			if !reflect.DeepEqual(graph, Graph{}) {
				t.Fatalf("Build() graph = %#v, want zero graph", graph)
			}
		})
	}
}
