import{b as K,k as H,j as s,B as L,d as p,i as q,m as S,t as C,n as U,z as D}from"./index-CjQklFfe.js";import{a as d,W as E}from"./monaco-react-B56okIlq.js";import{g as O,u as P}from"./customQuery-DkRf9uB-.js";import{u as Q,D as z,g as Z}from"./index-nnZv_Lp-.js";import{b as R,f as W,e as G,g as J,h as X,a as k}from"./directory-DYvoBUit.js";import{u as ee,N as te}from"./hooks-BVJQ0l3F.js";import{E as B}from"./index-CuXowkm0.js";import{L as re,U as ne}from"./index-C0n6CyBK.js";import{p as se,u as M}from"./generic-user-avatar-CWi9I0uH.js";import{O as oe,A as ie}from"./styles-B8PD2iDz.js";import{C as ae,V as A,I as le,D as ce}from"./index-D3oFnZZu.js";import"./monaco-yaml-worker-4cQujBY-.js";import"./rest-CLa6CeN-.js";import"./manifest-C_BQEhie.js";function de(n,o){const[t,e]=d.useState(n);return d.useEffect(()=>{const r=setTimeout(()=>e(n),o);return()=>{clearTimeout(r)}},[n,o]),t}const ue={isAvailable:!0,reason:""},he=n=>(t,e)=>{const r=de(t,200),[i,a]=d.useState(ue),u=n(r,e);return d.useEffect(()=>a(u),[u]),i},pe=(n,o)=>d.useMemo(()=>{const t=r=>{const i=R({object_type:n},{query:{enabled:!!n&&r!==o,getNextPageParam:O}});return d.useMemo(()=>{var f,v;const u=((v=(f=i.data)==null?void 0:f.pages.flatMap(m=>m.results||[]))==null?void 0:v.filter(m=>m.id===r))||[],h=!r||r===o||i.isFetching||!!i.error||!i.data||u.length===0;return{isAvailable:h,reason:h?"":"That ID is already in use"}},[r,i.data,i.error,i.isFetching])};return(r,i)=>{const a=()=>he(t);return d.useMemo(a,[])(r,i)}},[o,n]),fe=p.div`
  padding: 20px;
  width: 100%;
`,me=p.div`
  margin-top: 18px;
`,I=p.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px auto;
`,ge=p.div`
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
`,ve=({objectTypeName:n,onHide:o,onSuccess:t,show:e})=>{const[r,i]=d.useState(""),[a,u]=d.useState(""),h=K(),f=H(),v=J({object_type:n}),m=X(),x=G(n,r),y=W({mutation:{onError:c=>{h(c)},onSuccess:c=>{l(),f.invalidateQueries({queryKey:x}),f.removeQueries({predicate:b=>b.queryKey.includes(v[0])||b.queryKey.includes(m[0])}),t==null||t(c.result)}}}),l=()=>{i(""),u("")},g=()=>{l(),o()},w=pe(n);return n?s.jsx(s.Fragment,{children:s.jsx(ae,{cardHeight:"100%",show:e,title:`Add ${n}`,onHide:g,children:s.jsxs(fe,{className:"add-a-relation-modal-content",children:[s.jsx("div",{children:`Provide a unique ID and a display name for this ${n}, and click the Add button.`}),s.jsxs(me,{children:[s.jsx(I,{children:s.jsx(A,{autoFocus:!0,label:"ID",useIsAvailable:w,validator:le,onChange:c=>i(c||"")})}),s.jsx(I,{children:s.jsx(A,{label:"Display Name",validator:ce,onChange:c=>u(c||"")})})]}),s.jsxs(ge,{children:[s.jsx(L,{"data-testid":"cancel-btn",variant:"secondary",onClick:g,children:"Cancel"}),s.jsx(L,{"data-testid":"add-relation-modal-btn",disabled:r===""||y.isPending,id:"add-relation",type:"submit",onClick:()=>y.mutate({data:{object:{display_name:a,id:r,type:n}}}),children:"Add"})]})]})})}):null},xe=p(oe)`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: inherit;
  font-weight: bold;
`,ye=p.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`,be=p.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-driection: row;
`,$=({children:n,className:o})=>{const t=q(),e=H(),{objectType:r}=S(),i=r||"",[a,u]=d.useState(!1);return s.jsxs(xe,{className:o,children:[s.jsx(ve,{objectTypeName:r,show:a,onHide:()=>u(!1),onSuccess:h=>{u(!1),e.refetchQueries({type:"active"}),t(`/ui/directory/objects/${i}/${encodeURIComponent(h.id)}`,{replace:!0})}}),s.jsx(be,{children:s.jsxs(ye,{children:[s.jsxs(ie,{variant:"secondary",onClick:()=>u(!0),children:[s.jsx("img",{alt:"plus",src:se}),"Add"]}),n]})})]})},je=p.div`
  width: 100%;
  @media (max-width: 912px) {
    margin-top: 94px;
  }
`,we=p(U)`
  max-width: 330px;
  width: 330px;
`,Ce=p(U)`
  max-width: 330px;
  width: 330px;
  border-radius: 4px 0 0 4px;
`,Te=p.div`
  width: 100%;
  margin-bottom: 25px;
  padding: 0px 25px;
`,Ee=p.div`
  background-color: ${C.grey20};
  color: ${C.grey70};
  display: ${({$inline:n})=>n?"inline-flex":"flex"};
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
`,F=p.span`
  font-weight: bold;
  color: ${C.grey100};
`,Se=p.div`
  display: block;
  width: 315px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,V=p(L)`
  height: 36px;
`,De=p.div`
  width: 100%;
  @media (max-width: 912px) {
    margin-top: 94px;
  }
`,Le=p.div`
  word-break: break-all;
`,Me=()=>{const{objectType:n}=S(),o=n||"",[t,e]=d.useState(""),{data:r}=P(),i=d.useMemo(()=>((r==null?void 0:r.results)||[]).map(c=>c.name),[r==null?void 0:r.results]),{data:a,fetchNextPage:u,hasNextPage:h,isFetching:f}=R({object_type:n,"page.size":100},{query:{enabled:i.includes(o),getNextPageParam:O}}),{refetch:v}=k(o,t,{},{query:{enabled:!1,meta:{showError:!1},retry:!1}}),[m,x]=d.useState([]),y=d.useMemo(()=>{const c=(a==null?void 0:a.pages.map(b=>b.results||[]).flat())??[];return x(c),c},[a==null?void 0:a.pages,x]),g=Q({columns:[{accessorKey:"id",header:"ID",meta:{size:"50%"}},{cell:({row:c})=>s.jsx(re,{to:`/ui/directory/objects/${o}/${encodeURIComponent(c.original.id)}`,children:s.jsx(Le,{children:c.original.display_name||c.original.id})}),header:"Name",meta:{size:"50%"}}],data:m,getCoreRowModel:Z()}),w=ee({getNext:u,hasMore:h});return f?null:s.jsxs(s.Fragment,{children:[s.jsxs(De,{children:[s.jsx($,{children:s.jsxs(s.Fragment,{children:[s.jsx(we,{"data-testid":"filter-input",placeholder:"Find",value:t,onChange:c=>{(c.target.value===""||c.target.value===void 0)&&x(y),e(c.target.value)}}),s.jsx(V,{disabled:!t,onClick:async()=>{const c=(await v()).data,b=c!=null&&c.result?[c.result]:[];x(b)},children:" Find "})]})}),m.length?s.jsx(z,{fetchMoreOnBottomReached:w,isFetching:f,table:g}):s.jsx(B,{body:'To add one, click the "Add" button in the top left.',header:"",imgAlt:"Empty Directory",imgSrc:te}),s.jsx("br",{})]}),s.jsx("br",{})]})};/*! *****************************************************************************
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
***************************************************************************** */var _=function(n,o){return _=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},_(n,o)};function _e(n,o){_(n,o);function t(){this.constructor=n}n.prototype=o===null?Object.create(o):(t.prototype=o.prototype,new t)}var T=function(){return T=Object.assign||function(o){for(var t,e=1,r=arguments.length;e<r;e++){t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(o[i]=t[i])}return o},T.apply(this,arguments)};function Oe(n,o,t,e){var r,i=!1,a=0;function u(){r&&clearTimeout(r)}function h(){u(),i=!0}typeof o!="boolean"&&(e=t,t=o,o=void 0);function f(){var v=this,m=Date.now()-a,x=arguments;if(i)return;function y(){a=Date.now(),t.apply(v,x)}function l(){r=void 0}e&&!r&&y(),u(),e===void 0&&m>n?y():o!==!0&&(r=setTimeout(e?l:y,e===void 0?n-m:n))}return f.cancel=h,f}var j={Pixel:"Pixel",Percent:"Percent"},Y={unit:j.Percent,value:.8};function N(n){return typeof n=="number"?{unit:j.Percent,value:n*100}:typeof n=="string"?n.match(/^(\d*(\.\d+)?)px$/)?{unit:j.Pixel,value:parseFloat(n)}:n.match(/^(\d*(\.\d+)?)%$/)?{unit:j.Percent,value:parseFloat(n)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),Y):(console.warn("scrollThreshold should be string or number"),Y)}var Pe=function(n){_e(o,n);function o(t){var e=n.call(this,t)||this;return e.lastScrollTop=0,e.actionTriggered=!1,e.startY=0,e.currentY=0,e.dragging=!1,e.maxPullDownDistance=0,e.getScrollableTarget=function(){return e.props.scrollableTarget instanceof HTMLElement?e.props.scrollableTarget:typeof e.props.scrollableTarget=="string"?document.getElementById(e.props.scrollableTarget):(e.props.scrollableTarget===null&&console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `),null)},e.onStart=function(r){e.lastScrollTop||(e.dragging=!0,r instanceof MouseEvent?e.startY=r.pageY:r instanceof TouchEvent&&(e.startY=r.touches[0].pageY),e.currentY=e.startY,e._infScroll&&(e._infScroll.style.willChange="transform",e._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},e.onMove=function(r){e.dragging&&(r instanceof MouseEvent?e.currentY=r.pageY:r instanceof TouchEvent&&(e.currentY=r.touches[0].pageY),!(e.currentY<e.startY)&&(e.currentY-e.startY>=Number(e.props.pullDownToRefreshThreshold)&&e.setState({pullToRefreshThresholdBreached:!0}),!(e.currentY-e.startY>e.maxPullDownDistance*1.5)&&e._infScroll&&(e._infScroll.style.overflow="visible",e._infScroll.style.transform="translate3d(0px, "+(e.currentY-e.startY)+"px, 0px)")))},e.onEnd=function(){e.startY=0,e.currentY=0,e.dragging=!1,e.state.pullToRefreshThresholdBreached&&(e.props.refreshFunction&&e.props.refreshFunction(),e.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){e._infScroll&&(e._infScroll.style.overflow="auto",e._infScroll.style.transform="none",e._infScroll.style.willChange="unset")})},e.onScrollListener=function(r){typeof e.props.onScroll=="function"&&setTimeout(function(){return e.props.onScroll&&e.props.onScroll(r)},0);var i=e.props.height||e._scrollableNode?r.target:document.documentElement.scrollTop?document.documentElement:document.body;if(!e.actionTriggered){var a=e.props.inverse?e.isElementAtTop(i,e.props.scrollThreshold):e.isElementAtBottom(i,e.props.scrollThreshold);a&&e.props.hasMore&&(e.actionTriggered=!0,e.setState({showLoader:!0}),e.props.next&&e.props.next()),e.lastScrollTop=i.scrollTop}},e.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},e.throttledOnScrollListener=Oe(150,e.onScrollListener).bind(e),e.onStart=e.onStart.bind(e),e.onMove=e.onMove.bind(e),e.onEnd=e.onEnd.bind(e),e}return o.prototype.componentDidMount=function(){if(typeof this.props.dataLength>"u")throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),typeof this.props.initialScrollY=="number"&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),typeof this.props.refreshFunction!="function"))throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`)},o.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},o.prototype.componentDidUpdate=function(t){this.props.dataLength!==t.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},o.getDerivedStateFromProps=function(t,e){var r=t.dataLength!==e.prevDataLength;return r?T(T({},e),{prevDataLength:t.dataLength}):null},o.prototype.isElementAtTop=function(t,e){e===void 0&&(e=.8);var r=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,i=N(e);return i.unit===j.Pixel?t.scrollTop<=i.value+r-t.scrollHeight+1:t.scrollTop<=i.value/100+r-t.scrollHeight+1},o.prototype.isElementAtBottom=function(t,e){e===void 0&&(e=.8);var r=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,i=N(e);return i.unit===j.Pixel?t.scrollTop+r>=t.scrollHeight-i.value:t.scrollTop+r>=i.value/100*t.scrollHeight},o.prototype.render=function(){var t=this,e=T({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),r=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),i=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return E.createElement("div",{style:i,className:"infinite-scroll-component__outerdiv"},E.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(a){return t._infScroll=a},style:e},this.props.pullDownToRefresh&&E.createElement("div",{style:{position:"relative"},ref:function(a){return t._pullDown=a}},E.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!r&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},o}(d.Component);const Re="data:image/svg+xml,%3csvg%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M82.7225%2078.5593V77.2542C82.7225%2068.6407%2080.8901%2061.8542%2077.2251%2056.8949C76.178%2055.3288%2076.9633%2053.2407%2078.534%2052.9797C79.8429%2052.7186%2081.1518%2052.4576%2082.7225%2052.4576C95.5497%2052.4576%20100%2064.2034%20100%2072.2949C100%2076.4712%2091.3613%2078.5593%2082.7225%2078.5593ZM50%2042.278C41.623%2042.278%2034.8168%2035.4915%2034.8168%2027.139C34.8168%2018.7864%2041.623%2012%2050%2012C58.377%2012%2065.1832%2018.7864%2065.1832%2027.139C65.1832%2035.4915%2058.377%2042.278%2050%2042.278ZM82.4607%2047.7593C76.178%2047.7593%2070.9424%2042.539%2070.9424%2036.2746C70.9424%2030.0102%2076.178%2024.7898%2082.4607%2024.7898C88.7435%2024.7898%2093.9791%2030.0102%2093.9791%2036.2746C93.9791%2042.539%2088.7435%2047.7593%2082.4607%2047.7593ZM17.2775%2047.4983C10.9948%2047.4983%206.02094%2042.539%206.02094%2036.2746C6.02094%2030.0102%2010.9948%2025.0508%2017.2775%2025.0508C23.5602%2025.0508%2028.534%2030.0102%2028.534%2036.2746C28.534%2042.539%2023.5602%2047.4983%2017.2775%2047.4983ZM50%2048.5424C66.4921%2048.5424%2078.0105%2054.8068%2078.0105%2076.4712C78.0105%2082.2136%2071.7277%2089%2050%2089C28.2723%2089%2021.9895%2082.9966%2021.9895%2076.4712C21.9895%2054.5458%2033.2461%2048.5424%2050%2048.5424ZM0%2072.817C0%2064.7254%204.18848%2052.9797%2017.2775%2052.9797C18.8482%2052.9797%2020.1571%2053.2407%2021.466%2053.5017C23.2984%2054.0237%2023.822%2056.1119%2022.7749%2057.4169C19.1099%2062.3763%2017.2775%2069.1627%2017.2775%2077.7763V79.0814C8.63874%2079.0814%200%2076.9932%200%2072.817Z'%20fill='%23e7e7e7'/%3e%3c/svg%3e",Ae=D.object({email:D.string().optional(),picture:D.string().optional().default(M).transform(n=>n===""?M:n)}),Ie=(n={})=>Ae.parse(n||{}),Fe=()=>{const{objectType:n}=S(),o=n||"",[t,e]=d.useState([]),[r,i]=d.useState(""),{data:a}=P(),u=d.useMemo(()=>((a==null?void 0:a.results)||[]).map(l=>l.name),[a==null?void 0:a.results]),{data:h,fetchNextPage:f,hasNextPage:v,isFetching:m}=R({object_type:o,"page.size":100},{query:{enabled:u.includes(o),getNextPageParam:O}}),x=d.useMemo(()=>{const l=(h==null?void 0:h.pages.map(g=>g.results||[]).flat())??[];return e(l),l},[h==null?void 0:h.pages,e]),{refetch:y}=k(o,r,{},{query:{enabled:!1,meta:{showError:!1},retry:!1}});return s.jsxs(je,{children:[s.jsx($,{children:s.jsxs(s.Fragment,{children:[s.jsx(Ce,{placeholder:"User ID",value:r,onChange:l=>{(l.target.value===""||l.target.value===void 0)&&e(x),i(l.target.value)}}),s.jsx(V,{disabled:!r,onClick:async()=>{var g;const l=(g=(await y()).data)==null?void 0:g.result;e(l?[l]:[])},children:" Find "})]})}),s.jsx(Te,{children:t.length?s.jsx(Pe,{dataLength:t.length,hasMore:!!v,loader:m,next:f,children:t.map(l=>{const g=Ie(l.properties);return s.jsx(ne,{to:`/ui/directory/objects/${o}/${encodeURIComponent(l.id)}`,children:s.jsxs(Ee,{$inline:!0,children:[s.jsx("img",{alt:l.display_name??l.id,src:g.picture,onError:w=>{w.currentTarget.src=M}}),s.jsxs("div",{children:[s.jsx(F,{children:l.display_name}),s.jsx("span",{children:g.email}),s.jsxs(Se,{children:[s.jsx(F,{children:"ID: "}),s.jsx("span",{children:l.id})]})]})]})},l.id)})}):s.jsx(B,{body:'To add one, click the "Add" button in the top left.',header:"",imgAlt:"Empty Directory",imgSrc:Re})})]})},Ge=()=>{const{objectType:n}=S(),{data:o}=P(),t=d.useMemo(()=>((o==null?void 0:o.results)||[]).map(e=>e.name),[o==null?void 0:o.results]);if(d.useEffect(()=>{window.scrollTo(0,0)},[n]),!n||!t.includes(n))return null;switch(n){case"user":return s.jsx(Fe,{});default:return s.jsx(Me,{})}};export{Ge as default};
