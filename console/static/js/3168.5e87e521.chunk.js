"use strict";(self.webpackChunkself_hosted_console=self.webpackChunkself_hosted_console||[]).push([[3168,889],{70889:function(e,t,n){n.r(t),n.d(t,{C:function(){return o},c:function(){return l}});var r=n(58308);function i(e,t){for(var n=function(){var n=t[r];if("string"!=typeof n&&!Array.isArray(n)){var i=function(t){if("default"!==t&&!(t in e)){var r=Object.getOwnPropertyDescriptor(n,t);r&&Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:function(){return n[t]}})}};for(var a in n)i(a)}},r=0;r<t.length;r++)n();return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(0,Object.defineProperty)(i,"name",{value:"_mergeNamespaces",configurable:!0});var a=(0,r.r)(),o=(0,r.g)(a),l=i({__proto__:null,default:o},[a])},22269:function(e,t,n){n.d(t,{f:function(){return r}});function r(e,t){for(var n=[],r=e;null!=r&&r.kind;)n.push(r),r=r.prevState;for(var i=n.length-1;i>=0;i--)t(n[i])}(0,Object.defineProperty)(r,"name",{value:"forEachState",configurable:!0})},83168:function(e,t,n){n.r(t);var r=n(70889),i=n(44544),a=n(87382),o=n(22269),l=(n(58308),Object.defineProperty),u=function(e,t){return l(e,"name",{value:t,configurable:!0})};function f(e,t,n){var r=c(n,p(t.string));if(r){var i=null!==t.type&&/"|\w/.test(t.string[0])?t.start:t.end;return{list:r,from:{line:e.line,ch:i},to:{line:e.line,ch:t.end}}}}function c(e,t){return t?s(s(e.map((function(e){return{proximity:d(p(e.text),t),entry:e}})),(function(e){return e.proximity<=2})),(function(e){return!e.entry.isDeprecated})).sort((function(e,t){return(e.entry.isDeprecated?1:0)-(t.entry.isDeprecated?1:0)||e.proximity-t.proximity||e.entry.text.length-t.entry.text.length})).map((function(e){return e.entry})):s(e,(function(e){return!e.isDeprecated}))}function s(e,t){var n=e.filter(t);return 0===n.length?e:n}function p(e){return e.toLowerCase().replaceAll(/\W/g,"")}function d(e,t){var n=y(t,e);return e.length>t.length&&(n-=e.length-t.length-1,n+=0===e.indexOf(t)?0:.5),n}function y(e,t){var n,r,i=[],a=e.length,o=t.length;for(n=0;n<=a;n++)i[n]=[n];for(r=1;r<=o;r++)i[0][r]=r;for(n=1;n<=a;n++)for(r=1;r<=o;r++){var l=e[n-1]===t[r-1]?0:1;i[n][r]=Math.min(i[n-1][r]+1,i[n][r-1]+1,i[n-1][r-1]+l),n>1&&r>1&&e[n-1]===t[r-2]&&e[n-2]===t[r-1]&&(i[n][r]=Math.min(i[n][r],i[n-2][r-2]+l))}return i[a][o]}function v(e,t,n){var r="Invalid"===t.state.kind?t.state.prevState:t.state,o=r.kind,l=r.step;if("Document"===o&&0===l)return f(e,t,[{text:"{"}]);var u=n.variableToType;if(u){var c=g(u,t.state);if("Document"===o||"Variable"===o&&0===l)return f(e,t,Object.keys(u).map((function(e){return{text:'"'.concat(e,'": '),type:u[e]}})));if(("ObjectValue"===o||"ObjectField"===o&&0===l)&&c.fields){var s=Object.keys(c.fields).map((function(e){return c.fields[e]}));return f(e,t,s.map((function(e){return{text:'"'.concat(e.name,'": '),type:e.type,description:e.description}})))}if("StringValue"===o||"NumberValue"===o||"BooleanValue"===o||"NullValue"===o||"ListValue"===o&&1===l||"ObjectField"===o&&2===l||"Variable"===o&&2===l){var p=c.type?(0,i.xC)(c.type):void 0;if(p instanceof i.sR)return f(e,t,[{text:"{"}]);if(p instanceof i.mR)return f(e,t,p.getValues().map((function(e){return{text:'"'.concat(e.name,'"'),type:p,description:e.description}})));if(p===a.EZ)return f(e,t,[{text:"true",type:a.EZ,description:"Not false."},{text:"false",type:a.EZ,description:"Not true."}])}}}function g(e,t){var n={type:null,fields:null};return(0,o.f)(t,(function(t){switch(t.kind){case"Variable":n.type=e[t.name];break;case"ListValue":var r=n.type?(0,i.tf)(n.type):void 0;n.type=r instanceof i.p2?r.ofType:null;break;case"ObjectValue":var a=n.type?(0,i.xC)(n.type):void 0;n.fields=a instanceof i.sR?a.getFields():null;break;case"ObjectField":var o=t.name&&n.fields?n.fields[t.name]:null;n.type=null==o?void 0:o.type}})),n}u(f,"hintList"),u(c,"filterAndSortList"),u(s,"filterNonEmpty"),u(p,"normalizeText"),u(d,"getProximity"),u(y,"lexicalDistance"),r.C.registerHelper("hint","graphql-variables",(function(e,t){var n=e.getCursor(),i=e.getTokenAt(n),a=v(n,i,t);return null!=a&&a.list&&a.list.length>0&&(a.from=r.C.Pos(a.from.line,a.from.ch),a.to=r.C.Pos(a.to.line,a.to.ch),r.C.signal(e,"hasCompletion",e,a,i)),a})),u(v,"getVariablesHint"),u(g,"getTypeInfo")}}]);
//# sourceMappingURL=3168.5e87e521.chunk.js.map