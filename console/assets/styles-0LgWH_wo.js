import{j as a,t as e,d as i,B as n,L as r}from"./index-CjQklFfe.js";const d=i.div`
  background-color: ${e.primaryBlack};
  cursor: pointer;
  border: 8px solid ${e.primaryBlack};
  border-radius: 30px;
  ${({$disabled:t})=>!!t&&"pointer-events: none;"}
`,s=i.path`
  stroke-width: 0;
  stroke-linecap: butt;
  stroke-linejoin: miter;
  fill: ${({$disabled:t})=>t?e.grey20:e.indogo70};
  &:hover {
    fill: ${({$disabled:t})=>!t&&e.indogo100};
  }
`,l=({disabled:t,onSubmit:o})=>a.jsx(d,{$disabled:t,"aria-label":"Run operation",onClick:o,children:a.jsx("svg",{height:"41.99999601375708",overflow:"visible",preserveAspectRatio:"none",version:"1.2",viewBox:"0 0 41.99999699397481 41.99999601375708",width:"41.99999699397481",children:a.jsxs("g",{transform:"translate(0, 0)",children:[a.jsx("g",{transform:"translate(4.721301208598927e-7, -0.000003331672143458819) rotate(0)",children:a.jsx(s,{$disabled:t,d:"M21.18749,0.00104c-9.34969,-0.09325 -17.93495,6.11204 -20.46684,15.56138c-3.00075,11.19921 3.6434,22.71612 14.84234,25.71692c11.19899,3.0008 22.71559,-3.6435 25.71638,-14.84271c3.0007,-11.19921 -3.6435,-22.71608 -14.84239,-25.7169c-1.7498,-0.46887 -3.5181,-0.70142 -5.2495,-0.71869zM16.00049,11.50021l15.99849,9.49941l-15.99849,9.49931z"})}),a.jsx("defs",{children:a.jsx("path",{d:"M21.18749,0.00104c-9.34969,-0.09325 -17.93495,6.11204 -20.46684,15.56138c-3.00075,11.19921 3.6434,22.71612 14.84234,25.71692c11.19899,3.0008 22.71559,-3.6435 25.71638,-14.84271c3.0007,-11.19921 -3.6435,-22.71608 -14.84239,-25.7169c-1.7498,-0.46887 -3.5181,-0.70142 -5.2495,-0.71869zM16.00049,11.50021l15.99849,9.49941l-15.99849,9.49931z"})})]})})}),x=i.div`
  width: 100%;
  display: inline-flex;
  margin-top: 75px;
  @media (max-width: 1198px) {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  @media (max-width: 912px) {
    margin-top: 20px;
  }
`,c=i.div`
  background-color: ${e.grey20};
  padding: 20px;
  height: 80px;
  width: 100%;
  @media (min-width: 1199px) {
    position: fixed;
    top: 0px;
    width: calc(100% - 250px);
    z-index: 9;
    transform: translateY(175%);
  }
`,h=i.div`
  padding: 20px;
  position: fixed;
  top: 0;
  left: calc(50% + 75px);
  height: 80px;
  z-index: 10;
  transform: translateY(175%);
  @media (max-width: 1198px) {
    display: none;
  }
`,g=i.div`
  @media (min-width: 1199px) {
    display: none;
  }
`,m=i.div`
  flex: 1;
  max-width: 300px;
  margin-left: 10px;
`,f=i.div`
  font-size: 16px;
  font-weight: bold;
  color: ${e.grey100};
`,v=i.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
`,u=i.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
`,y=i.div`
  display: flex;
  margin-right: -8px;
  margin-top: 17px;
`,b=i.div`
  display: inline-flex;
  gap: 15px;
  > div {
    width: 100%;
  }
`,w=i.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1199px) {
    border-bottom: 1px solid ${e.grey10};
    border-left: 1px solid ${e.grey10};
    height: calc(100vh - 13.6rem);
    overflow-y: auto;
  }
  @media (max-width: 1198px) {
    width: 100%;
  }
  @media (max-width: 912px) {
    border: 1px solid ${e.grey10};
    border-radius: 4px;
    padding-bottom: 20px;
  }
`,$=i.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0;
  padding: 0 30px;
`,j=i.div`
  padding: 0 30px 30px;
`,B=i.div`
  background-color: ${e.primaryBlack};
  border: 1px solid ${e.grey40};
  border-radius: 4px;
  margin-top: ${({$margin:t})=>t}px;
  height: ${({$height:t})=>t||245}px;
  overflow-y: auto;
`,C=i(n)`
  margin: 10px 10px 40px 0;
  height: 22px;
  line-height: 50%;
`,k=i(r)`
  margin-top: 28px;
`;export{y as B,x as C,v as E,c as H,$ as L,b as O,h as P,j as R,w as S,B as T,f as a,m as b,l as c,g as d,k as e,C as f,u as g};
