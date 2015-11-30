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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/on","dojo/keys","dojo/dom-construct","dojo/has","../../../base/Templated","dojo/text!./templates/ConceptPane.html","dojo/i18n!../../../nls/i18nBase","dojo/i18n!../../../nls/i18nIso","../../../base/etc/docUtil","./gemet","../../../../../request","../../../../../kernel"],function(e,t,n,i,s,a,o,r,l,c,g,u,h,d,m){var p=e([r],{dialogBroker:null,gxeDocument:null,initialValue:null,i18nBase:c,i18nIso:g,templateString:l,gemetUrl:null,gemetConceptThesaurus:null,initialLanguage:null,_activePromise:null,postCreate:function(){this.inherited(arguments),this.workingNode.style.display="none";var e=this.gxeDocument.gxeContext;this.gemetUrl=e.gemetUrl,this.gemetConceptThesaurus=e.gemetConceptThesaurus,h.populateLanguages(this.gxeDocument,this.languageSelect),this.initialLanguage=h.getSelectedLanguage(this.languageSelect),this.searchText.value=h.getSessionConceptQuery(),this._query(),this.own(i(this.searchText,"keyup",t.hitch(this,function(e){e.keyCode==s.ENTER&&this._query()})))},_addOption:function(e,n,i){var s="Unknown",o=null;e.preferredLabel&&"string"==typeof e.preferredLabel.string&&(s=t.trim(e.preferredLabel.string)),e.definition&&"string"==typeof e.definition.string&&(o=t.trim(e.definition.string),0===o.length&&(o=null));var r=s,l=this,c=a.create("div",{"class":"gxeOption"},i),g=a.create("div",{"class":"gxeClickableText",onclick:function(){l._onSelect(r)}},c);u.setNodeText(g,s);var h;null!==o&&o.length>0&&(h=a.create("div",{"class":"gxeDescription gxeSmallText"},c),u.setNodeText(h,o))},_fetch:function(e,t){var n=this.gemetConceptThesaurus,i=this.gemetUrl+"/getConceptsMatchingRegexByThesaurus";i+="?thesaurus_uri="+encodeURIComponent(n),i+="&language="+encodeURIComponent(e),i+="&regex="+encodeURIComponent(t);var s={url:i,handleAs:"json",callbackParamName:"jsonp"};return d(s,{})},_getSearchText:function(){var e=t.trim(this.searchText.value);return e},_handleError:function(e){this.workingNode.style.display="none",console.error(e);var t=this.gemetUrl,n=g.gemet.ioerror.replace("{url}",t);a.empty(this.resultsNode);var i=a.create("div",{"class":"gxeMessagePane"},this.resultsNode);a.create("div",{"class":"gxeIcon gxeIconError"},i);var s=a.create("div",{"class":"gxeMessageText"},i);u.setNodeText(s,n)},_onCancelClick:function(e){this.onCancelClick(e)},onCancelClick:function(){},_onLanguageChange:function(){this._query()},_onSearchClick:function(){this._query()},_onSelect:function(e){var t=h.getSelectedLanguage(this.languageSelect);this.initialLanguage!==t&&h.saveSessionLanguage(t),this.onSelect(e)},onSelect:function(){},_query:function(){var e=h.getSelectedLanguage(this.languageSelect),n=this._getSearchText();if(null!==n&&0!==n.length&&null===this._activePromise){this.workingNode.style.display="inline-block",a.empty(this.resultsNode);var i=this._activePromise=this._fetch(e,n);i.then(t.hitch(this,function(e){this._activePromise=null;try{this._render(e,n)}catch(t){this._handleError(t)}}),t.hitch(this,function(e){this._activePromise=null,this._handleError(e)}))}},_render:function(e,t){var i=0,s=this.resultsNode;a.empty(s),n.forEach(e,function(e,t){i++,this._addOption(e,t,s)},this),this.workingNode.style.display="none";var o,r;0===i?(a.empty(s),o=a.create("div",{"class":"gxeMessagePane"},this.resultsNode),a.create("div",{"class":"gxeIcon gxeIconWarning"},o),r=a.create("div",{"class":"gxeMessageText"},o),u.setNodeText(r,g.gemet.noMatch)):h.saveSessionConceptQuery(t)}});return o("extend-esri")&&t.setObject("dijit.metadata.form.iso.gemet.ConceptPane",p,m),p});