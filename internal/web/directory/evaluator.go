package directory

import (
	"context"
	"net/http"
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"github.com/aserto-dev/go-topaz-ui/internal/web/jsonview"
	"sort"

	evaluatorpages "github.com/aserto-dev/go-topaz-ui/internal/web/templates/pages/directory/evaluator"
)

const (
	directoryEvaluatorCheck       = "check"
	directoryEvaluatorObject      = "object"
	directoryEvaluatorObjects     = "objects"
	directoryEvaluatorRelations   = "relations"
	directoryEvaluatorFindObjects = "find_objects"
	directoryEvaluatorFindUsers   = "find_users"
)

type directoryEvaluatorSelection struct {
	Request     string
	ObjectType  string
	ObjectID    string
	SubjectType string
	SubjectID   string
	Relation    string
	Trace       bool
}

func emptyDirectoryEvaluatorView(r *http.Request) evaluatorpages.EvaluatorView {
	request := selectedDirectoryEvaluatorRequest(r.URL.Query().Get("request"))

	return evaluatorpages.EvaluatorView{
		Request:        request,
		RequestOptions: directoryEvaluatorRequestOptions(request),
		ObjectTypes:    nil,
		SubjectTypes:   nil,
		Objects:        nil,
		Subjects:       nil,
		RelationGroups: nil,
		ObjectType:     "",
		ObjectID:       "",
		SubjectType:    "",
		SubjectID:      "",
		Relation:       "",
		ShowObjectType: false,
		ShowObjectID:   false,
		ShowSubject:    false,
		ShowRelation:   false,
		Trace:          false,
		CanRun:         false,
		RequestJSON:    nil,
		ResultJSON:     nil,
		Error:          "",
	}
}

func (h Handler) newEvaluatorView(r *http.Request, manifest *domain.DirectoryManifest) (evaluatorpages.EvaluatorView, error) {
	query := r.URL.Query()
	request := selectedDirectoryEvaluatorRequest(query.Get("request"))
	manifestTypes := directoryManifestTypes(manifest)
	manifestTypeNames := sortedManifestTypeNames(manifestTypes)
	objectType := selectedEvaluatorType(query.Get("object_type"), query.Has("object_type"), manifestTypeNames, "doc")
	subjectType := selectedEvaluatorType(query.Get("subject_type"), query.Has("subject_type"), manifestTypeNames, "user")

	showObjectType, showObjectID, showSubject, showRelation := directoryEvaluatorVisibility(request)

	objects, subjects, err := h.fetchEvaluatorOptions(r.Context(), request, objectType, subjectType, showObjectID, showSubject)
	if err != nil {
		return evaluatorpages.EvaluatorView{}, err
	}

	objectID := selectedObjectID(query.Get("object_id"), objects)
	subjectID := selectedObjectID(query.Get("subject_id"), subjects)
	relationGroups := directoryEvaluatorRelationGroups(manifestTypes[objectType], query.Get("relation"))
	relation := selectedRelation(query.Get("relation"), relationGroups)
	relationGroups = directoryEvaluatorRelationGroups(manifestTypes[objectType], relation)

	selection := directoryEvaluatorSelection{
		Request:     request,
		ObjectType:  objectType,
		ObjectID:    objectID,
		SubjectType: subjectType,
		SubjectID:   subjectID,
		Relation:    relation,
		Trace:       query.Get("trace") == "1",
	}

	var result any

	runError := ""
	canRun := directoryEvaluatorCanRun(selection)
	hasSelection := query.Encode() != ""

	if query.Get("run") == "1" && canRun {
		result, err = h.runEvaluatorRequest(r.Context(), selection)
		if err != nil {
			runError = err.Error()
		}
	}

	var traceJSON []evaluatorpages.JSONLine

	if runError == "" && selection.Trace {
		if checkResult, ok := result.(*domain.DirectoryCheckResponse); ok && checkResult.Trace != nil {
			traceJSON = directoryEvaluatorJSON(true, *checkResult.Trace)
		}
	}

	return evaluatorpages.EvaluatorView{
		Request:        request,
		RequestOptions: directoryEvaluatorRequestOptions(request),
		ObjectTypes:    directoryEvaluatorTypeOptions(manifestTypes, objectType),
		SubjectTypes:   directoryEvaluatorTypeOptions(manifestTypes, subjectType),
		Objects:        directoryEvaluatorObjectOptions(objects, objectID),
		Subjects:       directoryEvaluatorObjectOptions(subjects, subjectID),
		RelationGroups: relationGroups,
		ObjectType:     objectType,
		ObjectID:       objectID,
		SubjectType:    subjectType,
		SubjectID:      subjectID,
		Relation:       relation,
		ShowObjectType: showObjectType,
		ShowObjectID:   showObjectID,
		ShowSubject:    showSubject,
		ShowRelation:   showRelation,
		Trace:          selection.Trace,
		CanRun:         canRun,
		RequestJSON:    directoryEvaluatorJSON(hasSelection, directoryEvaluatorPayload(selection)),
		ResultJSON:     directoryEvaluatorJSON(result != nil && runError == "", result),
		TraceJSON:      traceJSON,
		Error:          runError,
	}, nil
}

func (h Handler) fetchEvaluatorOptions(
	ctx context.Context,
	request string,
	objectType string,
	subjectType string,
	showObjectID bool,
	showSubject bool,
) (*domain.DirectoryObjectsResponse, *domain.DirectoryObjectsResponse, error) {
	var (
		objects  *domain.DirectoryObjectsResponse
		subjects *domain.DirectoryObjectsResponse
		err      error
	)

	if objectType != "" && (showObjectID || request == directoryEvaluatorObjects) {
		objects, err = h.reader.GetObjects(ctx, objectType, "")
		if err != nil {
			return nil, nil, err
		}
	}

	if subjectType != "" && showSubject {
		subjects, err = h.reader.GetObjects(ctx, subjectType, "")
		if err != nil {
			return nil, nil, err
		}
	}

	return objects, subjects, nil
}

func directoryEvaluatorJSON(show bool, value any) []evaluatorpages.JSONLine {
	if !show {
		return nil
	}

	return highlightJSON(jsonview.PrettyJSON(value))
}

func directoryEvaluatorVisibility(request string) (bool, bool, bool, bool) {
	showObjectID := request == directoryEvaluatorCheck ||
		request == directoryEvaluatorObject ||
		request == directoryEvaluatorRelations ||
		request == directoryEvaluatorFindUsers
	showSubject := request == directoryEvaluatorCheck || request == directoryEvaluatorFindObjects
	showRelation := request == directoryEvaluatorCheck || request == directoryEvaluatorFindObjects || request == directoryEvaluatorFindUsers

	return true, showObjectID, showSubject, showRelation
}

func (h Handler) runEvaluatorRequest(ctx context.Context, selection directoryEvaluatorSelection) (any, error) {
	var trace *bool
	if selection.Trace {
		trace = &selection.Trace
	}

	switch selection.Request {
	case directoryEvaluatorCheck:
		return h.reader.Check(ctx, domain.DirectoryCheckRequest{
			ObjectID:    selection.ObjectID,
			ObjectType:  selection.ObjectType,
			Relation:    selection.Relation,
			SubjectID:   selection.SubjectID,
			SubjectType: selection.SubjectType,
			Trace:       trace,
		})
	case directoryEvaluatorObject:
		return h.reader.GetObject(ctx, selection.ObjectType, selection.ObjectID)
	case directoryEvaluatorObjects:
		return h.reader.GetObjects(ctx, selection.ObjectType, "")
	case directoryEvaluatorRelations:
		return h.reader.GetRelationsForObject(ctx, selection.ObjectType, selection.ObjectID)
	case directoryEvaluatorFindObjects:
		return h.reader.GetGraph(ctx, selection.ObjectType, selection.Relation, selection.SubjectType, "", selection.SubjectID)
	case directoryEvaluatorFindUsers:
		return h.reader.GetGraph(ctx, selection.ObjectType, selection.Relation, selection.SubjectType, selection.ObjectID, "")
	default:
		return map[string]any{}, nil
	}
}

func directoryEvaluatorPayload(selection directoryEvaluatorSelection) map[string]any {
	payload := map[string]any{
		"request": selection.Request,
	}

	switch selection.Request {
	case directoryEvaluatorCheck:
		payload["object_type"] = selection.ObjectType
		payload["object_id"] = selection.ObjectID
		payload["relation"] = selection.Relation
		payload["subject_type"] = selection.SubjectType

		payload["subject_id"] = selection.SubjectID
		if selection.Trace {
			payload["trace"] = true
		}
	case directoryEvaluatorObject:
		payload["object_type"] = selection.ObjectType
		payload["object_id"] = selection.ObjectID
	case directoryEvaluatorObjects:
		payload["object_type"] = selection.ObjectType
	case directoryEvaluatorRelations:
		payload["object_type"] = selection.ObjectType
		payload["object_id"] = selection.ObjectID
	case directoryEvaluatorFindObjects:
		payload["object_type"] = selection.ObjectType
		payload["relation"] = selection.Relation
		payload["subject_type"] = selection.SubjectType
		payload["subject_id"] = selection.SubjectID
	case directoryEvaluatorFindUsers:
		payload["object_type"] = selection.ObjectType
		payload["object_id"] = selection.ObjectID
		payload["relation"] = selection.Relation
		payload["subject_type"] = selection.SubjectType
	}

	return payload
}

func directoryEvaluatorCanRun(selection directoryEvaluatorSelection) bool {
	switch selection.Request {
	case directoryEvaluatorCheck:
		return selection.ObjectType != "" &&
			selection.ObjectID != "" &&
			selection.SubjectType != "" &&
			selection.SubjectID != "" &&
			selection.Relation != ""
	case directoryEvaluatorObject, directoryEvaluatorRelations:
		return selection.ObjectType != "" && selection.ObjectID != ""
	case directoryEvaluatorObjects:
		return selection.ObjectType != ""
	case directoryEvaluatorFindObjects:
		return selection.ObjectType != "" &&
			selection.SubjectType != "" &&
			selection.SubjectID != "" &&
			selection.Relation != ""
	case directoryEvaluatorFindUsers:
		return selection.ObjectType != "" &&
			selection.ObjectID != "" &&
			selection.SubjectType != "" &&
			selection.Relation != ""
	default:
		return false
	}
}

func selectedDirectoryEvaluatorRequest(value string) string {
	switch value {
	case directoryEvaluatorObject, directoryEvaluatorObjects, directoryEvaluatorRelations, directoryEvaluatorFindObjects, directoryEvaluatorFindUsers:
		return value
	default:
		return directoryEvaluatorCheck
	}
}

func directoryEvaluatorRequestOptions(selected string) []evaluatorpages.Option {
	options := []evaluatorpages.Option{
		{Value: directoryEvaluatorCheck, Label: "Check", Selected: false},
		{Value: directoryEvaluatorObject, Label: "Object", Selected: false},
		{Value: directoryEvaluatorObjects, Label: "Objects", Selected: false},
		{Value: directoryEvaluatorRelations, Label: "Relations", Selected: false},
		{Value: directoryEvaluatorFindObjects, Label: "Find Objects", Selected: false},
		{Value: directoryEvaluatorFindUsers, Label: "Find Users", Selected: false},
	}

	markSelectedOptions(options, selected)

	return options
}

func selectedEvaluatorType(selected string, provided bool, values []string, fallback string) string {
	if provided {
		if selected == "" || containsString(values, selected) {
			return selected
		}

		return ""
	}

	if containsString(values, fallback) {
		return fallback
	}

	if len(values) > 0 {
		return values[0]
	}

	return ""
}

func directoryEvaluatorTypeOptions(types map[string]any, selected string) []evaluatorpages.Option {
	names := sortedManifestTypeNames(types)

	options := make([]evaluatorpages.Option, 0, len(names)+1)

	options = append(options, evaluatorpages.Option{Value: "", Label: "All", Selected: selected == ""})
	for _, name := range names {
		options = append(options, evaluatorpages.Option{
			Value:    name,
			Label:    name,
			Selected: false,
		})
	}

	markSelectedOptions(options, selected)

	return options
}

func directoryEvaluatorObjectOptions(response *domain.DirectoryObjectsResponse, selected string) []evaluatorpages.Option {
	objects := []domain.DirectoryObject(nil)
	if response != nil && response.Results != nil {
		objects = append(objects, *response.Results...)
	}

	sort.Slice(objects, func(i int, j int) bool {
		return objectOptionLabel(objects[i]) < objectOptionLabel(objects[j])
	})

	options := make([]evaluatorpages.Option, 0, len(objects)+1)

	options = append(options, evaluatorpages.Option{Value: "", Label: "All", Selected: selected == ""})
	for _, object := range objects {
		options = append(options, evaluatorpages.Option{
			Value:    object.ID,
			Label:    objectOptionLabel(object),
			Selected: false,
		})
	}

	markSelectedOptions(options, selected)

	return options
}

func selectedObjectID(selected string, response *domain.DirectoryObjectsResponse) string {
	if selected == "" || response == nil || response.Results == nil {
		return ""
	}

	for _, object := range *response.Results {
		if object.ID == selected {
			return selected
		}
	}

	return ""
}

func objectOptionLabel(object domain.DirectoryObject) string {
	if object.DisplayName != nil && *object.DisplayName != "" && *object.DisplayName != object.ID {
		return *object.DisplayName + " (" + object.ID + ")"
	}

	return object.ID
}

func directoryEvaluatorRelationGroups(typeNode any, selected string) []evaluatorpages.OptionGroup {
	node := stringMap(typeNode)
	if len(node) == 0 {
		return []evaluatorpages.OptionGroup{
			{Label: "Relations", Options: nil},
			{Label: "Permissions", Options: nil},
		}
	}

	return []evaluatorpages.OptionGroup{
		{Label: "Relations", Options: manifestNameOptions(node["relations"], selected)},
		{Label: "Permissions", Options: manifestNameOptions(node["permissions"], selected)},
	}
}

func manifestNameOptions(value any, selected string) []evaluatorpages.Option {
	items := stringMap(value)
	if len(items) == 0 {
		return nil
	}

	names := make([]string, 0, len(items))
	for name := range items {
		names = append(names, name)
	}

	sort.Strings(names)

	options := make([]evaluatorpages.Option, 0, len(names))
	for _, name := range names {
		options = append(options, evaluatorpages.Option{
			Value:    name,
			Label:    name,
			Selected: false,
		})
	}

	markSelectedOptions(options, selected)

	return options
}

func selectedRelation(selected string, groups []evaluatorpages.OptionGroup) string {
	for _, group := range groups {
		for _, option := range group.Options {
			if option.Value == selected {
				return selected
			}
		}
	}

	return ""
}

func markSelectedOptions(options []evaluatorpages.Option, selected string) {
	for i := range options {
		options[i].Selected = options[i].Value == selected
	}
}
