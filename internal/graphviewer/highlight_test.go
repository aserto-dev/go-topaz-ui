package graphviewer_test

import (
	"encoding/json"
	"os"
	"slices"
	"strings"
	"testing"

	. "planbee/internal/graphviewer"
)

type highlightGolden struct {
	Fixtures []highlightFixture `json:"fixtures"`
}

type highlightFixture struct {
	Name  string          `json:"name"`
	Model Model           `json:"model"`
	Cases []highlightCase `json:"cases"`
}

type highlightCase struct {
	Kind       string   `json:"kind"`
	Entity     string   `json:"entity"`
	Label      string   `json:"label"`
	Permission string   `json:"permission"`
	ID         string   `json:"id"`
	Path       []string `json:"path"`
}

// Golden paths were produced by executing the upstream TypeScript parser and
// mapNodePath, not by this implementation. The source revision is in the fixture.
func TestHighlightsMatchConsole(t *testing.T) {
	golden := loadHighlightGolden(t)

	for _, fixture := range golden.Fixtures {
		t.Run(fixture.Name, func(t *testing.T) {
			testHighlightFixture(t, fixture)
		})
	}
}

func loadHighlightGolden(t *testing.T) highlightGolden {
	t.Helper()

	raw, err := os.ReadFile("testdata/console-highlights.json")
	if err != nil {
		t.Fatal(err)
	}

	var golden highlightGolden
	if err := json.Unmarshal(raw, &golden); err != nil {
		t.Fatal(err)
	}

	return golden
}

func testHighlightFixture(t *testing.T, fixture highlightFixture) {
	t.Helper()

	graph, err := Build(fixture.Model)
	if err != nil {
		t.Fatal(err)
	}

	originalIDs, localIDs := highlightNodeIDs(t, graph, fixture.Cases)
	if len(originalIDs) != len(graph.Nodes) {
		t.Fatal("fixture does not cover every rendered node")
	}

	view := NewView(graph, Options{})

	for _, selection := range fixture.Cases {
		t.Run(selection.ID, func(t *testing.T) {
			testHighlightCase(t, graph, view, selection, originalIDs, localIDs)
		})
	}
}

func highlightNodeIDs(t *testing.T, graph Graph, cases []highlightCase) (map[string]string, map[string]string) {
	t.Helper()

	originalIDs := map[string]string{}
	localIDs := map[string]string{}

	for _, selection := range cases {
		id := highlightCaseNodeID(selection)
		mustNode(t, graph, id)
		originalIDs[id] = selection.ID
		localIDs[selection.ID] = id
	}

	return originalIDs, localIDs
}

func highlightCaseNodeID(selection highlightCase) string {
	switch selection.Kind {
	case "object":
		return EntityID(selection.Entity)
	case "permission":
		return PermissionID(selection.Entity, selection.Label)
	case "operator":
		return OperatorID(selection.Entity, selection.Permission)
	case "relation":
		return RelationID(selection.Entity, selection.Label)
	case "subject":
		return TargetID(selection.Entity, selection.Label)
	default:
		return ""
	}
}

func testHighlightCase(t *testing.T, graph Graph, view View, selection highlightCase, originalIDs, localIDs map[string]string) {
	t.Helper()

	id := localIDs[selection.ID]
	want := expectedHighlightIDs(selection, localIDs)
	got := slices.Clone(graph.Highlights[id])

	slices.Sort(want)
	slices.Sort(got)

	if !slices.Equal(got, want) {
		t.Fatalf("nodes = %v; console = %v", got, want)
	}

	rendered := renderedHighlightIDs(view, id)
	slices.Sort(rendered)

	if !slices.Equal(rendered, want) {
		t.Fatalf("rendered membership = %v; want %v", rendered, want)
	}

	assertHighlightedEdges(t, graph, selection, originalIDs, rendered)
}

func expectedHighlightIDs(selection highlightCase, localIDs map[string]string) []string {
	want := []string{localIDs[selection.ID]}
	for _, original := range selection.Path {
		if local := localIDs[original]; local != "" && !slices.Contains(want, local) {
			want = append(want, local)
		}
	}

	return want
}

func renderedHighlightIDs(view View, id string) []string {
	for _, node := range view.Nodes {
		if node.ID == id {
			return strings.Fields(node.Highlights)
		}
	}

	return nil
}

func assertHighlightedEdges(t *testing.T, graph Graph, selection highlightCase, originalIDs map[string]string, rendered []string) {
	t.Helper()

	for _, edge := range graph.Edges {
		source, target := originalIDs[edge.From], originalIDs[edge.To]
		// Literal highlightPath edge predicate from the console.
		inSource, inTarget := slices.Contains(selection.Path, source), slices.Contains(selection.Path, target)
		wantEdge := (source == selection.ID && inTarget) || (target == selection.ID && inSource) || (inSource && inTarget)

		gotEdge := slices.Contains(rendered, edge.From) && slices.Contains(rendered, edge.To)
		if gotEdge != wantEdge {
			t.Errorf("edge %s -> %s active=%v; console=%v", source, target, gotEdge, wantEdge)
		}
	}
}
