package graphviewer

import (
	"strconv"
	"strings"
)

type View struct {
	Variant string
	Key     string
	Width   string
	Height  string
	ViewBox string
	Nodes   []ViewNode
	Edges   []ViewEdge
}

type ViewNode struct {
	Highlights string
	ID         string
	Kind       string
	Class      string
	Label      string
	Title      string
	TextLength string
	TypeLabel  string
	Entity     string
	Terminal   bool
	Transform  string
	Width      string
	Height     string
	TextX      string
	TextY      string
	TypeTextY  string
	RX         string
}

type ViewEdge struct {
	ID     string
	From   string
	To     string
	Kind   string
	Entity string
	Class  string
	Path   string
}

func NewView(graph Graph, options Options) View {
	variant := options.Variant
	if variant == "" {
		variant = VariantBox
	}

	view := View{
		Variant: variant,
		Key:     options.Key,
		Width:   formatNumber(graph.Width),
		Height:  formatNumber(graph.Height),
		ViewBox: graph.ViewBox,
		Nodes:   make([]ViewNode, 0, len(graph.Nodes)),
		Edges:   make([]ViewEdge, 0, len(graph.Edges)),
	}

	for _, edge := range graph.Edges {
		view.Edges = append(view.Edges, ViewEdge{
			ID:     edge.ID,
			From:   edge.From,
			To:     edge.To,
			Kind:   string(edge.Kind),
			Entity: edge.Entity,
			Class:  "graph-viewer-edge graph-viewer-edge-" + string(edge.Kind),
			Path:   edge.Path,
		})
	}

	for _, node := range graph.Nodes {
		label := truncateLabel(node.Label, node.W)

		title := ""
		if label != node.Label {
			title = node.Label
		}

		view.Nodes = append(view.Nodes, ViewNode{
			Highlights: strings.Join(graph.Highlights[node.ID], " "),
			ID:         node.ID,
			Kind:       string(node.Kind),
			Class:      "graph-viewer-node graph-viewer-node-" + string(node.Kind),
			Label:      label,
			Title:      title,
			TextLength: labelTextLength(node.Label, node.W),
			TypeLabel:  node.TypeLabel,
			Entity:     node.Entity,
			Terminal:   node.Terminal,
			Transform:  "translate(" + formatNumber(node.X) + " " + formatNumber(node.Y) + ")",
			Width:      formatNumber(node.W),
			Height:     formatNumber(node.H),
			TextX:      formatNumber(node.W / 2),
			TextY:      formatNumber(node.H / 2),
			TypeTextY:  formatNumber(node.H/2 + 14),
			RX:         nodeRadius(node.Kind),
		})
	}

	return view
}

const (
	labelHorizontalPadding = 16.0
	labelCharacterWidth    = 8.0
	labelEllipsis          = "…"
)

func truncateLabel(label string, width float64) string {
	maxCharacters := max(4, int((width-labelHorizontalPadding)/labelCharacterWidth))

	runes := []rune(label)
	if len(runes) <= maxCharacters {
		return label
	}

	return string(runes[:maxCharacters-1]) + labelEllipsis
}

func labelTextLength(label string, width float64) string {
	if truncateLabel(label, width) == label {
		return ""
	}

	return formatNumber(maxFloat(width-labelHorizontalPadding, 1))
}

func nodeRadius(kind NodeKind) string {
	switch kind {
	case NodeEntity:
		return "18"
	case NodeOperator:
		return "8"
	case NodePermission, NodeRelation, NodeTarget:
		return "10"
	default:
		return "10"
	}
}

func formatNumber(value float64) string {
	return strconv.FormatFloat(value, 'f', 1, 64)
}
