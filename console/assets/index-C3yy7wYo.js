import{e as E,j as o,t,d as x,l as re,f as ne,g as ie,h as ae,L as se,B as le,i as ce,k as de,O as ue}from"./index-CjQklFfe.js";import{P as pe,a as ge}from"./index-DfIgs9ai.js";import{a as n,W as be}from"./monaco-react-B56okIlq.js";import{a as Y}from"./directory-DYvoBUit.js";import{D as xe,u as he}from"./hooks-DcrOijlJ.js";import{G as me,S as ye,C as ve}from"./styles-B8PD2iDz.js";import{u as fe}from"./customQuery-DkRf9uB-.js";import{R as je}from"./index-DmcD4W8r.js";import{c as Z,S as Se}from"./react-select.esm-DRpAyFsj.js";import{U as Ce}from"./index-C0n6CyBK.js";import{E as we}from"./edit_pen-g1txubGd.js";import"./monaco-yaml-worker-4cQujBY-.js";import"./rest-CLa6CeN-.js";import"./manifest-C_BQEhie.js";import"./toConsumableArray-CYASpIy2.js";const ke=({children:l})=>{var W,K;const i=E(),{object_id:d,object_type:u,relation:c,subject_id:m,subject_type:b}=i.state||{},p=Y(u,d),f=Y(b,m),r=n.useMemo(()=>{if(c)return{label:c,value:c}},[c]),s=n.useMemo(()=>{var w;const h=(w=p.data)==null?void 0:w.result;if(h)return{label:h.display_name||h.id,value:h.id}},[(W=p.data)==null?void 0:W.result]),S=n.useMemo(()=>{var w;const h=(w=f.data)==null?void 0:w.result;if(h)return{label:h.display_name||h.id,value:h.id}},[(K=f.data)==null?void 0:K.result]),[k,C]=n.useState(!1),[O,j]=n.useState(""),[T,I]=n.useState("check"),[$,y]=n.useState("user"),[e,a]=n.useState(null),[g,v]=n.useState(null),[H,R]=n.useState("group"),[L,M]=n.useState(null),[D,P]=n.useState(void 0),[G,_]=n.useState(void 0),[V,A]=n.useState(void 0),[z,F]=n.useState(void 0),[U,N]=n.useState(void 0),[Q,ee]=n.useState(void 0),[q,te]=n.useState(void 0);n.useEffect(()=>{s&&M(s)},[M,s]),n.useEffect(()=>{S&&a(S)},[a,S]),n.useEffect(()=>{r&&v(r)},[v,r]),n.useEffect(()=>{i.state!==null&&R(u)},[i.state,R,u]),n.useEffect(()=>{i.state!==null&&y(b)},[i.state,y,b]);const oe=n.useMemo(()=>({data:{objectId:Q,objectType:D,relation:V,relationsQueryKey:U,setObjectId:ee,setObjectType:P,setRelation:A,setRelationsQueryKey:N,setSubjectId:te,setSubjectRelation:F,setSubjectType:_,subjectId:q,subjectRelation:z,subjectType:G},evaluator:{objectInstance:L,objectType:H,relationType:g,request:T,setObjectInstance:M,setObjectType:R,setRelationType:v,setRequest:I,setSubjectInstance:a,setSubjectType:y,subjectInstance:e,subjectType:$},model:{code:O,setCode:j,setVisible:C,visible:k}}),[k,C,O,j,T,$,e,g,H,L,I,y,a,v,R,M,D,P,G,_,V,A,z,F,Q,q,U,N]);return o.jsx(xe.Provider,{value:oe,children:l})},J="data:image/svg+xml,%3csvg%20width='9'%20height='24'%20viewBox='0%200%209%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3c/svg%3e",B="data:image/svg+xml,%3csvg%20width='9'%20height='24'%20viewBox='0%200%209%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='4.5'%20cy='12'%20r='4.5'%20fill='%234A92FF'%20/%3e%3c/svg%3e",Oe=x.div`
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
`,Te=x.div`
  display: ${({$show:l})=>l?"block":"none"};
`,Ie=x(ne)`
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

  ${({$depth:l})=>l===0?re`
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
`,$e=x.div`
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
`,X=({children:l,depth:i,subLinks:d,to:u})=>{const c=ie(u),m=ae({end:!1,path:`${c.pathname}/*`});let b;switch(i){case 0:b=J;break;default:b=B;break}return o.jsxs(o.Fragment,{children:[o.jsxs(Ie,{$depth:i,to:u,children:[o.jsx("img",{alt:"show",src:b}),l]}),o.jsx(Te,{$show:m!==null,children:d==null?void 0:d.map(p=>p.redirects?o.jsx(X,{depth:i+1,to:p.value,children:p.label},p.value):o.jsx($e,{onClick:p.onClick,children:o.jsx("span",{children:p.label})},p.label))})]})},Re=({options:l})=>o.jsx(Oe,{children:l.map(i=>o.jsx("div",{children:o.jsx(X,{depth:0,subLinks:i.subOptions,to:i.section.value,children:i.section.label})},i.section.value))}),Me=x.div`
display: flex:
flex-direction: column;
height: 40px;
img{
padding-right: 5px;
margin-left: 5px;
}
`,Be=x.div`
  display: flex;
  gap: 8px;
`,Ee=l=>o.jsx("div",{children:l.label}),He=be.forwardRef(({disabled:l,disableLabel:i,label:d,modifyCustomStyle:u,name:c,onChange:m,style:b,value:p,...f},r)=>{const{pathname:s}=E(),S=s.substring(s.lastIndexOf("/")+1),[k,C]=n.useState(S),[O,j]=n.useState(!1),T={boxShadow:"none",outline:"none",webkitBoxShadow:"none"},I=n.useCallback(e=>o.jsx(Me,{style:{display:e.data.label?"":"none"},children:o.jsxs(Z.Option,{...e,innerProps:{...e.innerProps,onMouseDown:a=>{var g,v;C(""),e.data.shouldStopPropagation&&(a.stopPropagation(),(v=(g=e.data)==null?void 0:g.onClick)==null||v.call(g))}},children:[e.isSelected&&o.jsx("img",{alt:"plus",src:B})," ",e.children]})}),[]),$=e=>{var a;return o.jsx(Ce,{to:String(e.data.options[0].value),onClick:()=>{j(!1),C(e.data.options.length<=1&&e.data.label||"")},children:o.jsx(Z.GroupHeading,{...e,children:o.jsxs(Be,{children:[((a=e.data.label)==null?void 0:a.toUpperCase())===k.toUpperCase()?o.jsx("img",{alt:"circle",src:B}):o.jsx("img",{alt:"transparent_circle",src:J}),e.children]})})})},y={control:(e,{isDisabled:a,isFocused:g})=>({...e,":hover":{...e[":hover"],backgroundColor:t.grey10,borderColor:t.indogoAccent1,color:t.grey100},backgroundColor:a?t.grey40:t.primaryBlack,borderColor:g?t.indogoAccent2:t.grey40,boxShadow:"none",color:a?t.grey40:t.grey100,marginLeft:24,minHeight:36,opacity:a?.6:1,outline:g?"none":"",overflowY:"hidden"}),dropdownIndicator:(e,{isDisabled:a})=>({...e,color:a?t.grey40:t.grey70,padding:7}),group:e=>({...e,padding:0}),groupHeading:e=>({...e,":hover":{backgroundColor:t.grey40},backgroundColor:t.grey20,color:t.grey100,fontSize:14,height:"100%",margin:0,minHeight:40,paddingLeft:6}),indicatorSeparator:(e,{isDisabled:a})=>({...e,backgroundColor:a?t.grey30:t.grey30}),input:e=>({...e,borderColor:t.grey60,color:t.grey100}),loadingMessage:e=>({...e,backgroundColor:t.grey20,minHeight:36}),menu:e=>({...e,backgroundColor:t.grey20,boxShadow:"0px 2px 6px 4px rgba(0,0,0,0.3)",marginLeft:23,marginTop:1,width:"96%",zIndex:2}),menuList:e=>({...e,border:`1px solid ${t.grey40}`,borderBottomLeftRadius:"4px",borderBottomRightRadius:"2px",minHeight:284,padding:0,zIndex:5}),noOptionsMessage:e=>({...e,backgroundColor:t.grey20}),option:(e,{isDisabled:a,isSelected:g})=>({...e,":active":{...e[":active"],backgroundColor:t.grey40},":hover":{backgroundColor:t.grey40,color:t.grey100},backgroundColor:a?t.grey20:g?t.grey20:t.grey20,cursor:a?"not-allowed":"default",fontSize:14,height:"100%",minHeight:30,paddingLeft:g?"16px":"38px"}),placeholder:(e,{isDisabled:a})=>({...e,color:a?t.grey40:t.grey90}),singleValue:(e,{isDisabled:a})=>({...e,color:a?t.grey40:t.grey100,...T}),valueContainer:e=>({...e,fontSize:14})};return o.jsxs("div",{style:b,children:[d&&o.jsx(se,{disabled:i,htmlFor:c,children:d}),o.jsx(Se,{ref:r,formatGroupLabel:Ee,inputId:c,isDisabled:l,isSearchable:!1,menuIsOpen:O,name:c,value:p,onChange:m,onMenuClose:()=>j(!1),onMenuOpen:()=>j(!0),...f,components:{GroupHeading:$,Option:I},styles:u?u(y):y})]})}),Le=x.div`
  @media (min-width: 912px) {
    grid-area: header;
  }
`,De=x.div`
  min-width: 250px;
  @media (max-width: 912px) {
    display: none;
  }
`,Pe=x.div`
  width: 97%;
  margin-top: 20px;
  margin-bottom: 10px;
  button {
    margin-top: 25px;
  }
  @media (min-width: 913px) {
    display: none;
  }
`,Ge=x.img`
  height: 12px;
  width: 12px;
  filter: brightness(150%);
`,_e=x(le)`
  line-height: 18px;
`,Ve=()=>{const l=ce(),{data:i}=fe(),d=n.useMemo(()=>(i==null?void 0:i.results)||[],[i==null?void 0:i.results]),u=n.useMemo(()=>{const r=[{section:{label:"Model",redirects:!0,value:"/ui/directory/model"}},{section:{label:"Relations",redirects:!0,value:"/ui/directory/relations"}}];return d.length>0&&r.push({section:{label:"Objects",redirects:!0,value:"/ui/directory/objects"},subOptions:d.map(s=>({label:s.displayName||s.name,redirects:!0,value:`/ui/directory/objects/${encodeURIComponent(s.name)}`}))}),r.push({section:{label:"Evaluator",redirects:!0,value:"/ui/directory/evaluator"}},{section:{label:"API Browser",redirects:!0,value:"/ui/directory/docs"}},{section:{label:"Danger Zone",redirects:!0,value:"/ui/directory/danger"}}),r},[d]),c=u.map(r=>({label:r.section.label,options:r.subOptions?r.subOptions.filter(s=>s.redirects).map(s=>({group:r.section.label,label:s.label,value:s.value})):[{group:r.section.label,label:"",value:r.section.value}]})),{pathname:m}=E(),b=m,p=r=>{l(r)},f=(r,s)=>s.context==="value"?r.label!==""?`${r.group.endsWith("s")?r.group.slice(0,-1):r.group}: ${r.label}`:r.group:r.label;return o.jsxs(je,{children:[o.jsx(De,{children:o.jsx(Re,{options:u})}),o.jsx(Pe,{children:o.jsx(He,{"aria-label":"Sections",formatGroupLabel:r=>r!=null&&r.label?o.jsx("div",{style:{alignItems:"center",borderTop:"1px #414141 solid",display:"flex",minHeight:"36px"},children:r.label}):void 0,formatOptionLabel:f,options:c,value:(c.find(r=>r.options.find(s=>s.value===b))||c[0]).options.find(r=>r.value===b),onChange:r=>{r&&"value"in r&&p(String(r.value))}})})]})},Ae=x.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  margin-right: 108px;
  position: relative;
  white-space: nowrap;
`,ze=()=>{const{setVisible:l,visible:i}=he(),d=de(),u=window.location.pathname,c=n.useCallback(()=>{d.refetchQueries({type:"active"})},[d]);return o.jsx(Le,{children:o.jsx(pe,{hasBorderBottom:!0,load:c,mobileBreakpoint:912,title:"Directory",children:o.jsx(Ae,{children:u==="/ui/directory/model"&&o.jsxs(_e,{hidden:i,onClick:()=>l(!0),children:[o.jsx(Ge,{alt:"plus",src:we}),"  Edit manifest"]})})})})},nt=()=>o.jsx(ke,{children:o.jsx(ge,{children:o.jsxs(me,{children:[o.jsx(ze,{}),o.jsx(ye,{children:o.jsx(Ve,{})}),o.jsx(ve,{children:o.jsx(ue,{})})]})})});export{nt as default};
