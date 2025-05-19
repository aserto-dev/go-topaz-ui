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

EXT_DIR            := ${PWD}/.ext
EXT_BIN_DIR        := ${EXT_DIR}/bin
EXT_TMP_DIR        := ${EXT_DIR}/tmp

GO_VER             := 1.23
SVU_VER            := 1.12.0
GOTESTSUM_VER      := 1.11.0
GOLANGCI-LINT_VER  := 1.61.0
GORELEASER_VER     := 2.3.2

RELEASE_TAG        := $$(${EXT_BIN_DIR}/svu)

CONSOLE_REPO       := aserto-dev/topaz-console

.DEFAULT_GOAL      := build

.PHONY: deps
deps: info install-svu
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"

.PHONY: fetch
fetch: $(EXT_TMP_DIR)
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@echo console tag: $$(gh release view --repo ${CONSOLE_REPO} --json tagName --jq .tagName)
	@gh release download $(gh release view --repo ${CONSOLE_REPO} --json tagName --jq .tagName) --repo ${CONSOLE_REPO} --pattern dist-topaz-console-*.tar.gz --output $(EXT_TMP_DIR)/console.tar.gz --clobber
	@mkdir -p $(EXT_TMP_DIR)/console/tar
	@tar -xvf $(EXT_TMP_DIR)/console.tar.gz -C $(EXT_TMP_DIR)/console/tar
	@rm -rf console
	@mkdir -p ./console
	@mv $(EXT_TMP_DIR)/console/tar/dist/* console/
	@rm -rf $(EXT_TMP_DIR)/console/tar

.PHONY: info
info:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@echo "GOOS:        ${GOOS}"
	@echo "GOARCH:      ${GOARCH}"
	@echo "EXT_DIR:     ${EXT_DIR}"
	@echo "EXT_BIN_DIR: ${EXT_BIN_DIR}"
	@echo "EXT_TMP_DIR: ${EXT_TMP_DIR}"
	@echo "RELEASE_TAG: ${RELEASE_TAG}"

.PHONY: install-svu
install-svu: ${EXT_BIN_DIR} ${EXT_TMP_DIR}
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@GOBIN=${EXT_BIN_DIR} go install github.com/caarlos0/svu/v3@v${SVU_VER}
	@${EXT_BIN_DIR}/svu --version

.PHONY: clean
clean:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@rm -rf ${EXT_DIR}
	@rm -rf ./dist

${EXT_BIN_DIR}:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@mkdir -p ${EXT_BIN_DIR}

${EXT_TMP_DIR}:
	@echo -e "$(ATTN_COLOR)==> $@ $(NO_COLOR)"
	@mkdir -p ${EXT_TMP_DIR}
