"use strict";(self.webpackChunkself_hosted_console=self.webpackChunkself_hosted_console||[]).push([[6301],{76301:function(t,e,n){n.r(e),n.d(e,{a:function(){return o},m:function(){return s}});var r=n(70889),a=Object.defineProperty,c=function(t,e){return a(t,"name",{value:e,configurable:!0})};function i(t,e){return e.forEach((function(e){e&&"string"!==typeof e&&!Array.isArray(e)&&Object.keys(e).forEach((function(n){if("default"!==n&&!(n in t)){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}}))})),Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}c(i,"_mergeNamespaces");var o={exports:{}};!function(t){var e=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<8),n=t.Pos,r={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<","<":">>",">":"<<"};function a(t){return t&&t.bracketRegex||/[(){}[\]]/}function i(t,e,c){var i=t.getLineHandle(e.line),s=e.ch-1,l=c&&c.afterCursor;null==l&&(l=/(^| )cm-fat-cursor($| )/.test(t.getWrapperElement().className));var h=a(c),u=!l&&s>=0&&h.test(i.text.charAt(s))&&r[i.text.charAt(s)]||h.test(i.text.charAt(s+1))&&r[i.text.charAt(++s)];if(!u)return null;var f=">"==u.charAt(1)?1:-1;if(c&&c.strict&&f>0!=(s==e.ch))return null;var g=t.getTokenTypeAt(n(e.line,s+1)),m=o(t,n(e.line,s+(f>0?1:0)),f,g,c);return null==m?null:{from:n(e.line,s),to:m&&m.pos,match:m&&m.ch==u.charAt(0),forward:f>0}}function o(t,e,c,i,o){for(var s=o&&o.maxScanLineLength||1e4,l=o&&o.maxScanLines||1e3,h=[],u=a(o),f=c>0?Math.min(e.line+l,t.lastLine()+1):Math.max(t.firstLine()-1,e.line-l),g=e.line;g!=f;g+=c){var m=t.getLine(g);if(m){var d=c>0?0:m.length-1,k=c>0?m.length:-1;if(!(m.length>s))for(g==e.line&&(d=e.ch-(c<0?1:0));d!=k;d+=c){var p=m.charAt(d);if(u.test(p)&&(void 0===i||(t.getTokenTypeAt(n(g,d+1))||"")==(i||""))){var v=r[p];if(v&&">"==v.charAt(1)==c>0)h.push(p);else{if(!h.length)return{pos:n(g,d),ch:p};h.pop()}}}}}return g-c!=(c>0?t.lastLine():t.firstLine())&&null}function s(t,r,a){for(var o=t.state.matchBrackets.maxHighlightLineLength||1e3,s=a&&a.highlightNonMatching,l=[],h=t.listSelections(),u=0;u<h.length;u++){var f=h[u].empty()&&i(t,h[u].head,a);if(f&&(f.match||!1!==s)&&t.getLine(f.from.line).length<=o){var g=f.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket";l.push(t.markText(f.from,n(f.from.line,f.from.ch+1),{className:g})),f.to&&t.getLine(f.to.line).length<=o&&l.push(t.markText(f.to,n(f.to.line,f.to.ch+1),{className:g}))}}if(l.length){e&&t.state.focused&&t.focus();var m=c((function(){t.operation((function(){for(var t=0;t<l.length;t++)l[t].clear()}))}),"clear");if(!r)return m;setTimeout(m,800)}}function l(t){t.operation((function(){t.state.matchBrackets.currentlyHighlighted&&(t.state.matchBrackets.currentlyHighlighted(),t.state.matchBrackets.currentlyHighlighted=null),t.state.matchBrackets.currentlyHighlighted=s(t,!1,t.state.matchBrackets)}))}function h(t){t.state.matchBrackets&&t.state.matchBrackets.currentlyHighlighted&&(t.state.matchBrackets.currentlyHighlighted(),t.state.matchBrackets.currentlyHighlighted=null)}c(a,"bracketRegex"),c(i,"findMatchingBracket"),c(o,"scanForBracket"),c(s,"matchBrackets"),c(l,"doMatchBrackets"),c(h,"clearHighlighted"),t.defineOption("matchBrackets",!1,(function(e,n,r){r&&r!=t.Init&&(e.off("cursorActivity",l),e.off("focus",l),e.off("blur",h),h(e)),n&&(e.state.matchBrackets="object"==typeof n?n:{},e.on("cursorActivity",l),e.on("focus",l),e.on("blur",h))})),t.defineExtension("matchBrackets",(function(){s(this,!0)})),t.defineExtension("findMatchingBracket",(function(t,e,n){return(n||"boolean"==typeof e)&&(n?(n.strict=e,e=n):e=e?{strict:!0}:null),i(this,t,e)})),t.defineExtension("scanForBracket",(function(t,e,n,r){return o(this,t,e,n,r)}))}(r.a.exports);var s=i({__proto__:null,default:o.exports},[o.exports])}}]);
//# sourceMappingURL=6301.7ebfb2ab.chunk.js.map