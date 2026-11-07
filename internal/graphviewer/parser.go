package graphviewer

import (
	"errors"
	"fmt"
	"strings"
)

var (
	errEmptyGraphExpressionTerm = errors.New("parse graph expression: empty term")
	errIncompleteTraversal      = errors.New("incomplete traversal")
)

type expressionIndex map[string][]string

func parseModelExpressions(model Model) (expressionIndex, error) {
	expressions := make(expressionIndex)

	for _, entity := range model.Entities {
		if err := parseRuleExpressions(expressions, entity.Name, "permission", entity.Permissions); err != nil {
			return nil, err
		}

		if err := parseRuleExpressions(expressions, entity.Name, "relation", entity.Relations); err != nil {
			return nil, err
		}
	}

	return expressions, nil
}

func parseRuleExpressions(expressions expressionIndex, entityName, ruleKind string, rules []Rule) error {
	for _, rule := range rules {
		if _, parsed := expressions[rule.Expression]; parsed {
			continue
		}

		leaves, err := expressionLeaves(rule.Expression)
		if err != nil {
			return fmt.Errorf("parse %s %q on entity %q: %w", ruleKind, rule.Name, entityName, err)
		}

		expressions[rule.Expression] = leaves
	}

	return nil
}

func (i expressionIndex) leaves(expression string) []string {
	return i[expression]
}

func ParseExpression(value string) (Expression, error) {
	operator := "|"
	if strings.Contains(value, " & ") {
		operator = " & "
	} else if strings.Contains(value, " - ") {
		operator = " - "
	}

	parts := strings.Split(value, operator)
	children := make([]Expression, 0, len(parts))

	for _, part := range parts {
		expr, err := parseTerm(strings.TrimSpace(part))
		if err != nil {
			return Expression{Kind: "", Children: nil, Name: "", Relation: "", Target: ""}, err
		}

		children = append(children, expr)
	}

	if len(children) == 1 {
		return children[0], nil
	}

	return Expression{Kind: ExprUnion, Children: children, Name: "", Relation: "", Target: ""}, nil
}

// parseTerm parses a single term of the graph expression.
func parseTerm(value string) (Expression, error) {
	if value == "" {
		return Expression{Kind: "", Children: nil, Name: "", Relation: "", Target: ""}, errEmptyGraphExpressionTerm
	}

	if relation, target, ok := strings.Cut(value, "->"); ok {
		relation = strings.TrimSpace(relation)
		target = strings.TrimSpace(target)

		if relation == "" || target == "" {
			return Expression{Kind: "", Children: nil, Name: "", Relation: "", Target: ""}, fmt.Errorf(
				"parse graph expression %q: %w",
				value,
				errIncompleteTraversal,
			)
		}

		return Expression{Kind: ExprTraversal, Children: nil, Name: "", Relation: relation, Target: target}, nil
	}

	return Expression{Kind: ExprReference, Children: nil, Name: value, Relation: "", Target: ""}, nil
}
