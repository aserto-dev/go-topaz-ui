package jsonview

import (
	"encoding/json"
	"strings"
)

type JSONLine struct {
	Tokens []JSONToken
}

type JSONToken struct {
	Text  string
	Class string
}

func PrettyJSON(value any) string {
	encoded, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return "{}"
	}

	return string(encoded)
}

func HighlightJSON(raw string) []JSONLine {
	lines := strings.Split(raw, "\n")
	result := make([]JSONLine, 0, len(lines))

	for _, line := range lines {
		result = append(result, JSONLine{Tokens: highlightJSONLine(line)})
	}

	return result
}

func highlightJSONLine(line string) []JSONToken {
	if line == "" {
		return []JSONToken{{Text: "\n", Class: "json-token"}}
	}

	tokens := make([]JSONToken, 0)

	for i := 0; i < len(line); {
		switch {
		case line[i] == '"':
			end := jsonStringEnd(line, i)

			class := "json-token-string"
			if jsonStringIsKey(line, end) {
				class = "json-token-key"
			}

			tokens = append(tokens, JSONToken{Text: line[i:end], Class: class})
			i = end
		case isJSONNumberStart(line[i]):
			end := i + 1
			for end < len(line) && isJSONNumberPart(line[end]) {
				end++
			}

			tokens = append(tokens, JSONToken{Text: line[i:end], Class: "json-token-number"})
			i = end
		case strings.HasPrefix(line[i:], "true"):
			tokens = append(tokens, JSONToken{Text: "true", Class: "json-token-constant"})
			i += len("true")
		case strings.HasPrefix(line[i:], "false"):
			tokens = append(tokens, JSONToken{Text: "false", Class: "json-token-constant"})
			i += len("false")
		case strings.HasPrefix(line[i:], "null"):
			tokens = append(tokens, JSONToken{Text: "null", Class: "json-token-constant"})
			i += len("null")
		case strings.ContainsRune("{}[]:,", rune(line[i])):
			tokens = append(tokens, JSONToken{Text: line[i : i+1], Class: "json-token-punctuation"})
			i++
		default:
			tokens = append(tokens, JSONToken{Text: line[i : i+1], Class: "json-token"})
			i++
		}
	}

	tokens = append(tokens, JSONToken{Text: "\n", Class: "json-token"})

	return tokens
}

func jsonStringEnd(line string, start int) int {
	for i := start + 1; i < len(line); i++ {
		if line[i] == '"' && line[i-1] != '\\' {
			return i + 1
		}
	}

	return len(line)
}

func jsonStringIsKey(line string, end int) bool {
	for i := end; i < len(line); i++ {
		if line[i] == ' ' || line[i] == '\t' {
			continue
		}

		return line[i] == ':'
	}

	return false
}

func isJSONNumberStart(value byte) bool {
	return value == '-' || (value >= '0' && value <= '9')
}

func isJSONNumberPart(value byte) bool {
	return value == '-' || value == '+' || value == '.' || value == 'e' || value == 'E' || (value >= '0' && value <= '9')
}
