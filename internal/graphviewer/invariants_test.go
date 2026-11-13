package graphviewer_test

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"reflect"
	"testing"

	. "github.com/aserto-dev/go-topaz-ui/internal/graphviewer"
)

// TestGraphFixturesSatisfyStructuralInvariants verifies that all graph fixtures adhere
// to the structural invariants defined for the graph viewer.
func TestGraphFixturesSatisfyStructuralInvariants(t *testing.T) {
	golden := loadHighlightGolden(t)

	for _, fixture := range golden.Fixtures {
		t.Run(fixture.Name, func(t *testing.T) {
			graph, err := Build(fixture.Model)
			if err != nil {
				t.Fatalf("Build() error = %v", err)
			}

			assertGraphInvariants(t, graph)

			rebuilt, err := Build(fixture.Model)
			if err != nil {
				t.Fatalf("second Build() error = %v", err)
			}

			if !reflect.DeepEqual(rebuilt, graph) {
				t.Fatal("Build() is not deterministic for identical input")
			}
		})
	}
}

// TestGDriveGraphSnapshot ensures that the GDrive graph fixture produces a consistent snapshot.
// the test:
// 1. Builds the graph from the existing GDrive fixture.
// 2. Serializes the entire Graph value to JSON.
// 3. Computes a SHA-256 hash of that JSON.
// 4. Compares it with the stored value: 14b2e04e40d33544c75cae8a3a4372aa67cf6feed19666852f5b489fc6e1d5f7
//
// This is compact regression lock protecting the current graph layout, and not a is not a security checksum.
func TestGDriveGraphSnapshot(t *testing.T) {
	model := fixtureModel(t, "gdrive")

	graph, err := Build(model)
	if err != nil {
		t.Fatalf("Build() error = %v", err)
	}

	raw, err := json.Marshal(graph) //nolint:musttag // The internal graph shape itself is the snapshot contract.
	if err != nil {
		t.Fatalf("marshal graph snapshot: %v", err)
	}

	digest := sha256.Sum256(raw)
	got := hex.EncodeToString(digest[:])

	// This fingerprint protects the established node order, coordinates, edge
	// paths, dimensions, and highlight memberships without a browser snapshot.
	const want = "14b2e04e40d33544c75cae8a3a4372aa67cf6feed19666852f5b489fc6e1d5f7"
	if got != want {
		t.Fatalf("GDrive graph snapshot = %s, want %s", got, want)
	}
}

func fixtureModel(t *testing.T, name string) Model {
	t.Helper()

	for _, fixture := range loadHighlightGolden(t).Fixtures {
		if fixture.Name == name {
			return fixture.Model
		}
	}

	t.Fatalf("fixture %q not found", name)

	return Model{Entities: nil}
}

func assertGraphInvariants(t *testing.T, graph Graph) {
	t.Helper()
	assertGraphDimensions(t, graph)

	nodes := indexGraphNodes(t, graph)
	assertNodesDoNotOverlap(t, graph.Nodes)
	assertGraphEdges(t, graph.Edges, nodes)
	assertGraphHighlights(t, graph.Highlights, nodes)
}

func assertGraphDimensions(t *testing.T, graph Graph) {
	t.Helper()

	if graph.Width <= 0 || graph.Height <= 0 {
		t.Fatalf("graph dimensions = (%f, %f), want positive dimensions", graph.Width, graph.Height)
	}

	wantViewBox := fmt.Sprintf("0 0 %.1f %.1f", graph.Width, graph.Height)
	if graph.ViewBox != wantViewBox {
		t.Fatalf("graph view box = %q, want %q", graph.ViewBox, wantViewBox)
	}
}

func indexGraphNodes(t *testing.T, graph Graph) map[string]Node {
	t.Helper()

	nodes := make(map[string]Node, len(graph.Nodes))
	for _, node := range graph.Nodes {
		if node.ID == "" {
			t.Fatal("graph contains a node with an empty ID")
		}

		if _, exists := nodes[node.ID]; exists {
			t.Fatalf("graph contains duplicate node ID %q", node.ID)
		}

		if node.W <= 0 || node.H <= 0 {
			t.Fatalf("node %q dimensions = (%f, %f), want positive dimensions", node.ID, node.W, node.H)
		}

		if node.X < 0 || node.Y < 0 || node.X+node.W > graph.Width || node.Y+node.H > graph.Height {
			t.Fatalf(
				"node %q bounds = (%f, %f, %f, %f), outside graph (%f, %f)",
				node.ID,
				node.X,
				node.Y,
				node.W,
				node.H,
				graph.Width,
				graph.Height,
			)
		}

		nodes[node.ID] = node
	}

	return nodes
}

func assertNodesDoNotOverlap(t *testing.T, nodes []Node) {
	t.Helper()

	for i, node := range nodes {
		for _, other := range nodes[i+1:] {
			if rectanglesOverlap(node, other) {
				t.Fatalf("nodes %q and %q overlap", node.ID, other.ID)
			}
		}
	}
}

func assertGraphEdges(t *testing.T, graphEdges []Edge, nodes map[string]Node) {
	t.Helper()

	edges := make(map[string]struct{}, len(graphEdges))
	for _, edge := range graphEdges {
		if edge.ID == "" {
			t.Fatal("graph contains an edge with an empty ID")
		}

		if _, exists := edges[edge.ID]; exists {
			t.Fatalf("graph contains duplicate edge ID %q", edge.ID)
		}

		if _, exists := nodes[edge.From]; !exists {
			t.Fatalf("edge %q references missing source node %q", edge.ID, edge.From)
		}

		if _, exists := nodes[edge.To]; !exists {
			t.Fatalf("edge %q references missing target node %q", edge.ID, edge.To)
		}

		if edge.Path == "" {
			t.Fatalf("edge %q has an empty path", edge.ID)
		}

		edges[edge.ID] = struct{}{}
	}
}

func assertGraphHighlights(t *testing.T, highlights map[string][]string, nodes map[string]Node) {
	t.Helper()

	for nodeID := range nodes {
		if _, exists := highlights[nodeID]; !exists {
			t.Fatalf("highlight map has no entry for node %q", nodeID)
		}
	}

	for nodeID, highlighted := range highlights {
		if _, exists := nodes[nodeID]; !exists {
			t.Fatalf("highlight map references missing selected node %q", nodeID)
		}

		seen := make(map[string]struct{}, len(highlighted))
		for _, highlightedID := range highlighted {
			if _, exists := nodes[highlightedID]; !exists {
				t.Fatalf("highlight for %q references missing node %q", nodeID, highlightedID)
			}

			if _, exists := seen[highlightedID]; exists {
				t.Fatalf("highlight for %q contains duplicate node %q", nodeID, highlightedID)
			}

			seen[highlightedID] = struct{}{}
		}

		if _, includesSelf := seen[nodeID]; !includesSelf {
			t.Fatalf("highlight for %q does not include itself", nodeID)
		}
	}
}

func rectanglesOverlap(a, b Node) bool {
	return a.X < b.X+b.W && b.X < a.X+a.W && a.Y < b.Y+b.H && b.Y < a.Y+a.H
}
