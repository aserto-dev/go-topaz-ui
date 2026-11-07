package directory

import (
	"testing"

	"go.yaml.in/yaml/v3"
)

func TestOrderedDirectoryGraphModelPreservesManifestOrder(t *testing.T) {
	var document yaml.Node
	//nolint:lll // Allow long lines for YAML test data
	if err := yaml.Unmarshal([]byte("types:\n  zebra:\n    permissions:\n      first: viewer\n      second: first\n    relations:\n      viewer: person\n"), &document); err != nil {
		t.Fatal(err)
	}

	model, err := orderedDirectoryGraphModel(&document)
	if err != nil {
		t.Fatal(err)
	}

	if model.Entities[0].Name != "zebra" || model.Entities[0].Permissions[0].Name != "first" || model.Entities[0].Permissions[1].Name != "second" {
		t.Fatalf("manifest order was not preserved: %#v", model.Entities)
	}
}
