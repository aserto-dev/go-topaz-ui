package integrationtest_test

import (
	"context"
	"os"
	"testing"
	"time"

	topaz "github.com/aserto-dev/go-topaz-ui/internal/web/topaz"

	"github.com/aserto-dev/go-aserto"
	"github.com/aserto-dev/go-aserto/ds/v3"
)

func TestDirectoryIntegration(t *testing.T) {
	if os.Getenv("PLANBEE_RUN_TOPAZ_INTEGRATION") != "1" {
		t.Skip("set PLANBEE_RUN_TOPAZ_INTEGRATION=1 to test against a running local Topaz")
	}

	caPath, err := integrationCACertPath()
	if err != nil {
		t.Fatal(err)
	}

	addr := os.Getenv("PLANBEE_DIRECTORY_ADDR")
	if addr == "" {
		addr = "localhost:9292"
	}

	client, err := (&ds.Config{Config: &aserto.Config{Address: addr, CACertPath: caPath}}).Connect()
	if err != nil {
		t.Fatalf("create Directory client: %v", err)
	}
	defer func() { _ = client.Close() }()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	directory := topaz.NewDirectory(client)

	manifest, err := directory.GetManifestDocument(ctx)
	if err != nil {
		t.Fatalf("GetManifest() error = %v", err)
	}

	if manifest == nil || manifest.RawYAML == "" {
		t.Fatal("GetManifest() returned no manifest content")
	}

	objects, err := directory.GetObjects(ctx, "user", "")
	if err != nil {
		t.Fatalf("GetObjects() error = %v", err)
	}

	if objects == nil || objects.Results == nil {
		t.Fatal("GetObjects() returned no results field")
	}
}
