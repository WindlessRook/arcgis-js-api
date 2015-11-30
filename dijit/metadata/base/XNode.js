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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/topic","dojo/dom-attr","dojo/has","./etc/docUtil","./etc/validationUtil","./Templated","../../../kernel"],function(t,e,i,n,r,a,s,l,o,u){var h=t([o],{_isGxeAttribute:!1,_isGxeElement:!1,_isGxeNode:!0,_isOptionallyOff:!1,conditionalValidator:null,gxeDocument:null,gxePath:null,inputWidget:null,parentElement:null,notApplicable:!1,serialize:!0,label:null,target:null,fixed:!1,isDocumentTitle:!1,optionsFilter:null,serializeIfEmpty:!1,trim:!0,value:null,valueType:null,alternateValues:null,postCreate:function(){this.inherited(arguments)},destroy:function(){try{var t=this.conditionalValidator;t&&(e.isArray(t)?i.forEach(t,function(t){t.destroyRecursive(!1)}):t.destroyRecursive(!1))}catch(r){console.error(r)}try{n.publish("gxe/xnode-destroyed",{xnode:this})}catch(r){console.error(r)}this.inherited(arguments);try{n.publish("gxe/after-xnode-destroyed",{xnode:this})}catch(r){console.error(r)}},afterValidateValue:function(){},beforeValidateValue:function(){},buildPath:function(){var t=function(t,e,i){e._isGxeRootDescriptor&&e.gxeDocument&&(t.gxeDocument||(t.gxeDocument=e.gxeDocument),!t.gxeDocument.rootElement&&i&&(t.gxeDocument.rootElement=i))};"string"!=typeof this.target&&(this.target=null),null!==this.target&&(this.target=e.trim(this.target),0===this.target.length&&(this.target=null));var i=null,n=this.getParent(),a=this.target;for(this._isGxeAttribute&&(a="@"+a),this._isGxeElement&&(i=this),this._isGxeElement&&t(this,this,i);n;){if(n._isGxeElement){if(this.parentElement||(this.parentElement=n),null!==n.gxePath&&null!==n.gxeDocument)return this.gxePath=n.gxePath+"/"+a,this.gxeDocument=n.gxeDocument,r.set(this.domNode,"data-gxe-path",this.gxePath),void this._validateTarget();a=n.target+"/"+a,i=n}t(this,n,i),n=n.getParent()}a="/"+a,this.gxePath=a,r.set(this.domNode,"data-gxe-path",this.gxePath),this._validateTarget()},_checkOccurs:function(t,i){var n=1,r=typeof i;if(this._isGxeAttribute){if(t)return 1;n=0}if("undefined"!==r&&null!==i){if("string"===r){if(i=e.trim(i).toLowerCase(),t&&"unbounded"===i)return i;i.length>0&&(i=parseInt(i,10),isNaN(i)||(r=typeof i))}"number"===r&&isFinite(i)&&(0>i&&(i=0),n=i)}return n},checkXmlValue:function(){var t=this.getXmlValue();return"undefined"==typeof t&&(t=null),null!==t&&(this.trim&&"string"==typeof t&&(t=e.trim(t)),t.push||(t=""+t),this.serializeIfEmpty||0!==t.length||(t=null)),t},findInputWidget:function(){var t=null;return i.some(this.getChildren(),function(e){return e._isGxeInput?(t=e,!0):void 0}),t},getLabelString:function(){var t,e=this.label;return"undefined"!=typeof e&&null!=e?e:(t=this.target,"undefined"!=typeof t&&null!=t?(this.label=t,t):"No Target")},getParentElement:function(){for(var t=this.getParent();t;){if(t._isGxeElement)return t;t=t.getParent()}return null},getXmlValue:function(){return this.inputWidget?this.inputWidget.getXmlValue():this.value},getValidationLabel:function(){return!this.showHeader&&this.parentElement?this._isGxeElement&&this._adoptedForMultiplicity?this.getLabelString():this.parentElement.getValidationLabel():this.getLabelString()},isLineageDescendant:function(t){var e=this;if(0===e.gxePath.indexOf(t.gxePath))for(;e;){if(e===t)return!0;e=e.parentElement}return!1},_newValidationStatus:function(){var t={isValid:!0,isRequired:!1,label:null,message:"",xnodeWidget:this,inputWidget:this.inputWidget};return t},_publishStarted:function(){try{n.publish("gxe/xnode-started",{xnode:this})}catch(t){console.error(t)}},resolveMinOccurs:function(){return this.minOccurs},_validateTarget:function(){var t,e=function(t,e){console.log("*** ",e);var i=s.findDescriptor(t);i&&i.templateString&&(console.log(i.templateString),console.log(i))},i="XNode.validateTarget: ",n=this.target;if(this.minOccurs=this._checkOccurs(!1,this.minOccurs),this.maxOccurs=this._checkOccurs(!0,this.maxOccurs),!this.gxeDocument)throw new Error(i+"Unable to connect to gxeDocument "+this.target);if("string"!=typeof n||null===n||0===n.length)throw t=i+"The target is empty: "+this.target,e(this,t),new Error(t);if(-1!==this.target.indexOf("/"))throw t=i+"The target should not contain a forward slash: "+this.target,e(this,t),new Error(t);this._isGxeElement&&-1===this.target.indexOf(":")&&this.gxeDocument.hasNamespaces()&&(t=i+"The target has no namespace prefix: "+this.target,e(this,t))},validateConditionals:function(t){var n=this.conditionalValidator;n&&(e.isArray(n)?i.forEach(n,function(e){e.validateConditionals(t)}):n.validateConditionals(t))},validateValue:function(t){var i=this,n=function(){for(var t=!1,e=i;e;){if(e.notApplicable){t=!0;break}e=e.parentElement}return t?!1:!0},r=this._newValidationStatus();if(this.fixed||!this.inputWidget)return r;var a=this.resolveMinOccurs();r.isRequired=a>0,r.label=this.getValidationLabel();var s=this.inputWidget.getInputValue();return"undefined"==typeof s&&(s=null),null!==s&&this.trim&&"string"==typeof s&&(s=e.trim(s)),this.beforeValidateValue(l,r,s),r.isValid&&l.validateValue(r,s),this.afterValidateValue(l,r,s),!r.isValid&&t&&n()&&t.handleValidationError(this,r.message,this.inputWidget),r}});return a("extend-esri")&&e.setObject("dijit.metadata.base.XNode",h,u),h});