import{d as s,j as e,I as w,B as c,b as v,c as C,t as h}from"./index-D2xtyF2C.js";import{a as x}from"./monaco-react-D7gXaprf.js";import{u as b}from"./directory-Drqp5ynE.js";import{C as D,V as M}from"./index-DOn2LL7S.js";import{u as I}from"./hooks-BjjeUPaT.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./rest-BGxiHZjw.js";const S=t=>{const i=n=>n===t?"VALID":"INVALID";return{getValidityOf:i,isValid:n=>i(n)==="VALID",ruleText:""}},V=s.div`
  padding: 20px;
  width: 100%;
  height: fit-content;
`,u=s.div`
  font-weight: 600;
  font-size: 16px;
  color: #ff4a4a;
`,r=s.div`
  display: flex;
  font-weight: ${({bold:t})=>t?"bold":500};
`,A=s.div`
  input {
    width: 600px;
  }
`,T=s.div`
  width: 100%;
  flex: 1 1 0%;
  justify-content: flex-end;
  align-items: flex-end;
  float: right;
  display: flex;
  margin-top: 20px;
  button:first-of-type {
    margin-right: 10px;
  }
`,$=({content:t,entityName:i,onClickRemove:n,onHide:d,show:l,subject:o})=>{const a=d,f=x.useMemo(()=>S(i),[i]),[m,y]=x.useState(),j=o.charAt(0).toUpperCase()+o.slice(1),g=m?{}:{disabled:!0};return e.jsx(e.Fragment,{children:e.jsx(D,{cardHeight:"100%",show:l,title:`Delete ${o}`,variant:"delete_danger",onHide:a,onSubmit:n,children:e.jsxs(V,{children:[t||o!=="policy"&&o!=="directory"&&e.jsxs(e.Fragment,{children:[e.jsxs(u,{children:["We will immediately delete all of your ",o," artifacts (policies, images, directory data, and connections)."]}),e.jsx("br",{}),e.jsxs(r,{children:["Your ",o," name cannot be reused until we recycle it, within the next 7 days. It will then be available for anyone to claim."]}),e.jsx("br",{})]}),e.jsxs(A,{children:[e.jsx(M,{autoFocus:!0,"data-testid":"input",label:o!=="manifest"?`${j} name`:void 0,validator:f,onChange:y}),e.jsx(w,{children:e.jsx(r,{children:e.jsxs(r,{children:["Please type",e.jsxs(r,{bold:!0,children:["  ",i,"  ",e.jsx(r,{children:"to confirm."})]})]})})})]}),e.jsx("br",{}),e.jsxs(u,{children:["Are you sure you want to delete your ",o,"?",e.jsx("br",{})," This cannot be undone."]}),e.jsxs(T,{children:[e.jsx(c,{variant:"secondary",onClick:a,children:"Cancel"}),e.jsxs(c,{"data-testid":"delete-subject",...g,type:"submit",variant:"danger",children:["Delete ",o]})]})]})})})},E=s.div`
  font-family: Roboto;
  padding: 22px 30px;
`,p=s.div`
  font-weight: ${({bold:t})=>t?"bold":100};
  font-size: ${({size:t})=>t};
  color: ${({color:t})=>t};
  padding-top: 8px;
`,P=()=>{const{setCode:t}=I(),[i,n]=x.useState(!1),d=v(),l=C(),{mutate:o}=b({mutation:{onError:a=>{d(a)},onSuccess:()=>{t(""),n(!1),l("Directory deleted successfully")}}});return e.jsxs(e.Fragment,{children:[e.jsx($,{entityName:"delete",show:i,subject:"directory",onClickRemove:()=>o({}),onHide:()=>n(!1)}),e.jsxs(E,{children:[e.jsx(p,{bold:!0,color:h.grey100,size:"14px",children:"Reset to an empty directory"}),e.jsxs(p,{color:h.mojoAccent3,size:"14px",children:["Permanently delete the model and all the data in the directory.",e.jsx("br",{})]}),e.jsx("br",{}),e.jsx(c,{"data-testid":"reset-template",variant:"danger",onClick:()=>n(!0),children:"Delete directory"})]})]})};export{P as default};
