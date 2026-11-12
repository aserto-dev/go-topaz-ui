package directory

import (
	"context"
	"fmt"
	"sort"
	"strings"

	graphmodel "github.com/aserto-dev/go-topaz-ui/internal/graphviewer"

	"go.yaml.in/yaml/v3"
)

// fetchGraphModel fetches the directory manifest and constructs a graph model from it.
func (h Handler) fetchGraphModel(ctx context.Context) (graphmodel.Model, error) {
	document, err := h.reader.GetManifestDocument(ctx)
	if err != nil {
		return graphmodel.Model{}, err
	}

	var doc yaml.Node
	if err := yaml.Unmarshal([]byte(document.RawYAML), &doc); err != nil {
		return graphmodel.Model{}, fmt.Errorf("parse directory manifest yaml: %w", err)
	}

	return orderedDirectoryGraphModel(&doc)
}

// orderedDirectoryGraphModel constructs a graph model from the given YAML document, ensuring that the entities
// and their rules are ordered consistently.
func orderedDirectoryGraphModel(doc *yaml.Node) (graphmodel.Model, error) {
	root := doc
	if root.Kind == yaml.DocumentNode && len(root.Content) > 0 {
		root = root.Content[0]
	}

	types := mappingValue(root, "types")

	model := graphmodel.Model{Entities: make([]graphmodel.Entity, 0)}
	if types == nil {
		return model, nil
	}

	for i := 0; i+1 < len(types.Content); i += 2 {
		name, definition := types.Content[i].Value, types.Content[i+1]

		entity := graphmodel.Entity{Name: name, Permissions: nil, Relations: nil}
		entity.Permissions = append(entity.Permissions, orderedRulesNode(mappingValue(definition, "permissions"), false)...)

		entity.Relations = append(entity.Relations, orderedRulesNode(mappingValue(definition, "relations"), true)...)

		model.Entities = append(model.Entities, entity)
	}

	return model, nil
}

// orderedDirectoryGraphModel constructs a graph model from the given YAML document, ensuring that
// the entities and their rules are ordered consistently. mappingValue retrieves the value node associated
// with the given key in a YAML mapping node.
// Returns nil if the key is not found or the node is not a mapping node.
func mappingValue(node *yaml.Node, key string) *yaml.Node {
	if node == nil || node.Kind != yaml.MappingNode {
		return nil
	}

	for i := 0; i+1 < len(node.Content); i += 2 {
		if node.Content[i].Value == key {
			return node.Content[i+1]
		}
	}

	return nil
}

// orderedRulesNode constructs a list of graphmodel.Rule objects from the given YAML mapping node,
// preserving the order of the rules.
func orderedRulesNode(node *yaml.Node, relation bool) []graphmodel.Rule {
	if node == nil || node.Kind != yaml.MappingNode {
		return nil
	}

	rules := make([]graphmodel.Rule, 0, len(node.Content)/2)
	for i := 0; i+1 < len(node.Content); i += 2 {
		name, value := node.Content[i].Value, node.Content[i+1].Value

		rule := graphmodel.Rule{Name: name, Expression: value, TargetTypes: nil}
		if relation {
			rule.TargetTypes = directoryGraphTargetTypes(value)
		}

		rules = append(rules, rule)
	}

	return rules
}

// directoryGraphTargetTypes extracts the target types from a relation expression in the directory graph.
// The expression is expected to be in the format "relation -> targetType", and multiple expressions can be separated by "|".
// Returns a sorted list of unique target types.
func directoryGraphTargetTypes(expression string) []string {
	seen := make(map[string]struct{})

	for term := range strings.SplitSeq(expression, "|") {
		term = strings.TrimSpace(term)

		if relation, _, ok := strings.Cut(term, "->"); ok {
			term = strings.TrimSpace(relation)
		}

		if relation, _, ok := strings.Cut(term, "#"); ok {
			term = strings.TrimSpace(relation)
		}

		if relation, _, ok := strings.Cut(term, ":"); ok {
			term = strings.TrimSpace(relation)
		}

		if term != "" {
			seen[term] = struct{}{}
		}
	}

	types := make([]string, 0, len(seen))
	for name := range seen {
		types = append(types, name)
	}

	sort.Strings(types)

	return types
}
