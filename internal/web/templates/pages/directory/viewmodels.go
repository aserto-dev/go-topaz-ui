package directory

func ModelLayoutClass(editing bool) string {
	if editing {
		return "model-detail-layout model-editing"
	}

	return "model-detail-layout"
}

type RelationsView struct {
	Rows                   []RelationRow
	ObjectTypeOptions      []TypeOption
	RelationOptions        []TypeOption
	SubjectTypeOptions     []TypeOption
	SubjectRelationOptions []TypeOption
	ObjectType             string
	ObjectID               string
	Relation               string
	SubjectType            string
	SubjectID              string
	SubjectRelation        string
	NextToken              string
	NextPageURL            string
	HasFilter              bool
}

type RelationRow struct {
	ObjectType      string
	ObjectID        string
	Relation        string
	SubjectType     string
	SubjectID       string
	SubjectRelation string
}

type TypeOption struct {
	Value    string
	Label    string
	Selected bool
}
