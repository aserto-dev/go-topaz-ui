package directory

import (
	"net/http"
	"planbee/internal/web/domain"
	"testing"
)

func TestObjectsURL(t *testing.T) {
	if got, want := objectsURL("user", "beth@example.com"), "/ui/directory/objects?object_type=user&object_id=beth%40example.com"; got != want {
		t.Fatalf("objectsURL() = %q, want %q", got, want)
	}

	if got, want := objectsURL("user", ""), "/ui/directory/objects?object_type=user"; got != want {
		t.Fatalf("objectsURL() without ID = %q, want %q", got, want)
	}
}

func TestObjectsPageURL(t *testing.T) {
	if got, want := objectsPageURL("", ""), "/ui/directory/objects"; got != want {
		t.Fatalf("objectsPageURL() = %q, want %q", got, want)
	}

	if got, want := objectsPageURL("user", ""), "/ui/directory/objects?object_type=user"; got != want {
		t.Fatalf("objectsPageURL() without ID = %q, want %q", got, want)
	}
}

func TestObjectsMutationDialog(t *testing.T) {
	tests := []struct {
		method string
		want   string
	}{
		{method: http.MethodPost, want: "create"},
		{method: http.MethodPut, want: "edit"},
		{method: http.MethodDelete, want: "delete"},
	}

	for _, test := range tests {
		if got := dialogForMethod(test.method); got != test.want {
			t.Errorf("dialogForMethod(%q) = %q, want %q", test.method, got, test.want)
		}
	}
}

func TestManifestHasObjectTypeUsesManifestKey(t *testing.T) {
	manifest := domain.DirectoryManifest{
		"types": domain.DirectoryManifest{
			"user": domain.DirectoryManifest{},
		},
	}

	if !manifestHasObjectType(&manifest, "user") {
		t.Fatal("manifestHasObjectType() did not find manifest type")
	}

	if manifestHasObjectType(&manifest, "User") {
		t.Fatal("manifestHasObjectType() accepted a differently-cased type")
	}
}
