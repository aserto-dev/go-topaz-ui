package topaz_test

import (
	"planbee/internal/web/topaz"
	"testing"

	common "github.com/aserto-dev/go-directory/aserto/directory/common/v3"
)

func TestDirectoryRelationMappingPreservesFields(t *testing.T) {
	subjectRelation := "member"

	message := &common.Relation{
		ObjectType:      "group",
		ObjectId:        "admins",
		Relation:        "member",
		SubjectType:     "user",
		SubjectId:       "alice",
		SubjectRelation: subjectRelation,
	}

	result := topaz.DirectoryRelationForTest(message)

	if result.ObjectType != message.GetObjectType() {
		t.Errorf("ObjectType = %q, want %q", result.ObjectType, message.GetObjectType())
	}

	if result.ObjectID != message.GetObjectId() {
		t.Errorf("ObjectID = %q, want %q", result.ObjectID, message.GetObjectId())
	}

	if result.Relation != message.GetRelation() {
		t.Errorf("Relation = %q, want %q", result.Relation, message.GetRelation())
	}

	if result.SubjectType != message.GetSubjectType() {
		t.Errorf("SubjectType = %q, want %q", result.SubjectType, message.GetSubjectType())
	}

	if result.SubjectID != message.GetSubjectId() {
		t.Errorf("SubjectID = %q, want %q", result.SubjectID, message.GetSubjectId())
	}

	if result.SubjectRelation == nil || *result.SubjectRelation != subjectRelation {
		t.Errorf("SubjectRelation = %v, want %q", result.SubjectRelation, subjectRelation)
	}
}

//nolint:staticcheck
func TestDirectoryObjectMappingPreservesFields(t *testing.T) {
	displayName := "Alice"
	etag := "object-etag"

	result := topaz.DirectoryObjectForTest(&common.Object{
		Id:          "alice",
		Type:        "user",
		DisplayName: displayName,
		Etag:        etag,
	})

	if result == nil {
		t.Fatal("directoryObject() returned nil")
	}

	if result.ID != "alice" || result.Type != "user" {
		t.Fatalf("identity = %#v, want user/alice", result)
	}

	if result.DisplayName == nil || *result.DisplayName != displayName {
		t.Fatalf("DisplayName = %#v, want %q", result.DisplayName, displayName)
	}

	if result.ETag == nil || *result.ETag != etag {
		t.Fatalf("ETag = %#v, want %q", result.ETag, etag)
	}
}

func TestNewDeleteObjectRequestIncludesRelations(t *testing.T) {
	request := topaz.NewDeleteObjectRequestForTest("user", "beth@example.com", true)

	if request.GetObjectType() != "user" {
		t.Errorf("ObjectType = %q, want %q", request.GetObjectType(), "user")
	}

	if request.GetObjectId() != "beth@example.com" {
		t.Errorf("ObjectId = %q, want %q", request.GetObjectId(), "beth@example.com")
	}

	if !request.GetWithRelations() {
		t.Error("WithRelations = false, want true")
	}
}
