package evaluator

type EvaluatorView struct {
	Request        string
	RequestOptions []Option
	ObjectTypes    []Option
	SubjectTypes   []Option
	Objects        []Option
	Subjects       []Option
	RelationGroups []OptionGroup
	ObjectType     string
	ObjectID       string
	SubjectType    string
	SubjectID      string
	Relation       string
	ShowObjectType bool
	ShowObjectID   bool
	ShowSubject    bool
	ShowRelation   bool
	Trace          bool
	CanRun         bool
	RequestJSON    []JSONLine
	ResultJSON     []JSONLine
	TraceJSON      []JSONLine
	Error          string
}

type Option struct {
	Value    string
	Label    string
	Selected bool
}

type OptionGroup struct {
	Label   string
	Options []Option
}

type JSONLine struct {
	Tokens []JSONToken
}

type JSONToken struct {
	Text  string
	Class string
}
