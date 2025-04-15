import{R as nt,r,j as e,d,t as u,l as N,i as st,e as ot,O as at,u as Ve,A as me,D as it,F as lt,I as le,B as ct,h as q,E as ut,G as Re,w as dt,x as ee,y as xt}from"./index-Cl9P_8-k.js";import{F as ht,W,G as pt,A as yt,aB as ce,H as mt,az as gt,a9 as ge,a8 as We,R as z,N as Ge,O as Xe,E as bt,$ as jt,a1 as Ct,ae as Ae}from"./index-C-1KTIHz.js";const S={CHECK:"CHECK",DECISIONTREE:"DECISIONTREE",IS:"IS",QUERY:"QUERY"},G=nt.createContext({decisions:'["allowed", "visible", "enabled"]',identity:null,input:"",objectInstance:{label:"",value:""},objectType:"",options:"PATH_SEPARATOR_DOT",pathFreeText:"",pathSelect:"",permission:{label:"",value:""},policyContextError:void 0,policyInstance:"",query:"",queryMetrics:!1,queryTrace:!1,queryTraceLevel:"TRACE_LEVEL_NOTES",queryTraceSummary:!1,relationType:{label:"",value:""},request:"IS",resourceContext:"",setDecisions:()=>{},setIdentity:()=>{},setInput:()=>{},setObjectInstance:()=>{},setObjectType:()=>{},setOptions:()=>{},setPathFreeText:()=>{},setPathSelect:()=>{},setPermission:()=>{},setPolicyContextError:()=>{},setPolicyInstance:()=>{},setQuery:()=>{},setRelationType:()=>{},setRequest:()=>{},setResourceContext:()=>{},setSubjectInstance:()=>{},setSubjectType:()=>{},setType:()=>{},subjectInstance:{label:"",value:""},subjectType:"",type:"IDENTITY_TYPE_NONE"}),ue=()=>r.useContext(G),vt=()=>r.useContext(G),Tt=()=>r.useContext(G),be=()=>r.useContext(G),Ze=()=>r.useContext(G),je=()=>r.useContext(G),Ce=()=>r.useContext(G),ft=({children:t})=>{const[n,o]=r.useState(""),[s,a]=r.useState(null),[x,b]=r.useState(),[g,j]=r.useState(),[C,E]=r.useState("{}"),[m,v]=r.useState("topaz"),l=r.useCallback(c=>{try{const M=JSON.parse(C||"{}");if(M&&m)return["queryMetrics","queryTrace","queryTraceSummary"].includes(c)?M[m]&&M[m][c]||!1:M[m]&&String(M[m][c]||"")||""}catch{}return""},[C,m]),i=r.useCallback((c,M)=>{E(V=>{try{const xe=JSON.parse(V||"{}");if(xe&&m)return JSON.stringify({...xe,[m]:{...xe[m],[c]:M}})}catch{}return V})},[m,E]),p=r.useCallback(c=>{E(M=>{try{const V=JSON.parse(M||"{}");if(V&&m&&V[m]&&V[m][c])return delete V[m][c],JSON.stringify(V)}catch{}return M})},[m,E]),f=r.useMemo(()=>l("object_type")||null,[l]),I=r.useCallback(c=>{i("object_type",c)},[i]),k=r.useMemo(()=>l("options")||"PATH_SEPARATOR_DOT",[l]),F=r.useCallback(c=>{i("options",c)},[i]),L=r.useMemo(()=>l("resource_context"),[l]),y=r.useCallback(c=>{i("resource_context",c)},[i]),T=r.useMemo(()=>l("request")||"",[l]),D=r.useCallback(c=>{i("request",c)},[i]),O=r.useMemo(()=>l("type")||"IDENTITY_TYPE_NONE",[l]),P=r.useCallback(c=>{i("type",c)},[i]),Y=r.useMemo(()=>{const c=l("subject");return c&&JSON.parse(c)||null},[l]),Q=r.useCallback(c=>{c?i("subject",JSON.stringify(c)):p("subject")},[p,i]),H=r.useMemo(()=>{const c=l("object");return c&&JSON.parse(c)||null},[l]),J=r.useCallback(c=>{c?i("object",JSON.stringify(c)):p("object")},[p,i]),A=r.useMemo(()=>{const c=l("relation_type");return c&&JSON.parse(c)||null},[l]),h=r.useCallback(c=>{c?i("relation_type",JSON.stringify(c)):p("relation_type")},[p,i]),_=r.useMemo(()=>l("identity"),[l]),X=r.useCallback(c=>{c?i("identity",c):p("identity")},[p,i]),B=r.useMemo(()=>l("input"),[l]),U=r.useCallback(c=>{i("input",c)},[i]),Z=r.useMemo(()=>l("decisions")||'["allowed"]',[l]),w=r.useCallback(c=>{i("decisions",c)},[i]),R=r.useMemo(()=>l("path_free_text"),[l]),te=r.useCallback(c=>{i("path_free_text",c)},[i]),K=r.useMemo(()=>l("path_select"),[l]),re=r.useCallback(c=>{i("path_select",c)},[i]),ne=r.useMemo(()=>l("query"),[l]),Ee=r.useCallback(c=>{i("query",c)},[i]),Se=r.useMemo(()=>l("queryMetrics"),[l]),ke=r.useCallback(c=>{i("queryMetrics",c)},[i]),Ie=r.useMemo(()=>l("queryTrace"),[l]),Oe=r.useCallback(c=>{i("queryTrace",c)},[i]),we=r.useMemo(()=>l("queryTraceLevel")||"TRACE_LEVEL_NOTES",[l]),$e=r.useCallback(c=>{i("queryTraceLevel",c)},[i]),_e=r.useMemo(()=>l("queryTraceSummary"),[l]),Pe=r.useCallback(c=>{i("queryTraceSummary",c)},[i]),rt=r.useMemo(()=>({decisions:Z,identity:_,input:B,objectInstance:H,objectType:f,options:k,pathFreeText:R,pathSelect:K,permission:s,policyContextError:x,query:ne,queryMetrics:Se,queryTrace:Ie,queryTraceLevel:we,queryTraceSummary:_e,relationType:A,request:T,resourceContext:L,resourceContextError:g,setDecisions:w,setIdentity:X,setInput:U,setObjectInstance:J,setObjectType:I,setOptions:F,setPathFreeText:te,setPathSelect:re,setPermission:a,setPolicyContextError:b,setPolicyInstance:v,setQuery:Ee,setQueryMetrics:ke,setQueryTrace:Oe,setQueryTraceLevel:$e,setQueryTraceSummary:Pe,setRelationType:h,setRequest:D,setResourceContext:y,setResourceContextError:j,setSubjectInstance:Q,setSubjectType:o,setType:P,subjectInstance:Y,subjectType:n,type:O}),[Z,_,B,k,R,K,ne,Se,Ie,we,_e,L,T,w,X,U,F,te,re,Ee,ke,Oe,$e,Pe,D,y,P,O,n,Y,s,A,f,H,Q,h,I,J,x,g]);return e.jsx(G.Provider,{value:rt,children:t})},Et=d.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0 85px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'header'
    'sidebar'
    'content';

  @media (min-width: 1px) {
  }

  @media (min-width: 1328px) {
    display: grid;
    grid-template-columns: 250px 1.3fr 1fr;
    grid-template-rows: 0 1.7fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      'header header header'
      'sidebar content content'
      'sidebar content content';
  }
  .decision-logs-content {
    height: 100%;
    overflow-x: hidden;
  }
`,St=d.div`
  @media (min-width: 1328px) {
    grid-area: header;
  }
`,kt=d.div`
  @media (min-width: 1328px) {
    grid-area: sidebar;
  }
`,It=d.div`
  grid-area: content;
  display: flex;
  height: 100%;
  width: 100%;
`,Ot=d.div`
  display: flex;
  line-height: 1;
  @media (max-width: 1327px) {
    flex-wrap: wrap;
    padding: 20px;
  }
  @media (min-width: 991px) {
    /* margin-top: 70px; */
  }
`,wt=d.div`
  width: 100%;
  display: none;
  margin-bottom: 20px;
  @media (max-width: 1327px) {
    display: block;
    width: 100%;
  }
`,$t=d.div`
  margin-right: 20px;
  min-width: 250px;
  @media (max-width: 1327px) {
    display: none;
  }
`,_t=()=>e.jsx(St,{children:e.jsx(ht,{hasBorderBottom:!0,title:"Authorizer"})}),Pt=d.div`
  width: 100%;
  display: flex;
  position: fixed;
  max-width: 250px;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${u.grey20};
  &:last-child {
    border-bottom: none;
  }
`,Ne=d.div`
  padding: 12px 18px;
  ${({disabled:t})=>t?N`
          background-color: ${u.grey10};
          border-bottom: 1px solid ${u.grey10};
          color: ${u.grey40};
          pointer-events: none;
        `:N`
          cursor: pointer;
          background-color: ${u.primaryBlack};
          border-bottom: 1px solid ${u.grey20};
          color: ${u.grey70};
        `}

  &:hover {
    color: ${u.grey100};
    background-color: ${u.grey10};
  }
  ${({selected:t})=>t?N`
          border-left: 5px solid ${u.indogoAccent3};
          background-color: ${u.grey10};
          color: ${u.grey100};
        `:N`
          border-left: 5px solid ${u.primaryBlack};
        `}
`,Rt=d.span`
  color: ${u.grey70};
  font-size: 11px;
`,At=({addVerticalTabButton:t,onChange:n,options:o,selectedValue:s,title:a})=>e.jsx(e.Fragment,{children:e.jsxs(Pt,{children:[a&&e.jsx(Ne,{children:e.jsx("h6",{children:a})}),o.map(x=>e.jsxs(Ne,{"data-testid":x.value,disabled:x.isDisabled,hidden:x.hidden,selected:s===x.value,onClick:()=>n(x.value),children:[x.label,x.isDisabled&&e.jsx(Rt,{children:" (not available)"})]},x.value)),t]})}),Nt=()=>{const t=st(),n=[{label:"Modules",value:"modules"},{label:"Evaluator",value:"evaluator"},{label:"API Browser",value:"docs"}],{pathname:o}=ot(),s=o.replace("/ui/authorizer/","").split("/")[0],a=x=>{t(`/ui/authorizer/${x}`)};return e.jsxs(Ot,{children:[e.jsx($t,{children:e.jsx(At,{options:n,selectedValue:s,onChange:a})}),e.jsx(wt,{children:e.jsx(W,{"aria-label":"Sections",options:n,value:n.find(x=>x.value===s),onChange:x=>a(String(x.value))})})]})},se=()=>e.jsx(pt,{children:e.jsxs(Et,{children:[e.jsx(_t,{}),e.jsx(kt,{children:e.jsx(Nt,{})}),e.jsx(It,{children:e.jsx(at,{})})]})}),qt=()=>{const{authorizerApiKey:t,authorizerServiceUrl:n}=Ve();return e.jsx(yt,{apiKeys:[{key:"AuthorizerAPIKey",value:t?`Basic ${t}`:""}],openApiUrl:`${n}/authorizer/openapi.json`})},Ft=()=>{const t=ce();return r.useCallback((n,o)=>t({data:n,headers:{"Content-Type":"application/json"},method:"POST",signal:o,url:"/api/v2/authz/decisiontree"}),[t])},Lt=t=>{const n=["authorizerDecisionTree"],{mutation:o}={mutation:{mutationKey:n}},s=Ft();return{mutationFn:x=>{const{data:b}=x??{};return s(b)},...o}},Mt=(t,n)=>{const o=Lt();return me(o)},zt=()=>{const t=ce();return r.useCallback((n,o)=>t({data:n,headers:{"Content-Type":"application/json"},method:"POST",signal:o,url:"/api/v2/authz/is"}),[t])},Dt=t=>{const n=["authorizerIs"],{mutation:o}={mutation:{mutationKey:n}},s=zt();return{mutationFn:x=>{const{data:b}=x??{};return s(b)},...o}},Yt=(t,n)=>{const o=Dt();return me(o)},Qt=()=>{const t=ce();return r.useCallback((n,o)=>t({data:n,headers:{"Content-Type":"application/json"},method:"POST",signal:o,url:"/api/v2/authz/query"}),[t])},Ht=t=>{const n=["authorizerQuery"],{mutation:o}={mutation:{mutationKey:n}},s=Qt();return{mutationFn:x=>{const{data:b}=x??{};return s(b)},...o}},Jt=(t,n)=>{const o=Ht();return me(o)},Bt=()=>{const t=ce();return r.useCallback((n,o)=>t({method:"GET",params:n,signal:o,url:"/api/v2/policies"}),[t])},Ut=t=>["/api/v2/policies",...t?[t]:[]],Kt=(t,n)=>{const{query:o}={},s=(o==null?void 0:o.queryKey)??Ut(t),a=Bt();return{queryFn:({signal:b})=>a(t,b),queryKey:s,...o}};function et(t,n,o){const s=Kt(t),a=it(s);return a.queryKey=s.queryKey,a}const oe={IDENTITY_TYPE_JWT:"IDENTITY_TYPE_JWT",IDENTITY_TYPE_MANUAL:"IDENTITY_TYPE_MANUAL",IDENTITY_TYPE_NONE:"IDENTITY_TYPE_NONE",IDENTITY_TYPE_SUB:"IDENTITY_TYPE_SUB"},Vt=(t,n)=>{const{authorizerApiKey:o,authorizerServiceUrl:s}=Ve(),a=o?`basic ${o}`:"",x=r.useCallback(()=>`curl '${s}/${n}' \\
  -H 'authorization: ${a}' \\
  -H 'content-type: application/json' \\
  --data-raw '${t}' \\
  `,[s,a,t,n]);return{copyCurl:()=>mt(x())}},Wt=d.div`
  margin-top: 32px;
  min-height: 252px;
  height: calc(100vh - 642px);
`,qe=d.div`
  min-width: 180px;
  height: 100%;
  display: flex;
  align-items: flex-start;
`,Gt=d.div`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-width: 20vw;
`,Xt=d.div`
  box-sizing: border-box;
  display: block;
  font-weight: 400;
  overflow-x: scroll;
  word-break: break-all;
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  min-width: 80px;
`,Zt=d.div`
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2em;
`,er=[{Cell:({row:t})=>e.jsx(qe,{children:e.jsx(Gt,{...t.getToggleRowExpandedProps(),children:e.jsx(Zt,{children:t.original.module})})}),Header:"Module",style:{cellWidth:"70%"}},{Cell:({row:t})=>e.jsx(qe,{children:e.jsx(Xt,{...t.getToggleRowExpandedProps(),children:e.jsx(ge,{language:"json",children:t.original.decision})})}),Header:"Decision",style:{cellWidth:"30%"}}],tr=({data:t})=>{const n=Object.keys(t.path).map(o=>({decision:JSON.stringify(t.path[o],null,1).replace(`
}`," }").replace(`{
`,"{").replace(/,\n/g,","),module:o}));return e.jsx(Wt,{children:e.jsx(gt,{columns:er,data:n,sticky:!0})})},ye=({onChange:t,style:n,value:o,...s})=>e.jsx(lt,{as:"textarea",style:n,value:o,onChange:t,...s}),rr=d.div`
  position: relative;
  font-family: 'Roboto';
  min-width: 620px;
  width: 100%;
`,nr=d.div`
  background-color: #2a2a2a;
  padding: 12px;
  width: 100%;
  @media (min-width: 1328px) {
    padding: 20px;
    height: 82px;
    z-index: 9;
  }
`,sr=d.div`
  display: flex;
  width: auto;
  margin: 0 auto;
`,or=d.div`
  flex: 1;
  max-width: 300px;
  margin-left: 10px;
`,ar=d.div`
  margin-top: 10px;
`,ie=d(le)`
  height: 36px;
`,Fe=d.div`
  font-size: 16px;
  font-weight: bold;
  color: ${u.grey100};
`,Le=d.div`
  height: calc(100vh - 14rem);
  @media (max-width: 1328px) {
    height: calc(100vh - 19.4rem);
  }
  position: relative;
  overflow: ${({$overflow:t})=>t||"auto"};
  overflow-x: hidden;
  flex: 1;
  max-width: 50%;
  padding: 20px;
  ${({$left:t,$right:n})=>{if(t)return N`
        border-right: 1px solid ${u.grey20};
      `;if(n)return N`
        margin-right: 15px;
      `}}
`,ir=d.div`
  border-width: 0px;
  width: 13px;
  height: 22px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;
  border-color: #414141;
  border-bottom-left-radius: 6px;
  background-color: #121212;
  background-size: cover;
  margin-bottom: -10px;
`,$=d.div`
  flex: 1;
  margin-top: ${({$marginTop:t})=>`${t}px`};
  margin-left: ${({$marginLeft:t})=>`${t}px`};
  margin-bottom: ${({$marginBottom:t=20})=>`${t}px`};
`,Me=d.div`
  font-size: 30px;
  margin: 5px 5px 0;
`,lr=d.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  label {
    font-size: 16px;
  }
  > div {
    height: 40px;
  }
`,cr=d.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`,ur=d.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,dr=d(ct)`
  height: 24px;
  line-height: 50%;
  &:active {
    box-shadow: 0 5px ${u.grey20};
    transform: translateY(4px);
  }
`,xr=d(q)`
  margin-top: 28px;
`,hr=d.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
`,pr=d.div`
  width: 100%;
  display: inline-flex;
  border-bottom: 1px solid ${u.grey30};
  margin-bottom: 8px;
`,ae=d(q)`
  margin-left: 20px;
  margin-top: 28px;
  margin-bottom: 0;
  padding-bottom: 12px;
  cursor: pointer;
  white-space: nowrap;
  ${({$active:t})=>N`
      color: ${u.grey70};
      &:hover {
        color: ${u.grey100};
      }
      ${t&&`color: ${u.grey100};
        border-bottom: 1px solid ${u.indogoAccent4};
        `}
    `}
`,ze=d(We)`
  min-height: 252px;
  height: calc(100vh - 640px);
`,yr=d(ye)`
  border-color: ${({$hasError:t})=>t?u.mojoAccent3:u.grey40} !important;
  min-height: 252px;
  height: calc(100vh - 640px);
`,De=d.div`
  height: 100%;
  .monaco-editor {
    position: absolute !important;
  }
`,ve=d.div`
  margin-bottom: 12px;
`,mr=d.div`
  margin-top: -10px;
`,de=({children:t})=>e.jsxs("div",{children:[e.jsx(mr,{children:e.jsx(ir,{})}),t]}),Te=()=>{const{decisions:t,setDecisions:n}=be(),{policyContextError:o}=ue();return e.jsx(de,{children:e.jsx(z,{$centered:!0,$marginLeft:20,children:e.jsx($,{children:e.jsx(le,{error:o,label:"Decisions",value:t,onChange:s=>n(s.target.value)})})})})},fe=()=>{const{objectType:t,setObjectInstance:n,setObjectType:o,setPermission:s,setRelationType:a}=je(),{resourceContext:x,setResourceContext:b}=be(),{resourceContextError:g}=ue(),{data:j}=Ge({objectType:t}),C=r.useMemo(()=>{var v;return t===void 0||t===""?[]:((v=j==null?void 0:j.results)==null?void 0:v.map(l=>({label:l.displayName||l.name,value:l.name})))||[]},[j==null?void 0:j.results,t]),{data:E}=Xe(),m=r.useMemo(()=>{var v;return((v=E==null?void 0:E.results)==null?void 0:v.filter(l=>l.objectType===t).map(l=>({label:l.displayName||l.name,value:l.name})))||[]},[t,E==null?void 0:E.results]);return e.jsxs($,{children:[e.jsx(q,{children:"Resource Context"}),e.jsx(yr,{$hasError:!!g,placeholder:'{ "id": "123" }',rows:10,value:x,onChange:v=>{const l=v.target.value;b(l),Ye(l,o,n,a,m,s,C)},onPaste:v=>{const l=v.clipboardData.getData("Text");Ye(l,o,n,a,m,s,C)}})]})},Ye=(t,n,o,s,a,x,b)=>{let g={object_key:"",object_type:"",permission:"",relation:""};try{g=JSON.parse(t!==""?t:"{}")}catch{}const j=g.object_type||"",C=g.object_key,E=g.relation,m=g.permission;n(j),o({label:C,value:C}),s(a.find(v=>v.value===E)||null),x(b.find(v=>v.value===m)||null)},Qe=[{label:"PATH_SEPARATOR_DOT",value:"PATH_SEPARATOR_DOT"},{label:"PATH_SEPARATOR_SLASH",value:"PATH_SEPARATOR_SLASH"}],gr=()=>{const{options:t,pathFreeText:n,setOptions:o,setPathFreeText:s}=vt();return e.jsxs("div",{children:[e.jsx($,{children:e.jsx(W,{label:"Options",name:"decisiontree-options",options:Qe,value:Qe.find(({value:a})=>t===a),onChange:a=>{a!=null&&a.value&&o(a==null?void 0:a.value)}})}),e.jsx(ve,{children:e.jsx(q,{children:"Policy Context"})}),e.jsx(de,{children:e.jsx(z,{$centered:!0,$marginLeft:20,children:e.jsx($,{children:e.jsx(le,{label:"Path",placeholder:"Policy path",value:n,onChange:a=>s(a.target.value||"")})})})}),e.jsx(Te,{}),e.jsx(fe,{})]})},br=({policyModules:t})=>{const{pathSelect:n,setPathSelect:o}=Ze(),s=r.useMemo(()=>t.map(a=>({label:a.package_path,value:a.package_path})),[t]);return r.useEffect(()=>{!n&&s&&s.length>0&&o(String(s[0].value))},[n,s,o]),e.jsxs("div",{children:[e.jsx(ve,{children:e.jsx(q,{children:"Policy Context"})}),e.jsx(de,{children:e.jsx(z,{$centered:!0,$marginLeft:20,children:e.jsx($,{children:e.jsx(W,{label:"Path",name:"path-select",options:s,value:s.find(a=>a.value===n),onChange:a=>{a!=null&&a.value&&o(String(a.value))}})})})}),e.jsx(Te,{}),e.jsx(fe,{})]})},jr=d.div`
  display: flex;
  vertical-align: middle;
`,tt=d.input.attrs({type:"checkbox"})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  display: block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
`,Cr=d.svg`
  fill: none;
  stroke: ${u.fullWhite};
  stroke-width: 2px;
`,vr=d.div`
  display: inline-block;
  border: 1px solid ${t=>t.checked?u.primary:u.grey50};
  ${({$hasLabel:t})=>t?"margin-right: 10px;":""}
  width: 16px;
  height: 16px;
  background: ${t=>t.checked?u.primary:"transparent"};
  display: flex;
  transition: all 150ms;
  ${tt}:focus + & {
    box-shadow: 0 0 0 3px ${u.grey40};
  }
  ${({$disabled:t})=>t?N`
          pointer-events: none;
          background-color: ${u.grey10};
          border-color: ${u.grey30};
          svg {
            stroke: ${u.grey40};
          }
        `:""};
`,Tr=d(q)`
  display: flex;
  margin-bottom: 0px;
  align-items: center;
`,he=({checked:t,className:n,disabled:o,label:s,onChange:a,...x})=>{const b=r.useCallback(g=>a==null?void 0:a(g.target.checked),[a]);return e.jsx(jr,{children:e.jsxs(Tr,{$small:!0,children:[e.jsx(tt,{checked:t,disabled:o,onChange:b,...x}),e.jsx(vr,{$disabled:o,$hasLabel:!!s,checked:t===void 0?!1:t,className:n,children:t&&e.jsx(Cr,{viewBox:"0 0 24 24",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})}),s]})})},fr=()=>{const t=Tt(),{input:n,pathFreeText:o,query:s,queryMetrics:a,queryTrace:x,queryTraceLevel:b,queryTraceSummary:g,setInput:j,setPathFreeText:C,setQuery:E,setQueryMetrics:m,setQueryTrace:v,setQueryTraceLevel:l,setQueryTraceSummary:i}=t,p=[{label:"TRACE_LEVEL_NOTES",value:"TRACE_LEVEL_NOTES"},{label:"TRACE_LEVEL_OFF",value:"TRACE_LEVEL_OFF"},{label:"TRACE_LEVEL_FULL",value:"TRACE_LEVEL_FULL"},{label:"TRACE_LEVEL_FAILS",value:"TRACE_LEVEL_FAILS"}];return e.jsxs(e.Fragment,{children:[e.jsxs($,{children:[e.jsx(q,{htmlFor:"queryOptions",children:"Options"}),e.jsxs(lr,{children:[e.jsxs(cr,{children:[e.jsx(he,{checked:x,label:"Trace",onChange:v}),x&&e.jsx(W,{name:"trace-select",options:p,value:p.find(f=>f.value===b)||p[0],onChange:f=>{f!=null&&f.value&&l(f.value)}})]}),e.jsx(he,{checked:g,label:"Trace Summary",onChange:i}),e.jsx(he,{checked:a,label:"Metrics",onChange:m})]})]}),e.jsx(ve,{children:e.jsx(q,{children:"Policy Context"})}),e.jsx(de,{children:e.jsx(z,{$centered:!0,$marginLeft:20,children:e.jsx($,{children:e.jsx(le,{label:"Path",placeholder:"Policy path",value:o||"",onChange:f=>C(f.target.value||"")})})})}),e.jsx(Te,{}),e.jsxs($,{children:[e.jsx(q,{htmlFor:"query",children:"Query"}),e.jsx(ye,{id:"query",placeholder:"x = data; y = input",rows:10,value:String(s),onChange:f=>{E(f.target.value)}})]}),e.jsxs($,{children:[e.jsx(q,{htmlFor:"input",children:"Input"}),e.jsx(ye,{id:"input",placeholder:'{ "foo": "bar" }',rows:10,value:String(n),onChange:f=>{j(f.target.value)}})]}),e.jsx(fe,{})]})},Er=()=>{const{objectInstance:t,objectType:n,relationType:o,setObjectInstance:s,setObjectType:a,setRelationType:x,setSubjectType:b}=je(),{identity:g,request:j,setIdentity:C,setType:E}=Ce(),{resourceContext:m,setResourceContext:v}=be(),{setPathSelect:l}=Ze(),{data:i}=bt();r.useEffect(()=>{b("user")});const{data:p}=Xe(),f=r.useMemo(()=>{var y;return(y=p==null?void 0:p.results)==null?void 0:y.filter(T=>T.objectType===n).map(T=>({label:T.displayName||T.name,value:T.name}))},[n,p]),I=r.useMemo(()=>{var y;return((y=i==null?void 0:i.results)==null?void 0:y.map(T=>({label:T.displayName||T.name,value:T.name})))||[]},[i==null?void 0:i.results]),{data:k}=Ge({objectType:n}),F=r.useMemo(()=>{var y;return n===void 0||n===""?[]:((y=k==null?void 0:k.results)==null?void 0:y.map(T=>({label:T.displayName||T.name,value:T.name})))||[]},[k==null?void 0:k.results,n]),L=[{label:"Relations",options:f||[]},{label:"Permissions",options:F||[]}];return e.jsxs(e.Fragment,{children:[e.jsx(z,{$centered:!0,children:e.jsx($,{children:e.jsx(ie,{label:"Subject",placeholder:"Identity",value:g||"",onChange:y=>{C(y.target.value),E("IDENTITY_TYPE_SUB")}})})}),e.jsxs(z,{$centered:!0,children:[e.jsx($,{children:e.jsx(W,{label:"Object Type",options:I,value:I.find(({value:y})=>y===n),onChange:y=>{y!=null&&y.value&&(v(JSON.stringify({...JSON.parse(m!==""?m:"{}"),object_id:"",object_type:String(y.value)},null,2)),a(String(y.value)),s(null),x(null))}})}),e.jsx($,{$marginLeft:20,children:e.jsx(ar,{children:e.jsx(ie,{label:"Object ID",placeholder:"Object ID",value:(t==null?void 0:t.value)||"",onChange:y=>{s({label:y.target.value,value:y.target.value}),v(JSON.stringify({...JSON.parse(m!==""?m:"{}"),object_id:String(y.target.value)},null,2))}})})})]}),j==="CHECK"&&e.jsx($,{children:e.jsx(W,{label:"Relation",modifyCustomStyle:()=>jt,options:L,value:o,onChange:y=>{x(y),l("rebac.check");const T=JSON.parse(m!==""?m:"{}");delete T.permission,v(JSON.stringify({...T,relation:String(y==null?void 0:y.value)},null,2))}})})]})},He=[{label:"Anonymous",value:"IDENTITY_TYPE_NONE"},{label:"JWT",value:"IDENTITY_TYPE_JWT"},{label:"Subject",value:"IDENTITY_TYPE_SUB"},{label:"Manual",value:"IDENTITY_TYPE_MANUAL"}],pe={CHECK:"api/V2/authz/is",DECISIONTREE:"api/V2/authz/decisiontree",IS:"api/V2/authz/is",QUERY:"api/V2/authz/query"},Je=[{foreground:"#A8FF60",token:"constant"},{foreground:"#FF66FF",token:"number"},{foreground:"#FF66FF",token:"number.hex"},{foreground:"#96CBFE",token:"annotation"},{foreground:"#96CBFE",token:"type"},{foreground:"#CCCCCC",token:"delimiter"},{foreground:"#CCCCCC",token:"delimiter.html"},{foreground:"#CCCCCC",token:"delimiter.xml"},{foreground:"#CCCCCC",token:"editorBracketHighlight"},{foreground:"#A8FF60",token:"metatag.content.html"},{foreground:"#96CBFE",token:"key"},{foreground:"#96CBFE",token:"string.key.json"},{foreground:"#A8FF60",token:"string.value.json"},{foreground:"#A8FF60",token:"attribute.value.unit"},{foreground:"#A8FF60",token:"attribute.value.html"},{foreground:"#A8FF60",token:"attribute.value.xml"},{foreground:"#A8FF60",token:"string"},{foreground:"#A8FF60",token:"string.html"},{foreground:"#A8FF60",token:"string.sql"},{foreground:"#A8FF60",token:"string.yaml"},{foreground:"#99CC99",token:"keyword"},{foreground:"#99CC99",token:"keyword.json"},{foreground:"#99CC99",token:"keyword.flow"},{foreground:"#99CC99",token:"keyword.flow.scss"}];function Sr(t){return(t==null?void 0:t.path)!==void 0}const kr=({isRebac:t,onRequestChange:n,onSubmit:o,output:s,policyModules:a,requestBody:x})=>{const[b,g]=r.useState(""),{copyCurl:j}=Vt(JSON.stringify(x),b||pe.IS),C=r.useRef(null),{identity:E,queryMetrics:m,queryTrace:v,queryTraceSummary:l,request:i,setIdentity:p,setRequest:f,setType:I,type:k}=Ce(),{policyContextError:F,resourceContextError:L}=ue(),{setSubjectInstance:y}=je(),T=r.useMemo(()=>t?[{label:"Check ",value:S.CHECK},{label:"Is",value:S.IS},{label:"decisiontree",value:S.DECISIONTREE},{label:"query",value:S.QUERY}]:[{label:"Is",value:S.IS},{label:"decisiontree",value:S.DECISIONTREE},{label:"query",value:S.QUERY}],[t]),D=(h,_)=>{_.editor.setTheme("topaz"),C.current=h};r.useEffect(()=>{if(!i){const h=T[0].value;f(h),g(pe[h])}},[t,i,T,f,g]);const[O,P]=r.useState("Results"),Y=s==null?void 0:s.response,Q=s==null?void 0:s.metrics,H=s==null?void 0:s.trace,J=s==null?void 0:s.trace_summary,A=r.useMemo(()=>{if(i==="QUERY")switch(O){case"Metrics":return Q;case"Results":return Y;case"Trace":return H;case"Trace Summary":return J;default:return}},[O,Q,Y,H,J,i]);return r.useEffect(()=>{var _;let h;i===S.QUERY?h=JSON.stringify(A,null,2):h=JSON.stringify(s,null,2),(_=C.current)==null||_.setValue(h)},[s,A,i]),r.useEffect(()=>P("Results"),[s]),r.useEffect(()=>{(!m&&O==="Metrics"||!v&&O==="Trace"||!l&&O==="Trace Summary")&&P("Results")},[O,m,v,l]),e.jsx(e.Fragment,{children:e.jsxs(ur,{children:[e.jsx(nr,{children:e.jsxs(z,{$centered:!0,style:{height:"100%"},children:[e.jsxs(z,{$centered:!0,$flex:!0,style:{marginRight:20},children:[e.jsx(Fe,{children:"REQUEST:"}),e.jsx(or,{children:e.jsx(W,{isSearchable:!1,modifyCustomStyle:h=>({...h,option:(_,{data:X,isDisabled:B,isFocused:U,isSelected:Z})=>({..._,":active":{..._[":active"],backgroundColor:u.grey40},backgroundColor:B?u.grey20:U?u.grey40:Z?u.grey20:u.grey20,borderBottom:X.value==="CHECK"?`2px ${u.grey30} solid`:"",borderLeft:Z?`5px solid ${u.indogoAccent3}`:"5px solid transparent",color:U?u.grey100:u.grey70,cursor:B?"not-allowed":"default",fontSize:14,height:"100%",lineHeight:"20px",minHeight:36,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"})}),options:T,value:T.find(({value:h})=>h===i),onChange:h=>{(h==null?void 0:h.value)!==i&&(n==null||n()),h!=null&&h.value&&(f(h.value),g(pe[h.value]))}})})]}),e.jsx(Ct,{disabled:!!F||!!L,onSubmit:o}),e.jsx("div",{style:{flex:1,marginLeft:20},children:e.jsx(Fe,{children:"OUTPUT:"})})]})}),e.jsx(rr,{children:e.jsxs(sr,{children:[e.jsxs(Le,{$left:!0,children:[i===S.CHECK?e.jsx(Er,{}):e.jsxs(z,{$centered:!0,children:[e.jsx($,{children:e.jsx(W,{label:"Identity Context",options:He,value:He.find(({value:h})=>k===h),onChange:h=>{h!=null&&h.value&&(h.value===oe.IDENTITY_TYPE_NONE&&y(null),I(h.value),p(null))}})}),k===oe.IDENTITY_TYPE_SUB&&e.jsxs(e.Fragment,{children:[e.jsx(Me,{children:":"}),e.jsx($,{$marginTop:32,children:e.jsx(ie,{placeholder:"Identity",value:E||"",onChange:h=>p(h.target.value)})})]}),(k===oe.IDENTITY_TYPE_MANUAL||k===oe.IDENTITY_TYPE_JWT)&&e.jsxs(e.Fragment,{children:[e.jsx(Me,{children:":"}),e.jsx($,{$marginTop:32,children:e.jsx(ie,{placeholder:"Identity",value:E||"",onChange:h=>p(h.target.value)})})]})]}),i===S.DECISIONTREE&&e.jsx(gr,{}),i===S.IS&&!!a&&e.jsx(br,{policyModules:a}),i===S.QUERY&&e.jsx(fr,{})]}),e.jsxs(Le,{$right:!0,children:[e.jsxs(hr,{children:[e.jsx(q,{children:"Request"}),e.jsx(dr,{disabled:!x,size:"sm",variant:"secondary",onClick:j,children:"Copy as cURL"})]}),e.jsx(We,{$height:262,children:e.jsx(ge,{language:"json",children:JSON.stringify(x,null,2)})}),(i===S.IS||i===S.CHECK)&&s&&e.jsxs(e.Fragment,{children:[e.jsx(xr,{children:"Results"}),e.jsx(ze,{children:e.jsx(De,{children:e.jsx(Ae,{defaultLanguage:"json",defaultValue:JSON.stringify(s,null,2),layoutOptions:{automaticLayout:!0,fontSize:14,lineNumbers:"off",minimap:{autohide:!0},readOnly:!0,scrollBeyondLastLine:!1},themeRules:Je,onMount:D})})})]}),i===S.DECISIONTREE&&Sr(s)&&e.jsx(tr,{data:s}),i===S.QUERY&&A&&e.jsxs(e.Fragment,{children:[e.jsxs(pr,{children:[e.jsx(ae,{$active:O==="Results",onClick:()=>P("Results"),children:"Results"}),!!v&&e.jsx(ae,{$active:O==="Trace",onClick:()=>P("Trace"),children:"Trace"}),!!l&&e.jsx(ae,{$active:O==="Trace Summary",onClick:()=>P("Trace Summary"),children:"Trace Summary"}),!!m&&e.jsx(ae,{$active:O==="Metrics",onClick:()=>P("Metrics"),children:"Metrics"})]}),e.jsx(ze,{children:e.jsx(De,{children:e.jsx(Ae,{defaultLanguage:"json",defaultValue:JSON.stringify(A,null,2),layoutOptions:{automaticLayout:!0,fontSize:14,lineNumbers:"off",minimap:{autohide:!0},readOnly:!0,scrollBeyondLastLine:!1},themeRules:Je,onMount:D})})})]})]})]})})]})})},Ir=({isRebac:t,selectedModuleId:n})=>{const{mutateAsync:o}=Jt(),{mutateAsync:s}=Yt(),{mutateAsync:a}=Mt(),[x,b]=r.useState(),[g,j]=r.useState(),{data:C}=et({field_mask:"id,package_path,raw"}),[E,m]=r.useState(""),v=r.useMemo(()=>{if(!(!C||!C.result))return C.result.map(w=>{var R;return{id:w.id,package_path:(R=w.package_path)==null?void 0:R.replace("data.",""),raw:w.raw}}).sort((w,R)=>w.package_path<R.package_path?-1:1)},[C]),l=w=>({CHECK:s,DECISIONTREE:a,IS:s,QUERY:o})[w],i=async(w,R)=>{const te=l(w);try{const K=await te({data:R});b(K)}catch(K){b(ut(K).message)}finally{window.scrollTo(0,0)}},p=Ce(),f=p.pathSelect,I=p.request,k=p.decisions,F=p.resourceContext,L=p.input,y=p.query,T=p.queryMetrics,D=p.queryTrace,O=p.queryTraceLevel,P=p.queryTraceSummary,Y=p.pathFreeText,Q=p.options,H=p.identity,J=p.type,{setPolicyContextError:A,setResourceContextError:h}=ue(),_=r.useCallback(()=>{h==null||h(void 0);try{return{...F&&{resource_context:JSON.parse(F||"{}")}}}catch{return h("Resource context is not a valid JSON."),{}}},[F,h]),X=r.useCallback(()=>{A(void 0);try{return I===S.CHECK?{policy_context:{decisions:["allowed"],path:"rebac.check"}}:{...k&&{policy_context:{decisions:JSON.parse(k||"[]"),path:I==="IS"?f:Y}}}}catch(w){return A(`Decisions: "${k}" is not a valid array. 
 Error: ${w}`),{}}},[k,Y,f,I,A]),B=r.useCallback(()=>({identity_context:{identity:H,type:J}}),[H,J]),U=r.useCallback(()=>({metrics:!!T,trace:D?O:void 0,trace_summary:!!P}),[T,D,O,P]);r.useEffect(()=>{const w={},R=_(),te=X(),K=B(),re=U(),ne={...K,...I===S.DECISIONTREE&&{options:{path_separator:Q}},...I===S.QUERY&&y&&{query:y},...I===S.QUERY&&L&&{input:L},...I===S.QUERY&&{options:re},...R,...te,...w};j(ne)},[_,X,B,U,I,Q,y,L]);const Z=()=>i(I,g);return e.jsx(kr,{"data-testid":"evaluator-component",filter:E,isRebac:t,output:x,policyModules:v,requestBody:g,selectedModuleId:n,setFilter:m,onRequestChange:()=>b(""),onSubmit:Z})},Be=d.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  ${({$flex:t})=>t?"flex: 1":""};
  @media (max-width: 1028px) {
    margin-bottom: 30px;
    flex: 1;
    margin-right: auto;
    flex-direction: column;
  }
`,Ue=d.div`
  color: ${u.grey100};
  ${({$flex:t})=>t?"flex: 1":""};
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  @media (min-width: 1028px) {
    min-height: 160px;
    max-height: calc(100vh - 18.6rem);
    padding: 0 10px;
    ${({$hasBorderLeft:t})=>t?`border-left: 1px solid ${u.grey20}; padding: 0 20px;`:""}
    ${({$fixed:t})=>t?N`
            position: fixed;
            margin-top: -2px;
            width: 50%;
            background-color: ${u.primaryBlack};
            display: flex;
          `:""}
  }

  @media (max-width: 1028px) {
    min-height: 130px;
    pre {
      padding: 0 20px;
    }
    ${({$fixed:t,$shouldPad:n})=>t?N`
            position: fixed;
            top: ${n?169:0}px;
            width: 100%;
            z-index: 2;
            background-color: #121212;
          `:N``}
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,Or=d.div`
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  text-align: start;
  font-weight: 600;
  a {
    min-width: 318px;
    padding: ${({$isSmall:t})=>t?"9px 20":20}px;
    background-color: ${u.grey20};
    color: ${u.grey20};
    &:hover {
      background-color: ${u.grey40};
      color: ${u.grey100};
      text-decoration: none;
    }
    font-size: 14px;
  }
`,Ke=d.div`
  border-bottom: 2px solid ${u.grey40};
  background-color: ${u.primaryBlack};
  color: ${u.grey100};
  font-weight: bold;
  font-size: 14px;
  padding: 20px 0px;
  display: flex;
  align-items: center;
  ${({height:t})=>t?`height: ${t}px`:""};
`,wr=()=>{const[t,n]=r.useState(""),{data:o,isLoading:s}=et({field_mask:"id,package_path,raw"}),a=r.useMemo(()=>{if(!o||!o.result)return[];const g=o.result.map(j=>{var C;return{id:j.id,package_path:(C=j.package_path)==null?void 0:C.replace("data.",""),raw:j.raw}}).sort((j,C)=>j.package_path<C.package_path?-1:1);return n(g[0].id||""),g},[o]),x=g=>{var j;return((j=a.find(C=>C.id===g))==null?void 0:j.raw)||""},b=()=>a.length===0?null:e.jsx(e.Fragment,{children:a==null?void 0:a.map(g=>e.jsx(Or,{children:e.jsx(Re.Link,{className:"light-pills",eventKey:g.id,children:e.jsx("span",{children:g.package_path})})},g.id))});return s?null:e.jsxs(e.Fragment,{children:[e.jsxs(Be,{style:{marginLeft:20},children:[e.jsx(Ke,{children:"Module Name"}),e.jsx(Ue,{$flex:!0,$paddingTop:18,children:e.jsx(Re,{activeKey:t,className:"flex-column",defaultActiveKey:t,variant:"pills",onSelect:g=>{n(g||"")},children:e.jsx(b,{})})})]}),e.jsx(Be,{children:e.jsxs(e.Fragment,{children:[e.jsx(Ke,{children:"Definition"}),e.jsx(Ue,{$flex:!0,$hasBorderLeft:!0,$paddingTop:18,children:e.jsx(ge,{language:"rego",children:x(t)})})]})})]})},Pr=()=>e.jsx(r.Suspense,{fallback:e.jsx(se,{}),children:e.jsx(ft,{children:e.jsxs(dt,{children:[e.jsx(ee,{element:e.jsx(se,{}),path:"evaluator",children:e.jsx(ee,{element:e.jsx(Ir,{}),path:""})}),e.jsx(ee,{element:e.jsx(se,{}),path:"modules",children:e.jsx(ee,{element:e.jsx(wr,{}),path:""})}),e.jsx(ee,{element:e.jsx(se,{}),path:"docs",children:e.jsx(ee,{element:e.jsx(qt,{}),path:""})}),e.jsx(ee,{element:e.jsx(xt,{replace:!0,to:"modules"}),index:!0})]})})});export{Pr as default};
