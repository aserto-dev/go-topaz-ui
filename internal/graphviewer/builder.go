package graphviewer

import (
	"errors"
	"fmt"
	"regexp"
	"strings"
)

var errNoFreeRelationRow = errors.New("no free row")

const (
	xEntity, xPermission, xOperator, xRelation, xTarget = 40.0, 340.0, 600.0, 820.0, 1120.0
	rowStep, canvasW                                    = 84.0, 1260.0
	entityW, ruleW, operatorW, nodeH                    = 120.0, 140.0, 40.0, 40.0
)

type sectionMetrics struct {
	height                                     float64
	permissions, operators, relations, targets map[string]Node
}

type graphBuilder struct {
	graph          Graph
	nodes          map[string]Node
	sections       map[string]sectionMetrics
	ids            idAllocator
	subjects       *subjectResolver
	expressions    expressionIndex
	edgeIndexes    map[edgeKey]int
	edgeCollisions map[string][]edgeKey
}

// Build constructs a graph representation from the given model.
func Build(model Model) (Graph, error) {
	expressions, err := parseModelExpressions(model)
	if err != nil {
		return Graph{}, err
	}

	b := &graphBuilder{
		graph: Graph{
			Nodes:   nil,
			Edges:   nil,
			Width:   canvasW,
			Height:  0,
			ViewBox: "",
		},
		nodes:          map[string]Node{},
		sections:       map[string]sectionMetrics{},
		ids:            newIDAllocator(model, expressions),
		subjects:       newSubjectResolver(model, expressions),
		expressions:    expressions,
		edgeIndexes:    map[edgeKey]int{},
		edgeCollisions: map[string][]edgeKey{},
	}

	baseY := 0.0
	for _, entity := range model.Entities {
		section, err := b.addEntity(entity, baseY)
		if err != nil {
			return Graph{}, err
		}

		b.sections[entity.Name] = section
		baseY += section.height
	}

	for _, entity := range model.Entities {
		b.addEdges(entity, b.sections[entity.Name])
	}

	b.graph.Height = maxFloat(baseY, rowStep)
	b.graph.ViewBox = fmt.Sprintf("0 0 %.1f %.1f", canvasW, b.graph.Height)
	b.graph.Highlights = consoleHighlights(model, b.graph.Nodes, b.ids)

	return b.graph, nil
}

func (b *graphBuilder) addEntity(entity Entity, baseY float64) (sectionMetrics, error) {
	section := newSectionMetrics()

	depth, unique := entityDepth(entity, b.expressions)

	section.height = float64(depth) * rowStep
	entityNode := newNode(b.ids.entity(entity.Name),
		NodeEntity,
		entity.Name,
		xEntity,
		baseY+(float64(jsRound(float64(depth)/2))-1)*rowStep, entityW)
	entityNode.Entity = entity.Name
	b.addNode(entityNode)

	for i, rule := range entity.Permissions {
		y := baseY + float64(i)*rowStep
		p := newNode(b.ids.permission(entity.Name, rule.Name), NodePermission, rule.Name, xPermission, y, ruleW)
		p.Entity = entity.Name
		op := newNode(b.ids.operator(entity.Name, rule.Name), NodeOperator, ruleOperator(rule), xOperator, y, operatorW)
		op.Entity = entity.Name
		section.permissions[rule.Name] = p
		section.operators[rule.Name] = op

		b.addNode(p)
		b.addNode(op)
	}

	occupiedRelationRows := make([]bool, depth)

	for i, rule := range entity.Relations {
		terms := b.expressions.leaves(rule.Expression)

		preferredRow := i
		if len(terms) > 2 {
			preferredRow = jsRound(float64(len(unique)/2)) - 2 + i
		}

		row, ok := claimNearestRow(occupiedRelationRows, preferredRow)
		if !ok {
			return section, fmt.Errorf("layout relations for entity %q: %w", entity.Name, errNoFreeRelationRow)
		}

		y := baseY + float64(row)*rowStep
		rel := newNode(b.ids.relation(entity.Name, rule.Name), NodeRelation, rule.Name, xRelation, y, ruleW)
		rel.Entity = entity.Name
		section.relations[rule.Name] = rel
		b.addNode(rel)

		for _, term := range terms {
			if _, ok := section.targets[term]; ok {
				continue
			}

			target := newNode(b.ids.target(entity.Name, term), NodeTarget, term, xTarget, baseY+float64(len(section.targets))*rowStep, entityW)
			target.Entity = entity.Name
			target.Terminal = true
			section.targets[term] = target
			b.addNode(target)
		}
	}

	return section, nil
}

func claimNearestRow(occupied []bool, preferred int) (int, bool) {
	preferred = min(max(preferred, 0), len(occupied)-1)

	for distance := range occupied {
		below := preferred + distance
		if below < len(occupied) && !occupied[below] {
			occupied[below] = true

			return below, true
		}

		above := preferred - distance
		if distance > 0 && above >= 0 && !occupied[above] {
			occupied[above] = true

			return above, true
		}
	}

	return 0, false
}

func newSectionMetrics() sectionMetrics {
	return sectionMetrics{
		permissions: map[string]Node{},
		operators:   map[string]Node{},
		relations:   map[string]Node{},
		targets:     map[string]Node{},
	}
}

func entityDepth(entity Entity, expressions expressionIndex) (int, []string) {
	depth := max(len(entity.Permissions), max(len(entity.Relations), 1))
	unique := []string{}
	seen := map[string]bool{}

	for _, rule := range entity.Relations {
		terms := expressions.leaves(rule.Expression)

		depth = max(depth, len(terms))
		for _, term := range terms {
			if seen[term] {
				continue
			}

			seen[term] = true
			unique = append(unique, term)
		}
	}

	return max(depth, len(unique)), unique
}

func (b *graphBuilder) addEdges(entity Entity, section sectionMetrics) {
	entityNode := b.nodes[b.ids.entity(entity.Name)]
	b.addPermissionEdges(entity, section, entityNode)
	b.addRelationEdges(entity, section, entityNode)
}

func (b *graphBuilder) addPermissionEdges(entity Entity, section sectionMetrics, entityNode Node) {
	for _, rule := range entity.Permissions {
		p, op := section.permissions[rule.Name], section.operators[rule.Name]
		b.addEdge(entityNode.ID, p.ID, EdgeNormal)
		b.addEdge(p.ID, op.ID, EdgeNormal)
		b.addPermissionOperandEdges(op, rule.Expression, section)
	}
}

func (b *graphBuilder) addPermissionOperandEdges(operator Node, expression string, section sectionMetrics) {
	for _, term := range b.expressions.leaves(expression) {
		if node, ok := section.relations[term]; ok {
			b.addEdge(operator.ID, node.ID, EdgeNormal)

			continue
		}

		if relation, _, ok := strings.Cut(term, "->"); ok {
			if node, exists := section.relations[relation]; exists {
				b.addEdge(operator.ID, node.ID, EdgeNormal)
			}

			continue
		}

		if node, ok := section.permissions[term]; ok {
			b.addEdge(operator.ID, node.ID, EdgeNormal)
		}
	}
}

func (b *graphBuilder) addRelationEdges(entity Entity, section sectionMetrics, entityNode Node) {
	for _, rule := range entity.Relations {
		relation := section.relations[rule.Name]
		if !relationUsedByPermissions(entity.Permissions, rule.Name, b.expressions) {
			b.addEdge(entityNode.ID, relation.ID, EdgeNormal)
		}

		b.addRelationTargetEdges(relation, rule.Expression, section)
		b.addRelationReferenceEdges(entity, rule, relation)
	}
}

func relationUsedByPermissions(permissions []Rule, relationName string, expressions expressionIndex) bool {
	for _, permission := range permissions {
		for _, term := range expressions.leaves(permission.Expression) {
			if term == relationName || strings.HasPrefix(term, relationName+"->") {
				return true
			}
		}
	}

	return false
}

func (b *graphBuilder) addRelationTargetEdges(relation Node, expression string, section sectionMetrics) {
	for _, term := range b.expressions.leaves(expression) {
		if target, ok := section.targets[term]; ok {
			b.addEdge(relation.ID, target.ID, EdgeNormal)
		}
	}
}

func (b *graphBuilder) addRelationReferenceEdges(entity Entity, rule Rule, relation Node) {
	subjects := b.subjects.relationSubjects(entity.Name, rule.Name)

	for _, permission := range entity.Permissions {
		for _, term := range b.expressions.leaves(permission.Expression) {
			rel, dest, ok := strings.Cut(term, "->")
			if !ok || rel != rule.Name {
				continue
			}

			for _, subject := range subjects {
				b.addReferenceEdge(relation, subject, dest)
			}
		}
	}
}

func (b *graphBuilder) addReferenceEdge(relation Node, subject, destination string) {
	if node, ok := b.nodes[b.ids.permission(subject, destination)]; ok {
		b.addEdge(relation.ID, node.ID, EdgeReference)
	}

	if node, ok := b.nodes[b.ids.relation(subject, destination)]; ok {
		b.addEdge(relation.ID, node.ID, EdgeReference)
	}
}

func (b *graphBuilder) addNode(n Node) {
	if _, ok := b.nodes[n.ID]; ok {
		return
	}

	b.nodes[n.ID] = n
	b.graph.Nodes = append(b.graph.Nodes, n)
}

func (b *graphBuilder) addEdge(from, to string, kind EdgeKind) {
	a, ok := b.nodes[from]
	if !ok {
		return
	}

	z, ok := b.nodes[to]
	if !ok {
		return
	}

	key := edgeKey{from: from, to: to}
	if _, exists := b.edgeIndexes[key]; exists {
		return
	}

	id := b.allocateEdgeID(key)
	b.edgeIndexes[key] = len(b.graph.Edges)
	b.graph.Edges = append(b.graph.Edges, Edge{ID: id, From: from, To: to, Kind: kind, Entity: a.Entity, Path: edgePath(a, z, kind)})
}

// allocateEdgeID generates a unique ID for an edge, handling collisions deterministically.
func (b *graphBuilder) allocateEdgeID(key edgeKey) string {
	candidate := edgeID(key.from, key.to)
	collisions := b.edgeCollisions[candidate]

	if len(collisions) == 0 {
		b.edgeCollisions[candidate] = []edgeKey{key}

		return candidate
	}

	if len(collisions) == 1 {
		first := collisions[0]
		b.graph.Edges[b.edgeIndexes[first]].ID = collisionID(candidate, semanticEdgeKey(first))
	}

	b.edgeCollisions[candidate] = append(collisions, key)

	return collisionID(candidate, semanticEdgeKey(key))
}

func newNode(id string, kind NodeKind, label string, x, y, w float64) Node {
	return Node{ID: id, Kind: kind, Label: label, Entity: "", Terminal: false, X: x, Y: y, W: w, H: nodeH}
}

// edgePath generates the SVG path for an edge between two nodes, handling reference and normal edges differently.
func edgePath(a, z Node, kind EdgeKind) string {
	if kind == EdgeReference {
		sx, sy := a.X+a.W/2, a.Y+a.H
		tx, ty := z.X+z.W/2, z.Y+z.H

		channel := sy + 20
		if ty > channel {
			channel = ty + 20
		}

		return fmt.Sprintf("M %.1f %.1f V %.1f H %.1f V %.1f", sx, sy, channel, tx, ty)
	}

	x1, y1 := a.X+a.W, a.Y+a.H/2
	x2, y2 := z.X, z.Y+z.H/2
	mid := x1 + (x2-x1)/2

	return fmt.Sprintf("M %.1f %.1f C %.1f %.1f %.1f %.1f %.1f %.1f", x1, y1, mid, y1, mid, y2, x2, y2)
}

func expressionLeaves(v string) ([]string, error) {
	e, err := ParseExpression(v)
	if err != nil {
		return nil, err
	}

	return exprLeaves(e), nil
}

func exprLeaves(e Expression) []string {
	if e.Kind == ExprUnion {
		r := make([]string, 0, len(e.Children))
		for _, c := range e.Children {
			r = append(r, exprLeaves(c)...)
		}

		return r
	}

	if e.Kind == ExprTraversal {
		return []string{e.Relation + "->" + e.Target}
	}

	if e.Kind == ExprReference {
		return []string{e.Name}
	}

	return nil
}

func ruleOperator(r Rule) string {
	if strings.Contains(r.Expression, "|") {
		return "|"
	}

	if strings.Contains(r.Expression, "&") {
		return "&"
	}

	if strings.Contains(r.Expression, " - ") {
		return "-"
	}

	if strings.Contains(r.Expression, "->") {
		return "|"
	}

	return "="
}

// jsRound rounds a float64 to the nearest integer, emulating JavaScript's Math.round behavior.
func jsRound(v float64) int {
	return int(v + 0.5)
}

func maxFloat(v ...float64) float64 {
	m := v[0]
	for _, n := range v[1:] {
		if n > m {
			m = n
		}
	}

	return m
}

func entityID(n string) string {
	return "entity:" + stablePart(n)
}

func permissionID(e, n string) string {
	return "permission:" + stablePart(e) + ":" + stablePart(n)
}

func operatorID(e, n string) string {
	return "operator:" + stablePart(e) + ":" + stablePart(n)
}

func relationID(e, n string) string {
	return "relation:" + stablePart(e) + ":" + stablePart(n)
}

func targetID(e, n string) string {
	return "target:" + stablePart(e) + ":" + stablePart(n)
}

func edgeID(a, z string) string {
	return "edge:" + stablePart(a) + ":" + stablePart(z)
}

// stablePart generates a normalized, stable string suitable for use in IDs.
func stablePart(v string) string {
	v = strings.ToLower(strings.TrimSpace(v))
	v = strings.ReplaceAll(v, "#", "-")
	v = strings.ReplaceAll(v, ":", "-")
	v = strings.ReplaceAll(v, "*", "-wildcard")
	v = strings.ReplaceAll(v, "->", "-")

	return strings.Trim(regexp.MustCompile(`[^a-z0-9_-]+`).ReplaceAllString(v, "-"), "-")
}
