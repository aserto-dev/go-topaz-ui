package domain

import "time"

type DirectoryManifest map[string]any

type DirectoryManifestResponse struct {
	RawYAML   string
	UpdatedAt string
	Manifest  *DirectoryManifest
}

type DirectoryObjectRelationsResponse struct {
	IncomingRelations []DirectoryRelation `json:"incoming_relations"`
	OutgoingRelations []DirectoryRelation `json:"outgoing_relations"`
}

type DirectoryCheckRequest struct {
	ObjectID    string
	ObjectType  string
	Relation    string
	SubjectID   string
	SubjectType string
	Trace       *bool
}

type DirectoryCheckResponse struct {
	Check   *bool
	Context *map[string]any
	Trace   *[]string
}

type DirectoryObjectsResponse struct {
	Page    *DirectoryPagination
	Results *[]DirectoryObject
}

type DirectoryRelationsResponse struct {
	Objects *map[string]DirectoryObject
	Page    *DirectoryPagination
	Results *[]DirectoryRelation
}

type DirectoryGraphResponse struct {
	Explanation *map[string]any
	Results     *[]DirectoryObjectIdentifier
	Trace       *[]string
}

type DirectoryObject struct {
	DisplayName *string
	ETag        *string
	ID          string
	Properties  *map[string]any
	Type        string
	UpdatedAt   *time.Time
}

type DirectoryObjectIdentifier struct {
	ObjectID   string
	ObjectType string
}

type DirectoryPagination struct{ NextToken *string }

type DirectoryRelation struct {
	ETag            *string
	ObjectID        string
	ObjectType      string
	Relation        string
	SubjectID       string
	SubjectRelation *string
	SubjectType     string
	UpdatedAt       *time.Time
}
