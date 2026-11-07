package domain

import (
	"context"
)

type Authorizer interface {
	Is(ctx context.Context, request AuthorizerIsRequest) (*AuthorizerIsResponse, error)
	DecisionTree(ctx context.Context, request AuthorizerDecisionTreeRequest) (*AuthorizerDecisionTreeResponse, error)
	Query(ctx context.Context, request AuthorizerQueryRequest) (*AuthorizerQueryResponse, error)
	ListPolicies(ctx context.Context) (*AuthorizerListPoliciesResponse, error)
}

type DirectoryReader interface {
	GetManifest(ctx context.Context) (*DirectoryManifest, error)
	GetManifestDocument(ctx context.Context) (*DirectoryManifestResponse, error)
	GetObjects(ctx context.Context, objectType, pageToken string) (*DirectoryObjectsResponse, error)
	GetObject(ctx context.Context, objectType, objectID string) (*DirectoryObject, error)
	GetRelations(ctx context.Context, objectType, objectID, relation, subjectType, subjectID,
		subjectRelation, pageToken string) (*DirectoryRelationsResponse, error)
	Check(ctx context.Context, payload DirectoryCheckRequest) (*DirectoryCheckResponse, error)
	GetRelationsForObject(ctx context.Context, objectType, objectID string) (*DirectoryObjectRelationsResponse, error)
	GetGraph(ctx context.Context, objectType, relation, subjectType, objectID, subjectID string) (*DirectoryGraphResponse, error)
}

type DirectoryWriter interface {
	DeleteManifest(ctx context.Context) error
	SetManifest(ctx context.Context, rawYAML string) error
	SetObject(ctx context.Context, objectType, objectID, displayName string) error
	DeleteObject(ctx context.Context, objectType, objectID string, withRelations bool) error
}
