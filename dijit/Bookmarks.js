// COPYRIGHT © 2015 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/aspect","dojo/has","dojo/keys","dojo/query","dojo/dom","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dojo/window","dojo/on","dojo/dnd/Source","dojo/dnd/Avatar","dojo/i18n!../nls/jsapi","dijit/a11yclick","../kernel","../domUtils","../geometry/Extent","./BookmarkItem","../Evented"],function(e,o,t,i,s,r,n,a,d,h,k,c,m,l,u,_,p,b,B,f,x,v,g){var N=e(g,{declaredClass:"esri.dijit.Bookmarks",bookmarks:[],bookmarkDomNode:null,bookmarkTable:null,initBookmarks:null,editable:null,map:null,_oldGenerateText:null,_customGenerateText:!1,_dndSource:null,_inputBox:null,_label:null,_css:{esriBookmarks:"esriBookmarks",esriBookmarkList:"esriBookmarkList",esriBookmarkTable:"esriBookmarkTable",esriBookmarkEditImage:"esriBookmarkEditImage",esriBookmarkRemoveImage:"esriBookmarkRemoveImage",esriBookmarkLabel:"esriBookmarkLabel",esriBookmarkItem:"esriBookmarkItem",esriBookmarkHighlight:"esriBookmarkHighlight",esriAddBookmark:"esriAddBookmark",esriBookmarkEditBox:"esriBookmarkEditBox"},_clickHandlers:[],_mouseOverHandlers:[],_mouseOutHandlers:[],_removeHandlers:[],_editHandlers:[],_dndHandlers:[],_eventMap:{click:!0,edit:!0,remove:!0},onClick:function(){},onEdit:function(){},onRemove:function(){},constructor:function(e,o){this.map=e.map,this.editable=e.editable,this.initBookmarks=e.bookmarks,this.bookmarkDomNode=h.create("div"),k.add(this.bookmarkDomNode,this._css.esriBookmarkList),this.bookmarkTable=h.create("div"),k.add(this.bookmarkTable,this._css.esriBookmarkTable),this.bookmarkDomNode.appendChild(this.bookmarkTable),o=d.byId(o),o.appendChild(this.bookmarkDomNode),this.srcNodeRef=o,k.add(this.srcNodeRef,this._css.esriBookmarks),this._dndSource=new u(this.bookmarkTable,{creator:this._avatarCreator,singular:!0,checkAcceptance:function(e,o){e.getItem(o[0].id);return this==e?!0:!1}}),this._dndSourceNodes=this._dndSource.getAllNodes(),this._dndHandlers.push(l(this._dndSource,"DndStart",t.hitch(this,function(e){e==this._dndSource&&(this._oldGenerateText=_.prototype._generateText,_.prototype._generateText=t.hitch(this,this._generateText),this._customGenerateText=!0,this._inputBox&&this._finishEdit())}))),this._dndHandlers.push(l(this._dndSource,"DndDrop",t.hitch(this,function(e){e==this._dndSource&&(this._syncBookmarksAfterReorder(),this.emit("reorder",this.bookmarks))}))),this._dndHandlers.push(l(this._dndSource,"DndCancel",t.hitch(this,function(){this._customGenerateText&&(_.prototype._generateText=this._oldGenerateText,this._customGenerateText=!1)}))),this._addInitialBookmarks()},destroy:function(){this.map=null,i.forEach(this._clickHandlers,function(e){o.disconnect(e)}),i.forEach(this._mouseOverHandlers,function(e){o.disconnect(e)}),i.forEach(this._mouseOutHandlers,function(e){o.disconnect(e)}),i.forEach(this._removeHandlers,function(e){o.disconnect(e)}),i.forEach(this._editHandlers,function(e){o.disconnect(e)}),h.destroy(this.bookmarkDomNode)},addBookmark:function(e){var i,s,r,n,d,c,l,u,_,B;"esri.dijit.BookmarkItem"==e.declaredClass?i=e:(s=new x(e.extent),i=new v({name:e.name,extent:s})),this.editable?(n=p.widgets.bookmarks,d=n.NLS_bookmark_edit,c=n.NLS_bookmark_remove,r=h.create("div",{innerHTML:'<div tabindex="0" role="button" class=\'esriBookmarkLabel\'>'+e.name+'</div><div tabindex="0" role="button" title=\''+c+"' class='esriBookmarkRemoveImage'><br/></div><div tabindex=\"0\" role=\"button\" title='"+d+"' class='esriBookmarkEditImage'><br/></div>"}),l=a(".esriBookmarkEditImage",r)[0],u=a(".esriBookmarkRemoveImage",r)[0],this._removeHandlers.push(o.connect(u,b,this,"_removeBookmark")),this._editHandlers.push(o.connect(l,b,this,"_editBookmarkLabel"))):r=h.create("div",{innerHTML:"<div tabindex=\"0\" class='esriBookmarkLabel'>"+e.name+"</div>"}),k.add(r,this._css.esriBookmarkItem),_="esri.geometry.Extent"==e.extent.declaredClass?e.extent:new x(e.extent),B=a(".esriBookmarkLabel",r)[0],this._clickHandlers.push(o.connect(B,b,t.hitch(this,"_onClickHandler",e))),this._mouseOverHandlers.push(o.connect(r,"onmouseover",t.hitch(this,function(){k.add(r,this._css.esriBookmarkHighlight)}))),this._mouseOutHandlers.push(o.connect(r,"onmouseout",t.hitch(this,function(){k.remove(r,this._css.esriBookmarkHighlight)}))),this.bookmarks.push(i),this._dndSource.insertNodes(!1,[r]),this._dndSourceNodes=this._dndSource.getAllNodes(),m.scrollIntoView(r),this._syncBookmarksAfterReorder()},removeBookmark:function(e){var o,t=a(".esriBookmarkLabel",this.bookmarkDomNode),s=i.filter(t,function(o){return o.innerHTML==e});for(i.forEach(s,function(e){e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)}),o=this.bookmarks.length-1;o>=0;o--)this.bookmarks[o].name==e&&this.bookmarks.splice(o,1);this.onRemove()},hide:function(){f.hide(this.bookmarkDomNode)},show:function(){f.show(this.bookmarkDomNode)},_addInitialBookmarks:function(){if(this.editable){var e=p.widgets.bookmarks,s=e.NLS_add_bookmark,r=h.create("div",{tabIndex:0,role:"button",innerHTML:"<div>"+s+"</div>"});k.add(r,this._css.esriBookmarkItem),k.add(r,this._css.esriAddBookmark),this._clickHandlers.push(o.connect(r,b,this,this._newBookmark)),this._mouseOverHandlers.push(o.connect(r,"onmouseover",t.hitch(this,function(){k.add(r,this._css.esriBookmarkHighlight)}))),this._mouseOutHandlers.push(o.connect(r,"onmouseout",t.hitch(this,function(){k.remove(r,this._css.esriBookmarkHighlight)}))),this.srcNodeRef.appendChild(r)}this.bookmarks=[],i.forEach(this.initBookmarks,function(e){this.addBookmark(e)},this)},_newBookmark:function(){var e,o,t,i,s,r,n,d,h,k,c,m,l=this.map,u=p.widgets.bookmarks,_=u.NLS_new_bookmark,b=l.extent;l.spatialReference._isWrappable()?(o=x.prototype._normalizeX(b.xmin,l.spatialReference._getInfo()).x,t=x.prototype._normalizeX(b.xmax,l.spatialReference._getInfo()).x,o>t?(d=l.spatialReference.isWebMercator(),i=d?20037508.342788905:180,s=d?-20037508.342788905:-180,Math.abs(o-i)>Math.abs(t-s)?(r=o,n=i):(r=s,n=t),m=new x(r,b.ymin,n,b.ymax,l.spatialReference)):m=new x(o,b.ymin,t,b.ymax,l.spatialReference)):m=b,h=new v({name:_,extent:m}),this.addBookmark(h),k=a(".esriBookmarkItem",this.bookmarkDomNode),c=k[k.length-1],e={target:{parentNode:null}},e.target.parentNode=c,this._editBookmarkLabel(e)},_removeBookmark:function(e){this.bookmarks.splice(e.target.parentNode.parentNode.parentNode.rowIndex,1),e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode),this.onRemove()},_syncBookmarksAfterReorder:function(){var e=[],o=this._dndSource.getAllNodes();i.forEach(o,t.hitch(this,function(o){var t=this._dndSourceNodes.map(function(e,t){return e==o?t:void 0}).filter(isFinite)[0];e.push(this.bookmarks[t])})),this.bookmarks=e,this._dndSourceNodes=o},_generateText:function(){return this._dndSource&&this._dndSource.getSelectedNodes()[0]&&this._dndSource.getSelectedNodes()[0].firstChild.firstChild.innerHTML?this._dndSource.getSelectedNodes()[0].firstChild.firstChild.innerHTML:""},_editBookmarkLabel:function(e){this._inputBox&&this._finishEdit();var t,i,s,r=e.target.parentNode,d=c.position(r,!0),k=d.y;t=h.create("div",{innerHTML:"<input type='text' class='esriBookmarkEditBox' style='z-index: 999; left:"+d.x+"px; top:"+k+"px;'/>"}),this._inputBox=a("input",t)[0],this._label=a(".esriBookmarkLabel",r)[0],i=p.widgets.bookmarks,s=i.NLS_new_bookmark,this._inputBox.value=this._label.innerHTML==s?"":this._label.innerHTML,o.connect(this._inputBox,"onkeyup",this,function(e){switch(e.keyCode){case n.ENTER:this._finishEdit()}}),o.connect(this._inputBox,"onblur",this,"_finishEdit"),this.srcNodeRef.appendChild(t),this._inputBox.focus(),this._inputBox.select(),d=c.position(r,!0),this._inputBox.style.left=d.x+"px",this._inputBox.style.top=d.y+"px"},_finishEdit:function(){var e,o,t;try{this._inputBox.parentNode.parentNode.removeChild(this._inputBox.parentNode)}catch(s){}e=p.widgets.bookmarks,o=e.NLS_new_bookmark,this._label.innerHTML=""===this._inputBox.value?o:this._inputBox.value,t=a(".esriBookmarkLabel",this.bookmarkDomNode),i.forEach(this.bookmarks,function(e,o){e&&(e.name=t[o].innerHTML)}),this._inputBox=null,this.onEdit()},_avatarCreator:function(e,o){var t=h.create("div");return t.id=dojo.dnd.getUniqueId(),k.add(t,"dojoDndItem"),"avatar"!==o&&h.place(e,t),{node:t,data:e,type:"something"}},_onClickHandler:function(e){var o=e.extent;e.extent.declaredClass||(o=new x(e.extent)),this.map.setExtent(o),this.onClick()},toJson:function(){var e=[];return i.forEach(this.bookmarks,function(o){o&&e.push(o.toJson())}),e}});return r("extend-esri")&&t.setObject("dijit.Bookmarks",N,B),N});