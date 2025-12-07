import{e as M,j as o,t,d as b,l as ee,f as te,g as oe,h as re,L as ne,B as ie,i as ae,k as se,O as le}from"./index-B7gyiX60.js";import{P as ce,a as de}from"./index-C4K3EKDF.js";import{a as n,W as ue}from"./monaco-react-CeE7JWC9.js";import{a as q}from"./directory-C7Jh3suP.js";import{D as pe,u as ge}from"./hooks-NfYspumU.js";import{G as be,S as xe,C as he}from"./styles-Dwk92J4T.js";import{u as me}from"./customQuery-C8lJXzfH.js";import{R as ye}from"./index-BUxOArga.js";import{c as W,S as ve}from"./react-select.esm-OWZQxxta.js";import{U as fe}from"./index-C2L8P6JP.js";import{E as je}from"./edit_pen-g1txubGd.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./rest-CaSTnEYb.js";import"./manifest-CLP-8bzg.js";import"./toConsumableArray-CpW51OVY.js";const Se=({children:l})=>{const i=M(),{object_id:p,object_type:d,relation:c,subject_id:m,subject_type:g}=i.state||{},u=q(d,p),v=q(g,m),r=n.useMemo(()=>{if(c)return{label:c,value:c}},[c]),s=n.useMemo(()=>{const x=u.data?.result;if(x)return{label:x.display_name||x.id,value:x.id}},[u.data?.result]),j=n.useMemo(()=>{const x=v.data?.result;if(x)return{label:x.display_name||x.id,value:x.id}},[v.data?.result]),[C,S]=n.useState(!1),[w,f]=n.useState(""),[k,O]=n.useState("check"),[T,y]=n.useState("user"),[e,a]=n.useState(null),[h,I]=n.useState(null),[B,$]=n.useState("group"),[E,R]=n.useState(null),[H,D]=n.useState(void 0),[P,G]=n.useState(void 0),[_,V]=n.useState(void 0),[A,z]=n.useState(void 0),[F,U]=n.useState(void 0),[N,Z]=n.useState(void 0),[Q,J]=n.useState(void 0);n.useEffect(()=>{s&&R(s)},[R,s]),n.useEffect(()=>{j&&a(j)},[a,j]),n.useEffect(()=>{r&&I(r)},[I,r]),n.useEffect(()=>{i.state!==null&&$(d)},[i.state,$,d]),n.useEffect(()=>{i.state!==null&&y(g)},[i.state,y,g]);const X=n.useMemo(()=>({data:{objectId:N,objectType:H,relation:_,relationsQueryKey:F,setObjectId:Z,setObjectType:D,setRelation:V,setRelationsQueryKey:U,setSubjectId:J,setSubjectRelation:z,setSubjectType:G,subjectId:Q,subjectRelation:A,subjectType:P},evaluator:{objectInstance:E,objectType:B,relationType:h,request:k,setObjectInstance:R,setObjectType:$,setRelationType:I,setRequest:O,setSubjectInstance:a,setSubjectType:y,subjectInstance:e,subjectType:T},model:{code:w,setCode:f,setVisible:S,visible:C}}),[C,S,w,f,k,T,e,h,B,E,O,y,a,I,$,R,H,D,P,G,_,V,A,z,N,Q,F,U]);return o.jsx(pe.Provider,{value:X,children:l})},K="data:image/svg+xml,%3csvg%20width='9'%20height='24'%20viewBox='0%200%209%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3c/svg%3e",L="data:image/svg+xml,%3csvg%20width='9'%20height='24'%20viewBox='0%200%209%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='4.5'%20cy='12'%20r='4.5'%20fill='%234A92FF'%20/%3e%3c/svg%3e",Ce=b.div`
  width: 100%;
  display: flex;
  position: fixed;
  max-width: 250px;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${t.grey20};
  &:last-child {
    border-bottom: none;
  }
`,we=b.div`
  display: ${({$show:l})=>l?"block":"none"};
`,ke=b(te)`
  align-items: center;
  color: ${t.grey70};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-weight: 400;
  gap: 8px;
  padding: 6px 25px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: ${t.grey100};
    background-color: ${t.grey10};
  }
  > img {
    visibility: hidden;
  }

  &.active {
    color: ${t.grey100};
    > img {
      visibility: visible;
    }
  }

  ${({$depth:l})=>l===0?ee`
          border-bottom: 1px solid ${t.grey20};
          padding: 8px 0px;
          color: ${t.grey70};
          :nth-child(odd) {
            margin-top: -1px;
          }
          &.active {
            color: ${t.grey100};
            background-color: ${t.grey20};
            border-left: 5px solid ${t.indogoAccent3};
          }
        `:void 0}
`,Oe=b.div`
  color: ${t.grey70};
  cursor: pointer;
  display: flex;
  padding: 6px 42px;
  margin-bottom: 10px;
  span {
    border-bottom: 2px dotted ${t.grey70};
  }
  &:hover {
    color: ${t.grey100};
  }
`,Y=({children:l,depth:i,subLinks:p,to:d})=>{const c=oe(d),m=re({end:!1,path:`${c.pathname}/*`});let g;switch(i){case 0:g=K;break;default:g=L;break}return o.jsxs(o.Fragment,{children:[o.jsxs(ke,{$depth:i,to:d,children:[o.jsx("img",{alt:"show",src:g}),l]}),o.jsx(we,{$show:m!==null,children:p?.map(u=>u.redirects?o.jsx(Y,{depth:i+1,to:u.value,children:u.label},u.value):o.jsx(Oe,{onClick:u.onClick,children:o.jsx("span",{children:u.label})},u.label))})]})},Te=({options:l})=>o.jsx(Ce,{children:l.map(i=>o.jsx("div",{children:o.jsx(Y,{depth:0,subLinks:i.subOptions,to:i.section.value,children:i.section.label})},i.section.value))}),Ie=b.div`
display: flex:
flex-direction: column;
height: 40px;
img{
padding-right: 5px;
margin-left: 5px;
}
`,$e=b.div`
  display: flex;
  gap: 8px;
`,Re=l=>o.jsx("div",{children:l.label}),Le=ue.forwardRef(({disabled:l,disableLabel:i,label:p,modifyCustomStyle:d,name:c,onChange:m,style:g,value:u,...v},r)=>{const{pathname:s}=M(),j=s.substring(s.lastIndexOf("/")+1),[C,S]=n.useState(j),[w,f]=n.useState(!1),k={boxShadow:"none",outline:"none",webkitBoxShadow:"none"},O=n.useCallback(e=>o.jsx(Ie,{style:{display:e.data.label?"":"none"},children:o.jsxs(W.Option,{...e,innerProps:{...e.innerProps,onMouseDown:a=>{S(""),e.data.shouldStopPropagation&&(a.stopPropagation(),e.data?.onClick?.())}},children:[e.isSelected&&o.jsx("img",{alt:"plus",src:L})," ",e.children]})}),[]),T=e=>o.jsx(fe,{to:String(e.data.options[0].value),onClick:()=>{f(!1),S(e.data.options.length<=1&&e.data.label||"")},children:o.jsx(W.GroupHeading,{...e,children:o.jsxs($e,{children:[e.data.label?.toUpperCase()===C.toUpperCase()?o.jsx("img",{alt:"circle",src:L}):o.jsx("img",{alt:"transparent_circle",src:K}),e.children]})})}),y={control:(e,{isDisabled:a,isFocused:h})=>({...e,":hover":{...e[":hover"],backgroundColor:t.grey10,borderColor:t.indogoAccent1,color:t.grey100},backgroundColor:a?t.grey40:t.primaryBlack,borderColor:h?t.indogoAccent2:t.grey40,boxShadow:"none",color:a?t.grey40:t.grey100,marginLeft:24,minHeight:36,opacity:a?.6:1,outline:h?"none":"",overflowY:"hidden"}),dropdownIndicator:(e,{isDisabled:a})=>({...e,color:a?t.grey40:t.grey70,padding:7}),group:e=>({...e,padding:0}),groupHeading:e=>({...e,":hover":{backgroundColor:t.grey40},backgroundColor:t.grey20,color:t.grey100,fontSize:14,height:"100%",margin:0,minHeight:40,paddingLeft:6}),indicatorSeparator:(e,{isDisabled:a})=>({...e,backgroundColor:a?t.grey30:t.grey30}),input:e=>({...e,borderColor:t.grey60,color:t.grey100}),loadingMessage:e=>({...e,backgroundColor:t.grey20,minHeight:36}),menu:e=>({...e,backgroundColor:t.grey20,boxShadow:"0px 2px 6px 4px rgba(0,0,0,0.3)",marginLeft:23,marginTop:1,width:"96%",zIndex:2}),menuList:e=>({...e,border:`1px solid ${t.grey40}`,borderBottomLeftRadius:"4px",borderBottomRightRadius:"2px",minHeight:284,padding:0,zIndex:5}),noOptionsMessage:e=>({...e,backgroundColor:t.grey20}),option:(e,{isDisabled:a,isSelected:h})=>({...e,":active":{...e[":active"],backgroundColor:t.grey40},":hover":{backgroundColor:t.grey40,color:t.grey100},backgroundColor:a?t.grey20:h?t.grey20:t.grey20,cursor:a?"not-allowed":"default",fontSize:14,height:"100%",minHeight:30,paddingLeft:h?"16px":"38px"}),placeholder:(e,{isDisabled:a})=>({...e,color:a?t.grey40:t.grey90}),singleValue:(e,{isDisabled:a})=>({...e,color:a?t.grey40:t.grey100,...k}),valueContainer:e=>({...e,fontSize:14})};return o.jsxs("div",{style:g,children:[p&&o.jsx(ne,{disabled:i,htmlFor:c,children:p}),o.jsx(ve,{ref:r,formatGroupLabel:Re,inputId:c,isDisabled:l,isSearchable:!1,menuIsOpen:w,name:c,value:u,onChange:m,onMenuClose:()=>f(!1),onMenuOpen:()=>f(!0),...v,components:{GroupHeading:T,Option:O},styles:d?d(y):y})]})}),Me=b.div`
  @media (min-width: 912px) {
    grid-area: header;
  }
`,Be=b.div`
  min-width: 250px;
  @media (max-width: 912px) {
    display: none;
  }
`,Ee=b.div`
  width: 97%;
  margin-top: 20px;
  margin-bottom: 10px;
  button {
    margin-top: 25px;
  }
  @media (min-width: 913px) {
    display: none;
  }
`,He=b.img`
  height: 12px;
  width: 12px;
  filter: brightness(150%);
`,De=b(ie)`
  line-height: 18px;
`,Pe=()=>{const l=ae(),{data:i}=me(),p=n.useMemo(()=>i?.results||[],[i?.results]),d=n.useMemo(()=>{const r=[{section:{label:"Model",redirects:!0,value:"/ui/directory/model"}},{section:{label:"Relations",redirects:!0,value:"/ui/directory/relations"}}];return p.length>0&&r.push({section:{label:"Objects",redirects:!0,value:"/ui/directory/objects"},subOptions:p.map(s=>({label:s.displayName||s.name,redirects:!0,value:`/ui/directory/objects/${encodeURIComponent(s.name)}`}))}),r.push({section:{label:"Evaluator",redirects:!0,value:"/ui/directory/evaluator"}},{section:{label:"API Browser",redirects:!0,value:"/ui/directory/docs"}},{section:{label:"Danger Zone",redirects:!0,value:"/ui/directory/danger"}}),r},[p]),c=d.map(r=>({label:r.section.label,options:r.subOptions?r.subOptions.filter(s=>s.redirects).map(s=>({group:r.section.label,label:s.label,value:s.value})):[{group:r.section.label,label:"",value:r.section.value}]})),{pathname:m}=M(),g=m,u=r=>{l(r)},v=(r,s)=>s.context==="value"?r.label!==""?`${r.group.endsWith("s")?r.group.slice(0,-1):r.group}: ${r.label}`:r.group:r.label;return o.jsxs(ye,{children:[o.jsx(Be,{children:o.jsx(Te,{options:d})}),o.jsx(Ee,{children:o.jsx(Le,{"aria-label":"Sections",formatGroupLabel:r=>r?.label?o.jsx("div",{style:{alignItems:"center",borderTop:"1px #414141 solid",display:"flex",minHeight:"36px"},children:r.label}):void 0,formatOptionLabel:v,options:c,value:(c.find(r=>r.options.find(s=>s.value===g))||c[0]).options.find(r=>r.value===g),onChange:r=>{r&&"value"in r&&u(String(r.value))}})})]})},Ge=b.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  margin-right: 108px;
  position: relative;
  white-space: nowrap;
`,_e=()=>{const{setVisible:l,visible:i}=ge(),p=se(),d=window.location.pathname,c=n.useCallback(()=>{p.refetchQueries({type:"active"})},[p]);return o.jsx(Me,{children:o.jsx(ce,{hasBorderBottom:!0,load:c,mobileBreakpoint:912,title:"Directory",children:o.jsx(Ge,{children:d==="/ui/directory/model"&&o.jsxs(De,{hidden:i,onClick:()=>l(!0),children:[o.jsx(He,{alt:"plus",src:je}),"  Edit manifest"]})})})})},tt=()=>o.jsx(Se,{children:o.jsx(de,{children:o.jsxs(be,{children:[o.jsx(_e,{}),o.jsx(xe,{children:o.jsx(Pe,{})}),o.jsx(he,{children:o.jsx(le,{})})]})})});export{tt as default};
