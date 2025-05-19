import{j as m,o as b,t as y,d as w,M as A,n as E}from"./index-CjQklFfe.js";import{a}from"./monaco-react-B56okIlq.js";const M=w(A)`
  overflow-x: hidden;
  border-radius: 20px;
  .modal-dialog {
    min-width: ${({$minWidth:e})=>e};
  }
  .modal-content {
    ${({fullscreen:e})=>!e&&"max-width: 85vw;"}
    border-radius: 20px;
    background-color: ${y.grey20};
    color: ${y.grey100};
    min-width: ${({$minWidth:e})=>e};
  }
  background-color: ${({backgroundcolor:e})=>e};
`,j=({backgroundColor:e,cardHeight:o,cardWidth:i=500,centered:p=!0,children:s,closeButton:d,fullscreen:l,minWidth:g,onHide:t,onSubmit:u,show:c,size:V,text:r,title:x,variant:n})=>m.jsx(M,{$minWidth:g,backgroundcolor:e,centered:p,"data-testid":"modal",fullscreen:l,show:c,size:V,onHide:t,children:m.jsx(b,{body:s,fullscreen:l,height:o,style:{minHeight:"215px"},text:r,title:x,variant:n,width:i,onClose:d?t:void 0,onSubmit:u})}),T={getValidityOf:()=>"VALID",isValid:()=>!0,ruleText:""},L={getValidityOf:e=>I(e)?"VALID":"INVALID",isValid:e=>I(e),ruleText:"Must be at most 256 characters and cannot contain whitespaces"},I=e=>/^\S{1,256}$/.test(e),N={getValidityOf:e=>D(e)?"VALID":"INVALID",isValid:e=>D(e),ruleText:"Must not contain angled brackets, ampersands, or double quotes"},D=e=>!/[<&">]/.test(e),O=({defaultValue:e,onChange:o,onSubmit:i=()=>{},useIsAvailable:p=()=>({isAvailable:!0,reason:""}),validator:s=T,value:d,...l})=>{const g=a.useCallback(f=>{f.key==="Enter"&&(i==null||i())},[i]),[t,u]=a.useState(""),[c,V]=a.useState(""),{isAvailable:r,reason:x}=p(t,e),n=a.useMemo(()=>s==null?void 0:s.isValid(t),[s,t]);a.useEffect(()=>{d!==void 0&&u(d)},[d]),a.useEffect(()=>{V(n&&r?t:void 0)},[n,t,r,s.ruleText]),a.useEffect(()=>{o(c)},[o,c]);const h=a.useMemo(()=>!n&&t?s.ruleText:r?"":x||"That name is already in use.",[r,n,s.ruleText,t,x]);return m.jsx(E,{"data-testid":"input",error:h,info:s.ruleText,isUnavailable:!r,value:t,onChange:f=>u(f.target.value),onKeyPress:g,...l})};export{j as C,N as D,L as I,O as V};
