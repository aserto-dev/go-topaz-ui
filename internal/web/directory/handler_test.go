package directory_test

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"github.com/aserto-dev/go-topaz-ui/internal/web/directory"
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"strings"
	"testing"
)

type emptyDirectoryBackend struct{}

var errEmptyDirectoryBackend = errors.New("empty directory backend method not implemented")

func (emptyDirectoryBackend) GetManifest(context.Context) (*domain.DirectoryManifest, error) {
	return &domain.DirectoryManifest{}, nil
}

func (emptyDirectoryBackend) GetManifestDocument(context.Context) (*domain.DirectoryManifestResponse, error) {
	return nil, errEmptyDirectoryBackend
}

func (emptyDirectoryBackend) GetObjects(context.Context, string, string) (*domain.DirectoryObjectsResponse, error) {
	return nil, errEmptyDirectoryBackend
}

func (emptyDirectoryBackend) GetObject(context.Context, string, string) (*domain.DirectoryObject, error) {
	return nil, errEmptyDirectoryBackend
}

func (emptyDirectoryBackend) GetRelations(
	context.Context, string, string, string, string, string, string, string,
) (*domain.DirectoryRelationsResponse, error) {
	return &domain.DirectoryRelationsResponse{}, nil
}

func (emptyDirectoryBackend) Check(context.Context, domain.DirectoryCheckRequest) (*domain.DirectoryCheckResponse, error) {
	return nil, errEmptyDirectoryBackend
}

func (emptyDirectoryBackend) GetRelationsForObject(context.Context, string, string) (*domain.DirectoryObjectRelationsResponse, error) {
	return nil, errEmptyDirectoryBackend
}

func (emptyDirectoryBackend) GetGraph(context.Context, string, string, string, string, string) (*domain.DirectoryGraphResponse, error) {
	return nil, errEmptyDirectoryBackend
}

func TestRelationsHandlerUsesInjectedBackend(t *testing.T) {
	handler := directory.NewHandler(emptyDirectoryBackend{}, nil) /////

	request := httptest.NewRequestWithContext(context.Background(), http.MethodGet, "/ui/directory/relations", nil)
	recorder := httptest.NewRecorder()

	handler.Relations(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("Relations() status = %d, want %d", recorder.Code, http.StatusOK)
	}

	if !strings.Contains(recorder.Body.String(), "Object Type") {
		t.Fatalf("Relations() response does not contain the relations filter")
	}
}

type relationsTestReader struct{ emptyDirectoryBackend }

func (relationsTestReader) GetManifest(context.Context) (*domain.DirectoryManifest, error) {
	manifest := domain.DirectoryManifest{
		"types": domain.DirectoryManifest{
			"group": domain.DirectoryManifest{"relations": domain.DirectoryManifest{"member": "user"}},
			"user":  domain.DirectoryManifest{},
		},
	}

	return &manifest, nil
}

func TestRelationsPopulatesDependentDropdowns(t *testing.T) {
	handler := directory.NewHandler(relationsTestReader{}, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/relations?object_type=group&subject_type=user",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Relations(recorder, request)

	body := recorder.Body.String()
	for _, want := range []string{
		`<option value="group" selected>group</option>`,
		`<option value="user" selected>user</option>`,
		`<option value="member">member</option>`,
	} {
		if !strings.Contains(body, want) {
			t.Errorf("Relations() response does not contain %q", want)
		}
	}
}

type pagedRelationsTestReader struct {
	relationsTestReader

	pageToken string
}

func (r *pagedRelationsTestReader) GetRelations(
	_ context.Context,
	objectType, objectID, relation, subjectType, subjectID, subjectRelation, pageToken string,
) (*domain.DirectoryRelationsResponse, error) {
	r.pageToken = pageToken
	results := []domain.DirectoryRelation{{
		ObjectType:  objectType,
		ObjectID:    objectID,
		Relation:    relation,
		SubjectType: subjectType,
		SubjectID:   subjectID,
	}}

	response := &domain.DirectoryRelationsResponse{Results: &results}

	if pageToken == "" {
		pageCursor := "group:acmecorp|member|user:davidm@acmecorp.com"
		response.Page = &domain.DirectoryPagination{NextToken: &pageCursor}
	}

	return response, nil
}

func TestRelationsRendersInfiniteScrollTrigger(t *testing.T) {
	reader := &pagedRelationsTestReader{}
	handler := directory.NewHandler(reader, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/relations?object_type=group&object_id=acmecorp&relation=member&subject_type=user&subject_id=davidm%40acmecorp.com",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Relations(recorder, request)

	body := recorder.Body.String()
	for _, want := range []string{
		`class="paging-trigger"`,
		`hx-trigger="revealed"`,
		`hx-swap="outerHTML"`,
		`page_token=group%3Aacmecorp%7Cmember%7Cuser%3Adavidm%40acmecorp.com`,
	} {
		if !strings.Contains(body, want) {
			t.Errorf("Relations() response does not contain %q", want)
		}
	}

	if strings.Contains(body, "Next page token:") {
		t.Fatal("Relations() exposes the next page token instead of an infinite scroll trigger")
	}

	if strings.Contains(body, directory.DirectoryRelationsPath+"?"+directory.DirectoryRelationsPath) {
		t.Fatal("Relations() next page URL contains the relations path twice")
	}
}

func TestRelationsPagingPassesTokenAndReturnsRowsOnly(t *testing.T) {
	reader := &pagedRelationsTestReader{}
	handler := directory.NewHandler(reader, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/relations?object_type=group&object_id=acmecorp&relation=member"+
			"&subject_type=user&subject_id=davidm%40acmecorp.com&page_token=next-token",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Relations(recorder, request)

	if got, want := reader.pageToken, "next-token"; got != want {
		t.Fatalf("GetRelations() page token = %q, want %q", got, want)
	}

	body := recorder.Body.String()
	if !strings.Contains(body, "davidm@acmecorp.com") {
		t.Fatal("Relations() page response does not contain the relation row")
	}

	for _, unwanted := range []string{"<section", "<form", "<thead"} {
		if strings.Contains(body, unwanted) {
			t.Errorf("Relations() page response unexpectedly contains %q", unwanted)
		}
	}
}

type objectsTestReader struct{ emptyDirectoryBackend }

func (objectsTestReader) GetManifest(context.Context) (*domain.DirectoryManifest, error) {
	manifest := domain.DirectoryManifest{
		"types": domain.DirectoryManifest{
			"doc":  domain.DirectoryManifest{},
			"user": domain.DirectoryManifest{},
		},
	}

	return &manifest, nil
}

func (objectsTestReader) GetObject(_ context.Context, objectType, objectID string) (*domain.DirectoryObject, error) {
	return &domain.DirectoryObject{Type: objectType, ID: objectID}, nil
}

func (objectsTestReader) GetObjects(_ context.Context, objectType, _ string) (*domain.DirectoryObjectsResponse, error) {
	results := []domain.DirectoryObject{{Type: objectType, ID: "beth@example.com"}}

	return &domain.DirectoryObjectsResponse{Results: &results}, nil
}

func (objectsTestReader) GetRelationsForObject(context.Context, string, string) (*domain.DirectoryObjectRelationsResponse, error) {
	return &domain.DirectoryObjectRelationsResponse{}, nil
}

type pagedObjectsTestReader struct {
	objectsTestReader

	pageToken string
}

func (r *pagedObjectsTestReader) GetObjects(
	_ context.Context,
	objectType, pageToken string,
) (*domain.DirectoryObjectsResponse, error) {
	r.pageToken = pageToken
	results := []domain.DirectoryObject{{Type: objectType, ID: "beth@example.com"}}
	response := &domain.DirectoryObjectsResponse{Results: &results}

	if pageToken == "" {
		pageCursor := "user:beth@example.com"
		response.Page = &domain.DirectoryPagination{NextToken: &pageCursor}
	}

	return response, nil
}

func TestObjectsRendersInfiniteScrollTrigger(t *testing.T) {
	reader := &pagedObjectsTestReader{}
	handler := directory.NewHandler(reader, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/objects?object_type=user",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Objects(recorder, request)

	body := recorder.Body.String()
	for _, want := range []string{
		`class="paging-trigger"`,
		`hx-trigger="revealed"`,
		`hx-swap="outerHTML"`,
		`page_token=user%3Abeth%40example.com`,
	} {
		if !strings.Contains(body, want) {
			t.Errorf("Objects() response does not contain %q", want)
		}
	}
}

func TestObjectsPagingPassesTokenAndReturnsRowsOnly(t *testing.T) {
	reader := &pagedObjectsTestReader{}
	handler := directory.NewHandler(reader, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/objects?object_type=user&page_token=next-page",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Objects(recorder, request)

	if got, want := reader.pageToken, "next-page"; got != want {
		t.Fatalf("GetObjects() page token = %q, want %q", got, want)
	}

	body := recorder.Body.String()
	if !strings.Contains(body, "beth@example.com") {
		t.Fatal("Objects() page response does not contain the object row")
	}

	for _, unwanted := range []string{"<section", "<form", "<thead", "<aside"} {
		if strings.Contains(body, unwanted) {
			t.Errorf("Objects() page response unexpectedly contains %q", unwanted)
		}
	}
}

type objectsTestWriter struct {
	setObject bool
}

func (w *objectsTestWriter) DeleteManifest(context.Context) error { return nil }

func (w *objectsTestWriter) SetManifest(context.Context, string) error { return nil }

func (w *objectsTestWriter) SetObject(context.Context, string, string, string) error {
	w.setObject = true

	return nil
}

func (w *objectsTestWriter) DeleteObject(context.Context, string, string, bool) error { return nil }

func TestObjectsMutationPreservesPushURLAndPartialResponse(t *testing.T) {
	writer := &objectsTestWriter{}
	handler := directory.NewHandler(objectsTestReader{}, writer)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodPost,
		"/ui/directory/objects",
		strings.NewReader("object_type=user&object_id=beth%40example.com&display_name=Beth"),
	)
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	request.Header.Set("Hx-Request", "true")
	request.Header.Set("Hx-Target", "#content")

	recorder := httptest.NewRecorder()

	handler.Objects(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("Objects() status = %d, want %d", recorder.Code, http.StatusOK)
	}

	if !writer.setObject {
		t.Fatal("Objects() did not call SetObject")
	}

	if got, want := recorder.Header().Get("Hx-Push-Url"), "/ui/directory/objects?object_type=user&object_id=beth%40example.com"; got != want {
		t.Fatalf("Hx-Push-Url = %q, want %q", got, want)
	}

	if !strings.Contains(recorder.Body.String(), `hx-swap-oob="true"`) {
		t.Fatal("Objects() response did not include the out-of-band section action update")
	}
}

func TestObjectsFiltersBySubmittedObjectID(t *testing.T) {
	handler := directory.NewHandler(objectsTestReader{}, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/objects?object_type=user&object_id=beth%40example.com",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Objects(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("Objects() status = %d, want %d", recorder.Code, http.StatusOK)
	}

	body := recorder.Body.String()
	if !strings.Contains(body, `<option value="user" selected>user</option>`) {
		t.Fatal("Objects() response does not contain the selected object type")
	}

	if !strings.Contains(body, `name="object_id" value="beth@example.com"`) {
		t.Fatal("Objects() response does not preserve the submitted object ID filter")
	}
}

func TestEvaluatorUsesManifestTypeNamesAndLoadsDefaultTypeOptions(t *testing.T) {
	handler := directory.NewHandler(objectsTestReader{}, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/evaluator",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Evaluator(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("Evaluator() status = %d, want %d", recorder.Code, http.StatusOK)
	}

	body := recorder.Body.String()
	if !strings.Contains(body, `<option value="doc" selected>doc</option>`) {
		t.Fatal("Evaluator() response does not preserve and select the default object type")
	}

	if !strings.Contains(body, `<option value="user" selected>user</option>`) {
		t.Fatal("Evaluator() response does not preserve the manifest type name")
	}

	if !strings.Contains(body, `<option value="beth@example.com">beth@example.com</option>`) {
		t.Fatal("Evaluator() did not load objects for the default types")
	}
}

func TestEvaluatorDoesNotSelectDependentValues(t *testing.T) {
	handler := directory.NewHandler(objectsTestReader{}, nil)
	request := httptest.NewRequestWithContext(
		context.Background(),
		http.MethodGet,
		"/ui/directory/evaluator?object_type=user&subject_type=user",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.Evaluator(recorder, request)

	body := recorder.Body.String()
	if !strings.Contains(body, `<option value="beth@example.com">beth@example.com</option>`) {
		t.Fatal("Evaluator() response does not contain directory objects")
	}

	if strings.Contains(body, `<option value="beth@example.com" selected>`) {
		t.Fatal("Evaluator() selected a dependent object without user input")
	}
}
