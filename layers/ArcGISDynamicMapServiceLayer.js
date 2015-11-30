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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/sniff","dojo/io-query","../kernel","../config","../request","../urlUtils","../layerUtils","../geometry/scaleUtils","./DynamicMapServiceLayer","./ArcGISMapServiceLayer","./TimeInfo","./LayerTimeOptions","./ImageParameters","./DynamicLayerInfo","./LayerMapSource"],function(i,e,s,a,t,n,r,h,o,l,y,m,c,f,p,d,u,g,_){var L=i([c,f],{declaredClass:"esri.layers.ArcGISDynamicMapServiceLayer",_eventMap:{"visible-layers-change":["visibleLayers"]},constructor:function(i,s){var a=s&&s.imageParameters,t=e.hitch;if(a){var n=a.layerDefinitions;n&&this.setLayerDefinitions(n),a.layerOption===u.LAYER_OPTION_SHOW&&(this.visibleLayers=[].concat(a.layerIds),this.onVisibleLayersChange(this.visibleLayers))}this._setIsPNG32=t(this,this._setIsPNG32),this.dpi=a&&a.dpi||96,this.imageFormat=a&&a.format||"png8",this.imageTransparency=a&&a.transparent===!1?!1:!0,this._setIsPNG32(),this.gdbVersion=s&&s.gdbVersion,this._params.gdbVersion=this.gdbVersion,e.mixin(this._params,this._url.query,{dpi:this.dpi,transparent:this.imageTransparency,format:this.imageFormat},a?a.toJson():{}),this.getImageUrl=t(this,this.getImageUrl),this._initLayer=t(this,this._initLayer),this._load=t(this,this._load),this.useMapImage=s?s.useMapImage:!1,this._loadCallback=s&&s.loadCallback;var r=s&&s.resourceInfo;r?this._initLayer(r):(void 0===arguments[2]||arguments[2]===!1)&&this._load(),this.registerConnectEvents()},disableClientCaching:!1,layerDefinitions:null,_initLayer:function(i){this.inherited(arguments),i.timeInfo&&(this.timeInfo=new p(i.timeInfo)),this.loaded=!0,this.onLoad(this);var e=this._loadCallback;e&&(delete this._loadCallback,e(this))},getImageUrl:function(i,s,t,r){var y=this._url.path+"/export?",m=this._params,c=i.spatialReference.wkid||a.toJson(i.spatialReference.toJson()),f=this._errorHandler;if(delete m._ts,e.mixin(m,{bbox:i.xmin+","+i.ymin+","+i.xmax+","+i.ymax,bboxSR:c,imageSR:c,size:s+","+t},this.disableClientCaching?{_ts:(new Date).getTime()}:{}),m.layerDefs){var p=m.layerDefs;delete m.layerDefs,e.mixin(m,{layerDefs:p})}var d=m.token=this._getToken(),u=l.addProxy(y+n.objectToQuery(e.mixin({},m,{f:"image"})));u.length>h.defaults.io.postLength||this.useMapImage?this._jsonRequest=o({url:y,content:e.mixin(m,{f:"json"}),callbackParamName:"callback",load:function(i){var e=i.href;d&&(e+=-1===e.indexOf("?")?"?token="+d:"&token="+d),r(l.addProxy(e))},error:f}):r(u)},_setIsPNG32:function(){var i=this.imageFormat.toLowerCase(),e=t("ie");this.isPNG32=e&&6===e&&("png32"===i||"png24"===i)&&this.imageTransparency},_setTime:function(i){var e=this.timeInfo,a=this._params.time=i?i.toJson().join(","):null;if(this.version<10.02&&e)if(a)this._params.layerTimeOptions=y._serializeTimeOptions(this.layerTimeOptions);else{var t=this.layerInfos;if(t){var n=this.layerTimeOptions,r=n?n.slice(0):[],h=[];s.forEach(t,function(i){i.subLayerIds||h.push(i.id)}),h.length&&(s.forEach(h,function(i){if(!r[i]){var e=new d;e.useTime=!1,r[i]=e}}),this._params.layerTimeOptions=y._serializeTimeOptions(r,h))}}this.version>=10.02&&e&&(a||e.hasLiveData||(this._params.time="null,null"))},setDPI:function(i,e){this.dpi=this._params.dpi=i,e||this.refresh(!0)},setImageFormat:function(i,e){this.imageFormat=this._params.format=i,this._setIsPNG32(),e||this.refresh(!0)},setImageTransparency:function(i,e){this.imageTransparency=this._params.transparent=i,this._setIsPNG32(),e||this.refresh(!0)},setVisibleLayers:function(i,e){this.visibleLayers=i,this._params.layers=u.LAYER_OPTION_SHOW+":"+(i.length?i.join():"-1"),this._updateDynamicLayers(),e||this.refresh(!0),this.onVisibleLayersChange(this.visibleLayers)},onVisibleLayersChange:function(){},setDefaultVisibleLayers:function(i){this.visibleLayers=this._defaultVisibleLayers,this._params.layers=null,this._updateDynamicLayers(),i||this.refresh(!0),this.onVisibleLayersChange(this.visibleLayers)},setLayerDefinitions:function(i,e){this.layerDefinitions=i,this._params.layerDefs=y._serializeLayerDefinitions(i),this._updateDynamicLayers(),e||this.refresh(!0)},setDefaultLayerDefinitions:function(i){this.layerDefinitions=this._params.layerDefs=null,this._updateDynamicLayers(),i||this.refresh(!0)},setDisableClientCaching:function(i){this.disableClientCaching=i},setLayerTimeOptions:function(i,e){this.layerTimeOptions=i,this._params.layerTimeOptions=y._serializeTimeOptions(i),this._updateDynamicLayers(),e||this.refresh(!0)},refresh:function(i){if(i)this.inherited(arguments);else{var e=this.disableClientCaching;this.disableClientCaching=!0,this.inherited(arguments),this.disableClientCaching=e}},setLayerDrawingOptions:function(i,e){this.layerDrawingOptions=i,this._updateDynamicLayers(),e||this.refresh(!0)},setDynamicLayerInfos:function(i,e){i&&i.length>0?(this.dynamicLayerInfos=i,this.visibleLayers=y._getDefaultVisibleLayers(i),this.onVisibleLayersChange(this.visibleLayers)):this.dynamicLayerInfos=this.layerDrawingOptions=null,this._updateDynamicLayers(),e||this.refresh(!0)},createDynamicLayerInfosFromLayerInfos:function(){var i,e=[];return s.forEach(this.layerInfos,function(s){i=new g(s.toJson()),i.source=new _({mapLayerId:s.id}),e.push(i)}),e},_onDynamicLayersChange:function(){},_updateDynamicLayers:function(){if(this.dynamicLayerInfos&&this.dynamicLayerInfos.length>0||this.layerDrawingOptions&&this.layerDrawingOptions.length>0){this.dynamicLayerInfos&&0!==this.dynamicLayerInfos.length||(this.dynamicLayerInfos=this.createDynamicLayerInfosFromLayerInfos());var i,e=this.dynamicLayerInfos,t=[],n=this._map&&m.getScale(this._map),r=this.visibleLayers,h=n?y._getLayersForScale(n,e):r;s.forEach(e,function(i){if(!i.subLayerIds){var e,a=i.id;if(-1!==s.indexOf(r,a)&&-1!==s.indexOf(h,a)){e={id:a,name:i.name},e.source=i.source&&i.source.toJson();var n;this.layerDefinitions&&this.layerDefinitions[a]&&(n=this.layerDefinitions[a]),n&&(e.definitionExpression=n);var o;this.layerDrawingOptions&&this.layerDrawingOptions[a]&&(o=this.layerDrawingOptions[a]),o&&(e.drawingInfo=o.toJson());var l;this.layerTimeOptions&&this.layerTimeOptions[a]&&(l=this.layerTimeOptions[a]),l&&(e.layerTimeOptions=l.toJson()),e.minScale=i.minScale||0,e.maxScale=i.maxScale||0,t.push(e)}}},this),i=a.toJson(t),this._params.dynamicLayers&&this._params.dynamicLayers.length===i.length&&this._params.dynamicLayers===i||(this._params.dynamicLayers=i,this._onDynamicLayersChange(this._params.dynamicLayers))}else this._params.dynamicLayers?(this._params.dynamicLayers=null,this._onDynamicLayersChange(null)):this._params.dynamicLayers=null},_onExtentChangeHandler:function(i,e,s){s&&this._updateDynamicLayers(),this.inherited(arguments)},_setMap:function(i){return this._map=i,this._updateDynamicLayers(),this.inherited(arguments)},onGDBVersionChange:function(){},setGDBVersion:function(i,e){this.gdbVersion=i,this._params.gdbVersion=i,this.onGDBVersionChange(),e||this.refresh(!0)},exportMapImage:function(i,s){var a=h.defaults.map,t=e.mixin({size:a.width+","+a.height},this._params,i?i.toJson(this.normalization):{},{f:"json"});if(delete t._ts,t.layerDefs){var n=t.layerDefs;delete t.layerDefs,e.mixin(t,{layerDefs:n})}this._exportMapImage(this._url.path+"/export",t,s)}});return t("extend-esri")&&e.setObject("layers.ArcGISDynamicMapServiceLayer",L,r),L});