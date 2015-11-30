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
define(["../process/SpatialIndex","dojo/Deferred"],function(a,e){return{add:function(n,t){if(t=t||{},n.spatialIndex)return n.spatialIndex;if(!("spatialIndex"in t)){var d=new e;t.autostart=!1,n.spatialIndex=new a(t);var i=n.spatialIndex;return n.declaredClass.indexOf("Map")>-1?i.setMap(n):i.addLayer(n),i.on("start",function(){d.resolve(i)}),i.start(),d}return t.spatialIndex!==!1?(n.spatialIndex=t.spatialIndex,n.spatialIndex):void 0},remove:function(a){var e=a.spatialIndex;e&&(a.declaredClass.indexOf("Map")>-1?e.unsetMap():e.removeLayer(a),a.spatialIndex=void 0)}}});