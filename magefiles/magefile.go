//go:build mage

package main

import (
	"fmt"
	"os"

	"github.com/aserto-dev/mage-loot/common"
	"github.com/aserto-dev/mage-loot/deps"
	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
)

func init() {
	os.Setenv("GO_VERSION", "1.20")
}

// Fetch console all code.
func Fetch() error {
	version := os.Getenv("CONSOLE_VERSION")
	if version == "" {
		return fmt.Errorf("CONSOLE_VERSION environment variable must be specified")
	}
	return sh.RunV("./pre-build.sh", version)
}

// Lint runs linting for the entire project.
func Lint() error {
	return common.Lint()
}

// Test runs all tests and generates a code coverage report.
func Test() error {
	return common.Test("-timeout", "240s", "-parallel=1")
}

func Deps() {
	deps.GetAllDeps()
}

// All runs all targets in the appropriate order.
// The targets are run in the following order:
// deps, generate, lint, test, build, dockerImage
func All() error {
	mg.SerialDeps(Deps, Fetch, Lint, Test)
	return nil
}
