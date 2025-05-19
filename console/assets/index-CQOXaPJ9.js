import{u as Re,d as a,j as e,F as $e,t as c,l as G,n as Z,B as Pe,L as w,v as Ae}from"./index-CjQklFfe.js";import{a as u}from"./monaco-react-B56okIlq.js";import{u as Fe,a as Ne,b as Le,c as Ye}from"./authorizer-UsvdUM1X.js";import{u as ae,a as ee,b as le,c as qe,d as Te,e as Me,f as ie,A as m}from"./index-EcgeT2Lz.js";import{H as Ee}from"./index-CBfN0LzM.js";import{M as he}from"./index-Clyy6bc5.js";import{T as Se,c as De}from"./styles-0LgWH_wo.js";import{R as A}from"./index-DmcD4W8r.js";import{S as L,c as ze}from"./index-DEArwXHg.js";import{c as He}from"./index-DkrMqcqD.js";import{u as Ue,g as Qe,D as Be}from"./index-nnZv_Lp-.js";import{b as ke,c as Ie,u as Je}from"./customQuery-DkRf9uB-.js";import"./monaco-yaml-worker-4cQujBY-.js";import"./rest-CLa6CeN-.js";import"./toConsumableArray-CYASpIy2.js";import"./react-select.esm-DRpAyFsj.js";import"./manifest-C_BQEhie.js";import"./directory-DYvoBUit.js";const K={IDENTITY_TYPE_JWT:"IDENTITY_TYPE_JWT",IDENTITY_TYPE_MANUAL:"IDENTITY_TYPE_MANUAL",IDENTITY_TYPE_NONE:"IDENTITY_TYPE_NONE",IDENTITY_TYPE_SUB:"IDENTITY_TYPE_SUB"},Ve=(t,s)=>{const{authorizerApiKey:i,authorizerServiceUrl:r}=Re(),n=i?`basic ${i}`:"",v=u.useCallback(()=>`curl '${r}/${s}' \\
  -H 'authorization: ${n}' \\
  -H 'content-type: application/json' \\
  --data-raw '${t}' \\
  `,[r,n,t,s]);return{copyCurl:()=>He(v())}},Ke=a.div`
  margin-top: 32px;
  min-height: 252px;
  height: calc(100vh - 642px);
`,xe=a.div`
  min-width: 180px;
  height: 100%;
  display: flex;
  align-items: flex-start;
`,We=a.div`
  padding: 14px 2px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-width: 20vw;
`,Ge=a.div`
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
`,Xe=a.div`
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2em;
`,Ze=[{cell:({row:t})=>e.jsx(xe,{children:e.jsx(We,{children:e.jsx(Xe,{children:t.original.module})})}),header:"Module"},{cell:({row:t})=>e.jsx(xe,{children:e.jsx(Ge,{children:e.jsx(Ee,{language:"json",children:t.original.decision})})}),header:"Decision"}],et=({data:t})=>{const s=Object.keys(t.path).map(r=>({decision:JSON.stringify(t.path[r],null,1).replace(`
}`," }").replace(`{
`,"{").replace(/,\n/g,","),module:r})),i=Ue({columns:Ze,data:s,getCoreRowModel:Qe()});return e.jsx(Ke,{children:e.jsx(Be,{table:i})})},oe=({onChange:t,style:s,value:i,...r})=>e.jsx($e,{as:"textarea",style:s,value:i,onChange:t,...r}),tt=a.div`
  position: relative;
  font-family: 'Roboto';
  min-width: 620px;
  width: 100%;
`,rt=a.div`
  background-color: #2a2a2a;
  padding: 12px;
  width: 100%;
  @media (min-width: 1328px) {
    padding: 20px;
    height: 82px;
    z-index: 9;
  }
`,nt=a.div`
  display: flex;
  width: auto;
  margin: 0 auto;
`,st=a.div`
  flex: 1;
  max-width: 300px;
  margin-left: 10px;
`,ot=a.div`
  margin-top: 10px;
`,X=a(Z)`
  height: 36px;
`,pe=a.div`
  font-size: 16px;
  font-weight: bold;
  color: ${c.grey100};
`,ge=a.div`
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
  ${({$left:t,$right:s})=>{if(t)return G`
        border-right: 1px solid ${c.grey20};
      `;if(s)return G`
        margin-right: 15px;
      `}}
`,at=a.div`
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
`,T=a.div`
  flex: 1;
  margin-top: ${({$marginTop:t})=>`${t}px`};
  margin-left: ${({$marginLeft:t})=>`${t}px`};
  margin-bottom: ${({$marginBottom:t=20})=>`${t}px`};
`,me=a.div`
  font-size: 30px;
  margin: 5px 5px 0;
`,lt=a.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  label {
    font-size: 16px;
  }
  > div {
    height: 40px;
  }
`,it=a.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`,ct=a.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,ut=a(Pe)`
  height: 24px;
  line-height: 50%;
  &:active {
    box-shadow: 0 5px ${c.grey20};
    transform: translateY(4px);
  }
`,dt=a(w)`
  margin-top: 28px;
`,ht=a.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
`,xt=a.div`
  width: 100%;
  display: inline-flex;
  border-bottom: 1px solid ${c.grey30};
  margin-bottom: 8px;
`,W=a(w)`
  margin-left: 20px;
  margin-top: 28px;
  margin-bottom: 0;
  padding-bottom: 12px;
  cursor: pointer;
  white-space: nowrap;
  ${({$active:t})=>G`
      color: ${c.grey70};
      &:hover {
        color: ${c.grey100};
      }
      ${t&&`color: ${c.grey100};
        border-bottom: 1px solid ${c.indogoAccent4};
        `}
    `}
`,ye=a(Se)`
  min-height: 252px;
  height: calc(100vh - 640px);
`,pt=a(oe)`
  border-color: ${({$hasError:t})=>t?c.mojoAccent3:c.grey40} !important;
  min-height: 252px;
  height: calc(100vh - 640px);
`,ve=a.div`
  height: 100%;
  .monaco-editor {
    position: absolute !important;
  }
`,ce=a.div`
  margin-bottom: 12px;
`,gt=a.div`
  margin-top: -10px;
`,te=({children:t})=>e.jsxs("div",{children:[e.jsx(gt,{children:e.jsx(at,{})}),t]}),ue=()=>{const{decisions:t,setDecisions:s}=ae(),{policyContextError:i}=ee();return e.jsx(te,{children:e.jsx(A,{$centered:!0,$marginLeft:20,children:e.jsx(T,{children:e.jsx(Z,{error:i,label:"Decisions",value:t,onChange:r=>s(r.target.value)})})})})},de=()=>{const{objectType:t,setObjectInstance:s,setObjectType:i,setPermission:r,setRelationType:n}=le(),{resourceContext:v,setResourceContext:E}=ae(),{resourceContextError:y}=ee(),{data:C}=ke({objectType:t}),b=u.useMemo(()=>{var h;return t===void 0||t===""?[]:((h=C==null?void 0:C.results)==null?void 0:h.map(p=>({label:p.displayName||p.name,value:p.name})))||[]},[C==null?void 0:C.results,t]),{data:j}=Ie(),f=u.useMemo(()=>{var h;return((h=j==null?void 0:j.results)==null?void 0:h.filter(p=>p.objectType===t).map(p=>({label:p.displayName||p.name,value:p.name})))||[]},[t,j==null?void 0:j.results]);return e.jsxs(T,{children:[e.jsx(w,{children:"Resource Context"}),e.jsx(pt,{$hasError:!!y,placeholder:'{ "id": "123" }',rows:10,style:{background:c.primaryBlack},value:v,onChange:h=>{const p=h.target.value;E(p),fe(p,i,s,n,f,r,b)},onPaste:h=>{const p=h.clipboardData.getData("Text");fe(p,i,s,n,f,r,b)}})]})},fe=(t,s,i,r,n,v,E)=>{let y={object_key:"",object_type:"",permission:"",relation:""};try{y=JSON.parse(t!==""?t:"{}")}catch{}const C=y.object_type||"",b=y.object_key,j=y.relation,f=y.permission;s(C),i({label:b,value:b}),r(n.find(h=>h.value===j)||null),v(E.find(h=>h.value===f)||null)},be=[{label:"PATH_SEPARATOR_DOT",value:"PATH_SEPARATOR_DOT"},{label:"PATH_SEPARATOR_SLASH",value:"PATH_SEPARATOR_SLASH"}],mt=()=>{const{options:t,pathFreeText:s,setOptions:i,setPathFreeText:r}=qe();return e.jsxs("div",{children:[e.jsx(T,{children:e.jsx(L,{label:"Options",name:"decisiontree-options",options:be,value:be.find(({value:n})=>t===n),onChange:n=>{n!=null&&n.value&&i(n==null?void 0:n.value)}})}),e.jsx(ce,{children:e.jsx(w,{children:"Policy Context"})}),e.jsx(te,{children:e.jsx(A,{$centered:!0,$marginLeft:20,children:e.jsx(T,{children:e.jsx(Z,{label:"Path",placeholder:"Policy path",value:s,onChange:n=>r(n.target.value||"")})})})}),e.jsx(ue,{}),e.jsx(de,{})]})},yt=({policyModules:t})=>{const{pathSelect:s,setPathSelect:i}=Te(),r=u.useMemo(()=>t.map(n=>({label:n.package_path,value:n.package_path})),[t]);return u.useEffect(()=>{!s&&r&&r.length>0&&i(String(r[0].value))},[s,r,i]),e.jsxs("div",{children:[e.jsx(ce,{children:e.jsx(w,{children:"Policy Context"})}),e.jsx(te,{children:e.jsx(A,{$centered:!0,$marginLeft:20,children:e.jsx(T,{children:e.jsx(L,{label:"Path",name:"path-select",options:r,value:r.find(n=>n.value===s),onChange:n=>{n!=null&&n.value&&i(String(n.value))}})})})}),e.jsx(ue,{}),e.jsx(de,{})]})},vt=a.div`
  display: flex;
  vertical-align: middle;
`,_e=a.input.attrs({type:"checkbox"})`
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
`,ft=a.svg`
  fill: none;
  stroke: ${c.fullWhite};
  stroke-width: 2px;
`,bt=a.div`
  display: inline-block;
  border: 1px solid ${t=>t.checked?c.primary:c.grey50};
  ${({$hasLabel:t})=>t?"margin-right: 10px;":""}
  width: 16px;
  height: 16px;
  background: ${t=>t.checked?c.primary:"transparent"};
  display: flex;
  transition: all 150ms;
  ${_e}:focus + & {
    box-shadow: 0 0 0 3px ${c.grey40};
  }
  ${({$disabled:t})=>t?G`
          pointer-events: none;
          background-color: ${c.grey10};
          border-color: ${c.grey30};
          svg {
            stroke: ${c.grey40};
          }
        `:""};
`,jt=a(w)`
  display: flex;
  margin-bottom: 0px;
  align-items: center;
`,ne=({checked:t,className:s,disabled:i,label:r,onChange:n,...v})=>{const E=u.useCallback(y=>n==null?void 0:n(y.target.checked),[n]);return e.jsx(vt,{children:e.jsxs(jt,{$small:!0,children:[e.jsx(_e,{checked:t,disabled:i,onChange:E,...v}),e.jsx(bt,{$disabled:i,$hasLabel:!!r,checked:t===void 0?!1:t,className:s,children:t&&e.jsx(ft,{viewBox:"0 0 24 24",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})}),r]})})},Ct=()=>{const t=Me(),{input:s,pathFreeText:i,query:r,queryMetrics:n,queryTrace:v,queryTraceLevel:E,queryTraceSummary:y,setInput:C,setPathFreeText:b,setQuery:j,setQueryMetrics:f,setQueryTrace:h,setQueryTraceLevel:p,setQueryTraceSummary:d}=t,k=[{label:"TRACE_LEVEL_NOTES",value:"TRACE_LEVEL_NOTES"},{label:"TRACE_LEVEL_OFF",value:"TRACE_LEVEL_OFF"},{label:"TRACE_LEVEL_FULL",value:"TRACE_LEVEL_FULL"},{label:"TRACE_LEVEL_FAILS",value:"TRACE_LEVEL_FAILS"}];return e.jsxs(e.Fragment,{children:[e.jsxs(T,{children:[e.jsx(w,{htmlFor:"queryOptions",children:"Options"}),e.jsxs(lt,{children:[e.jsxs(it,{children:[e.jsx(ne,{checked:v,label:"Trace",onChange:h}),v&&e.jsx(L,{name:"trace-select",options:k,value:k.find(g=>g.value===E)||k[0],onChange:g=>{g!=null&&g.value&&p(g.value)}})]}),e.jsx(ne,{checked:y,label:"Trace Summary",onChange:d}),e.jsx(ne,{checked:n,label:"Metrics",onChange:f})]})]}),e.jsx(ce,{children:e.jsx(w,{children:"Policy Context"})}),e.jsx(te,{children:e.jsx(A,{$centered:!0,$marginLeft:20,children:e.jsx(T,{children:e.jsx(Z,{label:"Path",placeholder:"Policy path",value:i||"",onChange:g=>b(g.target.value||"")})})})}),e.jsx(ue,{}),e.jsxs(T,{children:[e.jsx(w,{htmlFor:"query",children:"Query"}),e.jsx(oe,{id:"query",placeholder:"x = data; y = input",rows:10,value:String(r),onChange:g=>{j(g.target.value)}})]}),e.jsxs(T,{children:[e.jsx(w,{htmlFor:"input",children:"Input"}),e.jsx(oe,{id:"input",placeholder:'{ "foo": "bar" }',rows:10,value:String(s),onChange:g=>{C(g.target.value)}})]}),e.jsx(de,{})]})},Tt=()=>{const{objectInstance:t,objectType:s,relationType:i,setObjectInstance:r,setObjectType:n,setRelationType:v,setSubjectType:E}=le(),{identity:y,request:C,setIdentity:b,setType:j}=ie(),{resourceContext:f,setResourceContext:h}=ae(),{setPathSelect:p}=Te(),{data:d}=Je();u.useEffect(()=>{E("user")});const{data:k}=Ie(),g=u.useMemo(()=>{var l;return(l=k==null?void 0:k.results)==null?void 0:l.filter(x=>x.objectType===s).map(x=>({label:x.displayName||x.name,value:x.name}))},[s,k]),N=u.useMemo(()=>{var l;return((l=d==null?void 0:d.results)==null?void 0:l.map(x=>({label:x.displayName||x.name,value:x.name})))||[]},[d==null?void 0:d.results]),{data:S}=ke({objectType:s}),Y=u.useMemo(()=>{var l;return s===void 0||s===""?[]:((l=S==null?void 0:S.results)==null?void 0:l.map(x=>({label:x.displayName||x.name,value:x.name})))||[]},[S==null?void 0:S.results,s]),q=[{label:"Relations",options:g||[]},{label:"Permissions",options:Y||[]}];return e.jsxs(e.Fragment,{children:[e.jsx(A,{$centered:!0,children:e.jsx(T,{children:e.jsx(X,{label:"Subject",placeholder:"Identity",value:y||"",onChange:l=>{b(l.target.value),j("IDENTITY_TYPE_SUB")}})})}),e.jsxs(A,{$centered:!0,children:[e.jsx(T,{children:e.jsx(L,{label:"Object Type",options:N,value:N.find(({value:l})=>l===s),onChange:l=>{l!=null&&l.value&&(h(JSON.stringify({...JSON.parse(f!==""?f:"{}"),object_id:"",object_type:String(l.value)},null,2)),n(String(l.value)),r(null),v(null))}})}),e.jsx(T,{$marginLeft:20,children:e.jsx(ot,{children:e.jsx(X,{label:"Object ID",placeholder:"Object ID",value:(t==null?void 0:t.value)||"",onChange:l=>{r({label:l.target.value,value:l.target.value}),h(JSON.stringify({...JSON.parse(f!==""?f:"{}"),object_id:String(l.target.value)},null,2))}})})})]}),C==="CHECK"&&e.jsx(T,{children:e.jsx(L,{label:"Relation",modifyCustomStyle:()=>ze,options:q,value:i,onChange:l=>{v(l),p("rebac.check");const x=JSON.parse(f!==""?f:"{}");delete x.permission,h(JSON.stringify({...x,relation:String(l==null?void 0:l.value)},null,2))}})})]})},je=[{label:"Anonymous",value:"IDENTITY_TYPE_NONE"},{label:"JWT",value:"IDENTITY_TYPE_JWT"},{label:"Subject",value:"IDENTITY_TYPE_SUB"},{label:"Manual",value:"IDENTITY_TYPE_MANUAL"}],se={CHECK:"api/V2/authz/is",DECISIONTREE:"api/V2/authz/decisiontree",IS:"api/V2/authz/is",QUERY:"api/V2/authz/query"},Ce=[{foreground:"#A8FF60",token:"constant"},{foreground:"#FF66FF",token:"number"},{foreground:"#FF66FF",token:"number.hex"},{foreground:"#96CBFE",token:"annotation"},{foreground:"#96CBFE",token:"type"},{foreground:"#CCCCCC",token:"delimiter"},{foreground:"#CCCCCC",token:"delimiter.html"},{foreground:"#CCCCCC",token:"delimiter.xml"},{foreground:"#CCCCCC",token:"editorBracketHighlight"},{foreground:"#A8FF60",token:"metatag.content.html"},{foreground:"#96CBFE",token:"key"},{foreground:"#96CBFE",token:"string.key.json"},{foreground:"#A8FF60",token:"string.value.json"},{foreground:"#A8FF60",token:"attribute.value.unit"},{foreground:"#A8FF60",token:"attribute.value.html"},{foreground:"#A8FF60",token:"attribute.value.xml"},{foreground:"#A8FF60",token:"string"},{foreground:"#A8FF60",token:"string.html"},{foreground:"#A8FF60",token:"string.sql"},{foreground:"#A8FF60",token:"string.yaml"},{foreground:"#99CC99",token:"keyword"},{foreground:"#99CC99",token:"keyword.json"},{foreground:"#99CC99",token:"keyword.flow"},{foreground:"#99CC99",token:"keyword.flow.scss"}];function Et(t){return(t==null?void 0:t.path)!==void 0}const St=({isRebac:t,onRequestChange:s,onSubmit:i,output:r,policyModules:n,requestBody:v})=>{const[E,y]=u.useState(""),{copyCurl:C}=Ve(JSON.stringify(v),E||se.IS),b=u.useRef(null),{identity:j,queryMetrics:f,queryTrace:h,queryTraceSummary:p,request:d,setIdentity:k,setRequest:g,setType:N,type:S}=ie(),{policyContextError:Y,resourceContextError:q}=ee(),{setSubjectInstance:l}=le(),x=u.useMemo(()=>t?[{label:"Check ",value:m.CHECK},{label:"Is",value:m.IS},{label:"decisiontree",value:m.DECISIONTREE},{label:"query",value:m.QUERY}]:[{label:"Is",value:m.IS},{label:"decisiontree",value:m.DECISIONTREE},{label:"query",value:m.QUERY}],[t]),D=(o,R)=>{R.editor.setTheme("topaz"),b.current=o};u.useEffect(()=>{if(!d){const o=x[0].value;g(o),y(se[o])}},[t,d,x,g,y]);const[I,$]=u.useState("Results"),z=r==null?void 0:r.response,O=r==null?void 0:r.metrics,M=r==null?void 0:r.trace,H=r==null?void 0:r.trace_summary,F=u.useMemo(()=>{if(d==="QUERY")switch(I){case"Metrics":return O;case"Results":return z;case"Trace":return M;case"Trace Summary":return H;default:return}},[I,O,z,M,H,d]);return u.useEffect(()=>{var R;let o;d===m.QUERY?o=JSON.stringify(F,null,2):o=JSON.stringify(r,null,2),(R=b.current)==null||R.setValue(o)},[r,F,d]),u.useEffect(()=>$("Results"),[r]),u.useEffect(()=>{(!f&&I==="Metrics"||!h&&I==="Trace"||!p&&I==="Trace Summary")&&$("Results")},[I,f,h,p]),e.jsx(e.Fragment,{children:e.jsxs(ct,{children:[e.jsx(rt,{children:e.jsxs(A,{$centered:!0,style:{height:"100%"},children:[e.jsxs(A,{$centered:!0,$flex:!0,style:{marginRight:20},children:[e.jsx(pe,{children:"REQUEST:"}),e.jsx(st,{children:e.jsx(L,{isSearchable:!1,modifyCustomStyle:o=>({...o,option:(R,{data:J,isDisabled:U,isFocused:Q,isSelected:V})=>({...R,":active":{...R[":active"],backgroundColor:c.grey40},backgroundColor:U?c.grey20:Q?c.grey40:V?c.grey20:c.grey20,borderBottom:J.value==="CHECK"?`2px ${c.grey30} solid`:"",borderLeft:V?`5px solid ${c.indogoAccent3}`:"5px solid transparent",color:Q?c.grey100:c.grey70,cursor:U?"not-allowed":"default",fontSize:14,height:"100%",lineHeight:"20px",minHeight:36,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"})}),options:x,value:x.find(({value:o})=>o===d),onChange:o=>{(o==null?void 0:o.value)!==d&&(s==null||s()),o!=null&&o.value&&(g(o.value),y(se[o.value]))}})})]}),e.jsx(De,{disabled:!!Y||!!q,onSubmit:i}),e.jsx("div",{style:{flex:1,marginLeft:20},children:e.jsx(pe,{children:"OUTPUT:"})})]})}),e.jsx(tt,{children:e.jsxs(nt,{children:[e.jsxs(ge,{$left:!0,children:[d===m.CHECK?e.jsx(Tt,{}):e.jsxs(A,{$centered:!0,children:[e.jsx(T,{children:e.jsx(L,{label:"Identity Context",options:je,value:je.find(({value:o})=>S===o),onChange:o=>{o!=null&&o.value&&(o.value===K.IDENTITY_TYPE_NONE&&l(null),N(o.value),k(null))}})}),S===K.IDENTITY_TYPE_SUB&&e.jsxs(e.Fragment,{children:[e.jsx(me,{children:":"}),e.jsx(T,{$marginTop:32,children:e.jsx(X,{placeholder:"Identity",value:j||"",onChange:o=>k(o.target.value)})})]}),(S===K.IDENTITY_TYPE_MANUAL||S===K.IDENTITY_TYPE_JWT)&&e.jsxs(e.Fragment,{children:[e.jsx(me,{children:":"}),e.jsx(T,{$marginTop:32,children:e.jsx(X,{placeholder:"Identity",value:j||"",onChange:o=>k(o.target.value)})})]})]}),d===m.DECISIONTREE&&e.jsx(mt,{}),d===m.IS&&!!n&&e.jsx(yt,{policyModules:n}),d===m.QUERY&&e.jsx(Ct,{})]}),e.jsxs(ge,{$right:!0,children:[e.jsxs(ht,{children:[e.jsx(w,{children:"Request"}),e.jsx(ut,{disabled:!v,size:"sm",variant:"secondary",onClick:C,children:"Copy as cURL"})]}),e.jsx(Se,{$height:262,children:e.jsx(Ee,{language:"json",children:JSON.stringify(v,null,2)})}),(d===m.IS||d===m.CHECK)&&r&&e.jsxs(e.Fragment,{children:[e.jsx(dt,{children:"Results"}),e.jsx(ye,{children:e.jsx(ve,{children:e.jsx(he,{defaultLanguage:"json",defaultValue:JSON.stringify(r,null,2),layoutOptions:{automaticLayout:!0,fontSize:14,lineNumbers:"off",minimap:{autohide:!0},readOnly:!0,scrollBeyondLastLine:!1},themeRules:Ce,onMount:D})})})]}),d===m.DECISIONTREE&&Et(r)&&e.jsx(et,{data:r}),d===m.QUERY&&F&&e.jsxs(e.Fragment,{children:[e.jsxs(xt,{children:[e.jsx(W,{$active:I==="Results",onClick:()=>$("Results"),children:"Results"}),!!h&&e.jsx(W,{$active:I==="Trace",onClick:()=>$("Trace"),children:"Trace"}),!!p&&e.jsx(W,{$active:I==="Trace Summary",onClick:()=>$("Trace Summary"),children:"Trace Summary"}),!!f&&e.jsx(W,{$active:I==="Metrics",onClick:()=>$("Metrics"),children:"Metrics"})]}),e.jsx(ye,{children:e.jsx(ve,{children:e.jsx(he,{defaultLanguage:"json",defaultValue:JSON.stringify(F,null,2),layoutOptions:{automaticLayout:!0,fontSize:14,lineNumbers:"off",minimap:{autohide:!0},readOnly:!0,scrollBeyondLastLine:!1},themeRules:Ce,onMount:D})})})]})]})]})})]})})},Ut=({isRebac:t,selectedModuleId:s})=>{const{mutateAsync:i}=Fe(),{mutateAsync:r}=Ne(),{mutateAsync:n}=Le(),[v,E]=u.useState(),[y,C]=u.useState(),{data:b}=Ye({field_mask:"id,package_path,raw"}),[j,f]=u.useState(""),h=u.useMemo(()=>{if(!(!b||!b.result))return b.result.map(_=>{var P;return{id:_.id,package_path:(P=_.package_path)==null?void 0:P.replace("data.",""),raw:_.raw}}).sort((_,P)=>_.package_path<P.package_path?-1:1)},[b]),p=_=>({CHECK:r,DECISIONTREE:n,IS:r,QUERY:i})[_],d=async(_,P)=>{const re=p(_);try{const B=await re({data:P});E(B)}catch(B){E(Ae(B).message)}finally{window.scrollTo(0,0)}},k=ie(),{decisions:g,identity:N,input:S,options:Y,pathFreeText:q,pathSelect:l,query:x,queryMetrics:D,queryTrace:I,queryTraceLevel:$,queryTraceSummary:z,request:O,resourceContext:M,type:H}=k,{setPolicyContextError:F,setResourceContextError:o}=ee(),R=u.useCallback(()=>{o==null||o(void 0);try{return{...M&&{resource_context:JSON.parse(M||"{}")}}}catch{return o("Resource context is not a valid JSON."),{}}},[M,o]),J=u.useCallback(()=>{F(void 0);try{return O===m.CHECK?{policy_context:{decisions:["allowed"],path:"rebac.check"}}:{...g&&{policy_context:{decisions:JSON.parse(g||"[]"),path:O==="IS"?l:q}}}}catch(_){return F(`Decisions: "${g}" is not a valid array. 
 Error: ${_}`),{}}},[g,q,l,O,F]),U=u.useCallback(()=>({identity_context:{identity:N,type:H}}),[N,H]),Q=u.useCallback(()=>({metrics:!!D,trace:I?$:void 0,trace_summary:!!z}),[D,I,$,z]);u.useEffect(()=>{const _={},P=R(),re=J(),B=U(),Oe=Q(),we={...B,...O===m.DECISIONTREE&&{options:{path_separator:Y}},...O===m.QUERY&&x&&{query:x},...O===m.QUERY&&S&&{input:S},...O===m.QUERY&&{options:Oe},...P,...re,..._};C(we)},[R,J,U,Q,O,Y,x,S]);const V=()=>d(O,y);return e.jsx(St,{"data-testid":"evaluator-component",filter:j,isRebac:t,output:v,policyModules:h,requestBody:y,selectedModuleId:s,setFilter:f,onRequestChange:()=>E(""),onSubmit:V})};export{Ut as default};
