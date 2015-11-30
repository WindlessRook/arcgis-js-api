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
define(["dojo/_base/declare","dojo/_base/lang","dojo/has","./kernel","./domUtils","./lang","./InfoTemplate","./geometry/jsonUtils","./symbols/jsonUtils"],function(t,e,i,s,r,n,a,h,o){var l=t(null,{declaredClass:"esri.Graphic",constructor:function(t,e,i,s){t&&!t.declaredClass?(this.geometry=t.geometry?h.fromJson(t.geometry):null,this.symbol=t.symbol?o.fromJson(t.symbol):null,this.attributes=t.attributes||null,this.infoTemplate=t.infoTemplate?new a(t.infoTemplate):null):(this.geometry=t,this.symbol=e,this.attributes=i,this.infoTemplate=s)},_shape:null,_graphicsLayer:null,_visible:!0,visible:!0,getDojoShape:function(){return this._shape},getShapes:function(){var t=[];return this._shape&&t.push(this._shape),this._bgShape&&t.push(this._bgShape),t},getNode:function(){var t=this._shape&&this._shape.getNode();return t&&t.nodeType?t:null},getNodes:function(){var t,e,i=this.getShapes(),s=i.length,r=[];for(e=0;s>e;e++)t=i[e]&&i[e].getNode(),t&&t.nodeType&&r.push(t);return r},getLayer:function(){return this._layer},draw:function(){var t=this._graphicsLayer;return t&&t._draw(this,!0),this},setGeometry:function(t){this.geometry=t;var e=this._graphicsLayer;return e&&(e._updateExtent(this),e._draw(this,!0)),this},setSymbol:function(t,e){var i=this._graphicsLayer,s=this._shape;return this.symbol=t,i&&(e&&s&&i._removeShape(this),i._draw(this,!0)),this},setAttributes:function(t){return this.attributes=t,this},setInfoTemplate:function(t){return this.infoTemplate=t,this},getInfoTemplate:function(){return this._getEffInfoTemplate()},_getEffInfoTemplate:function(){var t=this.getLayer();return this.infoTemplate||t&&t.infoTemplate},getTitle:function(){var t=this.getInfoTemplate(),i=t&&t.title;if(e.isFunction(i))i=i.call(t,this);else if(e.isString(i)){var s=this.getLayer(),r=s&&s._getDateOpts;i=n.substitute(this.attributes,i,{first:!0,dateFormat:r&&r.call(s)})}return i},getContent:function(){var t=this.getInfoTemplate(),i=t&&t.content;if(e.isFunction(i))i=i.call(t,this);else if(e.isString(i)){var s=this.getLayer(),r=s&&s._getDateOpts;i=n.substitute(this.attributes,i,{dateFormat:r&&r.call(s)})}return i},attr:function(t,e){var i,s=this.getNodes(),r=s.length;for(i=0;r>i;i++)null==e?s[i].removeAttribute(t):s[i].setAttribute(t,e);return this},show:function(){this.visible=this._visible=!0;var t,e,i,s=this.getShapes();if(s.length)for(t=this.getNodes(),i=t.length,this.attr("data-hidden"),e=0;i>e;e++)r.show(t[e]);else this._graphicsLayer&&this._graphicsLayer._draw(this,!0);return this},hide:function(){this.visible=this._visible=!1;var t,e,i,s=this._graphicsLayer;if(s)if("canvas-2d"===s.surfaceType)s._removeShape(this);else if(t=this.getNodes(),i=t.length)for(this.attr("data-hidden",""),e=0;i>e;e++)r.hide(t[e]);return this},toJson:function(){var t={};return this.geometry&&(t.geometry=this.geometry.toJson()),this.attributes&&(t.attributes=e.mixin({},this.attributes)),this.symbol&&(t.symbol=this.symbol.toJson()),this.infoTemplate&&(t.infoTemplate=this.infoTemplate.toJson()),t}});return l.prototype.getShape=l.prototype.getDojoShape,i("extend-esri")&&(s.Graphic=l),l});