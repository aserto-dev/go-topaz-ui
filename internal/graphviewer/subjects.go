package graphviewer

import "strings"

type relationKey struct {
	entity   string
	relation string
}

type subjectResolver struct {
	relations   map[relationKey]string
	resolved    map[relationKey][]string
	expressions expressionIndex
}

func newSubjectResolver(model Model, expressions expressionIndex) *subjectResolver {
	resolver := &subjectResolver{
		relations:   make(map[relationKey]string),
		resolved:    make(map[relationKey][]string),
		expressions: expressions,
	}

	for _, entity := range model.Entities {
		for _, relation := range entity.Relations {
			key := relationKey{entity: entity.Name, relation: relation.Name}
			resolver.relations[key] = relation.Expression
		}
	}

	return resolver
}

// relationSubjects returns the subjects for a given entity and relation, resolving them if necessary.
func (r *subjectResolver) relationSubjects(entity, relation string) []string {
	root := relationKey{entity: entity, relation: relation}
	if subjects, ok := r.resolved[root]; ok {
		return subjects
	}

	seenRelations := make(map[relationKey]struct{})
	seenSubjects := make(map[string]struct{})
	subjects := make([]string, 0)

	r.walk(root, seenRelations, func(subject string) {
		if _, exists := seenSubjects[subject]; exists {
			return
		}

		seenSubjects[subject] = struct{}{}
		subjects = append(subjects, subject)
	})

	r.resolved[root] = subjects

	return subjects
}

// walk recursively resolves the subjects for a given relation key, avoiding cycles and handling wildcards.
func (r *subjectResolver) walk(key relationKey, seen map[relationKey]struct{}, addSubject func(string)) {
	if _, exists := seen[key]; exists {
		return
	}

	expression, exists := r.relations[key]
	if !exists {
		return
	}

	seen[key] = struct{}{}

	for _, term := range r.expressions.leaves(expression) {
		if entity, relation, ok := strings.Cut(term, "#"); ok {
			r.walk(relationKey{entity: entity, relation: relation}, seen, addSubject)

			continue
		}

		if entity, wildcard := strings.CutSuffix(term, ":*"); wildcard {
			addSubject(entity)

			continue
		}

		addSubject(term)
	}
}
