package graphviewer_test

import (
	"testing"

	. "planbee/internal/graphviewer"
)

func TestBuildMovesOnlyCollidingRelationRows(t *testing.T) {
	graph := mustBuildGraph(t, Model{Entities: []Entity{{
		Name: "resource",
		Relations: []Rule{
			{Name: "many", Expression: "a | b | c | d | e | f"},
			{Name: "next", Expression: "a"},
		},
	}}})

	assertGraphInvariants(t, graph)

	many := mustSemanticNode(t, graph, NodeRelation, "resource", "many")
	next := mustSemanticNode(t, graph, NodeRelation, "resource", "next")

	if many.Y != RowStep {
		t.Fatalf("many.Y = %f, want preferred row %f", many.Y, RowStep)
	}

	if next.Y != 2*RowStep {
		t.Fatalf("next.Y = %f, want nearest free row %f", next.Y, 2*RowStep)
	}
}

func TestBuildKeepsRelationRowsInsideSection(t *testing.T) {
	graph := mustBuildGraph(t, Model{Entities: []Entity{{
		Name: "resource",
		Relations: []Rule{
			{Name: "r0", Expression: "a"},
			{Name: "r1", Expression: "b"},
			{Name: "r2", Expression: "c"},
			{Name: "r3", Expression: "d"},
			{Name: "r4", Expression: "e"},
			{Name: "r5", Expression: "f"},
			{Name: "r6", Expression: "g"},
			{Name: "r7", Expression: "a | b | h"},
		},
	}}})

	assertGraphInvariants(t, graph)

	last := mustSemanticNode(t, graph, NodeRelation, "resource", "r7")
	if last.Y != 7*RowStep {
		t.Fatalf("r7.Y = %f, want bounded row %f", last.Y, 7*RowStep)
	}
}
