import{d as a,t as A,n as K,j as t,p as $}from"./index-CjQklFfe.js";import{a as o}from"./monaco-react-B56okIlq.js";import{u as L,D as B,a as D,g as U}from"./index-nnZv_Lp-.js";import{u as q,c as F,g as W}from"./customQuery-DkRf9uB-.js";import{c as G}from"./directory-DYvoBUit.js";import{u as H,N as J}from"./hooks-BVJQ0l3F.js";import{E as Q}from"./index-CuXowkm0.js";import{S as m}from"./index-DEArwXHg.js";import{L as N}from"./index-C0n6CyBK.js";import{b as X}from"./hooks-DcrOijlJ.js";import"./monaco-yaml-worker-4cQujBY-.js";import"./rest-CLa6CeN-.js";import"./manifest-C_BQEhie.js";import"./react-select.esm-DRpAyFsj.js";import"./toConsumableArray-CYASpIy2.js";const Y=a.div`
  padding-left: 12px;
  width: 100%;
`,Z=a.td`
  width: 100%;
  margin: 8px;
  margin-left: 0px;
`,g=a.td`
  width: 100%;
  margin: 8px;
`,ee=a.td`
  width: 100%;
  margin: 8px;
`,te=a(g)``,ae=a(g)``,le=a.td`
  width: 100%;
  margin: 8px;
  margin-right: 0px;
`,k=a.div`
  word-break: break-all;
`,z=a(K)`
  flex-grow: 1;
  font-size: 14px;
  height: 36px;
  &:disabled {
    background-color: ${A.grey10};
  }
`,re=a.div`
  margin-top: 12px;

  tbody tr {
    border: none;
  }
  tbody tr td {
    padding: 8px;
  }
  tbody tr td:nth-child(3) {
    border-right: 2px solid ${A.grey20};
    margin-left: 4px;
  }
  tbody tr td:nth-child(4) {
    margin-left: 4px;
  }
`,se=a.div`
  margin-top: 200px;
`,ie=()=>{const{objectId:h,objectType:r,relation:x,setObjectId:p,setObjectType:f,setRelation:j,setSubjectId:v,setSubjectRelation:u,setSubjectType:y,subjectId:R,subjectRelation:S,subjectType:s}=X(),{data:i}=q(),{data:c}=F({objectType:r}),{data:n}=F({objectType:s}),b=o.useMemo(()=>[{label:"All",value:""}].concat(((i==null?void 0:i.results)||[]).map(e=>({label:e.displayName||e.name,value:e.name}))),[i==null?void 0:i.results]),_=o.useMemo(()=>[{label:"All",value:""}].concat(((c==null?void 0:c.results)||[]).map(e=>({label:e.displayName||e.name,value:e.name}))),[c==null?void 0:c.results]),C=o.useMemo(()=>[{label:"All",value:""}].concat(((n==null?void 0:n.results)||[]).map(e=>({label:e.displayName||e.name,value:e.name}))),[n==null?void 0:n.results]),[I,l]=o.useState(!0),{data:d,fetchNextPage:T,hasNextPage:w,isFetching:O}=G({object_id:h||"",object_type:r||"","page.size":100,relation:x||"",subject_id:R||"",subject_relation:S||"",subject_type:s||""},{query:{enabled:I,getNextPageParam:W,placeholderData:$}}),M=o.useMemo(()=>(d==null?void 0:d.pages.map(e=>e.results||[]).flat())||[],[d==null?void 0:d.pages]),P=[{accessorKey:"object_type",header:"Object Type",meta:{filter:t.jsx(Z,{children:t.jsx(m,{defaultValue:{label:"All",value:""},label:"Object Type",options:b,value:b.find(e=>e.value===r||""),onChange:e=>{(e==null?void 0:e.value)!==""?(f(String(e==null?void 0:e.value)),j("")):(f(void 0),j(""),p("")),l(!0)}})},"object_type")},size:180},{accessorKey:"object_id",cell:({row:e})=>t.jsx(N,{to:`/ui/directory/objects/${e.original.object_type}/${encodeURIComponent(e.original.object_id)}`,children:t.jsx(k,{children:e.original.object_id})}),header:"Object Id",meta:{filter:t.jsx(g,{children:t.jsx(z,{disabled:!r||r==="",label:"Object Id",placeholder:"",value:h||"",onChange:e=>{l(!1),p(e.target.value)},onClickSearch:()=>{l(!0)}})},"object_id")},size:180},{accessorKey:"relation",id:"Relation",meta:{filter:t.jsx(ee,{children:t.jsx(m,{defaultValue:{label:"All",value:""},disabled:!r||r==="",label:"Object Relation",options:_,value:_.find(e=>e.value===x||""),onChange:e=>{j(String(e==null?void 0:e.value)),l(!0)}})},"object_relation")},size:180},{accessorKey:"subject_type",id:"Subject Type",meta:{filter:t.jsx(te,{children:t.jsx(m,{defaultValue:{label:"All",value:""},label:"Subject Type",options:b,value:b.find(e=>e.value===(s||"")),onChange:e=>{(e==null?void 0:e.value)!==""?(y(String(e==null?void 0:e.value)),u(void 0)):(y(void 0),u(void 0),v("")),l(!0)}})},"subject_type")},size:180},{accessorKey:"subject_id",cell:({row:e})=>t.jsx(N,{to:`/ui/directory/objects/${e.original.subject_type}/${encodeURIComponent(e.original.subject_id)}`,children:t.jsx(k,{children:e.original.subject_id})}),id:"Subject Id",meta:{filter:t.jsx(ae,{children:t.jsx(z,{disabled:!s||s==="",label:"Subject Id",placeholder:"",value:R||"",onChange:e=>{l(!1),v(e.target.value)},onClickSearch:()=>{l(!0)}})},"subject_id")},size:180},{accessorKey:"subject_relation",id:"Subject Relation",meta:{filter:t.jsx(le,{children:t.jsx(m,{defaultValue:{label:"All",value:""},disabled:!s||s==="",label:"Subject Relation",options:C,value:C.find(e=>e.value===(S||"")),onChange:e=>{(e==null?void 0:e.value)!==""?u(String(e==null?void 0:e.value)):u(void 0),l(!0)}})},"subject_relation")},size:180}],V=L({columns:P,data:M,getCoreRowModel:U(),getFilteredRowModel:D(),manualFiltering:!0}),E=H({getNext:T,hasMore:w});return t.jsx(t.Fragment,{children:O||M.length||I?t.jsx(re,{children:t.jsx(B,{breakTopDistance:202,fetchMoreOnBottomReached:E,isFetching:O,table:V,topDistance:162})}):t.jsx(se,{children:t.jsx(Q,{body:"",header:"No relations",imgAlt:"Empty Directory",imgSrc:J})})})},Re=()=>t.jsx(Y,{children:t.jsx(ie,{})});export{Re as default};
