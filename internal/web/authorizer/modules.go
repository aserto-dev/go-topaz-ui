package authorizer

import (
	"net/http"
	"net/url"
	"planbee/internal/web/domain"
	"planbee/internal/web/render"
	"planbee/internal/web/templates/base"
	"regexp"
	"sort"
	"strings"

	authorizerpages "planbee/internal/web/templates/pages/authorizer"

	"github.com/a-h/templ"
)

const authorizerEvaluatorPath = "/ui/authorizer/evaluator"

type Handler struct {
	authorizer domain.Authorizer
}

func NewHandler(authorizer domain.Authorizer) Handler {
	return Handler{authorizer: authorizer}
}

var regoWordPattern = regexp.MustCompile(`[A-Za-z_][A-Za-z0-9_]*|\d+|.`)

func (h Handler) Modules(w http.ResponseWriter, r *http.Request) {
	modules, err := h.authorizer.ListPolicies(r.Context())
	if err != nil {
		h.renderContent(w, r, "modules", authorizerpages.ModulesError(err.Error()), base.SectionActions(r.URL.RequestURI(), "#content"))
	} else {
		h.renderContent(w, r, "modules",
			authorizerpages.ModulesPage(newModulesView(modules, r.URL.Query().Get("module_id"))),
			base.SectionActions(r.URL.RequestURI(), "#content"))
	}
}

func (h Handler) Evaluator(w http.ResponseWriter, r *http.Request) {
	h.handleEvaluator(w, r)
}

func (h Handler) renderContent(w http.ResponseWriter, r *http.Request, active string, content templ.Component, toolbar templ.Component) {
	render.SectionPage(w, r, "authorizer", base.AuthorizerWorkspace(active, content, toolbar), content, toolbar)
}

func newModulesView(response *domain.AuthorizerListPoliciesResponse, selectedID string) authorizerpages.ModulesView {
	modules := []domain.AuthorizerModule(nil)
	if response != nil && response.Result != nil {
		modules = append(modules, (*response.Result)...)
	}

	sort.Slice(modules, func(i int, j int) bool {
		return moduleDisplayPath(stringValue(modules[i].PackagePath)) < moduleDisplayPath(stringValue(modules[j].PackagePath))
	})

	if selectedID == "" && len(modules) > 0 {
		selectedID = stringValue(modules[0].ID)
	}

	view := authorizerpages.ModulesView{
		Modules:    make([]authorizerpages.ModuleItem, 0, len(modules)),
		Definition: nil,
	}

	selectedRaw := ""

	for _, module := range modules {
		id := stringValue(module.ID)
		packagePath := moduleDisplayPath(stringValue(module.PackagePath))
		raw := stringValue(module.Raw)

		active := id == selectedID
		if active {
			selectedRaw = raw
		}

		itemClass := "module-pill"
		if active {
			itemClass += " active"
		}

		view.Modules = append(view.Modules, authorizerpages.ModuleItem{
			ID:          id,
			PackagePath: packagePath,
			Class:       itemClass,
			URL:         "/ui/authorizer/modules?module_id=" + url.QueryEscape(id),
		})
	}

	view.Definition = highlightRego(selectedRaw)

	return view
}

func stringValue(value *string) string {
	if value == nil {
		return ""
	}

	return *value
}

func moduleDisplayPath(path string) string {
	return strings.TrimPrefix(path, "data.")
}

func highlightRego(raw string) []authorizerpages.CodeLine {
	lines := strings.Split(raw, "\n")
	result := make([]authorizerpages.CodeLine, 0, len(lines))

	for _, line := range lines {
		result = append(result, authorizerpages.CodeLine{
			Tokens: highlightRegoLine(line),
		})
	}

	return result
}

func highlightRegoLine(line string) []authorizerpages.CodeToken {
	if line == "" {
		return []authorizerpages.CodeToken{{Text: "\n", Class: "rego-token"}}
	}

	commentIndex := strings.Index(line, "#")
	code := line
	comment := ""

	if commentIndex >= 0 {
		code = line[:commentIndex]
		comment = line[commentIndex:]
	}

	tokens := highlightRegoCode(code)
	if comment != "" {
		tokens = append(tokens, authorizerpages.CodeToken{Text: comment, Class: "rego-token-comment"})
	}

	tokens = append(tokens, authorizerpages.CodeToken{Text: "\n", Class: "rego-token"})

	return tokens
}

func highlightRegoCode(code string) []authorizerpages.CodeToken {
	tokens := make([]authorizerpages.CodeToken, 0)

	for i := 0; i < len(code); {
		if code[i] == '"' {
			end := i + 1
			for end < len(code) {
				if code[end] == '"' && code[end-1] != '\\' {
					end++

					break
				}

				end++
			}

			tokens = append(tokens, authorizerpages.CodeToken{Text: code[i:end], Class: "rego-token-string"})
			i = end

			continue
		}

		match := regoWordPattern.FindString(code[i:])
		if match == "" {
			break
		}

		tokens = append(tokens, authorizerpages.CodeToken{Text: match, Class: regoTokenClass(match)})
		i += len(match)
	}

	return tokens
}

func regoTokenClass(token string) string {
	switch token {
	case "package", "import", "default", "if", "else", "not", "some", "with", "as":
		return "rego-token-keyword"
	case "true", "false", "null":
		return "rego-token-constant"
	case "input", "data", "future":
		return "rego-token-namespace"
	case "ds", "count", "concat", "contains", "sprintf", "startswith", "endswith":
		return "rego-token-function"
	}

	if len(token) > 0 && token[0] >= '0' && token[0] <= '9' {
		return "rego-token-number"
	}

	return "rego-token"
}
