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
define(["./Credential","./domUtils","./lang","./urlUtils","dijit/Dialog","dijit/registry","dojo/_base/config","dojo/_base/Deferred","dojo/_base/kernel","dojo/dom-attr","dojo/i18n!esri/nls/jsapi","dojo/io-query","dojo/sniff","dojo/json","dijit/form/Button","dojo/query"],function(e,t,o,r,i,n,s,a,d,l,u,c,h,_){var p={_oAuthDfd:null,_oAuthIntervalId:0,_oAuthDialogContent:"<div class='dijitDialogPaneContentArea'><div style='padding-bottom: 5px; word-wrap: break-word;'>${oAuthInfo}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><div class='esriErrorMsg' style='display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'>${invalidUser}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><div class='dijitDialogPaneActionBar'><button data-dojo-type='dijit.form.Button' data-dojo-props='type:\"button\", \"class\":\"esriIdSubmit\"'>${lblOk}</button><button data-dojo-type='dijit.form.Button' data-dojo-props='type:\"button\", \"class\":\"esriIdCancel\"'>${lblCancel}</button></div>",setOAuthRedirectionHandler:function(e){this._oAuthRedirectFunc=e},oAuthSignIn:function(e,o,r,i){var n=this._oAuthDfd=new a;n.resUrl_=e,n.sinfo_=o,n.oinfo_=r;var s=!i||i.oAuthPopupConfirmation!==!1;if(!r.popup||!s)return this._doOAuthSignIn(e,o,r),n;this._nls||(this._nls=u.identity),this.oAuthDialog||(this.oAuthDialog=this._createOAuthDialog());var d=this.oAuthDialog,c=i&&i.error,h=i&&i.token;return t.hide(d.errMsg_),c&&403==c.code&&h&&(l.set(d.errMsg_,"innerHTML",this._nls.forbidden),t.show(d.errMsg_)),d.show(),n},setOAuthResponseHash:function(t){var o=this._oAuthDfd;if(this._oAuthDfd=null,o&&t){clearInterval(this._oAuthIntervalId),"#"===t.charAt(0)&&(t=t.substring(1));var r=c.queryToObject(t);if(r.error){var i=new Error("access_denied"===r.error?"ABORTED":"OAuth: "+r.error+" - "+r.error_description);i.code="IdentityManagerBase.2",i.log=s.isDebug,o.errback(i)}else{var n=o.sinfo_,a=o.oinfo_,d=a._oAuthCred,l=new e({userId:r.username,server:n.server,token:r.access_token,expires:(new Date).getTime()+1e3*Number(r.expires_in),ssl:"true"===r.ssl,_oAuthCred:d});d.storage=r.persist?window.localStorage:window.sessionStorage,d.token=l.token,d.expires=l.expires,d.userId=l.userId,d.ssl=l.ssl,d.save(),o.callback(l)}}},_createOAuthDialog:function(){var e=this._nls,r=o.substitute(e,this._oAuthDialogContent),a=new i({title:e.title,content:r,"class":"esriOAuthSignInDialog",style:"min-width: 18em;",esriIdMgr_:this,execute_:function(){var e=a.esriIdMgr_._oAuthDfd;a.hide_(),a.esriIdMgr_._doOAuthSignIn(e.resUrl_,e.sinfo_,e.oinfo_)},cancel_:function(){var e=a.esriIdMgr_._oAuthDfd;a.esriIdMgr_._oAuthDfd=null,a.hide_();var t=new Error("ABORTED");t.code="IdentityManager.2",t.log=s.isDebug,e.errback(t)},hide_:function(){t.hide(a.errMsg_),a.hide(),i._DialogLevelManager.hide(a)}}),l=a.domNode;return a.btnSubmit_=n.byNode(d.query(".esriIdSubmit",l)[0]),a.btnCancel_=n.byNode(d.query(".esriIdCancel",l)[0]),a.errMsg_=d.query(".esriErrorMsg",l)[0],a.connect(a.btnSubmit_,"onClick",a.execute_),a.connect(a.btnCancel_,"onClick",a.onCancel),a.connect(a,"onCancel",a.cancel_),a},_doOAuthSignIn:function(e,t,o){var i=this,n={client_id:o.appId,response_type:"token",state:_.stringify({portalUrl:o.portalUrl}),expiration:o.expiration,locale:o.locale,force_login:o.forceLogin,redirect_uri:o.popup?r.getAbsoluteUrl(o.popupCallbackUrl):window.location.href.replace(/#.*$/,"")},a=o.portalUrl.replace(/^http:/i,"https:")+"/sharing/oauth2/authorize",d=a+"?"+c.objectToQuery(n);if(o.popup){var l;if(7===h("ie")?(l=window.open(o.popupCallbackUrl,"esriJSAPIOAuth",o.popupWindowFeatures),l.location=d):l=window.open(d,"esriJSAPIOAuth",o.popupWindowFeatures),l)l.focus(),this._oAuthDfd.oAuthWin_=l,this._oAuthIntervalId=setInterval(function(){if(l.closed){clearInterval(i._oAuthIntervalId);var e=i._oAuthDfd;if(e){var t=new Error("ABORTED");t.code="IdentityManager.2",t.log=s.isDebug,e.errback(t)}}},500);else{var u=new Error("ABORTED");u.code="IdentityManager.2",u.log=s.isDebug,this._oAuthDfd.errback(u)}}else this._oAuthRedirectFunc?this._oAuthRedirectFunc({authorizeParams:n,authorizeUrl:a,resourceUrl:e,serverInfo:t,oAuthInfo:o}):window.location=d}};return p});