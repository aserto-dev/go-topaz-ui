package graphviewer_test

import (
	"testing"

	. "planbee/internal/graphviewer"
)

func TestBuildCreatesStableSemanticGraph(t *testing.T) {
	t.Parallel()

	graph, err := Build(Model{
		Entities: []Entity{
			{
				Name: "folder",
				Permissions: []Rule{
					{Name: "can_read", Expression: "viewer | can_write | parent->can_read", TargetTypes: nil},
					{Name: "can_write", Expression: "editor", TargetTypes: nil},
				},
				Relations: []Rule{
					{Name: "editor", Expression: "user", TargetTypes: nil},
					{Name: "parent", Expression: "folder", TargetTypes: nil},
					{Name: "viewer", Expression: "user | group#member", TargetTypes: nil},
				},
			},
		},
	})
	if err != nil {
		t.Fatalf("Build() error = %v", err)
	}

	assertNodeMetadata(t, graph, "entity:folder", "folder", false)
	assertNode(t, graph, "permission:folder:can_read", NodePermission, XPermission)
	assertNode(t, graph, "operator:folder:can_read", NodeOperator, XOperator)
	assertNode(t, graph, "relation:folder:viewer", NodeRelation, XRelation)
	assertNodeMetadata(t, graph, "target:folder:group-member", "folder", true)
	assertEdge(t, graph, "operator:folder:can_read", "permission:folder:can_write", EdgeNormal)
	assertEdge(t, graph, "relation:folder:viewer", "target:folder:user", EdgeNormal)

	if graph.Width <= 0 || graph.Height <= 0 || graph.ViewBox == "" {
		t.Fatalf("graph dimensions = (%f, %f, %q), want populated dimensions", graph.Width, graph.Height, graph.ViewBox)
	}
}

func TestBuildStacksEntitiesInSeparateSections(t *testing.T) {
	t.Parallel()

	graph, err := Build(Model{
		Entities: []Entity{
			{
				Name: "user",
				Permissions: []Rule{
					{Name: "self", Expression: "user:*", TargetTypes: nil},
				},
				Relations: []Rule(nil),
			},
			{
				Name:        "doc",
				Permissions: []Rule(nil),
				Relations: []Rule{
					{Name: "owner", Expression: "user", TargetTypes: nil},
				},
			},
		},
	})
	if err != nil {
		t.Fatalf("Build() error = %v", err)
	}

	user := mustNode(t, graph, "entity:user")

	doc := mustNode(t, graph, "entity:doc")
	if doc.Y <= user.Y {
		t.Fatalf("doc.Y = %f, want below user.Y = %f", doc.Y, user.Y)
	}
}

func TestBuildPreservesSourceOrderAndSharesTargets(t *testing.T) {
	graph, err := Build(Model{Entities: []Entity{{
		Name:        "resource",
		Permissions: []Rule{{Name: "first", Expression: "viewer | second"}, {Name: "second", Expression: "viewer"}},
		Relations:   []Rule{{Name: "viewer", Expression: "person | team#member"}, {Name: "second", Expression: "person"}},
	}}})
	if err != nil {
		t.Fatalf("Build() error = %v", err)
	}

	first := mustNode(t, graph, "permission:resource:first")

	second := mustNode(t, graph, "permission:resource:second")
	if first.Y >= second.Y {
		t.Fatalf("permission order = %v, %v; want source order", first.Y, second.Y)
	}

	if countNodes(graph, "target:resource:person") != 1 {
		t.Fatalf("person target was not shared")
	}

	if mustNode(t, graph, "entity:resource").X != XEntity || first.X != XPermission {
		t.Fatalf("semantic columns were not preserved")
	}
}

func countNodes(graph Graph, id string) int {
	count := 0

	for _, node := range graph.Nodes {
		if node.ID == id {
			count++
		}
	}

	return count
}

func assertNode(t *testing.T, graph Graph, id string, kind NodeKind, x float64) {
	t.Helper()

	node := mustNode(t, graph, id)
	if node.Kind != kind {
		t.Fatalf("node %q kind = %q, want %q", id, node.Kind, kind)
	}

	if node.X != x {
		t.Fatalf("node %q x = %f, want %f", id, node.X, x)
	}
}

func assertNodeMetadata(t *testing.T, graph Graph, id string, entity string, terminal bool) {
	t.Helper()

	node := mustNode(t, graph, id)
	if node.Entity != entity || node.Terminal != terminal {
		t.Fatalf("node %q metadata = (%q, %t), want (%q, %t)", id, node.Entity, node.Terminal, entity, terminal)
	}
}

func mustNode(t *testing.T, graph Graph, id string) Node {
	t.Helper()

	for _, node := range graph.Nodes {
		if node.ID == id {
			return node
		}
	}

	t.Fatalf("node %q not found", id)

	return Node{
		ID:       "",
		Kind:     "",
		Label:    "",
		Entity:   "",
		Terminal: false,
		X:        0,
		Y:        0,
		W:        0,
		H:        0,
	}
}

func assertEdge(t *testing.T, graph Graph, from string, to string, kind EdgeKind) {
	t.Helper()

	for _, edge := range graph.Edges {
		if edge.From == from && edge.To == to && edge.Kind == kind {
			if edge.Path == "" {
				t.Fatalf("edge %q -> %q path is empty", from, to)
			}

			return
		}
	}

	t.Fatalf("edge %q -> %q kind %q not found", from, to, kind)
}
