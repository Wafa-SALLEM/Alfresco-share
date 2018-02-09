(function(){var b=YAHOO.util.Dom,z=YAHOO.util.Event,l=YAHOO.util.KeyListener;var r=Alfresco.util.encodeHTML;Alfresco.SiteFinder=function(A){Alfresco.SiteFinder.superclass.constructor.call(this,"Alfresco.SiteFinder",A,["button","container","datasource","datatable","json"]);this.buttons=[];this.searchTerm="";this.memberOfSites={};this.pendingInvites={};YAHOO.Bubbling.on("siteDeleted",this.onSiteDeleted,this);return this};YAHOO.extend(Alfresco.SiteFinder,Alfresco.component.Base,{options:{minSearchTermLength:0,maxSearchResults:100,currentUser:"",inviteData:[],setFocus:false},buttons:null,searchTerm:null,memberOfSites:null,pendingInvites:null,isSearchFinished:true,isSearchEnable:true,onReady:function c(){var G=this;var F=this.options.inviteData,B;for(i=0,j=F.length;i<j;i++){B=F[i];this.pendingInvites[B.siteId]=B.id;this.memberOfSites[B.siteId]="PENDING"}var E=Alfresco.constants.PROXY_URI+"api/sites?roles=user&";this.widgets.dataSource=new YAHOO.util.DataSource(E,{responseType:YAHOO.util.DataSource.TYPE_JSON,connXhrMode:"queueRequests",responseSchema:{resultsList:"items"}});this.widgets.dataSource.doBeforeParseData=function A(H,V){var K=V;if(V){var Q=[];if(G.searchTerm.length===0){Q=V}else{var W,S,U,O,P;for(var T=0,R=V.length;T<R;T++){W=V[T];S=W.shortName;U=W.title;O=W.visibility;P=W.isMemberOfGroup;Q.push(W)}}var I,N,M,L,J;for(N=0,M=Q.length;N<M;N++){Q[N].isSiteManager=(Q[N].siteRole==="SiteManager")}K={items:Q}}return K};this._setupDataTable();this.widgets.searchButton=Alfresco.util.createYUIButton(this,"button",this.doSearch);var D=b.get(this.id+"-term"),C=new l(D,{keys:13},{fn:function(){if(G.isSearchEnable){G.doSearch()}},scope:this,correctScope:true},"keydown").enable();if(this.options.setFocus){D.focus()}b.setStyle(this.id+"-body","visibility","visible")},_setupDataTable:function s(){var C=this;renderCellThumbnail=function D(J,I,K,M){var G=I.getData("shortName"),H=Alfresco.constants.URL_PAGECONTEXT+"site/"+G+"/dashboard",L=r(I.getData("title"));J.innerHTML='<a href="'+H+'"><img src="'+Alfresco.constants.URL_RESCONTEXT+'components/site-finder/images/site-64.png" alt="'+L+'" title="'+L+'" /></a>'};renderCellDescription=function B(K,J,L,M){var G=J.getData("visibility").toUpperCase(),H=Alfresco.constants.URL_PAGECONTEXT+"site/"+J.getData("shortName")+"/dashboard";var I='<h3 class="sitename"><a href="'+H+'" class="theme-color-1">'+r(J.getData("title"))+"</a></h3>";I+='<div class="sitedescription">'+r(J.getData("description"))+"</div>";if(G=="MODERATED"){I+='<span class="visibility theme-color-3 theme-bg-color-1">'+C.msg("site-finder.moderated")+"</span>"}else{if(G=="PRIVATE"){I+='<span class="visibility theme-color-3 theme-bg-color-1">'+C.msg("site-finder.private")+"</span>"}}K.innerHTML=I};renderCellActions=function A(Q,T,K,H){var L=T.getData("visibility").toUpperCase(),N=T.getData("shortName"),P=T.getData("isSiteManager"),O=r(T.getData("title")),G=T.getData("siteRole")!=="";var S=(G&&P);var I='<span id="'+C.id+"-button-"+N+'"></span>';if(S){I='<span id="'+C.id+"-deleteButton-"+N+'"></span>&nbsp;'+I}Q.innerHTML=I;if(S){var M=new YAHOO.widget.Button({container:C.id+"-deleteButton-"+N});M.set("label",C.msg("site-finder.delete"));M.set("onclick",{fn:C.doDelete,obj:{shortName:N,title:O},scope:C})}var J=new YAHOO.widget.Button({container:C.id+"-button-"+N,disabled:T.getData("isMemberOfGroup")});switch(L){case"PUBLIC":if(G){J.set("label",C.msg("site-finder.leave"));J.set("onclick",{fn:C.doLeave,obj:{shortName:N,title:O},scope:C})}else{J.set("label",C.msg("site-finder.join"));J.set("onclick",{fn:C.doJoin,obj:{shortName:N,title:O},scope:C})}C.buttons[N]={button:J};break;case"PRIVATE":if(G){J.set("label",C.msg("site-finder.leave"));J.set("onclick",{fn:C.doLeave,obj:{shortName:N,title:O},scope:C});C.buttons[N]={button:J};break}case"MODERATED":if(G){J.set("label",C.msg("site-finder.leave"));J.set("onclick",{fn:C.doLeave,obj:{shortName:N,title:O},scope:C})}else{if(C.memberOfSites[N]=="PENDING"){var R=false;for(i=0;i<C.options.inviteData.length;i++){if(C.options.inviteData[i].siteId==N){if(C.options.inviteData[i].type!="MODERATED"){R=true}break}}if(!R){J.set("label",C.msg("site-finder.cancel-request"));J.set("onclick",{fn:C.doCancelRequest,obj:{shortName:N,title:O},scope:C})}else{Q.innerHTML="<div></div>"}}else{J.set("label",C.msg("site-finder.request-join"));J.set("onclick",{fn:C.doRequestJoin,obj:{shortName:N,title:O},scope:C})}}C.buttons[N]={button:J};break;default:Q.innerHTML="<div></div>";break}};var F=[{key:"shortName",label:"Short Name",sortable:false,formatter:renderCellThumbnail},{key:"description",label:"Description",sortable:false,formatter:renderCellDescription},{key:"button",label:"Actions",formatter:renderCellActions}];this.widgets.dataTable=new YAHOO.widget.DataTable(this.id+"-sites",F,this.widgets.dataSource,{renderLoopSize:32,initialLoad:false,MSG_EMPTY:this.msg("message.instructions")});this.widgets.dataTable.subscribe("rowDeleteEvent",this.onRowDeleteEvent,this,true);this.widgets.dataTable.subscribe("postRenderEvent",this.onPostRenderEvent,this,true);this.widgets.dataTable.doBeforeLoadData=function E(H,I,K){if(I.error){try{var G=YAHOO.lang.JSON.parse(I.responseText);this.widgets.dataTable.set("MSG_ERROR",G.message)}catch(J){C._setDefaultDataTableErrors(C.widgets.dataTable)}}else{if(I.results){if(I.results.length===0){C.widgets.dataTable.set("MSG_EMPTY",'<span style="white-space: nowrap;">'+C.msg("message.empty")+"</span>")}C.renderLoopSize=Alfresco.util.RENDERLOOPSIZE}}return true}},doSearch:function d(){this.searchTerm=YAHOO.lang.trim(b.get(this.id+"-term").value);if(this.searchTerm.replace(/\*/g,"").length<this.options.minSearchTermLength){Alfresco.util.PopupManager.displayMessage({text:parent._msg("message.minimum-length",this.options.minSearchTermLength)});return}this._performSearch(this.searchTerm)},_failureCallback:function k(B,A){this._clearFeedbackMessage();if(A){Alfresco.util.PopupManager.displayPrompt({title:Alfresco.util.message("message.failure"),text:A})}},doJoin:function x(C,B){var A=this.options.currentUser;Alfresco.util.Ajax.jsonPut({url:Alfresco.constants.PROXY_URI+"api/sites/"+B.shortName+"/memberships",dataObj:{role:"SiteConsumer",person:{userName:A}},successCallback:{fn:this._joinSuccess,obj:B,scope:this},failureCallback:{fn:this._failureCallback,obj:this.msg("site-finder.join-failure",this.options.currentUser,B.title),scope:this}})},_joinSuccess:function y(A,B){Alfresco.util.PopupManager.displayMessage({text:this.msg("site-finder.join-success",this.options.currentUser,B.title)});this.doSearch()},doLeave:function f(C,B){var A=this.options.currentUser;Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/sites/"+B.shortName+"/memberships/"+encodeURIComponent(A),method:"DELETE",successCallback:{fn:this._leaveSuccess,obj:B,scope:this},failureCallback:{fn:this._failureCallback,obj:this.msg("site-finder.leave-failure",this.options.currentUser,B.title),scope:this}})},_leaveSuccess:function v(A,B){delete this.memberOfSites[B.shortName];Alfresco.util.PopupManager.displayMessage({text:this.msg("site-finder.leave-success",this.options.currentUser,B.title)});this.doSearch()},doRequestJoin:function n(C,B){var A=this.options.currentUser;this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:this.msg("message.please-wait"),spanClass:"wait",displayTime:0});Alfresco.util.Ajax.jsonRequest({url:Alfresco.constants.PROXY_URI+"api/sites/"+B.shortName+"/invitations",method:"POST",dataObj:{invitationType:"MODERATED",inviteeUserName:A,inviteeComments:"",inviteeRoleName:"SiteConsumer"},successCallback:{fn:this._requestJoinSuccess,obj:B,scope:this},failureCallback:{fn:this._failureCallback,obj:this.msg("site-finder.request-join-failure",this.options.currentUser,B.title),scope:this}})},_requestJoinSuccess:function u(A,B){var C=A.json.data,D=B.shortName;this.memberOfSites[D]="PENDING";this.pendingInvites[D]=C.inviteId;Alfresco.util.PopupManager.displayMessage({text:this.msg("site-finder.request-join-success",this.options.currentUser,B.title)});this.doSearch()},doCancelRequest:function w(C,B){var A=this.options.currentUser,D=B.shortName;this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:this.msg("message.please-wait"),spanClass:"wait",displayTime:0});Alfresco.util.Ajax.jsonRequest({url:Alfresco.constants.PROXY_URI+"api/sites/"+D+"/invitations/"+encodeURIComponent(this.pendingInvites[D]),method:"DELETE",successCallback:{fn:this._cancelRequestSuccess,obj:B,scope:this},failureCallback:{fn:this._failureCallback,obj:this.msg("site-finder.cancel-request-failure",this.options.currentUser,B.title),scope:this}})},_cancelRequestSuccess:function h(A,B){this.memberOfSites[B.shortName]="MODERATED";Alfresco.util.PopupManager.displayMessage({text:this.msg("site-finder.cancel-request-success",this.options.currentUser,B.title)});this.doSearch()},doDelete:function p(B,A){Alfresco.module.getDeleteSiteInstance().show({site:A})},_setDefaultDataTableErrors:function e(A){var B=Alfresco.util.message;A.set("MSG_EMPTY",B("message.empty","Alfresco.SiteFinder"));A.set("MSG_ERROR",B("message.error","Alfresco.SiteFinder"))},_clearFeedbackMessage:function m(){if(this.widgets.feedbackMessage){try{this.widgets.feedbackMessage.destroy()}catch(A){}this.widgets.feeedbackMessage=null}},_performSearch:function o(B){this._setDefaultDataTableErrors(this.widgets.dataTable);this.widgets.dataTable.set("MSG_EMPTY",Alfresco.util.message("site-finder.searching","Alfresco.SiteFinder"));this.widgets.dataTable.deleteRows(0,this.widgets.dataTable.getRecordSet().getLength());var G=null;var E=function H(){G=Alfresco.util.PopupManager.displayMessage({displayTime:0,text:'<span class="wait">'+r(this.msg("message.loading"))+"</span>",noEscape:true})};var C=YAHOO.lang.later(2000,this,E);var F=function I(J,K,L){if(C){C.cancel()}if(G){G.destroy()}this.isSearchFinished=true;this.searchTerm=B;this.widgets.dataTable.onDataReturnInitializeTable.call(this.widgets.dataTable,J,K,L)};var A=function D(K,L){this.widgets.searchButton.set("disabled",false);this.isSearchEnable=true;this.isSearchFinished=true;if(C){C.cancel()}if(G){G.destroy()}if(L.status==401){window.location.reload()}else{try{var J=YAHOO.lang.JSON.parse(L.responseText);this.widgets.dataTable.set("MSG_ERROR",J.message);this.widgets.dataTable.showTableMessage(Alfresco.util.encodeHTML(J.message),YAHOO.widget.DataTable.CLASS_ERROR)}catch(M){this._setDefaultDataTableErrors(this.widgets.dataTable)}}};this.widgets.dataSource.sendRequest(this._buildSearchParams(B),{success:F,failure:A,scope:this});this.isSearchFinished=false;this.isSearchEnable=false;this.widgets.searchButton.set("disabled",true)},_buildSearchParams:function a(A){var B=YAHOO.lang.substitute("size={maxResults}&nf={term}",{maxResults:this.options.maxSearchResults,term:encodeURIComponent(A)});return B},onSiteDeleted:function q(F,D){var C=D[1].site;var B=this.widgets.dataTable.getRecordSet();var G=B.getLength();for(var E=0;E<G;E++){var A=B.getRecord(E);if(A.getData("shortName")==C.shortName){this.widgets.dataTable.deleteRow(A)}}if(B.getLength()==0){this.widgets.dataTable.set("MSG_EMPTY",Alfresco.util.message("message.empty","Alfresco.SiteFinder"))}},onPostRenderEvent:function t(){if(this.isSearchFinished){this.widgets.searchButton.set("disabled",false);this.isSearchEnable=true}},onRowDeleteEvent:function g(A){if(this.widgets.dataTable.getRecordSet().getLength()===0){this.widgets.dataTable.showTableMessage(this.msg("site-finder.enter-search-term",this.name),"siteFinderTableMessage")}}})})();