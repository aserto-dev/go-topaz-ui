package graphviewer

import "testing"

func TestTruncateLabel(t *testing.T) {
	tests := []struct {
		name  string
		label string
		width float64
		want  string
	}{
		{name: "short label", label: "user", width: entityW, want: "user"},
		{name: "long label", label: "in_management_chain", width: entityW, want: "in_managemen…"},
		{name: "unicode label", label: "éééééééééééééééééé", width: entityW, want: "éééééééééééé…"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := truncateLabel(test.label, test.width); got != test.want {
				t.Fatalf("truncateLabel(%q, %v) = %q, want %q", test.label, test.width, got, test.want)
			}
		})
	}
}

func TestNewViewPreservesFullLabelForTooltip(t *testing.T) {
	const label = "in_management_chain"

	view := NewView(Graph{Nodes: []Node{{
		ID:    "entity:example",
		Kind:  NodeEntity,
		Label: label,
		W:     entityW,
	}}}, Options{})

	if got := view.Nodes[0].Label; got == label {
		t.Fatalf("visible label = %q, want truncated label", got)
	}

	if got := view.Nodes[0].Title; got != label {
		t.Fatalf("tooltip label = %q, want %q", got, label)
	}

	shortView := NewView(Graph{Nodes: []Node{{
		ID:    "entity:user",
		Kind:  NodeEntity,
		Label: "user",
		W:     entityW,
	}}}, Options{})
	if got := shortView.Nodes[0].Title; got != "" {
		t.Fatalf("short label tooltip = %q, want empty", got)
	}
}
