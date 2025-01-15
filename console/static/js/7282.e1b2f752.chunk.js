"use strict";(self.webpackChunkself_hosted_console=self.webpackChunkself_hosted_console||[]).push([[7282],{17282:(e,t,i)=>{i.r(t),i.d(t,{default:()=>$});var r=i(65043),n=i(30818),l=i(50918);const o=i.p+"static/media/diagram.05e42da4cbc028703f69f555efb0ebd1.svg";var a=i(47995),d=i(15617);const s=d.Ay.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  ${e=>{let{$flex:t}=e;return t?"flex: 1":""}};
  @media (max-width: 1028px) {
    margin-bottom: 30px;
    flex: 1;
    margin-right: auto;
    flex-direction: column;
  }
`,h=d.Ay.div`
  color: ${e=>{let{theme:t}=e;return t.grey100}};
  ${e=>{let{$flex:t}=e;return t?"flex: 1":""}};
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  @media (min-width: 1028px) {
    min-height: 160px;
    max-height: calc(100vh - 18.6rem);
    padding: 0 10px;
    ${e=>{let{$hasBorderLeft:t,theme:i}=e;return t?`border-left: 1px solid ${i.grey20}; padding: 0 20px;`:""}}
    ${e=>{let{$fixed:t}=e;return t?d.AH`
            position: fixed;
            margin-top: -2px;
            width: 50%;
            background-color: ${e=>{let{theme:t}=e;return t.primaryBlack}};
            display: flex;
          `:""}}
  }

  @media (max-width: 1028px) {
    min-height: 130px;
    pre {
      padding: 0 20px;
    }
    ${e=>{let{$fixed:t,$shouldPad:i}=e;return t?d.AH`
            position: fixed;
            top: ${i?169:0}px;
            width: 100%;
            z-index: 2;
            background-color: #121212;
          `:d.AH``}}
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,p=d.Ay.div`
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  text-align: start;
  font-weight: 600;
  a {
    min-width: 318px;
    padding: ${e=>{let{$isSmall:t}=e;return t?"9px 20":20}}px;
    background-color: ${e=>{let{theme:t}=e;return t.grey20}};
    color: ${e=>{let{theme:t}=e;return t.grey20}};
    &:hover {
      background-color: ${e=>{let{theme:t}=e;return t.grey40}};
      color: ${e=>{let{theme:t}=e;return t.grey100}};
      text-decoration: none;
    }
    font-size: 14px;
  }
`,x=d.Ay.div`
  border-bottom: 2px solid ${e=>{let{theme:t}=e;return t.grey40}};
  background-color: ${e=>{let{theme:t}=e;return t.primaryBlack}};
  color: ${e=>{let{theme:t}=e;return t.grey100}};
  font-weight: bold;
  font-size: 14px;
  padding: 20px 0px;
  display: flex;
  align-items: center;
  ${e=>{let{height:t}=e;return t?`height: ${t}px`:""}};
  @media (max-width: 1028px) {
    ${e=>{let{shouldPadLeftWhenMobile:t}=e;return t?"padding-left: 20px":""}}
  }
`,c=(0,d.Ay)(n.Hu)`
  display: flex;
  @media (max-width: 1028px) {
    flex: 1;
    flex-direction: column;
  }
  padding: 0 20px;
  ${h} {
    border-left: 1px solid ${e=>{let{theme:t}=e;return t.grey20}};
  }
`,g=d.Ay.div`
  margin-top: 5px;
  font-size: 14px;
  max-width: 651px;
  line-height: 20px;
  h4 {
    font-size: 14px;
    font-weight: bold;
  }
  li {
    margin-bottom: 5px;
  }
`,u=d.Ay.img`
  width: 100%;
  max-height: 321px;
  margin: 30px 0px;
`;var m=i(70579);const f=e=>{let{policyModules:t,fetchContent:i,isLoading:d}=e;const[f,y]=(0,r.useState)(!1),{isMobile:$}=(0,n.DL)(),[b,j]=(0,r.useState)(),v=i(b),w={source_url:""};(0,r.useEffect)((()=>{if(!t||0===t.length)return;const e=t[0].id;!b&&e&&j(e)}),[b,t]);const k=()=>t&&0!==t.length?(0,m.jsx)(m.Fragment,{children:null===t||void 0===t?void 0:t.map((e=>(0,m.jsx)(p,{children:(0,m.jsx)(l.A.Link,{className:"light-pills",eventKey:e.id,children:(0,m.jsx)("span",{children:e.package_path})})},e.id)))}):null;return d?(0,m.jsx)(a.A,{}):(0,m.jsx)(a.A,{children:t?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(s,{style:{marginLeft:20},children:[(0,m.jsx)(x,{children:"Module Name"}),(0,m.jsx)(h,{$flex:!0,$paddingTop:18,children:(0,m.jsx)(l.A,{activeKey:b,className:"flex-column",defaultActiveKey:b,variant:"pills",onSelect:e=>{j(null!==e&&void 0!==e?e:void 0),y(!0)},children:(0,m.jsx)(k,{})})})]}),(0,m.jsx)(c,{show:f,onCloseMobile:()=>y(!1),children:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(x,{shouldPadLeftWhenMobile:!0,children:"Definition"}),(0,m.jsx)(h,{$flex:!0,$hasBorderLeft:!0,$paddingTop:18,children:$?(0,m.jsx)(n._j,{}):(0,m.jsx)(n.f4,{language:"rego",children:v})})]})})]}):(0,m.jsxs)(g,{children:[(0,m.jsx)("h4",{children:"Hey, where's my policy?"}),(0,m.jsx)("div",{children:"Aserto is building your policy, pushing it to the registry, and triggering the authorizer to pull it. The process typically takes about 30 seconds. This is what happens:"}),(0,m.jsx)(u,{src:o}),(0,m.jsx)("h4",{children:"What to do next"}),(0,m.jsxs)("ul",{children:[(0,m.jsx)("li",{children:"Click the Refresh button at the top right of this page to see if there are any errors from the authorizer."}),(0,m.jsxs)("li",{children:["Check that"," ",(0,m.jsx)("a",{href:`${null===w||void 0===w?void 0:w.source_url}/actions`,rel:"noopener noreferrer",target:"_blank",children:"the Action on the policy repository"})," ","built an image."]}),(0,m.jsx)("li",{children:"Verify the Policy settings (left side of this screen)."})]})]})})};var y=i(70316);const $=()=>{const{configurationName:e}=(0,y.Rh)(),{data:t,isLoading:i,error:l}=(0,n.dz)({authorizerInstance:e},"id,package_path,raw"),o=(0,r.useMemo)((()=>{if(t&&t.result)return t.result.map((e=>{var t;return{id:e.id,package_path:null===(t=e.package_path)||void 0===t?void 0:t.replace("data.",""),raw:e.raw}})).sort(((e,t)=>e.package_path<t.package_path?-1:1))}),[t]);return(0,m.jsx)(f,{fetchContent:e=>{var t;return(null===o||void 0===o||null===(t=o.find((t=>t.id===e)))||void 0===t?void 0:t.raw)||""},isLoading:i||!!l,policyModules:o})}}}]);
//# sourceMappingURL=7282.e1b2f752.chunk.js.map