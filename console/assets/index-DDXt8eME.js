import{u as we,d as s,j as e,F as $e,t as u,l as G,n as Z,B as Pe,L as O,x as Ae}from"./index-D2xtyF2C.js";import{a as d}from"./monaco-react-D7gXaprf.js";import{u as Fe,a as Ne,b as Le,c as De}from"./authorizer-CNs0acHf.js";import{u as ae,a as ee,b as ie,c as Ye,d as Te,e as qe,f as le,A as x}from"./index-BR01kPNn.js";import{H as Ee}from"./index-CIoVgA1L.js";import{M as he}from"./index-BKcx7luV.js";import{T as Se,c as Me}from"./styles-xD8eftHf.js";import{R as $}from"./index-BlFv0IXz.js";import{S as N,c as ze}from"./index-BsVfCwZu.js";import{c as He}from"./index-CQpFWyqO.js";import{u as Ue,g as Qe,D as Be}from"./index-Bogjaa8u.js";import{b as ke,c as Ie,u as Je}from"./customQuery-BPNvNjme.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./rest-BGxiHZjw.js";import"./toConsumableArray-RPlvpPR3.js";import"./react-select.esm-xMSg5WYo.js";import"./manifest-coaC7_nB.js";import"./directory-Drqp5ynE.js";const K={IDENTITY_TYPE_JWT:"IDENTITY_TYPE_JWT",IDENTITY_TYPE_MANUAL:"IDENTITY_TYPE_MANUAL",IDENTITY_TYPE_NONE:"IDENTITY_TYPE_NONE",IDENTITY_TYPE_SUB:"IDENTITY_TYPE_SUB"},Ve=(t,n)=>{const{authorizerApiKey:l,authorizerServiceUrl:r}=we(),o=l?`basic ${l}`:"",y=d.useCallback(()=>`curl '${r}/${n}' \\
  -H 'authorization: ${o}' \\
  -H 'content-type: application/json' \\
  --data-raw '${t}' \\
  `,[r,o,t,n]);return{copyCurl:()=>He(y())}},Ke=s.div`
  margin-top: 32px;
  min-height: 252px;
  height: calc(100vh - 642px);
`,pe=s.div`
  min-width: 180px;
  height: 100%;
  display: flex;
  align-items: flex-start;
`,We=s.div`
  padding: 14px 2px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-width: 20vw;
`,Ge=s.div`
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
`,Xe=s.div`
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2em;
`,Ze=[{cell:({row:t})=>e.jsx(pe,{children:e.jsx(We,{children:e.jsx(Xe,{children:t.original.module})})}),header:"Module"},{cell:({row:t})=>e.jsx(pe,{children:e.jsx(Ge,{children:e.jsx(Ee,{language:"json",children:t.original.decision})})}),header:"Decision"}],et=({data:t})=>{const n=Object.keys(t.path).map(r=>({decision:JSON.stringify(t.path[r],null,1).replace(`
}`," }").replace(`{
`,"{").replace(/,\n/g,","),module:r})),l=Ue({columns:Ze,data:n,getCoreRowModel:Qe()});return e.jsx(Ke,{children:e.jsx(Be,{table:l})})},se=({onChange:t,style:n,value:l,...r})=>e.jsx($e,{as:"textarea",style:n,value:l,onChange:t,...r}),tt=s.div`
  position: relative;
  font-family: 'Roboto';
  min-width: 620px;
  width: 100%;
`,rt=s.div`
  background-color: #2a2a2a;
  padding: 12px;
  width: 100%;
  @media (min-width: 1328px) {
    padding: 20px;
    height: 82px;
    z-index: 9;
  }
`,nt=s.div`
  display: flex;
  width: auto;
  margin: 0 auto;
`,ot=s.div`
  flex: 1;
  max-width: 300px;
  margin-left: 10px;
`,st=s.div`
  margin-top: 10px;
`,X=s(Z)`
  height: 36px;
`,xe=s.div`
  font-size: 16px;
  font-weight: bold;
  color: ${u.grey100};
`,ge=s.div`
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
  ${({$left:t,$right:n})=>{if(t)return G`
        border-right: 1px solid ${u.grey20};
      `;if(n)return G`
        margin-right: 15px;
      `}}
`,at=s.div`
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
`,C=s.div`
  flex: 1;
  margin-top: ${({$marginTop:t})=>`${t}px`};
  margin-left: ${({$marginLeft:t})=>`${t}px`};
  margin-bottom: ${({$marginBottom:t=20})=>`${t}px`};
`,ye=s.div`
  font-size: 30px;
  margin: 5px 5px 0;
`,it=s.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  label {
    font-size: 16px;
  }
  > div {
    height: 40px;
  }
`,lt=s.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`,ct=s.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,ut=s(Pe)`
  height: 24px;
  line-height: 50%;
  &:active {
    box-shadow: 0 5px ${u.grey20};
    transform: translateY(4px);
  }
`,dt=s(O)`
  margin-top: 28px;
`,ht=s.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
`,pt=s.div`
  width: 100%;
  display: inline-flex;
  border-bottom: 1px solid ${u.grey30};
  margin-bottom: 8px;
`,W=s(O)`
  margin-left: 20px;
  margin-top: 28px;
  margin-bottom: 0;
  padding-bottom: 12px;
  cursor: pointer;
  white-space: nowrap;
  ${({$active:t})=>G`
      color: ${u.grey70};
      &:hover {
        color: ${u.grey100};
      }
      ${t&&`color: ${u.grey100};
        border-bottom: 1px solid ${u.indogoAccent4};
        `}
    `}
`,me=s(Se)`
  min-height: 252px;
  height: calc(100vh - 640px);
`,xt=s(se)`
  border-color: ${({$hasError:t})=>t?u.mojoAccent3:u.grey40} !important;
  min-height: 252px;
  height: calc(100vh - 640px);
`,ve=s.div`
  height: 100%;
  .monaco-editor {
    position: absolute !important;
  }
`,ce=s.div`
  margin-bottom: 12px;
`,gt=s.div`
  margin-top: -10px;
`,te=({children:t})=>e.jsxs("div",{children:[e.jsx(gt,{children:e.jsx(at,{})}),t]}),ue=()=>{const{decisions:t,setDecisions:n}=ae(),{policyContextError:l}=ee();return e.jsx(te,{children:e.jsx($,{$centered:!0,$marginLeft:20,children:e.jsx(C,{children:e.jsx(Z,{error:l,label:"Decisions",value:t,onChange:r=>n(r.target.value)})})})})},de=()=>{const{objectType:t,setObjectInstance:n,setObjectType:l,setPermission:r,setRelationType:o}=ie(),{resourceContext:y,setResourceContext:f}=ae(),{resourceContextError:g}=ee(),{data:S}=ke({objectType:t}),v=d.useMemo(()=>t===void 0||t===""?[]:S?.results?.map(c=>({label:c.displayName||c.name,value:c.name}))||[],[S?.results,t]),{data:j}=Ie(),m=d.useMemo(()=>j?.results?.filter(c=>c.objectType===t).map(c=>({label:c.displayName||c.name,value:c.name}))||[],[t,j?.results]);return e.jsxs(C,{children:[e.jsx(O,{children:"Resource Context"}),e.jsx(xt,{$hasError:!!g,placeholder:'{ "id": "123" }',rows:10,style:{background:u.primaryBlack},value:y,onChange:c=>{const b=c.target.value;f(b),Ce(b,l,n,o,m,r,v)},onPaste:c=>{const b=c.clipboardData.getData("Text");Ce(b,l,n,o,m,r,v)}})]})},Ce=(t,n,l,r,o,y,f)=>{let g={object_key:"",object_type:"",permission:"",relation:""};try{g=JSON.parse(t!==""?t:"{}")}catch{}const S=g.object_type||"",v=g.object_key,j=g.relation,m=g.permission;n(S),l({label:v,value:v}),r(o.find(c=>c.value===j)||null),y(f.find(c=>c.value===m)||null)},fe=[{label:"PATH_SEPARATOR_DOT",value:"PATH_SEPARATOR_DOT"},{label:"PATH_SEPARATOR_SLASH",value:"PATH_SEPARATOR_SLASH"}],yt=()=>{const{options:t,pathFreeText:n,setOptions:l,setPathFreeText:r}=Ye();return e.jsxs("div",{children:[e.jsx(C,{children:e.jsx(N,{label:"Options",name:"decisiontree-options",options:fe,value:fe.find(({value:o})=>t===o),onChange:o=>{o?.value&&l(o?.value)}})}),e.jsx(ce,{children:e.jsx(O,{children:"Policy Context"})}),e.jsx(te,{children:e.jsx($,{$centered:!0,$marginLeft:20,children:e.jsx(C,{children:e.jsx(Z,{label:"Path",placeholder:"Policy path",value:n,onChange:o=>r(o.target.value||"")})})})}),e.jsx(ue,{}),e.jsx(de,{})]})},mt=({policyModules:t})=>{const{pathSelect:n,setPathSelect:l}=Te(),r=d.useMemo(()=>t.map(o=>({label:o.package_path,value:o.package_path})),[t]);return d.useEffect(()=>{!n&&r&&r.length>0&&l(String(r[0].value))},[n,r,l]),e.jsxs("div",{children:[e.jsx(ce,{children:e.jsx(O,{children:"Policy Context"})}),e.jsx(te,{children:e.jsx($,{$centered:!0,$marginLeft:20,children:e.jsx(C,{children:e.jsx(N,{label:"Path",name:"path-select",options:r,value:r.find(o=>o.value===n),onChange:o=>{o?.value&&l(String(o.value))}})})})}),e.jsx(ue,{}),e.jsx(de,{})]})},vt=s.div`
  display: flex;
  vertical-align: middle;
`,Re=s.input.attrs({type:"checkbox"})`
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
`,Ct=s.svg`
  fill: none;
  stroke: ${u.fullWhite};
  stroke-width: 2px;
`,ft=s.div`
  display: inline-block;
  border: 1px solid ${t=>t.checked?u.primary:u.grey50};
  ${({$hasLabel:t})=>t?"margin-right: 10px;":""}
  width: 16px;
  height: 16px;
  background: ${t=>t.checked?u.primary:"transparent"};
  display: flex;
  transition: all 150ms;
  ${Re}:focus + & {
    box-shadow: 0 0 0 3px ${u.grey40};
  }
  ${({$disabled:t})=>t?G`
          pointer-events: none;
          background-color: ${u.grey10};
          border-color: ${u.grey30};
          svg {
            stroke: ${u.grey40};
          }
        `:""};
`,bt=s(O)`
  display: flex;
  margin-bottom: 0px;
  align-items: center;
`,ne=({checked:t,className:n,disabled:l,label:r,onChange:o,...y})=>{const f=d.useCallback(g=>o?.(g.target.checked),[o]);return e.jsx(vt,{children:e.jsxs(bt,{$small:!0,children:[e.jsx(Re,{checked:t,disabled:l,onChange:f,...y}),e.jsx(ft,{$disabled:l,$hasLabel:!!r,checked:t===void 0?!1:t,className:n,children:t&&e.jsx(Ct,{viewBox:"0 0 24 24",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})}),r]})})},jt=()=>{const t=qe(),{input:n,pathFreeText:l,query:r,queryMetrics:o,queryTrace:y,queryTraceLevel:f,queryTraceSummary:g,setInput:S,setPathFreeText:v,setQuery:j,setQueryMetrics:m,setQueryTrace:c,setQueryTraceLevel:b,setQueryTraceSummary:h}=t,k=[{label:"TRACE_LEVEL_NOTES",value:"TRACE_LEVEL_NOTES"},{label:"TRACE_LEVEL_OFF",value:"TRACE_LEVEL_OFF"},{label:"TRACE_LEVEL_FULL",value:"TRACE_LEVEL_FULL"},{label:"TRACE_LEVEL_FAILS",value:"TRACE_LEVEL_FAILS"}];return e.jsxs(e.Fragment,{children:[e.jsxs(C,{children:[e.jsx(O,{htmlFor:"queryOptions",children:"Options"}),e.jsxs(it,{children:[e.jsxs(lt,{children:[e.jsx(ne,{checked:y,label:"Trace",onChange:c}),y&&e.jsx(N,{name:"trace-select",options:k,value:k.find(p=>p.value===f)||k[0],onChange:p=>{p?.value&&b(p.value)}})]}),e.jsx(ne,{checked:g,label:"Trace Summary",onChange:h}),e.jsx(ne,{checked:o,label:"Metrics",onChange:m})]})]}),e.jsx(ce,{children:e.jsx(O,{children:"Policy Context"})}),e.jsx(te,{children:e.jsx($,{$centered:!0,$marginLeft:20,children:e.jsx(C,{children:e.jsx(Z,{label:"Path",placeholder:"Policy path",value:l||"",onChange:p=>v(p.target.value||"")})})})}),e.jsx(ue,{}),e.jsxs(C,{children:[e.jsx(O,{htmlFor:"query",children:"Query"}),e.jsx(se,{id:"query",placeholder:"x = data; y = input",rows:10,value:String(r),onChange:p=>{j(p.target.value)}})]}),e.jsxs(C,{children:[e.jsx(O,{htmlFor:"input",children:"Input"}),e.jsx(se,{id:"input",placeholder:'{ "foo": "bar" }',rows:10,value:String(n),onChange:p=>{S(p.target.value)}})]}),e.jsx(de,{})]})},Tt=()=>{const{objectInstance:t,objectType:n,relationType:l,setObjectInstance:r,setObjectType:o,setRelationType:y,setSubjectType:f}=ie(),{identity:g,request:S,setIdentity:v,setType:j}=le(),{resourceContext:m,setResourceContext:c}=ae(),{setPathSelect:b}=Te(),{data:h}=Je();d.useEffect(()=>{f("user")});const{data:k}=Ie(),p=d.useMemo(()=>k?.results?.filter(a=>a.objectType===n).map(a=>({label:a.displayName||a.name,value:a.name})),[n,k]),A=d.useMemo(()=>h?.results?.map(a=>({label:a.displayName||a.name,value:a.name}))||[],[h?.results]),{data:R}=ke({objectType:n}),L=d.useMemo(()=>n===void 0||n===""?[]:R?.results?.map(a=>({label:a.displayName||a.name,value:a.name}))||[],[R?.results,n]),D=[{label:"Relations",options:p||[]},{label:"Permissions",options:L||[]}];return e.jsxs(e.Fragment,{children:[e.jsx($,{$centered:!0,children:e.jsx(C,{children:e.jsx(X,{label:"Subject",placeholder:"Identity",value:g||"",onChange:a=>{v(a.target.value),j("IDENTITY_TYPE_SUB")}})})}),e.jsxs($,{$centered:!0,children:[e.jsx(C,{children:e.jsx(N,{label:"Object Type",options:A,value:A.find(({value:a})=>a===n),onChange:a=>{a?.value&&(c(JSON.stringify({...JSON.parse(m!==""?m:"{}"),object_id:"",object_type:String(a.value)},null,2)),o(String(a.value)),r(null),y(null))}})}),e.jsx(C,{$marginLeft:20,children:e.jsx(st,{children:e.jsx(X,{label:"Object ID",placeholder:"Object ID",value:t?.value||"",onChange:a=>{r({label:a.target.value,value:a.target.value}),c(JSON.stringify({...JSON.parse(m!==""?m:"{}"),object_id:String(a.target.value)},null,2))}})})})]}),S==="CHECK"&&e.jsx(C,{children:e.jsx(N,{label:"Relation",modifyCustomStyle:()=>ze,options:D,value:l,onChange:a=>{y(a),b("rebac.check");const _=JSON.parse(m!==""?m:"{}");delete _.permission,c(JSON.stringify({..._,relation:String(a?.value)},null,2))}})})]})},be=[{label:"Anonymous",value:"IDENTITY_TYPE_NONE"},{label:"JWT",value:"IDENTITY_TYPE_JWT"},{label:"Subject",value:"IDENTITY_TYPE_SUB"},{label:"Manual",value:"IDENTITY_TYPE_MANUAL"}],oe={CHECK:"api/V2/authz/is",DECISIONTREE:"api/V2/authz/decisiontree",IS:"api/V2/authz/is",QUERY:"api/V2/authz/query"},je=[{foreground:"#A8FF60",token:"constant"},{foreground:"#FF66FF",token:"number"},{foreground:"#FF66FF",token:"number.hex"},{foreground:"#96CBFE",token:"annotation"},{foreground:"#96CBFE",token:"type"},{foreground:"#CCCCCC",token:"delimiter"},{foreground:"#CCCCCC",token:"delimiter.html"},{foreground:"#CCCCCC",token:"delimiter.xml"},{foreground:"#CCCCCC",token:"editorBracketHighlight"},{foreground:"#A8FF60",token:"metatag.content.html"},{foreground:"#96CBFE",token:"key"},{foreground:"#96CBFE",token:"string.key.json"},{foreground:"#A8FF60",token:"string.value.json"},{foreground:"#A8FF60",token:"attribute.value.unit"},{foreground:"#A8FF60",token:"attribute.value.html"},{foreground:"#A8FF60",token:"attribute.value.xml"},{foreground:"#A8FF60",token:"string"},{foreground:"#A8FF60",token:"string.html"},{foreground:"#A8FF60",token:"string.sql"},{foreground:"#A8FF60",token:"string.yaml"},{foreground:"#99CC99",token:"keyword"},{foreground:"#99CC99",token:"keyword.json"},{foreground:"#99CC99",token:"keyword.flow"},{foreground:"#99CC99",token:"keyword.flow.scss"}];function Et(t){return t?.path!==void 0}const St=({isRebac:t,onRequestChange:n,onSubmit:l,output:r,policyModules:o,requestBody:y})=>{const[f,g]=d.useState(""),{copyCurl:S}=Ve(JSON.stringify(y),f||oe.IS),v=d.useRef(null),{identity:j,queryMetrics:m,queryTrace:c,queryTraceSummary:b,request:h,setIdentity:k,setRequest:p,setType:A,type:R}=le(),{policyContextError:L,resourceContextError:D}=ee(),{setSubjectInstance:a}=ie(),_=d.useMemo(()=>t?[{label:"Check ",value:x.CHECK},{label:"Is",value:x.IS},{label:"decisiontree",value:x.DECISIONTREE},{label:"query",value:x.QUERY}]:[{label:"Is",value:x.IS},{label:"decisiontree",value:x.DECISIONTREE},{label:"query",value:x.QUERY}],[t]),M=(i,F)=>{F.editor.setTheme("topaz"),v.current=i};d.useEffect(()=>{if(!h){const i=_[0].value;p(i),g(oe[i])}},[t,h,_,p,g]);const[T,w]=d.useState("Results"),z=r?.response,I=r?.metrics,Y=r?.trace,H=r?.trace_summary,P=d.useMemo(()=>{if(h==="QUERY")switch(T){case"Metrics":return I;case"Results":return z;case"Trace":return Y;case"Trace Summary":return H;default:return}},[T,I,z,Y,H,h]);return d.useEffect(()=>{let i;h===x.QUERY?i=JSON.stringify(P,null,2):i=JSON.stringify(r,null,2),v.current?.setValue(i)},[r,P,h]),d.useEffect(()=>w("Results"),[r]),d.useEffect(()=>{(!m&&T==="Metrics"||!c&&T==="Trace"||!b&&T==="Trace Summary")&&w("Results")},[T,m,c,b]),e.jsx(e.Fragment,{children:e.jsxs(ct,{children:[e.jsx(rt,{children:e.jsxs($,{$centered:!0,style:{height:"100%"},children:[e.jsxs($,{$centered:!0,$flex:!0,style:{marginRight:20},children:[e.jsx(xe,{children:"REQUEST:"}),e.jsx(ot,{children:e.jsx(N,{isSearchable:!1,modifyCustomStyle:i=>({...i,option:(F,{data:J,isDisabled:U,isFocused:Q,isSelected:V})=>({...F,":active":{...F[":active"],backgroundColor:u.grey40},backgroundColor:U?u.grey20:Q?u.grey40:V?u.grey20:u.grey20,borderBottom:J.value==="CHECK"?`2px ${u.grey30} solid`:"",borderLeft:V?`5px solid ${u.indogoAccent3}`:"5px solid transparent",color:Q?u.grey100:u.grey70,cursor:U?"not-allowed":"default",fontSize:14,height:"100%",lineHeight:"20px",minHeight:36,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"})}),options:_,value:_.find(({value:i})=>i===h),onChange:i=>{i?.value!==h&&n?.(),i?.value&&(p(i.value),g(oe[i.value]))}})})]}),e.jsx(Me,{disabled:!!L||!!D,onSubmit:l}),e.jsx("div",{style:{flex:1,marginLeft:20},children:e.jsx(xe,{children:"OUTPUT:"})})]})}),e.jsx(tt,{children:e.jsxs(nt,{children:[e.jsxs(ge,{$left:!0,children:[h===x.CHECK?e.jsx(Tt,{}):e.jsxs($,{$centered:!0,children:[e.jsx(C,{children:e.jsx(N,{label:"Identity Context",options:be,value:be.find(({value:i})=>R===i),onChange:i=>{i?.value&&(i.value===K.IDENTITY_TYPE_NONE&&a(null),A(i.value),k(null))}})}),R===K.IDENTITY_TYPE_SUB&&e.jsxs(e.Fragment,{children:[e.jsx(ye,{children:":"}),e.jsx(C,{$marginTop:32,children:e.jsx(X,{placeholder:"Identity",value:j||"",onChange:i=>k(i.target.value)})})]}),(R===K.IDENTITY_TYPE_MANUAL||R===K.IDENTITY_TYPE_JWT)&&e.jsxs(e.Fragment,{children:[e.jsx(ye,{children:":"}),e.jsx(C,{$marginTop:32,children:e.jsx(X,{placeholder:"Identity",value:j||"",onChange:i=>k(i.target.value)})})]})]}),h===x.DECISIONTREE&&e.jsx(yt,{}),h===x.IS&&!!o&&e.jsx(mt,{policyModules:o}),h===x.QUERY&&e.jsx(jt,{})]}),e.jsxs(ge,{$right:!0,children:[e.jsxs(ht,{children:[e.jsx(O,{children:"Request"}),e.jsx(ut,{disabled:!y,size:"sm",variant:"secondary",onClick:S,children:"Copy as cURL"})]}),e.jsx(Se,{$height:262,children:e.jsx(Ee,{language:"json",children:JSON.stringify(y,null,2)})}),(h===x.IS||h===x.CHECK)&&r&&e.jsxs(e.Fragment,{children:[e.jsx(dt,{children:"Results"}),e.jsx(me,{children:e.jsx(ve,{children:e.jsx(he,{defaultLanguage:"json",defaultValue:JSON.stringify(r,null,2),layoutOptions:{automaticLayout:!0,fontSize:14,lineNumbers:"off",minimap:{autohide:!0},readOnly:!0,scrollBeyondLastLine:!1},themeRules:je,onMount:M})})})]}),h===x.DECISIONTREE&&Et(r)&&e.jsx(et,{data:r}),h===x.QUERY&&P&&e.jsxs(e.Fragment,{children:[e.jsxs(pt,{children:[e.jsx(W,{$active:T==="Results",onClick:()=>w("Results"),children:"Results"}),!!c&&e.jsx(W,{$active:T==="Trace",onClick:()=>w("Trace"),children:"Trace"}),!!b&&e.jsx(W,{$active:T==="Trace Summary",onClick:()=>w("Trace Summary"),children:"Trace Summary"}),!!m&&e.jsx(W,{$active:T==="Metrics",onClick:()=>w("Metrics"),children:"Metrics"})]}),e.jsx(me,{children:e.jsx(ve,{children:e.jsx(he,{defaultLanguage:"json",defaultValue:JSON.stringify(P,null,2),layoutOptions:{automaticLayout:!0,fontSize:14,lineNumbers:"off",minimap:{autohide:!0},readOnly:!0,scrollBeyondLastLine:!1},themeRules:je,onMount:M})})})]})]})]})})]})})},Ut=({isRebac:t,selectedModuleId:n})=>{const{mutateAsync:l}=Fe(),{mutateAsync:r}=Ne(),{mutateAsync:o}=Le(),[y,f]=d.useState(),[g,S]=d.useState(),{data:v}=De({field_mask:"id,package_path,raw"}),[j,m]=d.useState(""),c=d.useMemo(()=>{if(!(!v||!v.result))return v.result.map(E=>({id:E.id,package_path:E.package_path?.replace("data.",""),raw:E.raw})).sort((E,q)=>E.package_path<q.package_path?-1:1)},[v]),b=E=>({CHECK:r,DECISIONTREE:o,IS:r,QUERY:l})[E],h=async(E,q)=>{const re=b(E);try{const B=await re({data:q});f(B)}catch(B){f(Ae(B).message)}finally{window.scrollTo(0,0)}},k=le(),{decisions:p,identity:A,input:R,options:L,pathFreeText:D,pathSelect:a,query:_,queryMetrics:M,queryTrace:T,queryTraceLevel:w,queryTraceSummary:z,request:I,resourceContext:Y,type:H}=k,{setPolicyContextError:P,setResourceContextError:i}=ee(),F=d.useCallback(()=>{i?.(void 0);try{return{...Y&&{resource_context:JSON.parse(Y||"{}")}}}catch{return i("Resource context is not a valid JSON."),{}}},[Y,i]),J=d.useCallback(()=>{P(void 0);try{return I===x.CHECK?{policy_context:{decisions:["allowed"],path:"rebac.check"}}:{...p&&{policy_context:{decisions:JSON.parse(p||"[]"),path:I==="IS"?a:D}}}}catch(E){return P(`Decisions: "${p}" is not a valid array. 
 Error: ${E}`),{}}},[p,D,a,I,P]),U=d.useCallback(()=>({identity_context:{identity:A,type:H}}),[A,H]),Q=d.useCallback(()=>({metrics:!!M,trace:T?w:void 0,trace_summary:!!z}),[M,T,w,z]);d.useEffect(()=>{const E={},q=F(),re=J(),B=U(),_e=Q(),Oe={...B,...I===x.DECISIONTREE&&{options:{path_separator:L}},...I===x.QUERY&&_&&{query:_},...I===x.QUERY&&R&&{input:R},...I===x.QUERY&&{options:_e},...q,...re,...E};S(Oe)},[F,J,U,Q,I,L,_,R]);const V=()=>h(I,g);return e.jsx(St,{"data-testid":"evaluator-component",filter:j,isRebac:t,output:y,policyModules:c,requestBody:g,selectedModuleId:n,setFilter:m,onRequestChange:()=>f(""),onSubmit:V})};export{Ut as default};
