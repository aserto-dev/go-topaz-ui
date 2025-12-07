import{j as f,p as D,t as y,d as w,M as A,n as E}from"./index-B7gyiX60.js";import{a}from"./monaco-react-CeE7JWC9.js";const M=w(A)`
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
`,j=({backgroundColor:e,cardHeight:i,cardWidth:d=500,centered:p=!0,children:s,closeButton:n,fullscreen:l,minWidth:m,onHide:t,onSubmit:u,show:c,size:V,text:r,title:x,variant:o})=>f.jsx(M,{$minWidth:m,backgroundcolor:e,centered:p,"data-testid":"modal",fullscreen:l,show:c,size:V,onHide:t,children:f.jsx(D,{body:s,fullscreen:l,height:i,style:{minHeight:"215px"},text:r,title:x,variant:o,width:d,onClose:n?t:void 0,onSubmit:u})}),T={getValidityOf:()=>"VALID",isValid:()=>!0,ruleText:""},L={getValidityOf:e=>b(e)?"VALID":"INVALID",isValid:e=>b(e),ruleText:"Must be at most 256 characters and cannot contain whitespaces"},b=e=>/^\S{1,256}$/.test(e),N={getValidityOf:e=>I(e)?"VALID":"INVALID",isValid:e=>I(e),ruleText:"Must not contain angled brackets, ampersands, or double quotes"},I=e=>!/[<&">]/.test(e),O=({defaultValue:e,onChange:i,onSubmit:d=()=>{},useIsAvailable:p=()=>({isAvailable:!0,reason:""}),validator:s=T,value:n,...l})=>{const m=a.useCallback(g=>{g.key==="Enter"&&d?.()},[d]),[t,u]=a.useState(""),[c,V]=a.useState(""),{isAvailable:r,reason:x}=p(t,e),o=a.useMemo(()=>s?.isValid(t),[s,t]);a.useEffect(()=>{n!==void 0&&u(n)},[n]),a.useEffect(()=>{V(o&&r?t:void 0)},[o,t,r,s.ruleText]),a.useEffect(()=>{i(c)},[i,c]);const h=a.useMemo(()=>!o&&t?s.ruleText:r?"":x||"That name is already in use.",[r,o,s.ruleText,t,x]);return f.jsx(E,{"data-testid":"input",error:h,info:s.ruleText,isUnavailable:!r,value:t,onChange:g=>u(g.target.value),onKeyPress:m,...l})};export{j as C,N as D,L as I,O as V};
