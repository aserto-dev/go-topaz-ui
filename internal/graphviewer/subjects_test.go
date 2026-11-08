package graphviewer_test

import (
	"slices"
	"testing"

	. "planbee/internal/graphviewer"
)

func TestBuildResolvesSubjectSetReferenceEdges(t *testing.T) {
	graph := mustBuildGraph(t, Model{Entities: []Entity{
		{Name: "identity"},
		{
			Name:      "user",
			Relations: []Rule{{Name: "identifier", Expression: "identity"}},
		},
		{
			Name:      "group",
			Relations: []Rule{{Name: "member", Expression: "user"}},
		},
		{
			Name:        "document",
			Permissions: []Rule{{Name: "can_read", Expression: "viewer->identifier"}},
			Relations:   []Rule{{Name: "viewer", Expression: "group#member"}},
		},
	}})

	assertGraphInvariants(t, graph)

	viewer := mustSemanticNode(t, graph, NodeRelation, "document", "viewer")
	identifier := mustSemanticNode(t, graph, NodeRelation, "user", "identifier")
	edge := mustGraphEdge(t, graph, viewer.ID, identifier.ID)

	if edge.Kind != EdgeReference {
		t.Fatalf("subject-set edge kind = %q, want %q", edge.Kind, EdgeReference)
	}
}

func TestSubjectResolverHandlesMutuallyRecursiveRelations(t *testing.T) {
	model := Model{Entities: []Entity{
		{
			Name:      "alpha",
			Relations: []Rule{{Name: "member", Expression: "user | beta#member"}},
		},
		{
			Name:      "beta",
			Relations: []Rule{{Name: "member", Expression: "team | alpha#member"}},
		},
	}}

	expressions, err := ParseModelExpressions(model)
	if err != nil {
		t.Fatalf("parse model expressions: %v", err)
	}

	resolver := NewSubjectResolver(model, expressions)

	if got, want := resolver.RelationSubjects("alpha", "member"), []string{"user", "team"}; !slices.Equal(got, want) {
		t.Fatalf("alpha subjects = %v, want %v", got, want)
	}

	if got, want := resolver.RelationSubjects("beta", "member"), []string{"team", "user"}; !slices.Equal(got, want) {
		t.Fatalf("beta subjects = %v, want %v", got, want)
	}
}
