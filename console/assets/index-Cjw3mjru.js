import{d,t as r,l as s,j as t,K as p}from"./index-B7gyiX60.js";import{a as c}from"./monaco-react-CeE7JWC9.js";import{c as y}from"./authorizer-RlYDziSy.js";import{H as j}from"./index-BO9AI-Ex.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./rest-CaSTnEYb.js";import"./index-_sohq9VT.js";import"./toConsumableArray-CpW51OVY.js";const x=d.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  ${({$flex:e})=>e?"flex: 1":""};
  @media (max-width: 1028px) {
    margin-bottom: 30px;
    flex: 1;
    margin-right: auto;
    flex-direction: column;
  }
`,g=d.div`
  color: ${r.grey100};
  ${({$flex:e})=>e?"flex: 1":""};
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  @media (min-width: 1028px) {
    min-height: 160px;
    max-height: calc(100vh - 18.6rem);
    padding: 0 10px;
    ${({$hasBorderLeft:e})=>e?`border-left: 1px solid ${r.grey20}; padding: 0 20px;`:""}
    ${({$fixed:e})=>e?s`
            position: fixed;
            margin-top: -2px;
            width: 50%;
            background-color: ${r.primaryBlack};
            display: flex;
          `:""}
  }

  @media (max-width: 1028px) {
    min-height: 130px;
    pre {
      padding: 0 20px;
    }
    ${({$fixed:e,$shouldPad:a})=>e?s`
            position: fixed;
            top: ${a?169:0}px;
            width: 100%;
            z-index: 2;
            background-color: #121212;
          `:s``}
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,k=d.div`
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  text-align: start;
  font-weight: 600;
  a {
    min-width: 318px;
    padding: ${({$isSmall:e})=>e?"9px 20":20}px;
    background-color: ${r.grey20};
    color: ${r.grey20};
    &:hover {
      background-color: ${r.grey40};
      color: ${r.grey100};
      text-decoration: none;
    }
    font-size: 14px;
  }
`,m=d.div`
  border-bottom: 2px solid ${r.grey40};
  background-color: ${r.primaryBlack};
  color: ${r.grey100};
  font-weight: bold;
  font-size: 14px;
  padding: 20px 0px;
  display: flex;
  align-items: center;
  ${({height:e})=>e?`height: ${e}px`:""};
`,I=()=>{const[e,a]=c.useState(""),{data:n,isLoading:h}=y({field_mask:"id,package_path,raw"}),l=c.useMemo(()=>{if(!n||!n.result)return[];const i=n.result.map(o=>({id:o.id,package_path:o.package_path?.replace("data.",""),raw:o.raw})).sort((o,$)=>o.package_path<$.package_path?-1:1);return a(i[0].id||""),i},[n]),u=i=>l.find(o=>o.id===i)?.raw||"",f=()=>l.length===0?null:t.jsx(t.Fragment,{children:l?.map(i=>t.jsx(k,{children:t.jsx(p.Link,{className:"light-pills",eventKey:i.id,children:t.jsx("span",{children:i.package_path})})},i.id))});return h?null:t.jsxs(t.Fragment,{children:[t.jsxs(x,{style:{marginLeft:20},children:[t.jsx(m,{children:"Module Name"}),t.jsx(g,{$flex:!0,$paddingTop:18,children:t.jsx(p,{activeKey:e,className:"flex-column",defaultActiveKey:e,variant:"pills",onSelect:i=>{a(i||"")},children:t.jsx(f,{})})})]}),t.jsx(x,{children:t.jsxs(t.Fragment,{children:[t.jsx(m,{children:"Definition"}),t.jsx(g,{$flex:!0,$hasBorderLeft:!0,$paddingTop:18,children:t.jsx(j,{language:"rego",children:u(e)})})]})})]})};export{I as default};
