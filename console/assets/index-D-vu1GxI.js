import{b as K,k as H,j as n,B as E,d as h,i as q,m as D,t as C,n as U,o as Q,s as R}from"./index-D2xtyF2C.js";import{a as d,W as T}from"./monaco-react-D7gXaprf.js";import{g as _,u as O}from"./customQuery-BPNvNjme.js";import{u as z,D as Z,g as W}from"./index-Bogjaa8u.js";import{b as P,f as G,e as J,g as X,h as ee,a as k}from"./directory-Drqp5ynE.js";import{u as te,N as se}from"./hooks-KYSag3Xx.js";import{E as B}from"./index-Mvn4YVo0.js";import{L as re,U as ne}from"./index-Lnl5NKPu.js";import{p as oe,u as L}from"./generic-user-avatar-CWi9I0uH.js";import{O as ie,A as ae}from"./styles-CSVg_d3U.js";import{C as le,V as A,I as ce,D as de}from"./index-DOn2LL7S.js";import"./monaco-yaml-worker-C4mipKe3.js";import"./rest-BGxiHZjw.js";import"./manifest-coaC7_nB.js";function ue(r,o){const[t,e]=d.useState(r);return d.useEffect(()=>{const s=setTimeout(()=>e(r),o);return()=>{clearTimeout(s)}},[r,o]),t}const he={isAvailable:!0,reason:""},pe=r=>(t,e)=>{const s=ue(t,200),[i,l]=d.useState(he),u=r(s,e);return d.useEffect(()=>l(u),[u]),i},fe=(r,o)=>d.useMemo(()=>{const t=s=>{const i=P({object_type:r},{query:{enabled:!!r&&s!==o,getNextPageParam:_}});return d.useMemo(()=>{const u=i.data?.pages.flatMap(p=>p.results||[])?.filter(p=>p.id===s)||[],f=!s||s===o||i.isFetching||!!i.error||!i.data||u.length===0;return{isAvailable:f,reason:f?"":"That ID is already in use"}},[s,i.data,i.error,i.isFetching])};return(s,i)=>{const l=()=>pe(t);return d.useMemo(l,[])(s,i)}},[o,r]),me=h.div`
  padding: 20px;
  width: 100%;
`,ge=h.div`
  margin-top: 18px;
`,I=h.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px auto;
`,ve=h.div`
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
`,xe=({objectTypeName:r,onHide:o,onSuccess:t,show:e})=>{const[s,i]=d.useState(""),[l,u]=d.useState(""),f=K(),p=H(),y=X({object_type:r}),v=ee(),m=J(r,s),g=G({mutation:{onError:c=>{f(c)},onSuccess:c=>{a(),p.invalidateQueries({queryKey:m}),p.removeQueries({predicate:b=>b.queryKey.includes(y[0])||b.queryKey.includes(v[0])}),t?.(c.result)}}}),a=()=>{i(""),u("")},x=()=>{a(),o()},w=fe(r);return r?n.jsx(n.Fragment,{children:n.jsx(le,{cardHeight:"100%",show:e,title:`Add ${r}`,onHide:x,children:n.jsxs(me,{className:"add-a-relation-modal-content",children:[n.jsx("div",{children:`Provide a unique ID and a display name for this ${r}, and click the Add button.`}),n.jsxs(ge,{children:[n.jsx(I,{children:n.jsx(A,{autoFocus:!0,label:"ID",useIsAvailable:w,validator:ce,onChange:c=>i(c||"")})}),n.jsx(I,{children:n.jsx(A,{label:"Display Name",validator:de,onChange:c=>u(c||"")})})]}),n.jsxs(ve,{children:[n.jsx(E,{"data-testid":"cancel-btn",variant:"secondary",onClick:x,children:"Cancel"}),n.jsx(E,{"data-testid":"add-relation-modal-btn",disabled:s===""||g.isPending,id:"add-relation",type:"submit",onClick:()=>g.mutate({data:{object:{display_name:l,id:s,type:r}}}),children:"Add"})]})]})})}):null},ye=h(ie)`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: inherit;
  font-weight: bold;
`,be=h.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`,je=h.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-driection: row;
`,$=({children:r,className:o})=>{const t=q(),e=H(),{objectType:s}=D(),i=s||"",[l,u]=d.useState(!1);return n.jsxs(ye,{className:o,children:[n.jsx(xe,{objectTypeName:s,show:l,onHide:()=>u(!1),onSuccess:f=>{u(!1),e.refetchQueries({type:"active"}),t(`/ui/directory/objects/${i}/${encodeURIComponent(f.id)}`,{replace:!0})}}),n.jsx(je,{children:n.jsxs(be,{children:[n.jsxs(ae,{variant:"secondary",onClick:()=>u(!0),children:[n.jsx("img",{alt:"plus",src:oe}),"Add"]}),r]})})]})},we=h.div`
  width: 100%;
  @media (max-width: 912px) {
    margin-top: 94px;
  }
`,Ce=h(U)`
  max-width: 330px;
  width: 330px;
`,Se=h(U)`
  max-width: 330px;
  width: 330px;
  border-radius: 4px 0 0 4px;
`,Te=h.div`
  width: 100%;
  margin-bottom: 25px;
  padding: 0px 25px;
`,De=h.div`
  background-color: ${C.grey20};
  color: ${C.grey70};
  display: ${({$inline:r})=>r?"inline-flex":"flex"};
  width: 450px;
  padding: 10px;
  margin: 10px 10px 0 0;
  border-radius: 6px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  > div {
    flex-direction: column;
    display: flex;
    gap: 3px;
  }
  img {
    margin-right: 10px;
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
  }
  &:hover {
    background-color: ${C.grey30};
    color: ${C.grey100};
  }
`,F=h.span`
  font-weight: bold;
  color: ${C.grey100};
`,Ee=h.div`
  display: block;
  width: 315px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,V=h(E)`
  height: 36px;
`,Le=h.div`
  width: 100%;
  @media (max-width: 912px) {
    margin-top: 94px;
  }
`,Me=h.div`
  word-break: break-all;
`,_e=()=>{const{objectType:r}=D(),o=r||"",[t,e]=d.useState(""),{data:s}=O(),i=d.useMemo(()=>(s?.results||[]).map(c=>c.name),[s?.results]),{data:l,fetchNextPage:u,hasNextPage:f,isFetching:p}=P({object_type:r,"page.size":100},{query:{enabled:i.includes(o),getNextPageParam:_}}),{refetch:y}=k(o,t,{},{query:{enabled:!1,meta:{showError:!1},retry:!1}}),[v,m]=d.useState([]),g=d.useMemo(()=>{const c=l?.pages.map(b=>b.results||[]).flat()??[];return m(c),c},[l?.pages,m]),x=z({columns:[{accessorKey:"id",header:"ID",meta:{size:"50%"}},{cell:({row:c})=>n.jsx(re,{to:`/ui/directory/objects/${o}/${encodeURIComponent(c.original.id)}`,children:n.jsx(Me,{children:c.original.display_name||c.original.id})}),header:"Name",meta:{size:"50%"}}],data:v,getCoreRowModel:W()}),w=te({getNext:u,hasMore:f});return p?null:n.jsxs(n.Fragment,{children:[n.jsxs(Le,{children:[n.jsx($,{children:n.jsxs(n.Fragment,{children:[n.jsx(Ce,{"data-testid":"filter-input",placeholder:"Find",value:t,onChange:c=>{(c.target.value===""||c.target.value===void 0)&&m(g),e(c.target.value)}}),n.jsx(V,{disabled:!t,onClick:async()=>{const c=(await y()).data,b=c?.result?[c.result]:[];m(b)},children:" Find "})]})}),v.length?n.jsx(Z,{fetchMoreOnBottomReached:w,isFetching:p,table:x}):n.jsx(B,{body:'To add one, click the "Add" button in the top left.',header:"",imgAlt:"Empty Directory",imgSrc:se}),n.jsx("br",{})]}),n.jsx("br",{})]})};/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var M=function(r,o){return M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])},M(r,o)};function Oe(r,o){M(r,o);function t(){this.constructor=r}r.prototype=o===null?Object.create(o):(t.prototype=o.prototype,new t)}var S=function(){return S=Object.assign||function(o){for(var t,e=1,s=arguments.length;e<s;e++){t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(o[i]=t[i])}return o},S.apply(this,arguments)};function Pe(r,o,t,e){var s,i=!1,l=0;function u(){s&&clearTimeout(s)}function f(){u(),i=!0}typeof o!="boolean"&&(e=t,t=o,o=void 0);function p(){var y=this,v=Date.now()-l,m=arguments;if(i)return;function g(){l=Date.now(),t.apply(y,m)}function a(){s=void 0}e&&!s&&g(),u(),e===void 0&&v>r?g():o!==!0&&(s=setTimeout(e?a:g,e===void 0?r-v:r))}return p.cancel=f,p}var j={Pixel:"Pixel",Percent:"Percent"},Y={unit:j.Percent,value:.8};function N(r){return typeof r=="number"?{unit:j.Percent,value:r*100}:typeof r=="string"?r.match(/^(\d*(\.\d+)?)px$/)?{unit:j.Pixel,value:parseFloat(r)}:r.match(/^(\d*(\.\d+)?)%$/)?{unit:j.Percent,value:parseFloat(r)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),Y):(console.warn("scrollThreshold should be string or number"),Y)}var Re=function(r){Oe(o,r);function o(t){var e=r.call(this,t)||this;return e.lastScrollTop=0,e.actionTriggered=!1,e.startY=0,e.currentY=0,e.dragging=!1,e.maxPullDownDistance=0,e.getScrollableTarget=function(){return e.props.scrollableTarget instanceof HTMLElement?e.props.scrollableTarget:typeof e.props.scrollableTarget=="string"?document.getElementById(e.props.scrollableTarget):(e.props.scrollableTarget===null&&console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `),null)},e.onStart=function(s){e.lastScrollTop||(e.dragging=!0,s instanceof MouseEvent?e.startY=s.pageY:s instanceof TouchEvent&&(e.startY=s.touches[0].pageY),e.currentY=e.startY,e._infScroll&&(e._infScroll.style.willChange="transform",e._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},e.onMove=function(s){e.dragging&&(s instanceof MouseEvent?e.currentY=s.pageY:s instanceof TouchEvent&&(e.currentY=s.touches[0].pageY),!(e.currentY<e.startY)&&(e.currentY-e.startY>=Number(e.props.pullDownToRefreshThreshold)&&e.setState({pullToRefreshThresholdBreached:!0}),!(e.currentY-e.startY>e.maxPullDownDistance*1.5)&&e._infScroll&&(e._infScroll.style.overflow="visible",e._infScroll.style.transform="translate3d(0px, "+(e.currentY-e.startY)+"px, 0px)")))},e.onEnd=function(){e.startY=0,e.currentY=0,e.dragging=!1,e.state.pullToRefreshThresholdBreached&&(e.props.refreshFunction&&e.props.refreshFunction(),e.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){e._infScroll&&(e._infScroll.style.overflow="auto",e._infScroll.style.transform="none",e._infScroll.style.willChange="unset")})},e.onScrollListener=function(s){typeof e.props.onScroll=="function"&&setTimeout(function(){return e.props.onScroll&&e.props.onScroll(s)},0);var i=e.props.height||e._scrollableNode?s.target:document.documentElement.scrollTop?document.documentElement:document.body;if(!e.actionTriggered){var l=e.props.inverse?e.isElementAtTop(i,e.props.scrollThreshold):e.isElementAtBottom(i,e.props.scrollThreshold);l&&e.props.hasMore&&(e.actionTriggered=!0,e.setState({showLoader:!0}),e.props.next&&e.props.next()),e.lastScrollTop=i.scrollTop}},e.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},e.throttledOnScrollListener=Pe(150,e.onScrollListener).bind(e),e.onStart=e.onStart.bind(e),e.onMove=e.onMove.bind(e),e.onEnd=e.onEnd.bind(e),e}return o.prototype.componentDidMount=function(){if(typeof this.props.dataLength>"u")throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),typeof this.props.initialScrollY=="number"&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),typeof this.props.refreshFunction!="function"))throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`)},o.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},o.prototype.componentDidUpdate=function(t){this.props.dataLength!==t.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},o.getDerivedStateFromProps=function(t,e){var s=t.dataLength!==e.prevDataLength;return s?S(S({},e),{prevDataLength:t.dataLength}):null},o.prototype.isElementAtTop=function(t,e){e===void 0&&(e=.8);var s=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,i=N(e);return i.unit===j.Pixel?t.scrollTop<=i.value+s-t.scrollHeight+1:t.scrollTop<=i.value/100+s-t.scrollHeight+1},o.prototype.isElementAtBottom=function(t,e){e===void 0&&(e=.8);var s=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,i=N(e);return i.unit===j.Pixel?t.scrollTop+s>=t.scrollHeight-i.value:t.scrollTop+s>=i.value/100*t.scrollHeight},o.prototype.render=function(){var t=this,e=S({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),s=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),i=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return T.createElement("div",{style:i,className:"infinite-scroll-component__outerdiv"},T.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(l){return t._infScroll=l},style:e},this.props.pullDownToRefresh&&T.createElement("div",{style:{position:"relative"},ref:function(l){return t._pullDown=l}},T.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!s&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},o}(d.Component);const Ae="data:image/svg+xml,%3csvg%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M82.7225%2078.5593V77.2542C82.7225%2068.6407%2080.8901%2061.8542%2077.2251%2056.8949C76.178%2055.3288%2076.9633%2053.2407%2078.534%2052.9797C79.8429%2052.7186%2081.1518%2052.4576%2082.7225%2052.4576C95.5497%2052.4576%20100%2064.2034%20100%2072.2949C100%2076.4712%2091.3613%2078.5593%2082.7225%2078.5593ZM50%2042.278C41.623%2042.278%2034.8168%2035.4915%2034.8168%2027.139C34.8168%2018.7864%2041.623%2012%2050%2012C58.377%2012%2065.1832%2018.7864%2065.1832%2027.139C65.1832%2035.4915%2058.377%2042.278%2050%2042.278ZM82.4607%2047.7593C76.178%2047.7593%2070.9424%2042.539%2070.9424%2036.2746C70.9424%2030.0102%2076.178%2024.7898%2082.4607%2024.7898C88.7435%2024.7898%2093.9791%2030.0102%2093.9791%2036.2746C93.9791%2042.539%2088.7435%2047.7593%2082.4607%2047.7593ZM17.2775%2047.4983C10.9948%2047.4983%206.02094%2042.539%206.02094%2036.2746C6.02094%2030.0102%2010.9948%2025.0508%2017.2775%2025.0508C23.5602%2025.0508%2028.534%2030.0102%2028.534%2036.2746C28.534%2042.539%2023.5602%2047.4983%2017.2775%2047.4983ZM50%2048.5424C66.4921%2048.5424%2078.0105%2054.8068%2078.0105%2076.4712C78.0105%2082.2136%2071.7277%2089%2050%2089C28.2723%2089%2021.9895%2082.9966%2021.9895%2076.4712C21.9895%2054.5458%2033.2461%2048.5424%2050%2048.5424ZM0%2072.817C0%2064.7254%204.18848%2052.9797%2017.2775%2052.9797C18.8482%2052.9797%2020.1571%2053.2407%2021.466%2053.5017C23.2984%2054.0237%2023.822%2056.1119%2022.7749%2057.4169C19.1099%2062.3763%2017.2775%2069.1627%2017.2775%2077.7763V79.0814C8.63874%2079.0814%200%2076.9932%200%2072.817Z'%20fill='%23e7e7e7'/%3e%3c/svg%3e",Ie=Q({email:R().optional(),picture:R().optional().default(L).transform(r=>r===""?L:r)}),Fe=(r={})=>Ie.parse(r||{}),Ye=()=>{const{objectType:r}=D(),o=r||"",[t,e]=d.useState([]),[s,i]=d.useState(""),{data:l}=O(),u=d.useMemo(()=>(l?.results||[]).map(a=>a.name),[l?.results]),{data:f,fetchNextPage:p,hasNextPage:y,isFetching:v}=P({object_type:o,"page.size":100},{query:{enabled:u.includes(o),getNextPageParam:_}}),m=d.useMemo(()=>{const a=f?.pages.map(x=>x.results||[]).flat()??[];return e(a),a},[f?.pages,e]),{refetch:g}=k(o,s,{},{query:{enabled:!1,meta:{showError:!1},retry:!1}});return n.jsxs(we,{children:[n.jsx($,{children:n.jsxs(n.Fragment,{children:[n.jsx(Se,{placeholder:"User ID",value:s,onChange:a=>{(a.target.value===""||a.target.value===void 0)&&e(m),i(a.target.value)}}),n.jsx(V,{disabled:!s,onClick:async()=>{const a=(await g()).data?.result;e(a?[a]:[])},children:" Find "})]})}),n.jsx(Te,{children:t.length?n.jsx(Re,{dataLength:t.length,hasMore:!!y,loader:v,next:p,children:t.map(a=>{const x=Fe(a.properties);return n.jsx(ne,{to:`/ui/directory/objects/${o}/${encodeURIComponent(a.id)}`,children:n.jsxs(De,{$inline:!0,children:[n.jsx("img",{alt:a.display_name??a.id,src:x.picture,onError:w=>{w.currentTarget.src=L}}),n.jsxs("div",{children:[n.jsx(F,{children:a.display_name}),n.jsx("span",{children:x.email}),n.jsxs(Ee,{children:[n.jsx(F,{children:"ID: "}),n.jsx("span",{children:a.id})]})]})]})},a.id)})}):n.jsx(B,{body:'To add one, click the "Add" button in the top left.',header:"",imgAlt:"Empty Directory",imgSrc:Ae})})]})},Je=()=>{const{objectType:r}=D(),{data:o}=O(),t=d.useMemo(()=>(o?.results||[]).map(e=>e.name),[o?.results]);if(d.useEffect(()=>{window.scrollTo(0,0)},[r]),!r||!t.includes(r))return null;switch(r){case"user":return n.jsx(Ye,{});default:return n.jsx(_e,{})}};export{Je as default};
