import{d as s,t as r,l as p,j as t,J as x}from"./index-CjQklFfe.js";import{a as c}from"./monaco-react-B56okIlq.js";import{c as y}from"./authorizer-UsvdUM1X.js";import{H as j}from"./index-CBfN0LzM.js";import"./monaco-yaml-worker-4cQujBY-.js";import"./rest-CLa6CeN-.js";import"./index-DkrMqcqD.js";import"./toConsumableArray-CYASpIy2.js";const g=s.div`
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
`,m=s.div`
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
    ${({$fixed:e})=>e?p`
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
    ${({$fixed:e,$shouldPad:d})=>e?p`
            position: fixed;
            top: ${d?169:0}px;
            width: 100%;
            z-index: 2;
            background-color: #121212;
          `:p``}
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,k=s.div`
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
`,h=s.div`
  border-bottom: 2px solid ${r.grey40};
  background-color: ${r.primaryBlack};
  color: ${r.grey100};
  font-weight: bold;
  font-size: 14px;
  padding: 20px 0px;
  display: flex;
  align-items: center;
  ${({height:e})=>e?`height: ${e}px`:""};
`,M=()=>{const[e,d]=c.useState(""),{data:l,isLoading:f}=y({field_mask:"id,package_path,raw"}),o=c.useMemo(()=>{if(!l||!l.result)return[];const i=l.result.map(a=>{var n;return{id:a.id,package_path:(n=a.package_path)==null?void 0:n.replace("data.",""),raw:a.raw}}).sort((a,n)=>a.package_path<n.package_path?-1:1);return d(i[0].id||""),i},[l]),u=i=>{var a;return((a=o.find(n=>n.id===i))==null?void 0:a.raw)||""},$=()=>o.length===0?null:t.jsx(t.Fragment,{children:o==null?void 0:o.map(i=>t.jsx(k,{children:t.jsx(x.Link,{className:"light-pills",eventKey:i.id,children:t.jsx("span",{children:i.package_path})})},i.id))});return f?null:t.jsxs(t.Fragment,{children:[t.jsxs(g,{style:{marginLeft:20},children:[t.jsx(h,{children:"Module Name"}),t.jsx(m,{$flex:!0,$paddingTop:18,children:t.jsx(x,{activeKey:e,className:"flex-column",defaultActiveKey:e,variant:"pills",onSelect:i=>{d(i||"")},children:t.jsx($,{})})})]}),t.jsx(g,{children:t.jsxs(t.Fragment,{children:[t.jsx(h,{children:"Definition"}),t.jsx(m,{$flex:!0,$hasBorderLeft:!0,$paddingTop:18,children:t.jsx(j,{language:"rego",children:u(e)})})]})})]})};export{M as default};
