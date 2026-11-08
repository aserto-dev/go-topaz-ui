package graphviewer

const (
	XEntity     = xEntity
	XPermission = xPermission
	XOperator   = xOperator
	XRelation   = xRelation
	XTarget     = xTarget
	RowStep     = rowStep
	CanvasW     = canvasW
	EntityW     = entityW
	RuleW       = ruleW
	OperatorW   = operatorW
	NodeH       = nodeH
)

func EntityID(n string) string {
	return entityID(n)
}

func PermissionID(e, n string) string {
	return permissionID(e, n)
}

func OperatorID(e, n string) string {
	return operatorID(e, n)
}

func RelationID(e, n string) string {
	return relationID(e, n)
}

func TargetID(e, n string) string {
	return targetID(e, n)
}

func EdgeID(a, z string) string {
	return edgeID(a, z)
}

func ParseModelExpressions(model Model) (expressionIndex, error) {
	return parseModelExpressions(model)
}

func NewSubjectResolver(model Model, expressions expressionIndex) *subjectResolver {
	return newSubjectResolver(model, expressions)
}

func (r *subjectResolver) RelationSubjects(entity, relation string) []string {
	return r.relationSubjects(entity, relation)
}

func TruncateLabel(label string, width float64) string {
	return truncateLabel(label, width)
}
