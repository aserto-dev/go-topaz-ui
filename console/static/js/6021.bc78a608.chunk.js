"use strict";(self.webpackChunkself_hosted_console=self.webpackChunkself_hosted_console||[]).push([[6021],{86021:function(e,n,r){r.r(n),r.d(n,{default:function(){return O}});var i,o,t,d,l,c=r(36222),a=r(18489),s=r(50678),u=r(76998),v=r.n(u),f=r(72791),y=r(57689),h=r(79414),p=r(91933),x=r(46430),g=r(17186),m=r(89854),j=m.ZP.div(i||(i=(0,g.Z)(["\n  padding: 20px;\n  width: 100%;\n  height: fit-content;\n"]))),C=m.ZP.div(o||(o=(0,g.Z)(["\n  font-size: 16px;\n"]))),S=(m.ZP.div(t||(t=(0,g.Z)(["\n  display: flex;\n  font-weight: ",";\n"])),(function(e){return e.bold?"bold":500})),m.ZP.div(d||(d=(0,g.Z)(["\n  input {\n    width: 600px;\n  }\n"]))),m.ZP.div(l||(l=(0,g.Z)(["\n  width: 100%;\n  flex: 1 1 0%;\n  justify-content: flex-start;\n  align-items: flex-start;\n  float: right;\n  display: flex;\n  margin-top: 60px;\n  button:first-of-type {\n    margin-right: 10px;\n  }\n"])))),b=r(80184),A=function(e){var n=e.onHide,r=e.show,i=e.subject,o=e.onClickRemove,t=n;return(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(h.AY,{cardHeight:"100%",show:r,title:"Delete ".concat(i),variant:"delete_danger",onHide:t,children:(0,b.jsxs)(j,{children:[(0,b.jsxs)(C,{children:["Are you sure you want to delete your ",i,"?"]}),(0,b.jsxs)(S,{children:[(0,b.jsx)(h.zx,{variant:"secondary",onClick:t,children:"Cancel"}),(0,b.jsx)(h.zx,{"data-testid":"delete-subject",variant:"danger",onClick:o,children:"Delete"})]})]})})})},Z=/^(https?:\/\/[a-zA-Z0-9.-]+:\d+(\/[a-zA-Z0-9_/]+)?)$/,U=function(e){return Z.test(e)?"VALID":"INVALID"},k={getValidityOf:U,isValid:function(e){return"VALID"===U(e)},ruleText:"Should be formed of an address and a port from topaz. It can be either https or http."},z=r(11717);var w,T,D,I,K,P,G,M,R=r.p+"static/media/no-users.608b3a7e4f53bf42798a4f2a5be4c011.svg",E=function(){return(0,b.jsx)(h.RF,{children:(0,b.jsx)(h.Pc,{body:'To add one, click the "Add" button in the dropdown .',header:"Could not find any configuration",imgAlt:"Empty Directory",imgSrc:R})})},H=m.ZP.div(w||(w=(0,g.Z)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 1rem 6rem;\n  input {\n    width: 700px;\n  }\n  label {\n    font-size: 14px;\n  }\n"]))),V=(0,m.ZP)(H)(T||(T=(0,g.Z)(["\n  margin: 0rem 6rem;\n"]))),_=m.ZP.div(D||(D=(0,g.Z)(["\n  margin-top: 2rem;\n"]))),F=m.ZP.div(I||(I=(0,g.Z)(["\n  margin-bottom: 60px;\n"]))),W=(m.ZP.div(K||(K=(0,g.Z)(["\n  margin-top: 80px;\n  margin-left: 80px;\n  flex-direction: column;\n  font-family: Roboto;\n  width: 80%;\n  padding: 20px;\n  @media (max-width: 812px) {\n    display: block;\n    width: 100%;\n  }\n"]))),m.ZP.div(P||(P=(0,g.Z)(["\n  font-weight: ",";\n  font-size: ",";\n  color: ",";\n  padding-top: 8px;\n"])),(function(e){return e.bold?"bold":100}),(function(e){return e.size}),(function(e){return e.color})),m.ZP.div(G||(G=(0,g.Z)(["\n  margin-top: 12px;\n  display: flex;\n  margin-left: 100px;\n  gap: 10px;\n"])))),N=m.ZP.div(M||(M=(0,g.Z)(["\n  width: 700px;\n"]))),B="auto",L="manual",O=function(){var e=(0,x.mX)().data,n=(0,z.G)(),r=n.configurationName,i=n.setConfigurationName,o=(0,f.useState)(B),t=(0,s.Z)(o,2),d=t[0],l=t[1],u=(0,f.useState)(""),g=(0,s.Z)(u,2),m=g[0],j=g[1],C=(0,f.useState)(!1),S=(0,s.Z)(C,2),Z=S[0],U=S[1],w=(0,f.useState)({authorizerServiceUrl:"",authorizerApiKey:"",directoryServiceUrl:"",directoryApiKey:"",directoryTenantId:"",directoryReaderServiceUrl:"",directoryWriterServiceUrl:"",directoryModelServiceUrl:""}),T=(0,s.Z)(w,2),D=T[0],I=T[1],K=function(e){var n=e.target,r=n.name,i=n.value;I((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,c.Z)({},r,i))}))},P=(0,f.useState)(!1),G=(0,s.Z)(P,2),M=G[0],R=G[1],O=function(e,n){var r=(0,h.eB)(e).get;return(0,p.useQuery)([e],(function(){return r({path:""})}),(0,a.Z)((0,a.Z)({},n),{},{enabled:!!e&&(null===n||void 0===n?void 0:n.enabled),retry:!1,staleTime:1/0}))}(m,{enabled:!1,onError:function(e){$(e)},onSuccess:function(){q("Configuration generated successfully.")}}),Q=O.data,X=O.refetch,Y=(0,y.TH)(),$=(0,h.dV)(),q=(0,h.ze)(),J=function(){R(!0)},ee=(0,f.useMemo)((function(){var n;return null===e||void 0===e||null===(n=e.configs)||void 0===n?void 0:n.find((function(e){return e.name===r}))}),[r,null===e||void 0===e?void 0:e.configs]),ne=[{label:"Automatic",value:B},{label:"Manual",value:L},{label:"Central Directory",value:"central_directory"}],re=(0,x.Nn)({onError:function(e){$(e)},onSuccess:function(){q("Configuration updated successfully.")}}).mutate,ie=(0,x.Mj)({onSuccess:function(){var n,o;q("Configuration deleted successfully.");var t=null===(n=((null===e||void 0===e||null===(o=e.configs)||void 0===o?void 0:o.filter((function(e){return e.name!==r})))||[])[0])||void 0===n?void 0:n.name;i(t||"")},onError:function(e){$(e)}}),oe=ie.mutateAsync,te=(0,f.useMemo)((function(){return(null===Q||void 0===Q?void 0:Q.configs)||[]}),[null===Q||void 0===Q?void 0:Q.configs]),de=(0,f.useMemo)((function(){return k.isValid(m)}),[m]);if((0,f.useEffect)((function(){null!==ee&&void 0!==ee&&ee.configurationType&&l(null===ee||void 0===ee?void 0:ee.configurationType)}),[null===ee||void 0===ee?void 0:ee.configurationType,l]),(0,f.useEffect)((function(){ee&&I(ee)}),[ee,I]),(0,f.useEffect)((function(){null!==ee&&void 0!==ee&&ee.address&&j(ee.address)}),[,null===ee||void 0===ee?void 0:ee.address,j]),(0,f.useEffect)((function(){te.length>0&&(I(te[0]),U(!0))}),[te,I,U]),(0,f.useEffect)((function(){var e,n;null!==(e=Y.state)&&void 0!==e&&e.configuration&&Object.keys(ee||{}).sort().toString()===["name"].toString()&&(l(B),j(""),U(!1),I(null===(n=Y.state)||void 0===n?void 0:n.configuration))}),[Y.state,I,l,j,U,ee]),(0,f.useEffect)((function(){null!==ee&&void 0!==ee&&ee.address&&U(!0)}),[null===ee||void 0===ee?void 0:ee.address,U]),!e||!e.configs||0===e.configs.length)return(0,b.jsx)(E,{});var le=(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Directory Service Address",name:"directoryServiceUrl",value:D.directoryServiceUrl,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Directory API Key",name:"directoryApiKey",placeholder:null!==D&&void 0!==D&&D.directoryApiKey?"****************************************************************":"",shouldShowHideShowButton:!0,type:"password",value:D.directoryApiKey,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Director Tenant ID",name:"directoryTenantId",value:D.directoryTenantId,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Authorizer Service Address",name:"authorizerServiceUrl",value:D.authorizerServiceUrl,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Authorizer API Key",name:"authorizerApiKey",placeholder:null!==D&&void 0!==D&&D.authorizerApiKey?"****************************************************************":"",shouldShowHideShowButton:!0,type:"password",value:D.authorizerApiKey,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Directory Reader Service Address",name:"directoryReaderServiceUrl",value:D.directoryReaderServiceUrl,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Directory Writer Service Address",name:"directoryWriterServiceUrl",value:D.directoryWriterServiceUrl,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:d===B,label:"Directory Model Service Address",name:"directoryModelServiceUrl",value:D.directoryModelServiceUrl,onChange:K,onClickCopy:v()})}),(0,b.jsxs)(W,{children:[(0,b.jsx)(h.zx,{onClick:function(){return re({name:r,fields:{configurationType:d,name:r,address:m,directoryServiceUrl:D.directoryServiceUrl,authorizerServiceUrl:D.authorizerServiceUrl,authorizerApiKey:D.authorizerApiKey,directoryApiKey:D.directoryApiKey,directoryTenantId:D.directoryTenantId,directoryReaderServiceUrl:D.directoryReaderServiceUrl,directoryWriterServiceUrl:D.directoryWriterServiceUrl,directoryModelServiceUrl:D.directoryModelServiceUrl}})},children:"Save"}),(0,b.jsx)(h.zx,{variant:"danger",onClick:J,children:"Delete"})]})]});return(0,b.jsxs)(h.RF,{children:[(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{disabled:!0,label:"Configuration Name",value:r,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsxs)(N,{children:[(0,b.jsx)("p",{children:"Configuration Type:"}),(0,b.jsx)(h.Ph,{options:ne,style:{width:"700px"},value:ne.find((function(e){return e.value===d}))||ne[0],onChange:function(e){var n=String(null===e||void 0===e?void 0:e.value);n===B&&I(ee||{}),l(n)}})]})}),(0,b.jsx)(A,{redirectUrl:"/",show:M,subject:"Configuration",onClickRemove:function(){!function(e){e&&oe(e)}(r),R(!1)},onHide:function(){return R(!1)}}),(0,b.jsx)(_,{children:d===B?(0,b.jsxs)(_,{children:[d===B&&(0,b.jsxs)(F,{children:[(0,b.jsx)(V,{children:(0,b.jsx)(h.as,{label:"Configuration address",placeholder:"https://localhost:8080",validator:k,value:m,onChange:j,onClickCopy:v()})}),(0,b.jsxs)(W,{children:[(0,b.jsx)(h.zx,{disabled:!de,onClick:function(){X()},children:"Generate configuration"}),!(null!==Q&&void 0!==Q&&Q.success)&&!(null!==ee&&void 0!==ee&&ee.address)&&(0,b.jsx)(h.zx,{variant:"danger",onClick:J,children:"Delete"})]})]}),Z?le:(0,b.jsx)(b.Fragment,{})]}):d===L?le:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{label:"Directory Service Address",name:"directoryServiceUrl",value:D.directoryServiceUrl,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{label:"Directory API Key",name:"directoryApiKey",shouldShowHideShowButton:!0,type:"password",value:D.directoryApiKey,onChange:K,onClickCopy:v()})}),(0,b.jsx)(H,{children:(0,b.jsx)(h.Gc,{label:"Directory Tenant ID",name:"directoryTenantId",value:D.directoryTenantId,onChange:K,onClickCopy:v()})}),(0,b.jsxs)(W,{children:[(0,b.jsx)(h.zx,{disabled:!D.directoryTenantId||!D.directoryServiceUrl||!D.directoryApiKey,onClick:function(){return re({name:r,fields:{configurationType:d,name:r,directoryServiceUrl:D.directoryServiceUrl,directoryApiKey:D.directoryApiKey,directoryTenantId:D.directoryTenantId}})},children:"Save"}),(0,b.jsx)(h.zx,{variant:"danger",onClick:J,children:"Delete"})]})]})})]})}}}]);
//# sourceMappingURL=6021.bc78a608.chunk.js.map