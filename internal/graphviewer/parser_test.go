package graphviewer_test

import (
	"testing"

	. "github.com/aserto-dev/go-topaz-ui/internal/graphviewer"
)

func TestParseExpressionUnion(t *testing.T) {
	t.Parallel()

	expr, err := ParseExpression("viewer | viewer->identifier | group#member | user:*")
	if err != nil {
		t.Fatalf("ParseExpression() error = %v", err)
	}

	if expr.Kind != ExprUnion {
		t.Fatalf("ParseExpression().Kind = %q, want %q", expr.Kind, ExprUnion)
	}

	if len(expr.Children) != 4 {
		t.Fatalf("len(Expression.Children) = %d, want 4", len(expr.Children))
	}

	traversal := expr.Children[1]
	if traversal.Kind != ExprTraversal || traversal.Relation != "viewer" || traversal.Target != "identifier" {
		t.Fatalf("Expression.Children[1] = %#v, want viewer traversal", traversal)
	}
}

func TestParseExpressionRejectsEmptyTraversal(t *testing.T) {
	t.Parallel()

	_, err := ParseExpression("parent->")
	if err == nil {
		t.Fatal("ParseExpression() error = nil, want error")
	}
}
