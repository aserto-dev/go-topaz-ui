SHELL              := $(shell which bash)

NO_COLOR           := \033[0m
OK_COLOR           := \033[32;01m
ERR_COLOR          := \033[31;01m
WARN_COLOR         := \033[36;01m
ATTN_COLOR         := \033[33;01m

GOOS               := $(shell go env GOOS)
GOARCH             := $(shell go env GOARCH)
GOPRIVATE          := "github.com/aserto-dev"
DOCKER_BUILDKIT    := 1

BIN_DIR            := ./bin
EXT_DIR            := ./.ext
EXT_BIN_DIR        := ${EXT_DIR}/bin
EXT_TMP_DIR        := ${EXT_DIR}/tmp

GO_VER             := 1.23
VAULT_VER	         := 1.8.12
SVU_VER 	         := 1.12.0
GOTESTSUM_VER      := 1.11.0
GOLANGCI-LINT_VER  := 1.61.0
GORELEASER_VER     := 2.3.2

RELEASE_TAG        := $$(${EXT_BIN_DIR}/svu)

.DEFAULT_GOAL      := build

.PHONY: deps
deps: info install-vault install-svu install-goreleaser install-golangci-lint install-gotestsum
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"

.PHONY: fetch
fetch: $(EXT_TMP_DIR)
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@echo console tag: $$(gh release view --repo aserto-dev/self-hosted-console --json tagName --jq .tagName)
	@gh release download $(gh release view --repo aserto-dev/self-hosted-console --json tagName --jq .tagName) --repo aserto-dev/self-hosted-console --pattern dist-self-hosted-console-*.tar.gz --output $(EXT_TMP_DIR)/console.tar.gz --clobber
	@mkdir -p $(EXT_TMP_DIR)/console/tar
	@tar -xvf $(EXT_TMP_DIR)/console.tar.gz -C $(EXT_TMP_DIR)/console/tar
	@rm -rf console
	@mkdir -p ./console
	@mv $(EXT_TMP_DIR)/console/tar/build/* console/
	@rm -rf $(EXT_TMP_DIR)/console/tar

.PHONY: build
build: 
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@(go env GOVERSION | grep "go${GO_VER}") || (echo "go version check failed expected go${GO_VER} got $$(go env GOVERSION)"; exit 1)
	@${EXT_BIN_DIR}/goreleaser build --clean --snapshot --single-target

.PHONY: dev-release
dev-release: 
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@${EXT_BIN_DIR}/goreleaser release --clean --snapshot

.PHONY: release
release:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@${EXT_BIN_DIR}/goreleaser release --clean

.PHONY: snapshot
snapshot:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@${EXT_BIN_DIR}/goreleaser release --clean --snapshot

.PHONY: generate
generate:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@GOBIN=${PWD}/${EXT_BIN_DIR} go generate ./...

.PHONY: lint
lint:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@${EXT_BIN_DIR}/golangci-lint run --config ${PWD}/.golangci.yaml

.PHONY: test
test:
	@echo -e "$(ATTN_COLOR)==> test github.com/aserto-dev/topaz/pkg/app/tests/$@/... $(NO_COLOR)"
	@${EXT_BIN_DIR}/gotestsum --format short-verbose -- -count=1 -parallel=1 -v -coverprofile=cover.out -coverpkg=./... ./...

.PHONY: write-version
write-version:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@git describe --tags > ./VERSION.txt

ASSETS = "assets/api-auth/test/api-auth_" "assets/gdrive/test/gdrive_" "assets/github/test/github_" "assets/multi-tenant/test/multi-tenant_" "assets/slack/test/slack_"
.PHONY: update-assets
update-assets: $(ASSETS)
$(ASSETS): install-check2decision
	@echo -e "$(ATTN_COLOR)==> github.com/aserto-dev/topaz/assets/$@ $(NO_COLOR)"
	@${EXT_BIN_DIR}/check2decision -i "$@assertions.json" -o "$@decisions.json"

TEMPLATES = "assets/api-auth.json" "assets/gdrive.json" "assets/github.json" "assets/multi-tenant.json" "assets/peoplefinder.json" "assets/simple-rbac.json" "assets/slack.json" "assets/todo.json"
.PHONY: test-templates
test-templates: $(TEMPLATES)
$(TEMPLATES): snapshot
	@echo -e "$(ATTN_COLOR)==> github.com/aserto-dev/topaz/assets/$@ $(NO_COLOR)"
	@echo topaz templates install $@ --force --no-console --container-tag=$$(${EXT_BIN_DIR}/svu patch --strip-prefix)-$$(git rev-parse --short HEAD)-dirty-${GOARCH}
	@./dist/topaz_${GOOS}_${GOARCH}/topaz templates install $@ --force --no-console --container-tag=$$(${EXT_BIN_DIR}/svu patch --strip-prefix)-$$(git rev-parse --short HEAD)-dirty-${GOARCH}
	@./dist/topaz_${GOOS}_${GOARCH}/topaz stop --wait

.PHONY: vault-login
vault-login:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@vault login -method=github token=$$(gh auth token)

.PHONY: info
info:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@echo "GOOS:        ${GOOS}"
	@echo "GOARCH:      ${GOARCH}"
	@echo "BIN_DIR:     ${BIN_DIR}"
	@echo "EXT_DIR:     ${EXT_DIR}"
	@echo "EXT_BIN_DIR: ${EXT_BIN_DIR}"
	@echo "EXT_TMP_DIR: ${EXT_TMP_DIR}"
	@echo "RELEASE_TAG: ${RELEASE_TAG}"

.PHONY: install-vault
install-vault: ${EXT_BIN_DIR} ${EXT_TMP_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@curl -s -o ${EXT_TMP_DIR}/vault.zip https://releases.hashicorp.com/vault/${VAULT_VER}/vault_${VAULT_VER}_${GOOS}_${GOARCH}.zip
	@unzip -o ${EXT_TMP_DIR}/vault.zip vault -d ${EXT_BIN_DIR}/  &> /dev/null
	@chmod +x ${EXT_BIN_DIR}/vault
	@${EXT_BIN_DIR}/vault --version 

.PHONY: install-svu
install-svu: install-svu-${GOOS}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@chmod +x ${EXT_BIN_DIR}/svu
	@${EXT_BIN_DIR}/svu --version

.PHONY: install-svu-darwin
install-svu-darwin: ${EXT_TMP_DIR} ${EXT_BIN_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@gh release download --repo https://github.com/caarlos0/svu --pattern "svu_*_darwin_all.tar.gz" --output "${EXT_TMP_DIR}/svu.tar.gz" --clobber
	@tar -xvf ${EXT_TMP_DIR}/svu.tar.gz --directory ${EXT_BIN_DIR} svu &> /dev/null

.PHONY: install-svu-linux
install-svu-linux: ${EXT_TMP_DIR} ${EXT_BIN_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@gh release download --repo https://github.com/caarlos0/svu --pattern "svu_*_linux_${GOARCH}.tar.gz" --output "${EXT_TMP_DIR}/svu.tar.gz" --clobber
	@tar -xvf ${EXT_TMP_DIR}/svu.tar.gz --directory ${EXT_BIN_DIR} svu &> /dev/null

.PHONY: install-gotestsum
install-gotestsum: ${EXT_TMP_DIR} ${EXT_BIN_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@gh release download v${GOTESTSUM_VER} --repo https://github.com/gotestyourself/gotestsum --pattern "gotestsum_${GOTESTSUM_VER}_${GOOS}_${GOARCH}.tar.gz" --output "${EXT_TMP_DIR}/gotestsum.tar.gz" --clobber
	@tar -xvf ${EXT_TMP_DIR}/gotestsum.tar.gz --directory ${EXT_BIN_DIR} gotestsum &> /dev/null
	@chmod +x ${EXT_BIN_DIR}/gotestsum
	@${EXT_BIN_DIR}/gotestsum --version

.PHONY: install-golangci-lint
install-golangci-lint: ${EXT_TMP_DIR} ${EXT_BIN_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@gh release download v${GOLANGCI-LINT_VER} --repo https://github.com/golangci/golangci-lint --pattern "golangci-lint-${GOLANGCI-LINT_VER}-${GOOS}-${GOARCH}.tar.gz" --output "${EXT_TMP_DIR}/golangci-lint.tar.gz" --clobber
	@tar --strip=1 -xvf ${EXT_TMP_DIR}/golangci-lint.tar.gz --strip-components=1 --directory ${EXT_TMP_DIR} &> /dev/null
	@mv ${EXT_TMP_DIR}/golangci-lint ${EXT_BIN_DIR}/golangci-lint
	@chmod +x ${EXT_BIN_DIR}/golangci-lint
	@${EXT_BIN_DIR}/golangci-lint --version

.PHONY: install-goreleaser
install-goreleaser: ${EXT_TMP_DIR} ${EXT_BIN_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@gh release download v${GORELEASER_VER} --repo https://github.com/goreleaser/goreleaser --pattern "goreleaser_$$(uname -s)_$$(uname -m).tar.gz" --output "${EXT_TMP_DIR}/goreleaser.tar.gz" --clobber
	@tar -xvf ${EXT_TMP_DIR}/goreleaser.tar.gz --directory ${EXT_BIN_DIR} goreleaser &> /dev/null
	@chmod +x ${EXT_BIN_DIR}/goreleaser
	@${EXT_BIN_DIR}/goreleaser --version

.PHONY: install-wire
install-wire: ${EXT_TMP_DIR} ${EXT_BIN_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@GOBIN=${PWD}/${EXT_BIN_DIR} go install github.com/google/wire/cmd/wire@v${WIRE_VER}

.PHONY: clean
clean:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@rm -rf ${EXT_DIR}
	@rm -rf ${BIN_DIR}
	@rm -rf ./dist

${BIN_DIR}:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@mkdir -p ${BIN_DIR}

${EXT_BIN_DIR}:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@mkdir -p ${EXT_BIN_DIR}

${EXT_TMP_DIR}:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@mkdir -p ${EXT_TMP_DIR}
