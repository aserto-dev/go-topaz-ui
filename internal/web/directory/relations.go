package directory

import (
	"net/http"
	"net/url"
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"github.com/aserto-dev/go-topaz-ui/internal/web/render"
	"github.com/aserto-dev/go-topaz-ui/internal/web/templates/base"
	directorypages "github.com/aserto-dev/go-topaz-ui/internal/web/templates/pages/directory"
)

func (h Handler) Relations(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	objectType := r.URL.Query().Get("object_type")
	objectID := r.URL.Query().Get("object_id")
	relation := r.URL.Query().Get("relation")
	subjectType := r.URL.Query().Get("subject_type")
	subjectID := r.URL.Query().Get("subject_id")
	subjectRelation := r.URL.Query().Get("subject_relation")
	pageToken := r.URL.Query().Get("page_token")
	isPagingRequest := pageToken != ""

	manifest, err := h.reader.GetManifest(ctx)
	if err != nil {
		h.renderRelationsLoadError(w, r, err.Error(), isPagingRequest)

		return
	}

	relationOptions := manifestRelationOptions(manifest, objectType, relation)
	subjectRelationOptions := manifestRelationOptions(manifest, subjectType, subjectRelation)
	objectTypeOptions := manifestTypeOptions(manifest, objectType)
	subjectTypeOptions := manifestTypeOptions(manifest, subjectType)

	if relation != "" && !containsTypeOption(relationOptions, relation) {
		relation = ""
		relationOptions = manifestRelationOptions(manifest, objectType, relation)
	}

	if subjectRelation != "" && !containsTypeOption(subjectRelationOptions, subjectRelation) {
		subjectRelation = ""
		subjectRelationOptions = manifestRelationOptions(manifest, subjectType, subjectRelation)
	}

	relations, err := h.reader.GetRelations(ctx, objectType, objectID, relation, subjectType, subjectID, subjectRelation, pageToken)
	if err != nil {
		h.renderRelationsLoadError(w, r, err.Error(), isPagingRequest)

		return
	}

	view := newRelationsView(relations, objectType, objectID, relation, subjectType, subjectID, subjectRelation,
		objectTypeOptions, subjectTypeOptions, relationOptions, subjectRelationOptions)
	if view.NextToken != "" {
		view.NextPageURL = nextRelationsPageURL(view, view.NextToken)
	}

	if isPagingRequest {
		render.Render(w, r, directorypages.RelationsRows(view))

		return
	}

	h.renderContent(w, r, "relations", directorypages.RelationsPage(view),
		base.SectionActions(r.URL.RequestURI(), "#content"))
}

func (h Handler) renderRelationsLoadError(w http.ResponseWriter, r *http.Request, message string, isPagingRequest bool) {
	if isPagingRequest {
		render.Render(w, r, directorypages.RelationsRowsError(message))

		return
	}

	h.renderContent(w, r, "relations", directorypages.RelationsError(message), base.SectionActions(r.URL.RequestURI(), "#content"))
}

func newRelationsView(response *domain.DirectoryRelationsResponse, objectType, objectID, relation, subjectType, subjectID, subjectRelation string,
	objectTypeOptions, subjectTypeOptions, relationOptions, subjectRelationOptions []directorypages.TypeOption,
) directorypages.RelationsView {
	if response == nil {
		return directorypages.RelationsView{
			Rows:                   nil,
			ObjectTypeOptions:      objectTypeOptions,
			RelationOptions:        relationOptions,
			SubjectTypeOptions:     subjectTypeOptions,
			SubjectRelationOptions: subjectRelationOptions,
			ObjectType:             objectType,
			ObjectID:               objectID,
			Relation:               relation,
			SubjectType:            subjectType,
			SubjectID:              subjectID,
			SubjectRelation:        subjectRelation,
			NextToken:              "",
			HasFilter:              objectType != "" || objectID != "" || relation != "" || subjectType != "" || subjectID != "" || subjectRelation != "",
		}
	}

	relations := []domain.DirectoryRelation(nil)
	if response.Results != nil {
		relations = *response.Results
	}

	view := directorypages.RelationsView{
		Rows:                   make([]directorypages.RelationRow, 0, len(relations)),
		ObjectTypeOptions:      objectTypeOptions,
		RelationOptions:        relationOptions,
		SubjectTypeOptions:     subjectTypeOptions,
		SubjectRelationOptions: subjectRelationOptions,
		ObjectType:             objectType,
		ObjectID:               objectID,
		Relation:               relation,
		SubjectType:            subjectType,
		SubjectID:              subjectID,
		SubjectRelation:        subjectRelation,
		NextToken:              "",
		HasFilter:              objectType != "" || objectID != "" || relation != "" || subjectType != "" || subjectID != "" || subjectRelation != "",
	}

	if response.Page != nil && response.Page.NextToken != nil {
		view.NextToken = *response.Page.NextToken
	}

	for _, relation := range relations {
		subjectRelation := ""
		if relation.SubjectRelation != nil {
			subjectRelation = *relation.SubjectRelation
		}

		view.Rows = append(view.Rows, directorypages.RelationRow{
			ObjectType:      relation.ObjectType,
			ObjectID:        relation.ObjectID,
			Relation:        relation.Relation,
			SubjectType:     relation.SubjectType,
			SubjectID:       relation.SubjectID,
			SubjectRelation: subjectRelation,
		})
	}

	return view
}

func nextRelationsPageURL(view directorypages.RelationsView, pageToken string) string {
	query := make(url.Values)
	query.Set("page_token", pageToken)

	for key, value := range map[string]string{
		"object_type":      view.ObjectType,
		"object_id":        view.ObjectID,
		"relation":         view.Relation,
		"subject_type":     view.SubjectType,
		"subject_id":       view.SubjectID,
		"subject_relation": view.SubjectRelation,
	} {
		if value != "" {
			query.Set(key, value)
		}
	}

	return directoryRelationsPath + "?" + query.Encode()
}
