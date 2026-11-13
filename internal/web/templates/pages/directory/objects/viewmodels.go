package objects

import (
	"net/url"

	"github.com/a-h/templ"

	directorypages "github.com/aserto-dev/go-topaz-ui/internal/web/templates/pages/directory"
	evaluatorpages "github.com/aserto-dev/go-topaz-ui/internal/web/templates/pages/directory/evaluator"
)

type ObjectsView struct {
	Type               string
	ObjectID           string
	Rows               []ObjectRow
	NextToken          string
	NextPageURL        string
	ObjectTypeOptions  []directorypages.TypeOption
	ObjectsDetail      *ObjectsDetailView
	ObjectsDialog      string
	ObjectsDialogError string
	ObjectsFormID      string
	ObjectsFormName    string
}

type ObjectRow struct {
	Type        string
	ID          string
	DisplayName string
}

type ObjectRelation struct {
	ObjectType, ObjectID, Relation, SubjectType, SubjectID, SubjectRelation string
}

type ObjectsDetailView struct {
	ObjectID       string
	ObjectType     string
	DisplayName    string
	PropertiesCode []evaluatorpages.JSONLine
	Incoming       []ObjectRelation
	Outgoing       []ObjectRelation
}

func objectsURL(objectType, objectID string) templ.SafeURL {
	query := "?object_type=" + url.QueryEscape(objectType)
	if objectID != "" {
		query += "&object_id=" + url.QueryEscape(objectID)
	}

	return templ.URL("/ui/directory/objects" + query)
}
