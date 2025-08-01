import{d as a,t as k,n as E,j as t,q as K}from"./index-D2xtyF2C.js";import{a as i}from"./monaco-react-D7gXaprf.js";import{u as $,D as L,a as B,g as q}from"./index-Bogjaa8u.js";import{u as U,c as O,g as W}from"./customQuery-BPNvNjme.js";import{c as G}from"./directory-Drqp5ynE.js";import{u as H,N as J}from"./hooks-KYSag3Xx.js";import{E as Q}from"./index-Mvn4YVo0.js";import{S as c}from"./index-BsVfCwZu.js";import{L as M}from"./index-Lnl5NKPu.js";import{b as X}from"./hooks-BjjeUPaT.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./rest-BGxiHZjw.js";import"./manifest-coaC7_nB.js";import"./react-select.esm-xMSg5WYo.js";import"./toConsumableArray-RPlvpPR3.js";const Y=a.div`
  padding-left: 12px;
  width: 100%;
`,Z=a.td`
  width: 100%;
  margin: 8px;
  margin-left: 0px;
`,u=a.td`
  width: 100%;
  margin: 8px;
`,ee=a.td`
  width: 100%;
  margin: 8px;
`,te=a(u)``,ae=a(u)``,le=a.td`
  width: 100%;
  margin: 8px;
  margin-right: 0px;
`,F=a.div`
  word-break: break-all;
`,N=a(E)`
  flex-grow: 1;
  font-size: 14px;
  height: 36px;
  &:disabled {
    background-color: ${k.grey10};
  }
`,oe=a.div`
  margin-top: 12px;

  tbody tr {
    border: none;
  }
  tbody tr td {
    padding: 8px;
  }
  tbody tr td:nth-child(3) {
    border-right: 2px solid ${k.grey20};
    margin-left: 4px;
  }
  tbody tr td:nth-child(4) {
    margin-left: 4px;
  }
`,se=a.div`
  margin-top: 200px;
`,ie=()=>{const{objectId:b,objectType:o,relation:p,setObjectId:j,setObjectType:m,setRelation:d,setSubjectId:g,setSubjectRelation:r,setSubjectType:h,subjectId:x,subjectRelation:y,subjectType:s}=X(),{data:f}=U(),{data:v}=O({objectType:o}),{data:R}=O({objectType:s}),n=i.useMemo(()=>[{label:"All",value:""}].concat((f?.results||[]).map(e=>({label:e.displayName||e.name,value:e.name}))),[f?.results]),S=i.useMemo(()=>[{label:"All",value:""}].concat((v?.results||[]).map(e=>({label:e.displayName||e.name,value:e.name}))),[v?.results]),_=i.useMemo(()=>[{label:"All",value:""}].concat((R?.results||[]).map(e=>({label:e.displayName||e.name,value:e.name}))),[R?.results]),[C,l]=i.useState(!0),{data:T,fetchNextPage:z,hasNextPage:A,isFetching:D}=G({object_id:b||"",object_type:o||"","page.size":100,relation:p||"",subject_id:x||"",subject_relation:y||"",subject_type:s||""},{query:{enabled:C,getNextPageParam:W,placeholderData:K}}),I=i.useMemo(()=>T?.pages.map(e=>e.results||[]).flat()||[],[T?.pages]),w=[{accessorKey:"object_type",header:"Object Type",meta:{filter:t.jsx(Z,{children:t.jsx(c,{defaultValue:{label:"All",value:""},label:"Object Type",options:n,value:n.find(e=>e.value===o||""),onChange:e=>{e?.value!==""?(m(String(e?.value)),d("")):(m(void 0),d(""),j("")),l(!0)}})},"object_type")},size:180},{accessorKey:"object_id",cell:({row:e})=>t.jsx(M,{to:`/ui/directory/objects/${e.original.object_type}/${encodeURIComponent(e.original.object_id)}`,children:t.jsx(F,{children:e.original.object_id})}),header:"Object Id",meta:{filter:t.jsx(u,{children:t.jsx(N,{disabled:!o||o==="",label:"Object Id",placeholder:"",value:b||"",onChange:e=>{l(!1),j(e.target.value)},onClickSearch:()=>{l(!0)}})},"object_id")},size:180},{accessorKey:"relation",id:"Relation",meta:{filter:t.jsx(ee,{children:t.jsx(c,{defaultValue:{label:"All",value:""},disabled:!o||o==="",label:"Object Relation",options:S,value:S.find(e=>e.value===p||""),onChange:e=>{d(String(e?.value)),l(!0)}})},"object_relation")},size:180},{accessorKey:"subject_type",id:"Subject Type",meta:{filter:t.jsx(te,{children:t.jsx(c,{defaultValue:{label:"All",value:""},label:"Subject Type",options:n,value:n.find(e=>e.value===(s||"")),onChange:e=>{e?.value!==""?(h(String(e?.value)),r(void 0)):(h(void 0),r(void 0),g("")),l(!0)}})},"subject_type")},size:180},{accessorKey:"subject_id",cell:({row:e})=>t.jsx(M,{to:`/ui/directory/objects/${e.original.subject_type}/${encodeURIComponent(e.original.subject_id)}`,children:t.jsx(F,{children:e.original.subject_id})}),id:"Subject Id",meta:{filter:t.jsx(ae,{children:t.jsx(N,{disabled:!s||s==="",label:"Subject Id",placeholder:"",value:x||"",onChange:e=>{l(!1),g(e.target.value)},onClickSearch:()=>{l(!0)}})},"subject_id")},size:180},{accessorKey:"subject_relation",id:"Subject Relation",meta:{filter:t.jsx(le,{children:t.jsx(c,{defaultValue:{label:"All",value:""},disabled:!s||s==="",label:"Subject Relation",options:_,value:_.find(e=>e.value===(y||"")),onChange:e=>{e?.value!==""?r(String(e?.value)):r(void 0),l(!0)}})},"subject_relation")},size:180}],P=$({columns:w,data:I,getCoreRowModel:q(),getFilteredRowModel:B(),manualFiltering:!0}),V=H({getNext:z,hasMore:A});return t.jsx(t.Fragment,{children:D||I.length||C?t.jsx(oe,{children:t.jsx(L,{breakTopDistance:202,fetchMoreOnBottomReached:V,isFetching:D,table:P,topDistance:162})}):t.jsx(se,{children:t.jsx(Q,{body:"",header:"No relations",imgAlt:"Empty Directory",imgSrc:J})})})},Re=()=>t.jsx(Y,{children:t.jsx(ie,{})});export{Re as default};
