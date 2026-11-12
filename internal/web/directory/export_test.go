package directory

import (
	graphmodel "github.com/aserto-dev/go-topaz-ui/internal/graphviewer"
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"

	"go.yaml.in/yaml/v3"
)

const DirectoryRelationsPath = directoryRelationsPath

func NewManifestHasObjectType(manifest *domain.DirectoryManifest, objectType string) bool {
	return manifestHasObjectType(manifest, objectType)
}

func NewDialogForMethod(method string) string {
	return dialogForMethod(method)
}

func NewObjectsPageURL(objectType, objectID string) string {
	return objectsPageURL(objectType, objectID)
}

func NewObjectsURL(objectType, objectID string) string {
	return objectsURL(objectType, objectID)
}

func OrderedDirectoryGraphModel(doc *yaml.Node) (graphmodel.Model, error) {
	return orderedDirectoryGraphModel(doc)
}
