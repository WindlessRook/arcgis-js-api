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
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/sniff","dojo/io-query","dojo/dom-construct","dojo/dom-style","../kernel","../config","../lang","../request","../SpatialReference","../geometry/webMercatorUtils","../dijit/PopupTemplate","./layer","./KMLFolder","./KMLGroundOverlay","./MapImageLayer","./FeatureLayer"],function(e,t,i,r,s,a,o,n,l,h,d,c,f,u,p,_,g,y,v,m,b,L){var k=t([y],{declaredClass:"esri.layers.KMLLayer",serviceUrl:location.protocol+"//utility.arcgis.com/sharing/kml",constructor:function(e,t){e||console.log("KMLLayer:constructor - please provide url for the KML file"),this._outSR=t&&t.outSR||new p({wkid:4326}),this._options=r.mixin({},t),c.defaults.kmlService&&(this.serviceUrl=c.defaults.kmlService);var i=this.linkInfo=t&&t.linkInfo;i&&(this.visible=!!i.visibility,this._waitingForMap=!!i.viewFormat),(!i||i&&i.visibility&&!this._waitingForMap)&&this._parseKml(),this.refresh=r.hitch(this,this.refresh),this.registerConnectEvents("esri.layers.KMLLayer",!0)},getFeature:function(e){if(e){var t,i,a,o=e.type,n=e.id;switch(o){case"esriGeometryPoint":case"esriGeometryPolyline":case"esriGeometryPolygon":var l=this["_"+o];l&&(t=r.getObject("_mode._featureMap."+n,!1,l));break;case"GroundOverlay":var h=this._groundLyr;if(h){var d=h.getImages();for(a=d.length,i=0;a>i;i++)if(d[i].id===n){t=d[i];break}}break;case"ScreenOverlay":break;case"NetworkLink":s.some(this._links,function(e){return e.linkInfo&&e.linkInfo.id===n?(t=e,!0):!1});break;case"Folder":var c=this.folders;for(a=c?c.length:0,i=0;a>i;i++)if(c[i].id===n){t=c[i];break}break;default:console.log("KMLLayer:getFeature - unknown feature type")}return t}},getLayers:function(){var e=[];return this._groundLyr&&e.push(this._groundLyr),this._fLayers&&(e=e.concat(this._fLayers)),this._links&&s.forEach(this._links,function(t){t.declaredClass&&e.push(t)}),e},setFolderVisibility:function(e,t){e&&(this._fireUpdateStart(),e.visible=t,t&&(t=this._areLocalAncestorsVisible(e)),this._setState(e,t),this._fireUpdateEnd())},onRefresh:function(){},onOpacityChange:function(){},_parseKml:function(e){var t=this;this._fireUpdateStart(),this._io=u({url:this.serviceUrl,content:{url:this._url.path+this._getQueryParameters(e),model:"simple",folders:"",refresh:this.loaded?!0:void 0,outSR:a.toJson(this._outSR.toJson())},callbackParamName:"callback",load:function(e){t._io=null,t._initLayer(e)},error:function(e){t._io=null,e=r.mixin(new Error,e),e.message="Unable to load KML: "+t.url+" "+(e.message||""),t._fireUpdateEnd(e),t.onError(e)}})},_initLayer:function(e){var t;this.loaded&&(t=[],s.forEach(this.folders,function(e){e.visible&&t.push(e.id)}),this._options.minScale=this.minScale,this._options.maxScale=this.maxScale,this._options.opacity=this.opacity,this._removeInternalLayers()),this.name=e.name,this.description=e.description,this.snippet=e.snippet,this.visibility=e.visibility,this.featureInfos=e.featureInfos;var i,a,o,n=this.folders=e.folders,l=[];if(n)for(a=n.length,i=0;a>i;i++)o=n[i]=new v(n[i]),-1===o.parentFolderId&&l.push(o);var h,d=this._links=e.networkLinks;for(a=d?d.length:0,i=0;a>i;i++)d[i].viewRefreshMode&&-1!==d[i].viewRefreshMode.toLowerCase().indexOf("onregion")||(h=r.mixin({},this._options),h.linkInfo=d[i],h.id&&(h.id=h.id+"_"+i),d[i]=new k(d[i].href,h),d[i]._parentLayer=this,d[i]._parentFolderId=this._getLinkParentId(d[i].linkInfo.id));var c=e.groundOverlays;if(c&&c.length>0){h=r.mixin({},this._options),h.id&&(h.id=h.id+"_mapImage");var f=this._groundLyr=new b(h);for(a=c.length,i=0;a>i;i++)f.addImage(new m(c[i]))}var u=r.getObject("featureCollection.layers",!1,e);if(u&&u.length>0&&(this._fLayers=[],s.forEach(u,function(e,t){var i,s=r.getObject("featureSet.features",!1,e);s&&s.length>0&&(h=r.mixin({outFields:["*"],infoTemplate:e.popupInfo?new g(e.popupInfo):null,editable:!1},this._options),h.id&&(h.id=h.id+"_"+t),e.layerDefinition.capabilities="Query,Data",i=new L(e,h),i.geometryType&&(this["_"+i.geometryType]=i),this._fLayers.push(i))},this),0===this._fLayers.length&&delete this._fLayers),!this.loaded)for(a=l.length,i=0;a>i;i++)o=l[i],this._setState(o,o.visible);this._fireUpdateEnd(),this.loaded?(this._addInternalLayers(),s.forEach(this.folders,function(e){s.indexOf(t,e.id)>-1?this.setFolderVisibility(e,!0):this.setFolderVisibility(e,!1)},this),this.onRefresh()):(this.loaded=!0,this.onLoad(this))},_addInternalLayers:function(){var e=this._map;this._fireUpdateStart(),this._links&&s.forEach(this._links,function(t){t.declaredClass&&(e.addLayer(t),t._waitingForMap&&(t._waitingForMap=null,t.visible?t._parseKml(e):t._wMap=e))});var t,i=e.spatialReference,r=this._outSR;if(!i.equals(r))if(i.isWebMercator()&&4326===r.wkid)t=_.geographicToWebMercator;else{if(!r.isWebMercator()||4326!==i.wkid)return void console.log("KMLLayer:_setMap - unsupported workflow. Spatial reference of the map and kml layer do not match, and the conversion cannot be done on the client.");t=_.webMercatorToGeographic}this._groundLyr&&(t&&s.forEach(this._groundLyr.getImages(),function(e){e.extent=t(e.extent)}),e.addLayer(this._groundLyr));var a=this._fLayers;a&&a.length>0&&s.forEach(a,function(i){if(t){var r,s,a=i.graphics,o=a?a.length:0;for(r=0;o>r;r++)s=a[r].geometry,s&&a[r].setGeometry(t(s))}e.addLayer(i)}),this.onVisibilityChange(this.visible)},_removeInternalLayers:function(){var e=this._map;this._links&&s.forEach(this._links,function(e){e.declaredClass&&e._io&&e._io.cancel()}),e&&s.forEach(this.getLayers(),e.removeLayer,e)},_setState:function(e,t){var i,r,s,a=e.featureInfos,o=a?a.length:0,n=t?"show":"hide";for(s=0;o>s;s++)i=a[s],r=this.getFeature(i),r&&("Folder"===i.type?this._setState(r,t&&r.visible):"NetworkLink"===i.type?this._setInternalVisibility(r,t):r[n]())},_areLocalAncestorsVisible:function(e){for(var t=e.parentFolderId,i=e.visible;i&&-1!==t;){var r=this.getFeature({type:"Folder",id:t});i=i&&r.visible,t=r.parentFolderId}return i},_setInternalVisibility:function(e,t){var i=e._parentLayer,r=e._parentFolderId;for(t=t&&e.visible;t&&i;)t=t&&i.visible,r>-1&&(t=t&&i._areLocalAncestorsVisible(i.getFeature({type:"Folder",id:r}))),r=i._parentFolderId,i=i._parentLayer;this._setIntState(e,t)},_setIntState:function(e,t){e&&s.forEach(e.getLayers(),function(i){i.linkInfo?e._setIntState(i,t&&i.visible&&e._areLocalAncestorsVisible(e.getFeature({type:"Folder",id:i._parentFolderId}))):i.setVisibility(t)})},_getLinkParentId:function(e){var t=-1;return this.folders&&s.some(this.folders,function(i){return i.networkLinkIds&&-1!==s.indexOf(i.networkLinkIds,e)?(t=i.id,!0):!1}),t},_checkAutoRefresh:function(){var e=this.linkInfo;if(e)if(this.visible){if(this.loaded&&this._map){var t=e.refreshMode,r=e.refreshInterval,s=e.viewRefreshMode,a=e.viewRefreshTime;t&&-1!==t.toLowerCase().indexOf("oninterval")&&r>0&&(this._stopAutoRefresh(),this._timeoutHandle=setTimeout(this.refresh,1e3*r)),s&&-1!==s.toLowerCase().indexOf("onstop")&&a>0&&(this._extChgHandle||(this._extChgHandle=i.connect(this._map,"onExtentChange",this,this._extentChanged)))}}else this._stopAutoRefresh(),i.disconnect(this._extChgHandle),delete this._extChgHandle},_stopAutoRefresh:function(){clearTimeout(this._timeoutHandle),this._timeoutHandle=null},_getQueryParameters:function(t){t=t||this._map;var i,s={},a=this.linkInfo,o=t&&t.extent;if(this._url.query&&(r.mixin(s,this._url.query),i=!!this._url.query.token),d.id&&!i){var l=d.id.findCredential(this._url.path);l&&(s.token=l.token)}if(a){var h=a.viewFormat,c=a.httpQuery,u=a.viewBoundScale;if(o&&h){var p=o,g=o,y=o.spatialReference;y&&(y.isWebMercator()?p=_.webMercatorToGeographic(o):4326===y.wkid&&(g=_.geographicToWebMercator(o)));var v=p.getCenter(),m=Math.max(g.getWidth(),g.getHeight());u&&(p=p.expand(u)),h=h.replace(/\[bboxWest\]/gi,p.xmin).replace(/\[bboxEast\]/gi,p.xmax).replace(/\[bboxSouth\]/gi,p.ymin).replace(/\[bboxNorth\]/gi,p.ymax).replace(/\[lookatLon\]/gi,v.x).replace(/\[lookatLat\]/gi,v.y).replace(/\[lookatRange\]/gi,m).replace(/\[lookatTilt\]/gi,0).replace(/\[lookatHeading\]/gi,0).replace(/\[lookatTerrainLon\]/gi,v.x).replace(/\[lookatTerrainLat\]/gi,v.y).replace(/\[lookatTerrainAlt\]/gi,0).replace(/\[cameraLon\]/gi,v.x).replace(/\[cameraLat\]/gi,v.y).replace(/\[cameraAlt\]/gi,m).replace(/\[horizFov\]/gi,60).replace(/\[vertFov\]/gi,60).replace(/\[horizPixels\]/gi,t.width).replace(/\[vertPixels\]/gi,t.height).replace(/\[terrainEnabled\]/gi,0),r.mixin(s,n.queryToObject(h))}c&&(c=c.replace(/\[clientVersion\]/gi,d.version).replace(/\[kmlVersion\]/gi,2.2).replace(/\[clientName\]/gi,"ArcGIS API for JavaScript").replace(/\[language\]/gi,e.locale),r.mixin(s,n.queryToObject(c)))}var b,L=[];for(b in s)f.isDefined(s[b])&&L.push(b+"="+s[b]);return L=L.join("&"),L?"?"+L:""},setScaleRange:function(e,t){this.inherited(arguments),s.forEach(this.getLayers(),function(i){i.setScaleRange(e,t)})},setOpacity:function(e){this.opacity!=e&&(s.forEach(this.getLayers(),function(t){t.setOpacity(e)}),this.opacity=e,this.onOpacityChange(e))},_setMap:function(e,t){this.inherited(arguments),this._map=e;var i=this._div=l.create("div",null,t);return h.set(i,"position","absolute"),this._addInternalLayers(),this.evaluateSuspension(),i},_unsetMap:function(e,t){this._io&&this._io.cancel(),this._stopAutoRefresh(),i.disconnect(this._extChgHandle),delete this._extChgHandle,this._removeInternalLayers();var r=this._div;r&&(t.removeChild(r),l.destroy(r)),this._wMap=this._div=null,this.inherited(arguments)},onVisibilityChange:function(e){return this.loaded?(this._fireUpdateStart(),this._setInternalVisibility(this,e),this._checkAutoRefresh(),void this._fireUpdateEnd()):void(this.linkInfo&&e&&(this._waitingForMap||this._parseKml(this._wMap)))},refresh:function(){this.loaded&&this._map&&!this._io&&this.visible&&this._parseKml()},getFeatureCollection:function(e){var t,i=[],r=this.getFeature({type:"Folder",id:e});return r&&(t=s.map(r.featureInfos,function(e){return"esriGeometryPoint"===e.type||"esriGeometryPolyline"===e.type||"esriGeometryPolygon"===e.type?e.id:void 0},this),t&&t.length>0&&s.forEach(this._fLayers,function(e){var r,a;r=e.toJson(),r.featureSet.features&&r.featureSet.features.length>0&&(a=s.filter(r.featureSet.features,function(i){return-1!==s.indexOf(t,i.attributes[e.objectIdField])?i:void 0},this)),a&&a.length>0&&(r.featureSet.features=a,i.push(r))},this)),i},getFeatureCount:function(e){var t=this.getFeature({type:"Folder",id:e}),i={points:0,polylines:0,polygons:0};return t&&s.forEach(t.featureInfos,function(e){"esriGeometryPoint"===e.type&&(i.points+=1),"esriGeometryPolyline"===e.type&&(i.polylines+=1),"esriGeometryPolygon"===e.type&&(i.polygons+=1)}),i},_extentChanged:function(){this._stopAutoRefresh(),this._timeoutHandle=setTimeout(this.refresh,1e3*this.linkInfo.viewRefreshTime)}});return o("extend-esri")&&r.setObject("layers.KMLLayer",k,d),k});