package topaz

import (
	"planbee/internal/web/domain"

	authz "github.com/aserto-dev/go-authorizer/aserto/authorizer/v2"
	common "github.com/aserto-dev/go-directory/aserto/directory/common/v3"
	writer "github.com/aserto-dev/go-directory/aserto/directory/writer/v3"
)

func DirectoryRelationForTest(relation *common.Relation) domain.DirectoryRelation {
	return directoryRelation(relation)
}

func DirectoryObjectForTest(object *common.Object) *domain.DirectoryObject {
	return directoryObject(object)
}

func NewDeleteObjectRequestForTest(objectType, objectID string, withRelations bool) *writer.DeleteObjectRequest {
	return newDeleteObjectRequest(objectType, objectID, withRelations)
}

func NewAuthorizerIsRequest(request domain.AuthorizerIsRequest) (*authz.IsRequest, error) {
	return authorizerIsRequest(request)
}

func NewAuthorizerIsResponse(response *authz.IsResponse) *domain.AuthorizerIsResponse {
	return authorizerIsResponse(response)
}

func NewAuthorizerQueryOptions(options *domain.AuthorizerQueryOptions) (*authz.QueryOptions, error) {
	return authorizerQueryOptions(options)
}
