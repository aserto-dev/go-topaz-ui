package backend

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"github.com/aserto-dev/go-topaz-ui/internal/web/topaz"

	"github.com/aserto-dev/go-aserto"
	"github.com/aserto-dev/go-aserto/az"
	"github.com/aserto-dev/go-aserto/ds/v3"
)

// TopazCfg is the configuration passed from topazd to the console web server
type TopazCfg struct {
	AuthorizerServiceURL        string
	AuthorizerAPIKey            string
	DirectoryServiceURL         string
	DirectoryAPIKey             string
	DirectoryReaderServiceURL   string
	DirectoryWriterServiceURL   string
	DirectoryImporterServiceURL string
	DirectoryExporterServiceURL string
	DirectoryModelServiceURL    string
	ConsoleURL                  string
}

// Client contains the backend ports used by the web feature handlers.
// Concrete gRPC clients stay behind these domain interfaces.
type Client struct {
	Authorizer      domain.Authorizer
	DirectoryReader domain.DirectoryReader
	DirectoryWriter domain.DirectoryWriter
}

// NewFromEnv creates the gRPC clients before the HTTP server starts.
func NewFromEnv() (*Client, func() error, error) {
	caPath, err := topazCACertPath()
	if err != nil {
		return nil, nil, err
	}

	addr := os.Getenv("PLANBEE_AUTHORIZER_ADDR")
	if addr == "" {
		addr = "localhost:8282"
	}

	client, err := az.New(aserto.WithAddr(addr), aserto.WithCACertPath(caPath))
	if err != nil {
		return nil, nil, fmt.Errorf("create authorizer gRPC client: %w", err)
	}

	directoryAddr := os.Getenv("PLANBEE_DIRECTORY_ADDR")
	if directoryAddr == "" {
		directoryAddr = "localhost:9292"
	}

	directoryClient, err := (&ds.Config{Config: &aserto.Config{
		Address:    directoryAddr,
		CACertPath: caPath,
	}}).Connect()
	if err != nil {
		_ = client.Close()

		return nil, nil, fmt.Errorf("create directory gRPC client: %w", err)
	}

	directory := topaz.NewDirectory(directoryClient)
	clientSet := &Client{
		Authorizer:      topaz.NewAuthorizer(client),
		DirectoryReader: directory,
		DirectoryWriter: directory,
	}

	log.Printf("Planbee backend: gRPC")

	closeClients := func() error {
		directoryErr := directoryClient.Close()
		authorizerErr := client.Close()

		return errors.Join(directoryErr, authorizerErr)
	}

	return clientSet, closeClients, nil
}

// topazCACertPath returns the path to the Topaz gRPC CA certificate.
// It first checks the PLANBEE_GRPC_CA_CERT environment variable.
// If not set, it defaults to $HOME/.local/share/topaz/certs/grpc-ca.crt.
func topazCACertPath() (string, error) {
	if path := os.Getenv("PLANBEE_GRPC_CA_CERT"); path != "" {
		return path, nil
	}

	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("resolve home directory for Topaz gRPC CA: %w", err)
	}

	return filepath.Join(home, ".local", "share", "topaz", "certs", "grpc-ca.crt"), nil
}

// NewFromTopazCfg creates gRPC clients from topazd's config
func NewFromTopazCfg(cfg *TopazCfg) (*Client, func() error, error) {
	caPath, err := topazCACertPath()
	if err != nil {
		return nil, nil, err
	}

	authorizerAddr := extractGRPCAddr(cfg.AuthorizerServiceURL, "localhost:9292")
	directoryAddr := extractGRPCAddr(cfg.DirectoryServiceURL, "localhost:9292")

	client, err := az.New(
		aserto.WithAddr(authorizerAddr),
		aserto.WithCACertPath(caPath),
	)
	if err != nil {
		return nil, nil, fmt.Errorf("create authorizer gRPC client: %w", err)
	}

	directoryClient, err := (&ds.Config{Config: &aserto.Config{
		Address:    directoryAddr,
		CACertPath: caPath,
	}}).Connect()
	if err != nil {
		_ = client.Close()
		return nil, nil, fmt.Errorf("create directory gRPC client: %w", err)
	}

	directory := topaz.NewDirectory(directoryClient)
	clientSet := &Client{
		Authorizer:      topaz.NewAuthorizer(client),
		DirectoryReader: directory,
		DirectoryWriter: directory,
	}

	cleanup := func() error {
		_ = client.Close()
		_ = directoryClient.Close()
		return nil
	}

	return clientSet, cleanup, nil
}

func extractGRPCAddr(serviceURL, defaultAddr string) string {
	if serviceURL == "" {
		return defaultAddr
	}
	if len(serviceURL) > 8 {
		return serviceURL[8:]
	}
	return defaultAddr
}
