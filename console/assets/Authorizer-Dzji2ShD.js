import{d as t,j as e,t as i,l as s,i as p,e as x,O as h}from"./index-B7gyiX60.js";import{P as m,a as g}from"./index-C4K3EKDF.js";import{S as u}from"./index-V238r3Ym.js";import"./monaco-react-CeE7JWC9.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./react-select.esm-OWZQxxta.js";import"./toConsumableArray-CpW51OVY.js";const b=t.div`
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
`,v=t.div`
  @media (min-width: 1328px) {
    grid-area: header;
  }
`,f=t.div`
  @media (min-width: 1328px) {
    grid-area: sidebar;
  }
`,j=t.div`
  grid-area: content;
  display: flex;
  height: 100%;
  width: 100%;
`,w=t.div`
  display: flex;
  line-height: 1;
  @media (max-width: 1327px) {
    flex-wrap: wrap;
    padding: 20px;
  }
  @media (min-width: 991px) {
    /* margin-top: 70px; */
  }
`,y=t.div`
  width: 100%;
  display: none;
  margin-bottom: 20px;
  @media (max-width: 1327px) {
    display: block;
    width: 100%;
  }
`,$=t.div`
  margin-right: 20px;
  min-width: 250px;
  @media (max-width: 1327px) {
    display: none;
  }
`,C=()=>e.jsx(v,{children:e.jsx(m,{hasBorderBottom:!0,title:"Authorizer"})}),k=t.div`
  width: 100%;
  display: flex;
  position: fixed;
  max-width: 250px;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${i.grey20};
  &:last-child {
    border-bottom: none;
  }
`,c=t.div`
  padding: 12px 18px;
  ${({disabled:a})=>a?s`
          background-color: ${i.grey10};
          border-bottom: 1px solid ${i.grey10};
          color: ${i.grey40};
          pointer-events: none;
        `:s`
          cursor: pointer;
          background-color: ${i.primaryBlack};
          border-bottom: 1px solid ${i.grey20};
          color: ${i.grey70};
        `}

  &:hover {
    color: ${i.grey100};
    background-color: ${i.grey10};
  }
  ${({selected:a})=>a?s`
          border-left: 5px solid ${i.indogoAccent3};
          background-color: ${i.grey10};
          color: ${i.grey100};
        `:s`
          border-left: 5px solid ${i.primaryBlack};
        `}
`,S=t.span`
  color: ${i.grey70};
  font-size: 11px;
`,T=({addVerticalTabButton:a,onChange:d,options:l,selectedValue:n,title:o})=>e.jsx(e.Fragment,{children:e.jsxs(k,{children:[o&&e.jsx(c,{children:e.jsx("h6",{children:o})}),l.map(r=>e.jsxs(c,{"data-testid":r.value,disabled:r.isDisabled,hidden:r.hidden,selected:n===r.value,onClick:()=>d(r.value),children:[r.label,r.isDisabled&&e.jsx(S,{children:" (not available)"})]},r.value)),a]})}),z=()=>{const a=p(),d=[{label:"Modules",value:"modules"},{label:"Evaluator",value:"evaluator"},{label:"API Browser",value:"docs"}],{pathname:l}=x(),n=l.replace("/ui/authorizer/","").split("/")[0],o=r=>{a(`/ui/authorizer/${r}`)};return e.jsxs(w,{children:[e.jsx($,{children:e.jsx(T,{options:d,selectedValue:n,onChange:o})}),e.jsx(y,{children:e.jsx(u,{"aria-label":"Sections",options:d,value:d.find(r=>r.value===n),onChange:r=>o(String(r.value))})})]})},E=()=>e.jsx(g,{children:e.jsxs(b,{children:[e.jsx(C,{}),e.jsx(f,{children:e.jsx(z,{})}),e.jsx(j,{children:e.jsx(h,{})})]})});export{E as default};
