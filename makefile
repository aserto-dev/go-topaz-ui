.PHONY: build generate fetch-monaco lint test run serve-dev

build:
# 	golangci-lint run --fix
	go tool templ generate
	go build -o ./bin/planbee .

generate:
	go tool templ generate

fetch-monaco:
	./scripts/fetch-monaco.sh

lint:
	golangci-lint run

test:
	go test ./...

run:
	go run .

serve-dev: generate build
	air
