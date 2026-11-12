package graphviewer_test

import (
	"strings"
	"testing"

	. "github.com/aserto-dev/go-topaz-ui/internal/graphviewer"
)

func TestBuildDisambiguatesCollidingNodeIDs(t *testing.T) {
	model := Model{Entities: []Entity{
		{Name: "user"},
		{Name: "User"},
		{
			Name: "resource",
			Permissions: []Rule{
				{Name: "Read", Expression: "Viewer"},
				{Name: "read", Expression: "viewer"},
			},
			Relations: []Rule{
				{Name: "Viewer", Expression: "group#member | group-member"},
				{Name: "viewer", Expression: "user"},
			},
		},
	}}

	graph, err := Build(model)
	if err != nil {
		t.Fatalf("Build() error = %v", err)
	}

	assertGraphInvariants(t, graph)

	assertDistinctNodeIDs(
		t,
		mustSemanticNode(t, graph, NodeEntity, "user", "user"),
		mustSemanticNode(t, graph, NodeEntity, "User", "User"),
	)
	assertDistinctNodeIDs(
		t,
		mustSemanticNode(t, graph, NodePermission, "resource", "Read"),
		mustSemanticNode(t, graph, NodePermission, "resource", "read"),
	)
	assertDistinctNodeIDs(
		t,
		mustSemanticNode(t, graph, NodeRelation, "resource", "Viewer"),
		mustSemanticNode(t, graph, NodeRelation, "resource", "viewer"),
	)
	assertDistinctNodeIDs(
		t,
		mustSemanticNode(t, graph, NodeTarget, "resource", "group#member"),
		mustSemanticNode(t, graph, NodeTarget, "resource", "group-member"),
	)

	if got, want := len(graph.Nodes), 12; got != want {
		t.Fatalf("len(Graph.Nodes) = %d, want %d", got, want)
	}
}

func TestCollidingNodeIDsAreStableAcrossSourceOrder(t *testing.T) {
	first := mustBuildGraph(t, Model{Entities: []Entity{{Name: "user"}, {Name: "User"}}})
	second := mustBuildGraph(t, Model{Entities: []Entity{{Name: "User"}, {Name: "user"}}})

	for _, name := range []string{"user", "User"} {
		firstID := mustSemanticNode(t, first, NodeEntity, name, name).ID

		secondID := mustSemanticNode(t, second, NodeEntity, name, name).ID
		if firstID != secondID {
			t.Fatalf("entity %q ID changed with source order: %q != %q", name, firstID, secondID)
		}
	}
}

func TestBuildDisambiguatesCollidingEdgeIDs(t *testing.T) {
	graph := mustBuildGraph(t, Model{Entities: []Entity{
		{Name: "a-b", Permissions: []Rule{{Name: "c", Expression: "missing"}}},
		{Name: "a", Permissions: []Rule{{Name: "b-c", Expression: "missing"}}},
	}})

	assertGraphInvariants(t, graph)

	firstFrom := mustSemanticNode(t, graph, NodePermission, "a-b", "c")
	firstTo := mustEntityNode(t, graph, NodeOperator, "a-b")
	secondFrom := mustSemanticNode(t, graph, NodePermission, "a", "b-c")

	secondTo := mustEntityNode(t, graph, NodeOperator, "a")

	firstEdge := mustGraphEdge(t, graph, firstFrom.ID, firstTo.ID)

	secondEdge := mustGraphEdge(t, graph, secondFrom.ID, secondTo.ID)
	if firstEdge.ID == secondEdge.ID {
		t.Fatalf("colliding semantic edges share ID %q", firstEdge.ID)
	}

	legacyID := EdgeID(firstFrom.ID, firstTo.ID)
	if firstEdge.ID == legacyID || secondEdge.ID == legacyID {
		t.Fatalf("colliding edge retained ambiguous legacy ID %q", legacyID)
	}
}

func mustBuildGraph(t *testing.T, model Model) Graph {
	t.Helper()

	graph, err := Build(model)
	if err != nil {
		t.Fatalf("Build() error = %v", err)
	}

	return graph
}

func mustSemanticNode(t *testing.T, graph Graph, kind NodeKind, entity, label string) Node {
	t.Helper()

	for _, node := range graph.Nodes {
		if node.Kind == kind && node.Entity == entity && node.Label == label {
			return node
		}
	}

	t.Fatalf("node kind=%q entity=%q label=%q not found", kind, entity, label)

	return Node{}
}

func mustEntityNode(t *testing.T, graph Graph, kind NodeKind, entity string) Node {
	t.Helper()

	for _, node := range graph.Nodes {
		if node.Kind == kind && node.Entity == entity {
			return node
		}
	}

	t.Fatalf("node kind=%q entity=%q not found", kind, entity)

	return Node{}
}

func mustGraphEdge(t *testing.T, graph Graph, from, to string) Edge {
	t.Helper()

	for _, edge := range graph.Edges {
		if edge.From == from && edge.To == to {
			return edge
		}
	}

	t.Fatalf("edge %q -> %q not found", from, to)

	return Edge{}
}

func assertDistinctNodeIDs(t *testing.T, nodes ...Node) {
	t.Helper()

	seen := make(map[string]struct{}, len(nodes))
	for _, node := range nodes {
		if _, exists := seen[node.ID]; exists {
			t.Fatalf("semantic nodes share ID %q", node.ID)
		}

		if !strings.Contains(node.ID, "--X") {
			t.Fatalf("colliding node ID %q has no collision suffix", node.ID)
		}

		seen[node.ID] = struct{}{}
	}
}
