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

// Client contains the backend ports used by the web feature handlers.
// Concrete gRPC clients stay behind these domain interfaces.
type Client struct {
	Authorizer      domain.Authorizer
	DirectoryReader domain.DirectoryReader
	DirectoryWriter domain.DirectoryWriter
}

// Config contains the Topaz client configuration supplied by an embedding
// application such as the Topaz CLI.
type Config struct {
	Authorizer aserto.Config
	Directory  aserto.Config
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

// NewFromConfig creates the gRPC clients from explicit Topaz client settings.
func NewFromConfig(cfg *Config) (*Client, func() error, error) {
	authorizerConn, err := cfg.Authorizer.Connect()
	if err != nil {
		return nil, nil, fmt.Errorf("create authorizer gRPC client: %w", err)
	}
	authorizerClient := az.FromConnection(authorizerConn)

	directoryClient, err := (&ds.Config{Config: &cfg.Directory}).Connect()
	if err != nil {
		_ = authorizerConn.Close()

		return nil, nil, fmt.Errorf("create directory gRPC client: %w", err)
	}

	directory := topaz.NewDirectory(directoryClient)
	clientSet := &Client{
		Authorizer:      topaz.NewAuthorizer(authorizerClient),
		DirectoryReader: directory,
		DirectoryWriter: directory,
	}

	closeClients := func() error {
		directoryErr := directoryClient.Close()
		authorizerErr := authorizerConn.Close()

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
