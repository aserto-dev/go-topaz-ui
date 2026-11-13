package graphviewer

import (
	"encoding/hex"
	"fmt"
	"strings"
)

type nodeKey struct {
	kind   NodeKind
	entity string
	name   string
}

type edgeKey struct {
	from string
	to   string
}

// idAllocator is responsible for generating and managing unique IDs for nodes in the graph.
type idAllocator struct {
	nodes map[nodeKey]string
}

// newIDAllocator creates a new idAllocator for the given model. It generates unique IDs for all nodes in the model, ensuring that any
// collisions are resolved using semantic keys.
// The old ID generation was lossy: it lowercased names and replaced characters such as # and : with -.
// Distinct valid nodes could therefore get the same ID—this change ensures that such collisions are resolved deterministically.
func newIDAllocator(model Model, expressions expressionIndex) idAllocator {
	candidates := make(map[nodeKey]string)

	for _, entity := range model.Entities {
		addIDCandidate(candidates, nodeKey{kind: NodeEntity, entity: entity.Name}, entityID(entity.Name))

		for _, rule := range entity.Permissions {
			addIDCandidate(
				candidates,
				nodeKey{kind: NodePermission, entity: entity.Name, name: rule.Name},
				permissionID(entity.Name, rule.Name),
			)
			addIDCandidate(
				candidates,
				nodeKey{kind: NodeOperator, entity: entity.Name, name: rule.Name},
				operatorID(entity.Name, rule.Name),
			)
		}

		for _, rule := range entity.Relations {
			addIDCandidate(
				candidates,
				nodeKey{kind: NodeRelation, entity: entity.Name, name: rule.Name},
				relationID(entity.Name, rule.Name),
			)

			for _, term := range expressions.leaves(rule.Expression) {
				addIDCandidate(
					candidates,
					nodeKey{kind: NodeTarget, entity: entity.Name, name: term},
					targetID(entity.Name, term),
				)
			}
		}
	}

	counts := make(map[string]int, len(candidates))
	for _, candidate := range candidates {
		counts[candidate]++
	}

	ids := make(map[nodeKey]string, len(candidates))
	for key, candidate := range candidates {
		if counts[candidate] == 1 {
			ids[key] = candidate

			continue
		}

		ids[key] = collisionID(candidate, semanticNodeKey(key))
	}

	return idAllocator{nodes: ids}
}

func addIDCandidate(candidates map[nodeKey]string, key nodeKey, candidate string) {
	if _, exists := candidates[key]; !exists {
		candidates[key] = candidate
	}
}

// entity generates the unique ID for the entity node corresponding to the given name.
func (a idAllocator) entity(name string) string {
	return a.nodes[nodeKey{kind: NodeEntity, entity: name}]
}

// permission generates the unique ID for the permission node corresponding to the given entity and name.
func (a idAllocator) permission(entity, name string) string {
	return a.nodes[nodeKey{kind: NodePermission, entity: entity, name: name}]
}

// operator generates the unique ID for the operator node corresponding to the given entity and name.
func (a idAllocator) operator(entity, name string) string {
	return a.nodes[nodeKey{kind: NodeOperator, entity: entity, name: name}]
}

// relation generates the unique ID for the relation node corresponding to the given entity and name.
func (a idAllocator) relation(entity, name string) string {
	return a.nodes[nodeKey{kind: NodeRelation, entity: entity, name: name}]
}

// target generates the unique ID for the target node corresponding to the given entity and name.
func (a idAllocator) target(entity, name string) string {
	return a.nodes[nodeKey{kind: NodeTarget, entity: entity, name: name}]
}

// semanticNodeKey generates a unique semantic key for the given nodeKey.
func semanticNodeKey(key nodeKey) string {
	return fmt.Sprintf("%s:%d:%s:%d:%s", key.kind, len(key.entity), key.entity, len(key.name), key.name)
}

// semanticEdgeKey generates a unique semantic key for the given edgeKey.
func semanticEdgeKey(key edgeKey) string {
	return fmt.Sprintf("%d:%s:%d:%s", len(key.from), key.from, len(key.to), key.to)
}

// collisionID generates a unique ID for a candidate in case of a collision, using the semantic key as a suffix.
func collisionID(candidate, semanticKey string) string {
	// Legacy IDs are always lowercase, so the uppercase marker creates a
	// namespace that cannot collide with an unsuffixed legacy ID.
	suffix := strings.ToUpper(hex.EncodeToString([]byte(semanticKey)))

	return candidate + "--X" + suffix
}
