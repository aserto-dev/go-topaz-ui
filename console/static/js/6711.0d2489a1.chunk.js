"use strict";(self.webpackChunkself_hosted_console=self.webpackChunkself_hosted_console||[]).push([[820,6711],{40706:(e,a,i)=>{i.d(a,{A:()=>s});i(93988);var r=i(65043),d=i(39576),t=i(70579);const s=e=>{let{openApiUrl:a,apiKeys:i}=e;return(0,r.useEffect)((()=>{const e=document.getElementById("docs");e&&e.addEventListener("spec-loaded",(async()=>{i.forEach((a=>{e.setApiKey(a.key,a.value)}))}))}),[i]),(0,t.jsx)("rapi-doc",{"bg-color":d.w4.primaryBlack,id:"docs","nav-bg-color":d.w4.grey10,"primary-color":d.w4.primary,"render-style":"read","show-header":"false","spec-url":a})}},80820:(e,a,i)=>{i.r(a),i.d(a,{default:()=>n});var r=i(65043),d=i(64214),t=i(40706),s=i(70316),l=i(70579);const n=()=>{const{data:e}=(0,d._r)(),{configurationName:a}=(0,s.Rh)(),i=(0,r.useMemo)((()=>null===e||void 0===e?void 0:e.configs.find((e=>e.name===a))),[a,null===e||void 0===e?void 0:e.configs]),n=null===i||void 0===i?void 0:i.authorizerServiceUrl,o=null===i||void 0===i?void 0:i.authorizerApiKey;return(0,l.jsx)(t.A,{apiKeys:[{key:"AuthorizerAPIKey",value:o?`Basic ${o}`:""}],openApiUrl:`${n}/authorizer/openapi.json`})}},47995:(e,a,i)=>{i.d(a,{A:()=>g});i(65043);var r=i(39576),d=i(73216),t=i(15617);const s=t.Ay.div`
  margin-right: 20px;
  min-width: 250px;
  @media (max-width: 1327px) {
    display: none;
  }
`,l=t.Ay.div`
  width: 100%;
  display: none;
  margin-bottom: 20px;
  @media (max-width: 1327px) {
    display: block;
    width: 100%;
  }
`,n=t.Ay.div`
  display: flex;
  line-height: 1;
  @media (max-width: 1327px) {
    flex-wrap: wrap;
    padding: 20px;
  }
  @media (min-width: 991px) {
    /* margin-top: 70px; */
  }
`;var o=i(70579),h=function(e){return e.docs="API Browser",e.evaluator="Evaluator",e.modules="Modules",e}(h||{});const p=()=>{const e=(0,d.Zp)(),a=[{label:h.modules,value:"modules"},{label:h.evaluator,value:"evaluator"},{label:h.docs,value:"docs"}],{pathname:i}=(0,d.zy)(),t=i.replace("/ui/authorizer/","").split("/")[0],p=a=>{e(`/ui/authorizer/${a}`)};return(0,o.jsxs)(n,{children:[(0,o.jsx)(s,{children:(0,o.jsx)(r.sM,{options:a,selectedValue:t,onChange:p})}),(0,o.jsx)(l,{children:(0,o.jsx)(r.l6,{"aria-label":"Sections",options:a,value:a.find((e=>e.value===t)),onChange:e=>p(String(e.value))})})]})},c=t.Ay.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0 85px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'header'
    'sidebar'
    'content';

  @media (min-width: 1px) {
  }

  @media (min-width: 1328px) {
    display: grid;
    grid-template-columns: 250px 1.3fr 1fr;
    grid-template-rows: 0 1.7fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      'header header header'
      'sidebar content content'
      'sidebar content content';
  }
  .decision-logs-content {
    height: 100%;
    overflow-x: hidden;
  }
`,x=t.Ay.div`
  @media (min-width: 1328px) {
    grid-area: header;
  }
`,u=t.Ay.div`
  @media (min-width: 1328px) {
    grid-area: sidebar;
  }
`,m=t.Ay.div`
  grid-area: content;
  display: flex;
  height: 100%;
  width: 100%;
`,v=()=>(0,o.jsx)(x,{children:(0,o.jsx)(r.zY,{hasBorderBottom:!0,title:"Authorizer"})}),g=e=>{let{children:a,className:i}=e;return(0,o.jsx)(r.hO,{children:(0,o.jsxs)(c,{children:[(0,o.jsx)(v,{}),(0,o.jsx)(u,{children:(0,o.jsx)(p,{})}),(0,o.jsx)(m,{className:i,children:a})]})})}},16711:(e,a,i)=>{i.r(a),i.d(a,{default:()=>p});var r=i(65043),d=i(73216),t=i(67763),s=i(80820),l=i(47995),n=i(70579);const o=r.lazy((()=>i.e(2278).then(i.bind(i,2278)))),h=r.lazy((()=>i.e(7282).then(i.bind(i,17282)))),p=()=>(0,n.jsx)(t.A,{children:(0,n.jsx)(r.Suspense,{fallback:(0,n.jsx)(l.A,{}),children:(0,n.jsxs)(d.BV,{children:[(0,n.jsx)(d.qh,{element:(0,n.jsx)(o,{}),path:"/evaluator"}),(0,n.jsx)(d.qh,{element:(0,n.jsx)(h,{}),path:"/modules"}),(0,n.jsx)(d.qh,{element:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(l.A,{children:(0,n.jsx)(s.default,{})})}),path:"/docs"}),(0,n.jsx)(d.qh,{element:(0,n.jsx)(d.C5,{to:"modules"}),path:"*"})]})})})}}]);
//# sourceMappingURL=6711.0d2489a1.chunk.js.map