package graphviewer

type Model struct {
	Entities []Entity `json:"entities"`
}

type Entity struct {
	Name        string `json:"name"`
	Permissions []Rule `json:"permissions"`
	Relations   []Rule `json:"relations"`
}

type Rule struct {
	Name        string   `json:"name"`
	Expression  string   `json:"expression"`
	TargetTypes []string `json:"target_types"`
}

type ExprKind string

const (
	ExprUnion     ExprKind = "union"
	ExprReference ExprKind = "reference"
	ExprTraversal ExprKind = "traversal"
)

type Expression struct {
	Kind     ExprKind
	Children []Expression
	Name     string
	Relation string
	Target   string
}

type NodeKind string

const (
	NodeEntity     NodeKind = "entity"
	NodePermission NodeKind = "permission"
	NodeOperator   NodeKind = "operator"
	NodeRelation   NodeKind = "relation"
	NodeTarget     NodeKind = "target"
)

type EdgeKind string

const (
	EdgeNormal    EdgeKind = "normal"
	EdgeReference EdgeKind = "reference"
)

type Graph struct {
	Highlights map[string][]string
	Nodes      []Node
	Edges      []Edge
	Width      float64
	Height     float64
	ViewBox    string
}

type Node struct {
	ID        string
	Kind      NodeKind
	Label     string
	TypeLabel string
	Entity    string
	Terminal  bool
	X         float64
	Y         float64
	W         float64
	H         float64
}

type Edge struct {
	ID     string
	From   string
	To     string
	Kind   EdgeKind
	Entity string
	Path   string
}

type Options struct {
	Variant string
	Key     string
}

const (
	VariantBox      = "box"
	VariantFullPage = "full-page"
)
