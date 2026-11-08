package domain

type AuthorizerIdentityType string

type AuthorizerIdentityContext struct {
	Identity *string
	Type     *AuthorizerIdentityType
}

type AuthorizerPolicyContext struct {
	Decisions *[]string
	Path      *string
}

type AuthorizerPolicyInstance struct {
	InstanceLabel *string
	Name          *string
}

type AuthorizerModule struct {
	Ast                               any
	ID, PackagePath, PackageRoot, Raw *string
}

type AuthorizerDecision struct {
	Decision *string
	Is       *bool
}

type AuthorizerIsRequest struct {
	IdentityContext *AuthorizerIdentityContext
	PolicyContext   *AuthorizerPolicyContext
	PolicyInstance  *AuthorizerPolicyInstance
	ResourceContext *map[string]any
}

type AuthorizerIsResponse struct{ Decisions *[]AuthorizerDecision }

type AuthorizerDecisionTreeOptions struct{ PathSeparator *AuthorizerPathSeparator }

type AuthorizerDecisionTreeRequest struct {
	IdentityContext *AuthorizerIdentityContext
	Options         *AuthorizerDecisionTreeOptions
	PolicyContext   *AuthorizerPolicyContext
	PolicyInstance  *AuthorizerPolicyInstance
	ResourceContext *map[string]any
}

type AuthorizerDecisionTreeResponse struct {
	Path     *map[string]any
	PathRoot *string
}

type AuthorizerQueryOptions struct {
	Instrument, Metrics bool
	Trace               *AuthorizerTraceLevel
	TraceSummary        bool
}

type AuthorizerQueryRequest struct {
	IdentityContext *AuthorizerIdentityContext
	Input           *string
	Options         *AuthorizerQueryOptions
	PolicyContext   *AuthorizerPolicyContext
	PolicyInstance  *AuthorizerPolicyInstance
	Query           *string
	ResourceContext *map[string]any
}

type AuthorizerQueryResponse struct {
	Metrics, Response *map[string]any
	Trace             *[]map[string]any
	TraceSummary      *[]string
}

type AuthorizerListPoliciesResponse struct{ Result *[]AuthorizerModule }

type (
	AuthorizerPathSeparator string
	AuthorizerTraceLevel    string
)

const (
	AuthorizerIdentityTypeUnknown  AuthorizerIdentityType  = "IDENTITY_TYPE_UNKNOWN"
	AuthorizerIdentityTypeNone     AuthorizerIdentityType  = "IDENTITY_TYPE_NONE"
	AuthorizerIdentityTypeSub      AuthorizerIdentityType  = "IDENTITY_TYPE_SUB"
	AuthorizerIdentityTypeJWT      AuthorizerIdentityType  = "IDENTITY_TYPE_JWT"
	AuthorizerIdentityTypeManual   AuthorizerIdentityType  = "IDENTITY_TYPE_MANUAL"
	AuthorizerPathSeparatorUnknown AuthorizerPathSeparator = "PATH_SEPARATOR_UNKNOWN"
	AuthorizerPathSeparatorDot     AuthorizerPathSeparator = "PATH_SEPARATOR_DOT"
	AuthorizerPathSeparatorSlash   AuthorizerPathSeparator = "PATH_SEPARATOR_SLASH"
	AuthorizerTraceLevelUnknown    AuthorizerTraceLevel    = "TRACE_LEVEL_UNKNOWN"
	AuthorizerTraceLevelOff        AuthorizerTraceLevel    = "TRACE_LEVEL_OFF"
	AuthorizerTraceLevelFull       AuthorizerTraceLevel    = "TRACE_LEVEL_FULL"
	AuthorizerTraceLevelNotes      AuthorizerTraceLevel    = "TRACE_LEVEL_NOTES"
	AuthorizerTraceLevelFails      AuthorizerTraceLevel    = "TRACE_LEVEL_FAILS"
)
