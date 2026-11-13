package directory

import (
	"fmt"
	"net/url"

	"github.com/a-h/templ"
)

func graphURL(objectType, objectID string) templ.SafeURL {
	return templ.URL(fmt.Sprintf(
		"/ui/directory/objects?object_type=%s&object_id=%s",
		url.PathEscape(objectType),
		url.PathEscape(objectID),
	))
}
