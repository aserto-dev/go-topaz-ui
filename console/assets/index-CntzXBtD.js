import{k as x,v as f,d as o,j as t,t as n,w as y,B as b}from"./index-D2xtyF2C.js";import{a as d}from"./monaco-react-D7gXaprf.js";function j(e,a){const i=x(),r=i.getQueryCache();return d.useSyncExternalStore(d.useCallback(s=>r.subscribe(f.batchCalls(s)),[r]),()=>i.isFetching(e),()=>i.isFetching(e))}const z=o.div`
  padding-top: 140px;
`,C=o.div`
  font-size: 24px;
  width: 100%;
  min-width: 200px;
  color: ${n.grey100};
`,$=({title:e})=>t.jsx(C,{children:e}),w=o(b)`
  position: absolute;
  right: 20px;
  border: 1px solid ${n.grey};
  border-radius: 4px;
  background-color: ${n.grey20};
  background-size: cover;
  font-size: 14px;
  color: ${n.grey100};
  text-align: center;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: none;
  outline: none;
  gap: 4px;
  @media (max-width: 600px) {
    width: auto;
    i {
      margin: auto;
    }
    span {
      display: none;
    }
  }
`,v=y`
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
`,k=o.div`
  margin: auto;
  width: 50%;
  animation: ${v} ${({$spin:e})=>e?"1000ms":"0ms"}
    infinite linear;
`,B=({load:e,loading:a,testId:i})=>t.jsxs(w,{"data-testid":i,variant:"secondary",onClick:e,children:[a?t.jsx(k,{$spin:a,children:t.jsx("i",{className:"fa fa-refresh"})}):t.jsx("i",{className:"fa fa-refresh"}),t.jsx("span",{children:" Refresh"})]}),F=o.div`
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 80px;
  ${({$hasBorderBottom:e})=>e?`border-bottom: 1px solid ${n.grey20}`:""};
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 9;
  background-color: ${n.primaryBlack};
  @media (max-width: 600px) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`,R=({children:e,hasBorderBottom:a,id:i,load:r,loading:s,mobileBreakpoint:h,subtitle:c,testId:g,title:l})=>{const p=x(),m=j(),u=d.useCallback(()=>{p.refetchQueries({type:"active"})},[p]);return t.jsxs(F,{$hasBorderBottom:a,$mobileBreakpoint:h,"data-testid":g,id:i,children:[t.jsx(B,{load:r||u,loading:s||m>0}),t.jsxs("div",{children:[l&&t.jsx($,{title:l}),c&&t.jsx("div",{children:c})]}),e]})};export{R as P,z as a};
