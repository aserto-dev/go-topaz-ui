package authorizer

type EvaluatorView struct {
	Operation        string
	OperationOptions []Option
	IdentityTypes    []Option
	PathSeparators   []Option
	PolicyPaths      []Option
	Identity         string
	IdentityType     string
	IdentityLabel    string
	IdentityHint     string
	PolicyPath       string
	Decisions        string
	ResourceContext  string
	Query            string
	Input            string
	PathSeparator    string
	Trace            bool
	TraceSummary     bool
	Metrics          bool
	CanRun           bool
	RequestJSON      []JSONLine
	ResultJSON       []JSONLine
	TraceJSON        []JSONLine
	TraceSummaryJSON []JSONLine
	Error            string
}

type Option struct {
	Value    string
	Label    string
	Selected bool
}

type JSONLine struct {
	Tokens []JSONToken
}

type JSONToken struct {
	Text  string
	Class string
}

type ModulesView struct {
	Modules    []ModuleItem
	Definition []CodeLine
}

type ModuleItem struct {
	ID          string
	PackagePath string
	Class       string
	URL         string
}

type CodeLine struct {
	Tokens []CodeToken
}

type CodeToken struct {
	Text  string
	Class string
}
