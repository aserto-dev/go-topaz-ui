package directory

import (
	"encoding/json"
	"net/http"
	"net/url"
	"planbee/internal/web/domain"
	"planbee/internal/web/render"
	"planbee/internal/web/templates/base"
	objectpages "planbee/internal/web/templates/pages/directory/objects"
	"strings"
)

func (h Handler) Objects(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		h.objectsMutation(w, r)

		return
	}

	h.renderObjectsPage(w, r, r.URL.Query().Get("object_type"), r.URL.Query().Get("object_id"), "", "")
}

func (h Handler) objectsMutation(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		h.renderObjectsPageWithForm(w, r,
			r.FormValue("object_type"),
			r.Method != http.MethodPost, "",
			dialogForMethod(r.Method),
			"Invalid form submission.",
			r.FormValue("object_id"),
			r.FormValue("display_name"))

		return
	}

	objectType := strings.TrimSpace(r.FormValue("object_type"))
	objectID := strings.TrimSpace(r.FormValue("object_id"))

	manifest, err := h.reader.GetManifest(r.Context())
	if err != nil {
		h.renderContent(w, r, "objects", objectpages.ObjectsError(err.Error()), base.SectionActions(r.URL.RequestURI(), "#content"))

		return
	}

	if objectType == "" || !manifestHasObjectType(manifest, objectType) {
		h.renderObjectsPageWithForm(w, r,
			objectType,
			r.Method != http.MethodPost, "",
			dialogForMethod(r.Method),
			"Choose a valid object type.", objectID,
			r.FormValue("display_name"))

		return
	}

	if objectID == "" {
		h.renderObjectsPageWithForm(w, r, objectType,
			r.Method != http.MethodPost,
			"",
			dialogForMethod(r.Method),
			"Object ID is required.",
			objectID, r.FormValue("display_name"))

		return
	}

	switch r.Method {
	case http.MethodPost, http.MethodPut:
		if err := h.writer.SetObject(r.Context(), objectType, objectID, strings.TrimSpace(r.FormValue("display_name"))); err != nil {
			h.renderObjectsPageWithForm(w, r,
				objectType,
				r.Method == http.MethodPut,
				objectID,
				dialogForMethod(r.Method),
				err.Error(),
				objectID,
				r.FormValue("display_name"))

			return
		}

		w.Header().Set("Hx-Push-Url", objectsURL(objectType, objectID))
		h.renderObjectsPageForURL(w, r, objectsURL(objectType, objectID), objectType, objectID, "", "")
	case http.MethodDelete:
		if err := h.writer.DeleteObject(r.Context(), objectType, objectID, true); err != nil {
			h.renderObjectsPage(w, r, objectType, objectID, "delete", err.Error())

			return
		}

		refreshURL := objectsPageURL(objectType, "")
		w.Header().Set("Hx-Push-Url", refreshURL)
		h.renderObjectsPageForURL(w, r, refreshURL, objectType, "", "", "")
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func dialogForMethod(method string) string {
	if method == http.MethodPut {
		return "edit"
	}

	if method == http.MethodDelete {
		return "delete"
	}

	return "create"
}

func manifestHasObjectType(manifest *domain.DirectoryManifest, objectType string) bool {
	if manifest == nil {
		return false
	}

	_, ok := directoryManifestTypes(manifest)[objectType]

	return ok
}

func objectsURL(objectType, objectID string) string {
	query := "?object_type=" + url.QueryEscape(objectType)
	if objectID != "" {
		query += "&object_id=" + url.QueryEscape(objectID)
	}

	return directoryObjectsPath + query
}

func objectsPageURL(objectType, objectID string) string {
	if objectType == "" && objectID == "" {
		return directoryObjectsPath
	}

	return objectsURL(objectType, objectID)
}

func nextObjectsPageURL(objectType, pageToken string) string {
	query := make(url.Values)
	query.Set("object_type", objectType)
	query.Set("page_token", pageToken)

	return directoryObjectsPath + "?" + query.Encode()
}

func (h Handler) renderObjectsPage(w http.ResponseWriter, r *http.Request, objectType, objectID, dialog, dialogError string) {
	h.renderObjectsPageWithForm(w, r, objectType, objectID != "", objectID, dialog, dialogError, objectID, "")
}

func (h Handler) renderObjectsPageForURL(w http.ResponseWriter, r *http.Request, pageURL string, objectType, objectID, dialog, dialogError string) {
	pageRequest := r.Clone(r.Context())

	parsedURL, err := url.Parse(pageURL)
	if err == nil {
		pageRequest.URL = parsedURL
	}

	h.renderObjectsPage(w, pageRequest, objectType, objectID, dialog, dialogError)
}

func (h Handler) renderObjectsPageWithForm(w http.ResponseWriter, r *http.Request, objectType string,
	selected bool, objectID, dialog, dialogError, formID, formName string,
) {
	ctx := r.Context()
	pageToken := r.URL.Query().Get("page_token")
	isPagingRequest := pageToken != ""

	manifest, err := h.reader.GetManifest(ctx)
	if err != nil {
		h.renderObjectsLoadError(w, r, err.Error(), isPagingRequest)

		return
	}

	objectTypeOptions := manifestTypeOptions(manifest, objectType)
	if objectType != "" && !containsTypeOption(objectTypeOptions, objectType) {
		objectType = ""
		objectID = ""
		objectTypeOptions = manifestTypeOptions(manifest, objectType)
	}

	if objectType == "" {
		objectID = ""
	}

	var objects *domain.DirectoryObjectsResponse

	if objectType != "" && objectID != "" && selected {
		var object *domain.DirectoryObject

		object, err = h.reader.GetObject(ctx, objectType, objectID)
		if object != nil {
			results := []domain.DirectoryObject{*object}
			objects = &domain.DirectoryObjectsResponse{Results: &results}
		}
	} else {
		objects, err = h.reader.GetObjects(ctx, objectType, pageToken)
	}

	if err != nil {
		h.renderObjectsLoadError(w, r, err.Error(), isPagingRequest)

		return
	}

	view := newObjectsView(objects, objectType, objectID)
	view.ObjectTypeOptions = objectTypeOptions
	view.ObjectsDialog = dialog
	view.ObjectsDialogError = dialogError

	view.ObjectsFormID = formID
	view.ObjectsFormName = formName

	if view.NextToken != "" {
		view.NextPageURL = nextObjectsPageURL(view.Type, view.NextToken)
	}

	if isPagingRequest {
		render.Render(w, r, objectpages.ObjectsRows(view))

		return
	}

	if objectType != "" && objectID != "" && objects != nil && objects.Results != nil && len(*objects.Results) > 0 {
		relations, relationsErr := h.reader.GetRelationsForObject(ctx, objectType, objectID)
		if relationsErr != nil {
			h.renderContent(w, r, "objects", objectpages.ObjectsError(relationsErr.Error()), base.SectionActions(r.URL.RequestURI(), "#content"))

			return
		}

		detail := newObjectsDetailView((*objects.Results)[0], relations)
		if dialog == "edit" {
			detail.DisplayName = formName
		}

		view.ObjectsDetail = &detail
	}

	h.renderContent(w, r, "objects", objectpages.ObjectsPage(view), base.SectionActions(r.URL.RequestURI(), "#content"))
}

func (h Handler) renderObjectsLoadError(w http.ResponseWriter, r *http.Request, message string, isPagingRequest bool) {
	if isPagingRequest {
		render.Render(w, r, objectpages.ObjectsRowsError(message))

		return
	}

	h.renderContent(w, r, "objects", objectpages.ObjectsError(message), base.SectionActions(r.URL.RequestURI(), "#content"))
}

func newObjectsView(response *domain.DirectoryObjectsResponse, objectType, objectID string) objectpages.ObjectsView {
	rows := []domain.DirectoryObject(nil)
	if response != nil && response.Results != nil {
		rows = *response.Results
	}

	view := objectpages.ObjectsView{
		Type:     objectType,
		ObjectID: objectID,
		Rows:     make([]objectpages.ObjectRow, 0, len(rows)),
	}

	if response != nil && response.Page != nil && response.Page.NextToken != nil {
		view.NextToken = *response.Page.NextToken
	}

	for _, object := range rows {
		displayName := object.ID
		if object.DisplayName != nil && *object.DisplayName != "" {
			displayName = *object.DisplayName
		}

		view.Rows = append(view.Rows, objectpages.ObjectRow{
			Type:        object.Type,
			ID:          object.ID,
			DisplayName: displayName,
		})
	}

	return view
}

func newObjectsDetailView(object domain.DirectoryObject, relations *domain.DirectoryObjectRelationsResponse) objectpages.ObjectsDetailView {
	properties := map[string]any(nil)
	if object.Properties != nil {
		properties = *object.Properties
	}

	propertiesJSON, err := json.MarshalIndent(properties, "", "  ")
	if err != nil {
		propertiesJSON = []byte("null")
	}

	view := objectpages.ObjectsDetailView{
		ObjectID:       object.ID,
		ObjectType:     object.Type,
		PropertiesCode: highlightJSON(string(propertiesJSON)),
	}
	if object.DisplayName != nil {
		view.DisplayName = *object.DisplayName
	}

	if relations != nil {
		view.Incoming = objectRelationRows(relations.IncomingRelations)
		view.Outgoing = objectRelationRows(relations.OutgoingRelations)
	}

	return view
}

func objectRelationRows(relations []domain.DirectoryRelation) []objectpages.ObjectRelation {
	rows := make([]objectpages.ObjectRelation, 0, len(relations))
	for _, relation := range relations {
		subjectRelation := ""
		if relation.SubjectRelation != nil {
			subjectRelation = *relation.SubjectRelation
		}

		rows = append(rows, objectpages.ObjectRelation{
			ObjectType:      relation.ObjectType,
			ObjectID:        relation.ObjectID,
			Relation:        relation.Relation,
			SubjectType:     relation.SubjectType,
			SubjectID:       relation.SubjectID,
			SubjectRelation: subjectRelation,
		})
	}

	return rows
}
