(function(){Alfresco.component.NodeHeader=function a(d){Alfresco.component.NodeHeader.superclass.constructor.call(this,"Alfresco.component.NodeHeader",d);YAHOO.Bubbling.on("metadataRefresh",this.doRefresh,this);this.nodeType=null;return this};YAHOO.extend(Alfresco.component.NodeHeader,Alfresco.component.Base,{options:{pagecontext:null,libraryRoot:null,nodeRef:null,siteId:"",actualSiteId:"",rootPage:"documentlibrary",rootLabelId:"path.documents",showOnlyLocation:false,showFavourite:true,showLikes:true,showComments:true,showQuickShare:true,showDownload:true,showPath:true,likes:{},isContainer:false,sharedId:null,sharedBy:null,showItemModifier:true},onReady:function b(){if(this.options.siteId!=this.options.actualSiteId){if(this.options.actualSiteId!=null){var g=this.options.actualSiteId===null,d=window.location.protocol+"//"+window.location.host+Alfresco.constants.URL_PAGECONTEXT+(g?"":"site/"+this.options.actualSiteId+"/")+"document-details"+window.location.search;Alfresco.util.PopupManager.displayPrompt({text:(g?this.msg("message.document.moved.repo"):this.msg("message.document.moved",this.options.actualSiteId)),buttons:[{text:this.msg("button.ok"),handler:function(){window.location=d},isDefault:true}]});YAHOO.lang.later(10000,this,function(){window.location=d});return}else{var d="/share/page/document-details?nodeRef="+this.options.nodeRef;Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.document.movedToRepo"),buttons:[{text:this.msg("button.ok"),handler:function(){window.location=d},isDefault:true}]});YAHOO.lang.later(10000,this,function(){window.location=d});return}}this.nodeType=this.options.isContainer?"folder":"document";if(this.options.showLikes&&!this.options.showOnlyLocation&&this.options.lock!="READ_ONLY_LOCK"){new Alfresco.Like(this.id+"-like").setOptions({nodeRef:this.options.nodeRef,siteId:this.options.siteId,type:this.nodeType,displayName:this.options.displayName}).display(this.options.likes.isLiked,this.options.likes.totalLikes)}if(this.options.showFavourite&&!this.options.showOnlyLocation){new Alfresco.Favourite(this.id+"-favourite").setOptions({nodeRef:this.options.nodeRef,type:this.nodeType}).display(this.options.isFavourite)}if(this.options.showQuickShare&&!this.options.showOnlyLocation){new Alfresco.QuickShare(this.id+"-quickshare").setOptions({nodeRef:this.options.nodeRef,displayName:this.options.displayName}).display(this.options.sharedId,this.options.sharedBy)}if(this.options.showItemModifier&&!this.options.showOnlyLocation){var e=Dom.get(this.id+"-modifyDate");e.innerHTML=Alfresco.util.formatDate(Alfresco.util.fromISO8601(e.innerHTML),Alfresco.util.message("date-format.default"))}else{var f=YAHOO.util.Dom.getElementsByClassName("node-header")[0];YAHOO.util.Dom.setStyle(f,"min-height","2em")}},doRefresh:function c(){YAHOO.Bubbling.unsubscribe("metadataRefresh",this.doRefresh,this);var d="components/node-details/node-header?nodeRef={nodeRef}&rootPage={rootPage}&rootLabelId={rootLabelId}&showFavourite={showFavourite}&showLikes={showLikes}&showComments={showComments}&showQuickShare={showQuickShare}&showDownload={showDownload}&showPath={showPath}&showItemModifier={showItemModifier}"+(this.options.pagecontext?"&pagecontext={pagecontext}":"")+(this.options.libraryRoot?"&libraryRoot={libraryRoot}":"")+(this.options.siteId?"&site={siteId}":"");this.refresh(d)}})})();