"use strict";(self.webpackChunkself_hosted_console=self.webpackChunkself_hosted_console||[]).push([[1910],{1910:(e,t,n)=>{n.r(t),n.d(t,{CompletionAdapter:()=>lt,DefinitionAdapter:()=>Et,DiagnosticsAdapter:()=>dt,DocumentColorAdapter:()=>Mt,DocumentFormattingEditProvider:()=>Tt,DocumentHighlightAdapter:()=>bt,DocumentLinkAdapter:()=>Rt,DocumentRangeFormattingEditProvider:()=>Dt,DocumentSymbolAdapter:()=>At,FoldingRangeAdapter:()=>Ft,HoverAdapter:()=>_t,ReferenceAdapter:()=>xt,RenameAdapter:()=>It,SelectionRangeAdapter:()=>Lt,WorkerManager:()=>ue,fromPosition:()=>ht,fromRange:()=>ft,setupMode:()=>Nt,setupMode1:()=>Ot,toRange:()=>pt,toTextEdit:()=>mt});var r,i,o=n(4942),a=n(40398),s=Object.defineProperty,u=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,d=Object.prototype.hasOwnProperty,g=(e,t,n,r)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let i of c(t))d.call(e,i)||i===n||s(e,i,{get:()=>t[i],enumerable:!(r=u(t,i))||r.enumerable});return e},l={};g(l,r=a,"default"),i&&g(i,r,"default");var h,f,p,v,m,_,w,k,b,y,E,C,x,I,A,S,R,T,D,P,M,F,L,j,O,N,U,W,V,H,K,z,Z,X,B,$,q,Q,G,J,Y,ee,te,ne,re,ie,oe,ae,se,ue=class{constructor(e){(0,o.Z)(this,"_defaults",void 0),(0,o.Z)(this,"_idleCheckInterval",void 0),(0,o.Z)(this,"_lastUsedTime",void 0),(0,o.Z)(this,"_configChangeListener",void 0),(0,o.Z)(this,"_worker",void 0),(0,o.Z)(this,"_client",void 0),this._defaults=e,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval((()=>this._checkIfIdle()),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker()))}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}_checkIfIdle(){if(!this._worker)return;Date.now()-this._lastUsedTime>12e4&&this._stopWorker()}_getClient(){return this._lastUsedTime=Date.now(),this._client||(this._worker=l.editor.createWebWorker({moduleId:"vs/language/html/htmlWorker",createData:{languageSettings:this._defaults.options,languageId:this._defaults.languageId},label:this._defaults.languageId}),this._client=this._worker.getProxy()),this._client}getLanguageServiceWorker(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];let r;return this._getClient().then((e=>{r=e})).then((e=>{if(this._worker)return this._worker.withSyncedResources(t)})).then((e=>r))}};(f=h||(h={})).MIN_VALUE=-2147483648,f.MAX_VALUE=2147483647,(v=p||(p={})).MIN_VALUE=0,v.MAX_VALUE=2147483647,(_=m||(m={})).create=function(e,t){return e===Number.MAX_VALUE&&(e=p.MAX_VALUE),t===Number.MAX_VALUE&&(t=p.MAX_VALUE),{line:e,character:t}},_.is=function(e){var t=e;return ut.objectLiteral(t)&&ut.uinteger(t.line)&&ut.uinteger(t.character)},(k=w||(w={})).create=function(e,t,n,r){if(ut.uinteger(e)&&ut.uinteger(t)&&ut.uinteger(n)&&ut.uinteger(r))return{start:m.create(e,t),end:m.create(n,r)};if(m.is(e)&&m.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+r+"]")},k.is=function(e){var t=e;return ut.objectLiteral(t)&&m.is(t.start)&&m.is(t.end)},(y=b||(b={})).create=function(e,t){return{uri:e,range:t}},y.is=function(e){var t=e;return ut.defined(t)&&w.is(t.range)&&(ut.string(t.uri)||ut.undefined(t.uri))},(C=E||(E={})).create=function(e,t,n,r){return{targetUri:e,targetRange:t,targetSelectionRange:n,originSelectionRange:r}},C.is=function(e){var t=e;return ut.defined(t)&&w.is(t.targetRange)&&ut.string(t.targetUri)&&(w.is(t.targetSelectionRange)||ut.undefined(t.targetSelectionRange))&&(w.is(t.originSelectionRange)||ut.undefined(t.originSelectionRange))},(I=x||(x={})).create=function(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}},I.is=function(e){var t=e;return ut.numberRange(t.red,0,1)&&ut.numberRange(t.green,0,1)&&ut.numberRange(t.blue,0,1)&&ut.numberRange(t.alpha,0,1)},(S=A||(A={})).create=function(e,t){return{range:e,color:t}},S.is=function(e){var t=e;return w.is(t.range)&&x.is(t.color)},(T=R||(R={})).create=function(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}},T.is=function(e){var t=e;return ut.string(t.label)&&(ut.undefined(t.textEdit)||X.is(t))&&(ut.undefined(t.additionalTextEdits)||ut.typedArray(t.additionalTextEdits,X.is))},(P=D||(D={})).Comment="comment",P.Imports="imports",P.Region="region",(F=M||(M={})).create=function(e,t,n,r,i){var o={startLine:e,endLine:t};return ut.defined(n)&&(o.startCharacter=n),ut.defined(r)&&(o.endCharacter=r),ut.defined(i)&&(o.kind=i),o},F.is=function(e){var t=e;return ut.uinteger(t.startLine)&&ut.uinteger(t.startLine)&&(ut.undefined(t.startCharacter)||ut.uinteger(t.startCharacter))&&(ut.undefined(t.endCharacter)||ut.uinteger(t.endCharacter))&&(ut.undefined(t.kind)||ut.string(t.kind))},(j=L||(L={})).create=function(e,t){return{location:e,message:t}},j.is=function(e){var t=e;return ut.defined(t)&&b.is(t.location)&&ut.string(t.message)},(N=O||(O={})).Error=1,N.Warning=2,N.Information=3,N.Hint=4,(W=U||(U={})).Unnecessary=1,W.Deprecated=2,(V||(V={})).is=function(e){var t=e;return void 0!==t&&null!==t&&ut.string(t.href)},(K=H||(H={})).create=function(e,t,n,r,i,o){var a={range:e,message:t};return ut.defined(n)&&(a.severity=n),ut.defined(r)&&(a.code=r),ut.defined(i)&&(a.source=i),ut.defined(o)&&(a.relatedInformation=o),a},K.is=function(e){var t,n=e;return ut.defined(n)&&w.is(n.range)&&ut.string(n.message)&&(ut.number(n.severity)||ut.undefined(n.severity))&&(ut.integer(n.code)||ut.string(n.code)||ut.undefined(n.code))&&(ut.undefined(n.codeDescription)||ut.string(null===(t=n.codeDescription)||void 0===t?void 0:t.href))&&(ut.string(n.source)||ut.undefined(n.source))&&(ut.undefined(n.relatedInformation)||ut.typedArray(n.relatedInformation,L.is))},(Z=z||(z={})).create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return ut.defined(n)&&n.length>0&&(i.arguments=n),i},Z.is=function(e){var t=e;return ut.defined(t)&&ut.string(t.title)&&ut.string(t.command)},(B=X||(X={})).replace=function(e,t){return{range:e,newText:t}},B.insert=function(e,t){return{range:{start:e,end:e},newText:t}},B.del=function(e){return{range:e,newText:""}},B.is=function(e){var t=e;return ut.objectLiteral(t)&&ut.string(t.newText)&&w.is(t.range)},(q=$||($={})).create=function(e,t,n){var r={label:e};return void 0!==t&&(r.needsConfirmation=t),void 0!==n&&(r.description=n),r},q.is=function(e){var t=e;return void 0!==t&&ut.objectLiteral(t)&&ut.string(t.label)&&(ut.boolean(t.needsConfirmation)||void 0===t.needsConfirmation)&&(ut.string(t.description)||void 0===t.description)},(Q||(Q={})).is=function(e){return"string"===typeof e},(J=G||(G={})).replace=function(e,t,n){return{range:e,newText:t,annotationId:n}},J.insert=function(e,t,n){return{range:{start:e,end:e},newText:t,annotationId:n}},J.del=function(e,t){return{range:e,newText:"",annotationId:t}},J.is=function(e){var t=e;return X.is(t)&&($.is(t.annotationId)||Q.is(t.annotationId))},(ee=Y||(Y={})).create=function(e,t){return{textDocument:e,edits:t}},ee.is=function(e){var t=e;return ut.defined(t)&&he.is(t.textDocument)&&Array.isArray(t.edits)},(ne=te||(te={})).create=function(e,t,n){var r={kind:"create",uri:e};return void 0===t||void 0===t.overwrite&&void 0===t.ignoreIfExists||(r.options=t),void 0!==n&&(r.annotationId=n),r},ne.is=function(e){var t=e;return t&&"create"===t.kind&&ut.string(t.uri)&&(void 0===t.options||(void 0===t.options.overwrite||ut.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||ut.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||Q.is(t.annotationId))},(ie=re||(re={})).create=function(e,t,n,r){var i={kind:"rename",oldUri:e,newUri:t};return void 0===n||void 0===n.overwrite&&void 0===n.ignoreIfExists||(i.options=n),void 0!==r&&(i.annotationId=r),i},ie.is=function(e){var t=e;return t&&"rename"===t.kind&&ut.string(t.oldUri)&&ut.string(t.newUri)&&(void 0===t.options||(void 0===t.options.overwrite||ut.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||ut.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||Q.is(t.annotationId))},(ae=oe||(oe={})).create=function(e,t,n){var r={kind:"delete",uri:e};return void 0===t||void 0===t.recursive&&void 0===t.ignoreIfNotExists||(r.options=t),void 0!==n&&(r.annotationId=n),r},ae.is=function(e){var t=e;return t&&"delete"===t.kind&&ut.string(t.uri)&&(void 0===t.options||(void 0===t.options.recursive||ut.boolean(t.options.recursive))&&(void 0===t.options.ignoreIfNotExists||ut.boolean(t.options.ignoreIfNotExists)))&&(void 0===t.annotationId||Q.is(t.annotationId))},(se||(se={})).is=function(e){var t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||t.documentChanges.every((function(e){return ut.string(e.kind)?te.is(e)||re.is(e)||oe.is(e):Y.is(e)})))};var ce,de,ge,le,he,fe,pe,ve,me,_e,we,ke,be,ye,Ee,Ce,xe,Ie,Ae,Se,Re,Te,De,Pe,Me,Fe,Le,je,Oe,Ne,Ue,We,Ve,He,Ke,ze,Ze,Xe,Be,$e,qe,Qe,Ge,Je,Ye,et,tt,nt,rt,it,ot,at=function(){function e(e,t){this.edits=e,this.changeAnnotations=t}return e.prototype.insert=function(e,t,n){var r,i;if(void 0===n?r=X.insert(e,t):Q.is(n)?(i=n,r=G.insert(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=G.insert(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.replace=function(e,t,n){var r,i;if(void 0===n?r=X.replace(e,t):Q.is(n)?(i=n,r=G.replace(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=G.replace(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.delete=function(e,t){var n,r;if(void 0===t?n=X.del(e):Q.is(t)?(r=t,n=G.del(e,t)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(t),n=G.del(e,r)),this.edits.push(n),void 0!==r)return r},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e.prototype.assertChangeAnnotations=function(e){if(void 0===e)throw new Error("Text edit change is not configured to manage change annotations.")},e}(),st=function(){function e(e){this._annotations=void 0===e?Object.create(null):e,this._counter=0,this._size=0}return e.prototype.all=function(){return this._annotations},Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.manage=function(e,t){var n;if(Q.is(e)?n=e:(n=this.nextId(),t=e),void 0!==this._annotations[n])throw new Error("Id "+n+" is already in use.");if(void 0===t)throw new Error("No annotation provided for id "+n);return this._annotations[n]=t,this._size++,n},e.prototype.nextId=function(){return this._counter++,this._counter.toString()},e}();!function(){function e(e){var t=this;this._textEditChanges=Object.create(null),void 0!==e?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new st(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach((function(e){if(Y.is(e)){var n=new at(e.edits,t._changeAnnotations);t._textEditChanges[e.textDocument.uri]=n}}))):e.changes&&Object.keys(e.changes).forEach((function(n){var r=new at(e.changes[n]);t._textEditChanges[n]=r}))):this._workspaceEdit={}}Object.defineProperty(e.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),e.prototype.getTextEditChange=function(e){if(he.is(e)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var t={uri:e.uri,version:e.version};if(!(r=this._textEditChanges[t.uri])){var n={textDocument:t,edits:i=[]};this._workspaceEdit.documentChanges.push(n),r=new at(i,this._changeAnnotations),this._textEditChanges[t.uri]=r}return r}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new at(i),this._textEditChanges[e]=r}return r},e.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new st,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},e.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},e.prototype.createFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if($.is(t)||Q.is(t)?r=t:n=t,void 0===r?i=te.create(e,n):(o=Q.is(r)?r:this._changeAnnotations.manage(r),i=te.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},e.prototype.renameFile=function(e,t,n,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if($.is(n)||Q.is(n)?i=n:r=n,void 0===i?o=re.create(e,t,r):(a=Q.is(i)?i:this._changeAnnotations.manage(i),o=re.create(e,t,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},e.prototype.deleteFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if($.is(t)||Q.is(t)?r=t:n=t,void 0===r?i=oe.create(e,n):(o=Q.is(r)?r:this._changeAnnotations.manage(r),i=oe.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}}();(de=ce||(ce={})).create=function(e){return{uri:e}},de.is=function(e){var t=e;return ut.defined(t)&&ut.string(t.uri)},(le=ge||(ge={})).create=function(e,t){return{uri:e,version:t}},le.is=function(e){var t=e;return ut.defined(t)&&ut.string(t.uri)&&ut.integer(t.version)},(fe=he||(he={})).create=function(e,t){return{uri:e,version:t}},fe.is=function(e){var t=e;return ut.defined(t)&&ut.string(t.uri)&&(null===t.version||ut.integer(t.version))},(ve=pe||(pe={})).create=function(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}},ve.is=function(e){var t=e;return ut.defined(t)&&ut.string(t.uri)&&ut.string(t.languageId)&&ut.integer(t.version)&&ut.string(t.text)},(_e=me||(me={})).PlainText="plaintext",_e.Markdown="markdown",function(e){e.is=function(t){var n=t;return n===e.PlainText||n===e.Markdown}}(me||(me={})),(we||(we={})).is=function(e){var t=e;return ut.objectLiteral(e)&&me.is(t.kind)&&ut.string(t.value)},(be=ke||(ke={})).Text=1,be.Method=2,be.Function=3,be.Constructor=4,be.Field=5,be.Variable=6,be.Class=7,be.Interface=8,be.Module=9,be.Property=10,be.Unit=11,be.Value=12,be.Enum=13,be.Keyword=14,be.Snippet=15,be.Color=16,be.File=17,be.Reference=18,be.Folder=19,be.EnumMember=20,be.Constant=21,be.Struct=22,be.Event=23,be.Operator=24,be.TypeParameter=25,(Ee=ye||(ye={})).PlainText=1,Ee.Snippet=2,(Ce||(Ce={})).Deprecated=1,(Ie=xe||(xe={})).create=function(e,t,n){return{newText:e,insert:t,replace:n}},Ie.is=function(e){var t=e;return t&&ut.string(t.newText)&&w.is(t.insert)&&w.is(t.replace)},(Se=Ae||(Ae={})).asIs=1,Se.adjustIndentation=2,(Re||(Re={})).create=function(e){return{label:e}},(Te||(Te={})).create=function(e,t){return{items:e||[],isIncomplete:!!t}},(Pe=De||(De={})).fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},Pe.is=function(e){var t=e;return ut.string(t)||ut.objectLiteral(t)&&ut.string(t.language)&&ut.string(t.value)},(Me||(Me={})).is=function(e){var t=e;return!!t&&ut.objectLiteral(t)&&(we.is(t.contents)||De.is(t.contents)||ut.typedArray(t.contents,De.is))&&(void 0===e.range||w.is(e.range))},(Fe||(Fe={})).create=function(e,t){return t?{label:e,documentation:t}:{label:e}},(Le||(Le={})).create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return ut.defined(t)&&(i.documentation=t),ut.defined(n)?i.parameters=n:i.parameters=[],i},(Oe=je||(je={})).Text=1,Oe.Read=2,Oe.Write=3,(Ne||(Ne={})).create=function(e,t){var n={range:e};return ut.number(t)&&(n.kind=t),n},(We=Ue||(Ue={})).File=1,We.Module=2,We.Namespace=3,We.Package=4,We.Class=5,We.Method=6,We.Property=7,We.Field=8,We.Constructor=9,We.Enum=10,We.Interface=11,We.Function=12,We.Variable=13,We.Constant=14,We.String=15,We.Number=16,We.Boolean=17,We.Array=18,We.Object=19,We.Key=20,We.Null=21,We.EnumMember=22,We.Struct=23,We.Event=24,We.Operator=25,We.TypeParameter=26,(Ve||(Ve={})).Deprecated=1,(He||(He={})).create=function(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o},(ze=Ke||(Ke={})).create=function(e,t,n,r,i,o){var a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},ze.is=function(e){var t=e;return t&&ut.string(t.name)&&ut.number(t.kind)&&w.is(t.range)&&w.is(t.selectionRange)&&(void 0===t.detail||ut.string(t.detail))&&(void 0===t.deprecated||ut.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))&&(void 0===t.tags||Array.isArray(t.tags))},(Xe=Ze||(Ze={})).Empty="",Xe.QuickFix="quickfix",Xe.Refactor="refactor",Xe.RefactorExtract="refactor.extract",Xe.RefactorInline="refactor.inline",Xe.RefactorRewrite="refactor.rewrite",Xe.Source="source",Xe.SourceOrganizeImports="source.organizeImports",Xe.SourceFixAll="source.fixAll",($e=Be||(Be={})).create=function(e,t){var n={diagnostics:e};return void 0!==t&&null!==t&&(n.only=t),n},$e.is=function(e){var t=e;return ut.defined(t)&&ut.typedArray(t.diagnostics,H.is)&&(void 0===t.only||ut.typedArray(t.only,ut.string))},(Qe=qe||(qe={})).create=function(e,t,n){var r={title:e},i=!0;return"string"===typeof t?(i=!1,r.kind=t):z.is(t)?r.command=t:r.edit=t,i&&void 0!==n&&(r.kind=n),r},Qe.is=function(e){var t=e;return t&&ut.string(t.title)&&(void 0===t.diagnostics||ut.typedArray(t.diagnostics,H.is))&&(void 0===t.kind||ut.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||z.is(t.command))&&(void 0===t.isPreferred||ut.boolean(t.isPreferred))&&(void 0===t.edit||se.is(t.edit))},(Je=Ge||(Ge={})).create=function(e,t){var n={range:e};return ut.defined(t)&&(n.data=t),n},Je.is=function(e){var t=e;return ut.defined(t)&&w.is(t.range)&&(ut.undefined(t.command)||z.is(t.command))},(et=Ye||(Ye={})).create=function(e,t){return{tabSize:e,insertSpaces:t}},et.is=function(e){var t=e;return ut.defined(t)&&ut.uinteger(t.tabSize)&&ut.boolean(t.insertSpaces)},(nt=tt||(tt={})).create=function(e,t,n){return{range:e,target:t,data:n}},nt.is=function(e){var t=e;return ut.defined(t)&&w.is(t.range)&&(ut.undefined(t.target)||ut.string(t.target))},(it=rt||(rt={})).create=function(e,t){return{range:e,parent:t}},it.is=function(e){var t=e;return void 0!==t&&w.is(t.range)&&(void 0===t.parent||it.is(t.parent))},function(e){function t(e,n){if(e.length<=1)return e;var r=e.length/2|0,i=e.slice(0,r),o=e.slice(r);t(i,n),t(o,n);for(var a=0,s=0,u=0;a<i.length&&s<o.length;){var c=n(i[a],o[s]);e[u++]=c<=0?i[a++]:o[s++]}for(;a<i.length;)e[u++]=i[a++];for(;s<o.length;)e[u++]=o[s++];return e}e.create=function(e,t,n,r){return new ct(e,t,n,r)},e.is=function(e){var t=e;return!!(ut.defined(t)&&ut.string(t.uri)&&(ut.undefined(t.languageId)||ut.string(t.languageId))&&ut.uinteger(t.lineCount)&&ut.func(t.getText)&&ut.func(t.positionAt)&&ut.func(t.offsetAt))},e.applyEdits=function(e,n){for(var r=e.getText(),i=t(n,(function(e,t){var n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n})),o=r.length,a=i.length-1;a>=0;a--){var s=i[a],u=e.offsetAt(s.range.start),c=e.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");r=r.substring(0,u)+s.newText+r.substring(c,r.length),o=u}return r}}(ot||(ot={}));var ut,ct=function(){function e(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),e.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},e.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=void 0},e.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,r=t.length;if(0===r)return m.create(0,e);for(;n<r;){var i=Math.floor((n+r)/2);t[i]>e?r=i:n=i+1}var o=n-1;return m.create(o,e-t[o])},e.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),e}();!function(e){var t=Object.prototype.toString;e.defined=function(e){return"undefined"!==typeof e},e.undefined=function(e){return"undefined"===typeof e},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===t.call(e)},e.number=function(e){return"[object Number]"===t.call(e)},e.numberRange=function(e,n,r){return"[object Number]"===t.call(e)&&n<=e&&e<=r},e.integer=function(e){return"[object Number]"===t.call(e)&&-2147483648<=e&&e<=2147483647},e.uinteger=function(e){return"[object Number]"===t.call(e)&&0<=e&&e<=2147483647},e.func=function(e){return"[object Function]"===t.call(e)},e.objectLiteral=function(e){return null!==e&&"object"===typeof e},e.typedArray=function(e,t){return Array.isArray(e)&&e.every(t)}}(ut||(ut={}));var dt=class{constructor(e,t,n){(0,o.Z)(this,"_disposables",[]),(0,o.Z)(this,"_listener",Object.create(null)),this._languageId=e,this._worker=t;const r=e=>{let t,n=e.getLanguageId();n===this._languageId&&(this._listener[e.uri.toString()]=e.onDidChangeContent((()=>{window.clearTimeout(t),t=window.setTimeout((()=>this._doValidate(e.uri,n)),500)})),this._doValidate(e.uri,n))},i=e=>{l.editor.setModelMarkers(e,this._languageId,[]);let t=e.uri.toString(),n=this._listener[t];n&&(n.dispose(),delete this._listener[t])};this._disposables.push(l.editor.onDidCreateModel(r)),this._disposables.push(l.editor.onWillDisposeModel(i)),this._disposables.push(l.editor.onDidChangeModelLanguage((e=>{i(e.model),r(e.model)}))),this._disposables.push(n((e=>{l.editor.getModels().forEach((e=>{e.getLanguageId()===this._languageId&&(i(e),r(e))}))}))),this._disposables.push({dispose:()=>{l.editor.getModels().forEach(i);for(let e in this._listener)this._listener[e].dispose()}}),l.editor.getModels().forEach(r)}dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables.length=0}_doValidate(e,t){this._worker(e).then((t=>t.doValidation(e.toString()))).then((n=>{const r=n.map((e=>function(e,t){let n="number"===typeof t.code?String(t.code):t.code;return{severity:gt(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source}}(0,e)));let i=l.editor.getModel(e);i&&i.getLanguageId()===t&&l.editor.setModelMarkers(i,t,r)})).then(void 0,(e=>{console.error(e)}))}};function gt(e){switch(e){case O.Error:return l.MarkerSeverity.Error;case O.Warning:return l.MarkerSeverity.Warning;case O.Information:return l.MarkerSeverity.Info;case O.Hint:return l.MarkerSeverity.Hint;default:return l.MarkerSeverity.Info}}var lt=class{constructor(e,t){this._worker=e,this._triggerCharacters=t}get triggerCharacters(){return this._triggerCharacters}provideCompletionItems(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.doComplete(i.toString(),ht(t)))).then((n=>{if(!n)return;const r=e.getWordUntilPosition(t),i=new l.Range(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),o=n.items.map((e=>{const t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:(n=e.command,n&&"editor.action.triggerSuggest"===n.command?{id:n.command,title:n.title,arguments:n.arguments}:void 0),range:i,kind:vt(e.kind)};var n,r;return e.textEdit&&("undefined"!==typeof(r=e.textEdit).insert&&"undefined"!==typeof r.replace?t.range={insert:pt(e.textEdit.insert),replace:pt(e.textEdit.replace)}:t.range=pt(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(mt)),e.insertTextFormat===ye.Snippet&&(t.insertTextRules=l.languages.CompletionItemInsertTextRule.InsertAsSnippet),t}));return{isIncomplete:n.isIncomplete,suggestions:o}}))}};function ht(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function ft(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function pt(e){if(e)return new l.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function vt(e){const t=l.languages.CompletionItemKind;switch(e){case ke.Text:return t.Text;case ke.Method:return t.Method;case ke.Function:return t.Function;case ke.Constructor:return t.Constructor;case ke.Field:return t.Field;case ke.Variable:return t.Variable;case ke.Class:return t.Class;case ke.Interface:return t.Interface;case ke.Module:return t.Module;case ke.Property:return t.Property;case ke.Unit:return t.Unit;case ke.Value:return t.Value;case ke.Enum:return t.Enum;case ke.Keyword:return t.Keyword;case ke.Snippet:return t.Snippet;case ke.Color:return t.Color;case ke.File:return t.File;case ke.Reference:return t.Reference}return t.Property}function mt(e){if(e)return{range:pt(e.range),text:e.newText}}var _t=class{constructor(e){this._worker=e}provideHover(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.doHover(r.toString(),ht(t)))).then((e=>{if(e)return{range:pt(e.range),contents:kt(e.contents)}}))}};function wt(e){return"string"===typeof e?{value:e}:(t=e)&&"object"===typeof t&&"string"===typeof t.kind?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"};var t}function kt(e){if(e)return Array.isArray(e)?e.map(wt):[wt(e)]}var bt=class{constructor(e){this._worker=e}provideDocumentHighlights(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.findDocumentHighlights(r.toString(),ht(t)))).then((e=>{if(e)return e.map((e=>({range:pt(e.range),kind:yt(e.kind)})))}))}};function yt(e){switch(e){case je.Read:return l.languages.DocumentHighlightKind.Read;case je.Write:return l.languages.DocumentHighlightKind.Write;case je.Text:return l.languages.DocumentHighlightKind.Text}return l.languages.DocumentHighlightKind.Text}var Et=class{constructor(e){this._worker=e}provideDefinition(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.findDefinition(r.toString(),ht(t)))).then((e=>{if(e)return[Ct(e)]}))}};function Ct(e){return{uri:l.Uri.parse(e.uri),range:pt(e.range)}}var xt=class{constructor(e){this._worker=e}provideReferences(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.findReferences(i.toString(),ht(t)))).then((e=>{if(e)return e.map(Ct)}))}},It=class{constructor(e){this._worker=e}provideRenameEdits(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.doRename(i.toString(),ht(t),n))).then((e=>function(e){if(!e||!e.changes)return;let t=[];for(let n in e.changes){const r=l.Uri.parse(n);for(let i of e.changes[n])t.push({resource:r,versionId:void 0,textEdit:{range:pt(i.range),text:i.newText}})}return{edits:t}}(e)))}};var At=class{constructor(e){this._worker=e}provideDocumentSymbols(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentSymbols(n.toString()))).then((e=>{if(e)return e.map((e=>({name:e.name,detail:"",containerName:e.containerName,kind:St(e.kind),range:pt(e.location.range),selectionRange:pt(e.location.range),tags:[]})))}))}};function St(e){let t=l.languages.SymbolKind;switch(e){case Ue.File:return t.Array;case Ue.Module:return t.Module;case Ue.Namespace:return t.Namespace;case Ue.Package:return t.Package;case Ue.Class:return t.Class;case Ue.Method:return t.Method;case Ue.Property:return t.Property;case Ue.Field:return t.Field;case Ue.Constructor:return t.Constructor;case Ue.Enum:return t.Enum;case Ue.Interface:return t.Interface;case Ue.Function:return t.Function;case Ue.Variable:return t.Variable;case Ue.Constant:return t.Constant;case Ue.String:return t.String;case Ue.Number:return t.Number;case Ue.Boolean:return t.Boolean;case Ue.Array:return t.Array}return t.Function}var Rt=class{constructor(e){this._worker=e}provideLinks(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentLinks(n.toString()))).then((e=>{if(e)return{links:e.map((e=>({range:pt(e.range),url:e.target})))}}))}},Tt=class{constructor(e){this._worker=e}provideDocumentFormattingEdits(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.format(r.toString(),null,Pt(t)).then((e=>{if(e&&0!==e.length)return e.map(mt)}))))}},Dt=class{constructor(e){(0,o.Z)(this,"canFormatMultipleRanges",!1),this._worker=e}provideDocumentRangeFormattingEdits(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.format(i.toString(),ft(t),Pt(n)).then((e=>{if(e&&0!==e.length)return e.map(mt)}))))}};function Pt(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var Mt=class{constructor(e){this._worker=e}provideDocumentColors(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentColors(n.toString()))).then((e=>{if(e)return e.map((e=>({color:e.color,range:pt(e.range)})))}))}provideColorPresentations(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getColorPresentations(r.toString(),t.color,ft(t.range)))).then((e=>{if(e)return e.map((e=>{let t={label:e.label};return e.textEdit&&(t.textEdit=mt(e.textEdit)),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(mt)),t}))}))}},Ft=class{constructor(e){this._worker=e}provideFoldingRanges(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getFoldingRanges(r.toString(),t))).then((e=>{if(e)return e.map((e=>{const t={start:e.startLine+1,end:e.endLine+1};return"undefined"!==typeof e.kind&&(t.kind=function(e){switch(e){case D.Comment:return l.languages.FoldingRangeKind.Comment;case D.Imports:return l.languages.FoldingRangeKind.Imports;case D.Region:return l.languages.FoldingRangeKind.Region}return}(e.kind)),t}))}))}};var Lt=class{constructor(e){this._worker=e}provideSelectionRanges(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getSelectionRanges(r.toString(),t.map(ht)))).then((e=>{if(e)return e.map((e=>{const t=[];for(;e;)t.push({range:pt(e.range)}),e=e.parent;return t}))}))}},jt=class extends lt{constructor(e){super(e,[".",":","<",'"',"=","/"])}};function Ot(e){const t=new ue(e),n=function(){return t.getLanguageServiceWorker(...arguments)};let r=e.languageId;l.languages.registerCompletionItemProvider(r,new jt(n)),l.languages.registerHoverProvider(r,new _t(n)),l.languages.registerDocumentHighlightProvider(r,new bt(n)),l.languages.registerLinkProvider(r,new Rt(n)),l.languages.registerFoldingRangeProvider(r,new Ft(n)),l.languages.registerDocumentSymbolProvider(r,new At(n)),l.languages.registerSelectionRangeProvider(r,new Lt(n)),l.languages.registerRenameProvider(r,new It(n)),"html"===r&&(l.languages.registerDocumentFormattingEditProvider(r,new Tt(n)),l.languages.registerDocumentRangeFormattingEditProvider(r,new Dt(n)))}function Nt(e){const t=[],n=[],r=new ue(e);t.push(r);const i=function(){return r.getLanguageServiceWorker(...arguments)};return function(){const{languageId:t,modeConfiguration:r}=e;Wt(n),r.completionItems&&n.push(l.languages.registerCompletionItemProvider(t,new jt(i))),r.hovers&&n.push(l.languages.registerHoverProvider(t,new _t(i))),r.documentHighlights&&n.push(l.languages.registerDocumentHighlightProvider(t,new bt(i))),r.links&&n.push(l.languages.registerLinkProvider(t,new Rt(i))),r.documentSymbols&&n.push(l.languages.registerDocumentSymbolProvider(t,new At(i))),r.rename&&n.push(l.languages.registerRenameProvider(t,new It(i))),r.foldingRanges&&n.push(l.languages.registerFoldingRangeProvider(t,new Ft(i))),r.selectionRanges&&n.push(l.languages.registerSelectionRangeProvider(t,new Lt(i))),r.documentFormattingEdits&&n.push(l.languages.registerDocumentFormattingEditProvider(t,new Tt(i))),r.documentRangeFormattingEdits&&n.push(l.languages.registerDocumentRangeFormattingEditProvider(t,new Dt(i)))}(),t.push(Ut(n)),Ut(t)}function Ut(e){return{dispose:()=>Wt(e)}}function Wt(e){for(;e.length;)e.pop().dispose()}}}]);
//# sourceMappingURL=1910.f8770225.chunk.js.map