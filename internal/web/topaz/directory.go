package topaz

import (
	"context"
	"errors"
	"fmt"
	"io"
	"planbee/internal/web/domain"
	"time"

	"github.com/aserto-dev/go-aserto/ds/v3"
	common "github.com/aserto-dev/go-directory/aserto/directory/common/v3"
	model "github.com/aserto-dev/go-directory/aserto/directory/model/v3"
	reader "github.com/aserto-dev/go-directory/aserto/directory/reader/v3"
	writer "github.com/aserto-dev/go-directory/aserto/directory/writer/v3"
	"go.yaml.in/yaml/v3"
)

var errNoManifestDocument = errors.New("parse directory manifest yaml: no manifest document found")

type Directory struct {
	client *ds.Client
}

func NewDirectory(client *ds.Client) Directory {
	return Directory{client: client}
}

func (d Directory) DeleteManifest(ctx context.Context) error { return d.deleteManifest(ctx) }
func (d Directory) GetManifest(ctx context.Context) (*domain.DirectoryManifest, error) {
	document, err := d.getManifestDocument(ctx)
	if err != nil {
		return nil, err
	}

	return document.Manifest, nil
}

func (d Directory) GetManifestDocument(ctx context.Context) (*domain.DirectoryManifestResponse, error) {
	return d.getManifestDocument(ctx)
}

func (d Directory) SetManifest(ctx context.Context, rawYAML string) error {
	return d.setManifest(ctx, rawYAML)
}

func (d Directory) GetObjects(ctx context.Context, objectType, pageToken string) (*domain.DirectoryObjectsResponse, error) {
	return d.fetchDirectoryObjects(ctx, objectType, pageToken)
}

func (d Directory) SetObject(ctx context.Context, objectType, objectID, displayName string) error {
	return d.setDirectoryObject(ctx, objectType, objectID, displayName)
}

func (d Directory) DeleteObject(ctx context.Context, objectType, objectID string, withRelations bool) error {
	return d.deleteDirectoryObject(ctx, objectType, objectID, withRelations)
}

func (d Directory) GetObject(ctx context.Context, objectType, objectID string) (*domain.DirectoryObject, error) {
	return d.fetchDirectoryObject(ctx, objectType, objectID)
}

func (d Directory) GetRelations(ctx context.Context, objectType, objectID, relation, subjectType, subjectID,
	subjectRelation, pageToken string,
) (*domain.DirectoryRelationsResponse, error) {
	return d.fetchDirectoryRelations(ctx, objectType, objectID, relation, subjectType, subjectID, subjectRelation, pageToken)
}

func (d Directory) Check(ctx context.Context,
	payload domain.DirectoryCheckRequest,
) (*domain.DirectoryCheckResponse, error) {
	return d.check(ctx, payload)
}

func (d Directory) GetRelationsForObject(ctx context.Context,
	objectType, objectID string,
) (*domain.DirectoryObjectRelationsResponse, error) {
	return d.fetchRelationsForObject(ctx, objectType, objectID)
}

func (d Directory) GetGraph(ctx context.Context,
	objectType, relation, subjectType, objectID, subjectID string,
) (*domain.DirectoryGraphResponse, error) {
	return d.fetchGraph(ctx, objectType, relation, subjectType, objectID, subjectID)
}

var (
	_ domain.DirectoryReader = Directory{}
	_ domain.DirectoryWriter = Directory{}
)

func (d Directory) fetchDirectoryObjects(ctx context.Context, objectType, pageToken string) (*domain.DirectoryObjectsResponse, error) {
	response, err := d.client.Reader.GetObjects(ctx, &reader.GetObjectsRequest{
		ObjectType: objectType,
		Page:       &common.PaginationRequest{Size: 100, Token: pageToken},
	})
	if err != nil {
		return nil, fmt.Errorf("fetch directory objects over gRPC: %w", err)
	}

	return directoryObjectsResponse(response), nil
}

//nolint:staticcheck
func (d Directory) setDirectoryObject(ctx context.Context, objectType, objectID, displayName string) error {
	request := &writer.SetObjectRequest{
		Object: &common.Object{
			Id:          objectID,
			Type:        objectType,
			DisplayName: displayName,
		},
	}

	if _, err := d.client.Writer.SetObject(ctx, request); err != nil {
		return fmt.Errorf("set directory object over gRPC: %w", err)
	}

	return nil
}

func (d Directory) deleteDirectoryObject(ctx context.Context, objectType, objectID string, withRelations bool) error {
	if _, err := d.client.Writer.DeleteObject(ctx, newDeleteObjectRequest(objectType, objectID, withRelations)); err != nil {
		return fmt.Errorf("delete directory object over gRPC: %w", err)
	}

	return nil
}

func newDeleteObjectRequest(objectType, objectID string, withRelations bool) *writer.DeleteObjectRequest {
	return &writer.DeleteObjectRequest{
		ObjectType:    objectType,
		ObjectId:      objectID,
		WithRelations: withRelations,
	}
}

func (d Directory) fetchDirectoryObject(ctx context.Context, objectType, objectID string) (*domain.DirectoryObject, error) {
	response, err := d.client.Reader.GetObject(ctx, &reader.GetObjectRequest{
		ObjectType: objectType,
		ObjectId:   objectID,
	})
	if err != nil {
		return nil, fmt.Errorf("fetch directory object over gRPC: %w", err)
	}

	object := directoryObjectResponse(response)

	return object, nil
}

func (d Directory) fetchDirectoryRelations(ctx context.Context, objectType, objectID,
	relation, subjectType, subjectID, subjectRelation, pageToken string,
) (*domain.DirectoryRelationsResponse, error) {
	response, err := d.client.Reader.GetRelations(ctx, &reader.GetRelationsRequest{
		ObjectType:      objectType,
		ObjectId:        objectID,
		Relation:        relation,
		SubjectType:     subjectType,
		SubjectId:       subjectID,
		SubjectRelation: subjectRelation,
		Page:            &common.PaginationRequest{Size: 100, Token: pageToken},
	})
	if err != nil {
		return nil, fmt.Errorf("fetch directory relations over gRPC: %w", err)
	}

	return directoryRelationsResponse(response), nil
}

func (d Directory) fetchRelationsForObject(ctx context.Context, objectType, objectID string) (*domain.DirectoryObjectRelationsResponse, error) {
	outgoing, err := d.fetchRelationPages(ctx, &reader.GetRelationsRequest{
		ObjectType:  objectType,
		ObjectId:    objectID,
		WithObjects: true,
	})
	if err != nil {
		return nil, fmt.Errorf("fetch directory outgoing relations over gRPC: %w", err)
	}

	incoming, err := d.fetchRelationPages(ctx, &reader.GetRelationsRequest{
		SubjectType: objectType,
		SubjectId:   objectID,
		WithObjects: true,
	})
	if err != nil {
		return nil, fmt.Errorf("fetch directory incoming relations over gRPC: %w", err)
	}

	return &domain.DirectoryObjectRelationsResponse{IncomingRelations: incoming, OutgoingRelations: outgoing}, nil
}

func (d Directory) fetchRelationPages(ctx context.Context, request *reader.GetRelationsRequest) ([]domain.DirectoryRelation, error) {
	all := make([]domain.DirectoryRelation, 0)

	token := ""
	for {
		request.Page = &common.PaginationRequest{Size: 100, Token: token}

		response, err := d.client.Reader.GetRelations(ctx, request)
		if err != nil {
			return nil, fmt.Errorf("fetch directory relations page over gRPC: %w", err)
		}

		converted := directoryRelationsResponse(response)

		if converted.Results != nil {
			all = append(all, (*converted.Results)...)
		}

		if response.GetPage() == nil || response.GetPage().GetNextToken() == "" {
			return all, nil
		}

		token = response.GetPage().GetNextToken()
	}
}

func (d Directory) check(ctx context.Context, payload domain.DirectoryCheckRequest) (*domain.DirectoryCheckResponse, error) {
	request := &reader.CheckRequest{
		ObjectType:  payload.ObjectType,
		ObjectId:    payload.ObjectID,
		Relation:    payload.Relation,
		SubjectType: payload.SubjectType,
		SubjectId:   payload.SubjectID,
	}
	if payload.Trace != nil {
		request.Trace = *payload.Trace
	}

	response, err := d.client.Reader.Check(ctx, request)
	if err != nil {
		return nil, fmt.Errorf("check directory over gRPC: %w", err)
	}

	result := &domain.DirectoryCheckResponse{Check: new(response.GetCheck()), Trace: new(response.GetTrace())}
	if response.GetContext() != nil {
		contextValue := response.GetContext().AsMap()
		result.Context = &contextValue
	}

	return result, nil
}

func (d Directory) fetchGraph(ctx context.Context,
	objectType, relation, subjectType, objectID, subjectID string,
) (*domain.DirectoryGraphResponse, error) {
	response, err := d.client.Reader.GetGraph(ctx, &reader.GetGraphRequest{
		ObjectType:  objectType,
		Relation:    relation,
		SubjectType: subjectType,
		ObjectId:    objectID,
		SubjectId:   subjectID,
	})
	if err != nil {
		return nil, fmt.Errorf("fetch directory graph over gRPC: %w", err)
	}

	return directoryGraphResponse(response), nil
}

func directoryObjectsResponse(response *reader.GetObjectsResponse) *domain.DirectoryObjectsResponse {
	results := make([]domain.DirectoryObject, 0, len(response.GetResults()))
	for _, object := range response.GetResults() {
		if mapped := directoryObject(object); mapped != nil {
			results = append(results, *mapped)
		}
	}

	return &domain.DirectoryObjectsResponse{Results: &results, Page: directoryPage(response.GetPage())}
}

func directoryObjectResponse(response *reader.GetObjectResponse) *domain.DirectoryObject {
	if response.GetResult() == nil {
		return nil
	}

	return directoryObject(response.GetResult())
}

func directoryRelationsResponse(response *reader.GetRelationsResponse) *domain.DirectoryRelationsResponse {
	results := make([]domain.DirectoryRelation, 0, len(response.GetResults()))
	for _, relation := range response.GetResults() {
		results = append(results, directoryRelation(relation))
	}

	objects := make(map[string]domain.DirectoryObject, len(response.GetObjects()))
	for key, object := range response.GetObjects() {
		if mapped := directoryObject(object); mapped != nil {
			objects[key] = *mapped
		}
	}

	return &domain.DirectoryRelationsResponse{Results: &results, Objects: &objects, Page: directoryPage(response.GetPage())}
}

func directoryGraphResponse(response *reader.GetGraphResponse) *domain.DirectoryGraphResponse {
	results := make([]domain.DirectoryObjectIdentifier, 0, len(response.GetResults()))
	for _, object := range response.GetResults() {
		results = append(results, domain.DirectoryObjectIdentifier{ObjectID: object.GetObjectId(), ObjectType: object.GetObjectType()})
	}

	var explanation *map[string]any

	if response.GetExplanation() != nil {
		value := response.GetExplanation().AsMap()
		explanation = &value
	}

	trace := response.GetTrace()

	return &domain.DirectoryGraphResponse{
		Results:     &results,
		Explanation: explanation,
		Trace:       &trace,
	}
}

func directoryObject(object *common.Object) *domain.DirectoryObject {
	if object == nil {
		return nil
	}

	result := &domain.DirectoryObject{ID: object.GetId(), Type: object.GetType()}
	// DisplayName is deprecated upstream but remains the only display label in the released contract.
	// Keep using it until the upstream replacement is released.
	//nolint:staticcheck
	if object.GetDisplayName() != "" {
		value := object.GetDisplayName()
		result.DisplayName = &value
	}

	if object.GetEtag() != "" {
		value := object.GetEtag()
		result.ETag = &value
	}

	if object.GetProperties() != nil {
		value := object.GetProperties().AsMap()
		result.Properties = &value
	}

	if object.GetUpdatedAt() != nil {
		value := object.GetUpdatedAt().AsTime()
		result.UpdatedAt = &value
	}

	return result
}

func directoryRelation(relation *common.Relation) domain.DirectoryRelation {
	result := domain.DirectoryRelation{
		ObjectID:    relation.GetObjectId(),
		ObjectType:  relation.GetObjectType(),
		Relation:    relation.GetRelation(),
		SubjectID:   relation.GetSubjectId(),
		SubjectType: relation.GetSubjectType(),
	}
	if relation.GetSubjectRelation() != "" {
		value := relation.GetSubjectRelation()
		result.SubjectRelation = &value
	}

	if relation.GetEtag() != "" {
		value := relation.GetEtag()
		result.ETag = &value
	}

	if relation.GetUpdatedAt() != nil {
		value := relation.GetUpdatedAt().AsTime()
		result.UpdatedAt = &value
	}

	return result
}

func directoryPage(page *common.PaginationResponse) *domain.DirectoryPagination {
	if page == nil {
		return nil
	}

	token := page.GetNextToken()

	return &domain.DirectoryPagination{NextToken: &token}
}

func (d Directory) getManifestDocument(ctx context.Context) (*domain.DirectoryManifestResponse, error) {
	stream, err := d.client.Model.GetManifest(ctx, &model.GetManifestRequest{})
	if err != nil {
		return nil, fmt.Errorf("fetch directory manifest over gRPC: %w", err)
	}

	var (
		raw       []byte
		updatedAt string
	)

	for {
		response, recvErr := stream.Recv()
		if errors.Is(recvErr, io.EOF) {
			break
		}

		if recvErr != nil {
			return nil, fmt.Errorf("receive directory manifest over gRPC: %w", recvErr)
		}

		if response.GetBody() != nil {
			raw = append(raw, response.GetBody().GetData()...)
		}

		if response.GetMetadata() != nil {
			if response.GetMetadata().GetUpdatedAt() != nil {
				updatedAt = response.GetMetadata().GetUpdatedAt().AsTime().Format(time.RFC3339)
			}
		}
	}

	var manifest domain.DirectoryManifest
	if err := yaml.Unmarshal(raw, &manifest); err != nil {
		return nil, fmt.Errorf("parse directory manifest yaml: %w", err)
	}

	if len(manifest) == 0 {
		return nil, errNoManifestDocument
	}

	return &domain.DirectoryManifestResponse{RawYAML: string(raw), UpdatedAt: updatedAt, Manifest: &manifest}, nil
}

func (d Directory) setManifest(ctx context.Context, rawYAML string) error {
	stream, err := d.client.Model.SetManifest(ctx)
	if err != nil {
		return fmt.Errorf("set directory manifest over gRPC: %w", err)
	}

	if err := stream.Send(&model.SetManifestRequest{
		Msg: &model.SetManifestRequest_Body{Body: &model.Body{Data: []byte(rawYAML)}},
	}); err != nil {
		return fmt.Errorf("send directory manifest over gRPC: %w", err)
	}

	if _, err := stream.CloseAndRecv(); err != nil {
		return fmt.Errorf("complete directory manifest over gRPC: %w", err)
	}

	return nil
}

func (d Directory) deleteManifest(ctx context.Context) error {
	if _, err := d.client.Model.DeleteManifest(ctx, &model.DeleteManifestRequest{}); err != nil {
		return fmt.Errorf("delete directory manifest over gRPC: %w", err)
	}

	return nil
}
