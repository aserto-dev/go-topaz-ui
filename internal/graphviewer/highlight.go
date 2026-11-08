package graphviewer

import (
	"slices"
	"strings"
)

// These rules mirror topaz-console's manifestParser.ts and mapNodePath.ts
// at 10b513399796f68dd292fc85229d668d443c3a20. Selection is not graph reachability:
// arrow expansion depends on the selected kind and stops after one subject.
type consolePermission struct {
	key, operator string
	operands      []string
}

type consoleRelation struct {
	key      string
	subjects []string
	arrows   map[string][]string
}

type consoleEntity struct {
	permissions []consolePermission
	relations   []consoleRelation
}

func parseConsoleEntity(entity Entity) consoleEntity {
	var result consoleEntity

	for _, rule := range entity.Relations {
		relation := consoleRelation{key: rule.Name, arrows: map[string][]string{}}
		for subject := range strings.SplitSeq(rule.Expression, " | ") {
			if strings.TrimSpace(subject) != "" && !slices.Contains(relation.subjects, subject) {
				relation.subjects = append(relation.subjects, subject)
			}
		}

		result.relations = append(result.relations, relation)
	}

	for _, rule := range entity.Permissions {
		if rule.Expression == "" {
			continue
		}

		permission := consolePermission{key: rule.Name, operator: "="}
		blocks := []string{rule.Expression}
		arrows := false

		switch {
		case strings.Contains(rule.Expression, " | "):
			permission.operator, blocks, arrows = "|", strings.Split(rule.Expression, " | "), true
		case strings.Contains(rule.Expression, " & "):
			permission.operator, blocks = "&", strings.Split(rule.Expression, " & ")
		case strings.Contains(rule.Expression, " - "):
			permission.operator, blocks = "-", strings.Split(rule.Expression, " - ")
		case strings.Contains(rule.Expression, "->"):
			permission.operator, arrows = "|", true
		}

		for _, block := range blocks {
			operand := block
			if arrows && strings.Contains(block, "->") {
				parts := strings.Split(block, "->")

				operand = parts[0]
				for _, relation := range result.relations {
					if relation.key == operand {
						relation.arrows[rule.Name] = append(relation.arrows[rule.Name], parts[1])
					}
				}
			}

			if !slices.Contains(permission.operands, operand) {
				permission.operands = append(permission.operands, operand)
			}
		}

		result.permissions = append(result.permissions, permission)
	}

	return result
}

func consoleHighlights(model Model, nodes []Node, allocator idAllocator) map[string][]string {
	data := map[string]consoleEntity{}
	// Resolve the original console IDs literally. Do not normalize missing IDs:
	// mapNodePath deliberately produces IDs that may not exist in the graph.
	ids := map[string][]string{}
	operatorKeys := map[string]string{}

	for _, entity := range model.Entities {
		data[entity.Name] = parseConsoleEntity(entity)
		for _, rule := range entity.Permissions {
			operatorKeys[allocator.operator(entity.Name, rule.Name)] = rule.Name
		}
	}

	for _, node := range nodes {
		key := node.Entity + "-" + node.Label
		switch node.Kind {
		case NodeEntity:
			key = node.Entity + "-object"
		case NodeTarget:
			key += "-subject"
		case NodeOperator:
			key = node.Entity + "-" + operatorKeys[node.ID] + "-" + node.Label
		}

		ids[key] = append(ids[key], node.ID)
	}

	result := map[string][]string{}

	for _, node := range nodes {
		path := consoleNodePath(data, node, operatorKeys[node.ID])
		active := []string{node.ID}

		for _, key := range path {
			for _, id := range ids[key] {
				if !slices.Contains(active, id) {
					active = append(active, id)
				}
			}
		}

		result[node.ID] = active
	}

	return result
}

func consoleNodePath(data map[string]consoleEntity, node Node, operatorKey string) []string {
	switch node.Kind {
	case NodeEntity, NodeTarget, NodePermission:
		return consoleObjectPath(data, node)
	case NodeRelation:
		return consoleRelationPath(data[node.Entity], node)
	case NodeOperator:
		return consoleOperatorPath(data[node.Entity], node, operatorKey)
	}

	return nil
}

func consoleObjectPath(data map[string]consoleEntity, node Node) []string {
	object := node.Entity
	entry := data[object]
	relations := consoleNodeRelations(entry, node)
	path := consoleObjectRelationsPath(object, node, relations)

	for _, permission := range entry.permissions {
		if node.Kind == NodePermission && permission.key != node.Label {
			continue
		}

		path = append(path, object+"-"+permission.key, object+"-"+permission.key+"-"+permission.operator)
		path = append(path, consolePermissionOperands(data, object, relations, permission, node.Kind)...)
	}

	return path
}

func consoleNodeRelations(entry consoleEntity, node Node) []consoleRelation {
	if node.Kind != NodeTarget {
		return entry.relations
	}

	relations := make([]consoleRelation, 0)
	for _, relation := range entry.relations {
		if slices.Contains(relation.subjects, node.Label) {
			relations = append(relations, relation)
		}
	}

	return relations
}

func consoleObjectRelationsPath(object string, node Node, relations []consoleRelation) []string {
	if node.Kind == NodePermission {
		return nil
	}

	path := []string{object + "-object"}
	for _, relation := range relations {
		path = append(path, object+"-"+relation.key)
		if node.Kind == NodeTarget {
			path = append(path, object+"-"+node.Label+"-subject")

			continue
		}

		for _, subject := range relation.subjects {
			path = append(path, object+"-"+subject+"-subject")
		}
	}

	return path
}

func consolePermissionOperands(
	data map[string]consoleEntity,
	object string,
	relations []consoleRelation,
	permission consolePermission,
	nodeKind NodeKind,
) []string {
	path := []string{}

	for _, operand := range permission.operands {
		for _, relation := range relations {
			if relation.key != operand {
				continue
			}

			path = append(path, consoleRelationOperands(data, relation, permission, nodeKind, operand)...)
		}

		path = append(path, object+"-"+operand)
	}

	return path
}

func consoleRelationOperands(
	data map[string]consoleEntity,
	relation consoleRelation,
	permission consolePermission,
	nodeKind NodeKind,
	operand string,
) []string {
	path := []string{}

	for _, subject := range relation.subjects {
		destinations := relation.arrows[permission.key]
		if len(destinations) == 0 {
			path = append(path, subject+"-"+operand)

			continue
		}

		path = append(path, subject+"-"+permission.key, subject+"-"+permission.key+"-"+permission.operator)
		for _, other := range data[subject].permissions {
			if other.key != permission.key {
				continue
			}

			for _, term := range other.operands {
				path = append(path, subject+"-"+term)
			}
		}

		if nodeKind == NodePermission {
			for _, destination := range destinations {
				path = append(path, subject+"-"+destination)
			}
		}
	}

	return path
}

func consoleRelationPath(entry consoleEntity, node Node) []string {
	path := []string{}

	for _, permission := range entry.permissions {
		if slices.Contains(permission.operands, node.Label) {
			path = append(path, node.Entity+"-"+permission.key, node.Entity+"-"+permission.key+"-"+permission.operator)
		}
	}

	if len(path) > 0 {
		return path
	}

	for _, relation := range entry.relations {
		if relation.key != node.Label {
			continue
		}

		for _, subject := range relation.subjects {
			path = append(path, node.Entity+"-"+subject+"-subject")
		}
	}

	return append(path, node.Entity+"-"+node.Label, node.Entity+"-object")
}

func consoleOperatorPath(entry consoleEntity, node Node, operatorKey string) []string {
	path := []string{node.Entity + "-" + operatorKey + "-" + node.Label}
	for _, permission := range entry.permissions {
		if permission.key != operatorKey || permission.operator != node.Label {
			continue
		}

		path = append(path, node.Entity+"-"+permission.key)
		for _, operand := range permission.operands {
			path = append(path, node.Entity+"-"+operand)
		}
	}

	return path
}
