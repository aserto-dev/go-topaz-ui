package directory

import (
	"github.com/aserto-dev/go-topaz-ui/internal/web/domain"
	"github.com/aserto-dev/go-topaz-ui/internal/web/jsonview"
	directorypages "github.com/aserto-dev/go-topaz-ui/internal/web/templates/pages/directory"
	evaluatorpages "github.com/aserto-dev/go-topaz-ui/internal/web/templates/pages/directory/evaluator"
	"slices"
	"sort"
)

func manifestTypeOptions(manifest *domain.DirectoryManifest, selected string) []directorypages.TypeOption {
	options := []directorypages.TypeOption{{Value: "", Label: "All", Selected: selected == ""}}
	if manifest == nil {
		return options
	}

	names := sortedManifestTypeNames(directoryManifestTypes(manifest))
	for _, name := range names {
		options = append(options, directorypages.TypeOption{
			Value:    name,
			Label:    name,
			Selected: name == selected,
		})
	}

	return options
}

func manifestRelationOptions(manifest *domain.DirectoryManifest, objectType, selected string) []directorypages.TypeOption {
	options := []directorypages.TypeOption{{Value: "", Label: "All", Selected: selected == ""}}
	if objectType == "" || manifest == nil {
		return options
	}

	types := directoryManifestTypes(manifest)
	relations := stringMap(stringMap(types[objectType])["relations"])

	names := make([]string, 0, len(relations))
	for name := range relations {
		names = append(names, name)
	}

	sort.Strings(names)

	for _, name := range names {
		options = append(options, directorypages.TypeOption{Value: name, Label: name, Selected: name == selected})
	}

	return options
}

func containsTypeOption(options []directorypages.TypeOption, value string) bool {
	for _, option := range options {
		if option.Value == value {
			return true
		}
	}

	return false
}

func stringMap(value any) map[string]any {
	switch typed := value.(type) {
	case domain.DirectoryManifest:
		return map[string]any(typed)
	case map[string]any:
		return typed
	case map[any]any:
		result := make(map[string]any, len(typed))
		for key, item := range typed {
			text, ok := key.(string)
			if ok {
				result[text] = item
			}
		}

		return result
	default:
		return nil
	}
}

func directoryManifestTypes(manifest *domain.DirectoryManifest) map[string]any {
	if manifest == nil {
		return nil
	}

	return stringMap(map[string]any(*manifest)["types"])
}

func sortedManifestTypeNames(types map[string]any) []string {
	names := make([]string, 0, len(types))
	for name := range types {
		names = append(names, name)
	}

	sort.Strings(names)

	return names
}

func containsString(values []string, value string) bool {
	return slices.Contains(values, value)
}

func highlightJSON(raw string) []evaluatorpages.JSONLine {
	shared := jsonview.HighlightJSON(raw)

	lines := make([]evaluatorpages.JSONLine, 0, len(shared))
	for _, sharedLine := range shared {
		line := evaluatorpages.JSONLine{Tokens: make([]evaluatorpages.JSONToken, 0, len(sharedLine.Tokens))}
		for _, token := range sharedLine.Tokens {
			line.Tokens = append(line.Tokens, evaluatorpages.JSONToken{Text: token.Text, Class: token.Class})
		}

		lines = append(lines, line)
	}

	return lines
}
