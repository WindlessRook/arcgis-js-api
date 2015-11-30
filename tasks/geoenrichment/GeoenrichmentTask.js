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
define(["../../declare","dojo/_base/array","dojo/dom-construct","./taskHelper","../FeatureSet","./EnrichParameters","./ReportParameters","../../IdentityManager","../../geometry/Point","../../geometry/Polygon","../../geometry/Polyline","dojo/i18n!../../nls/jsapi"],function(e,t,r,n,o,a,i,s,l,u,c,h){function f(e){this.name="UserError",this.message=e||""}function d(e,t){return e.getAvailableCountries().then(function(e){for(var r=0;r<e.length;r++)if(e[r].id==t)return e[r].name})}function p(e){var t=e.getExtent();return new l((t.xmin+t.xmax)/2,(t.ymin+t.ymax)/2,t.spatialReference)}return h=h.geoenrichment.task.GeoenrichmentTask,f.prototype=Error.prototype,e("esri.tasks.geoenrichment.GeoenrichmentTask",null,{token:null,url:null,constructor:function(e){this.url=e||location.protocol+"//geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer"},enrich:function(e){return n.invokeMethod(this,"/Geoenrichment/enrich",function(){return e instanceof a||(e=new a(e)),n.jsonToRest(e.toJson())},function(e){(!e.results||e.results.length<1||!e.results[0].value||!e.results[0].value.FeatureSet||e.results[0].value.FeatureSet.length<1)&&n.throwEmptyResponse();for(var t={featureSets:[],messages:e.messages},r=e.results[0].value.FeatureSet,a=0;a<r.length;a++)t.featureSets.push(new o(r[a]));return t},"onEnrichComplete","onError")},getAvailableCountries:function(){return n.invokeMethod(this,"/Geoenrichment/Countries",null,function(e){if(e.error)throw e.error;for(var t=e.countries,r=0;r<t.length;r++){var n=t[r].datasets;delete t[r].datasets,t[r].datasetIDs=n}return t},"onGetAvailableCountriesComplete","onError")},getDataCollections:function(e,t,r){var o;return t?o="/GetDataCollections/execute":(o="/Geoenrichment/DataCollections",e&&(o+="/"+e)),n.invokeMethod(this,o,function(){var n={suppressNullValues:!0};return r&&(n.outFields=0===r.length?"none":JSON.stringify(r)),t&&(e&&(n.sourcecountry=e),n.searchtext="id:"+t),n},function(e){if(e.error)throw e.error;for(var t=e.results||e.dataCollections||e.DataCollections,r=0;r<t.length;r++)t[r]={id:t[r].dataCollectionID,metadata:t[r].metadata,variables:t[r].data};return t},"onGetDataCollectionsComplete","onError")},createReport:function(e){var t=this;s.getCredential(this.url).then(function(o){try{var a=r.create("form",{target:"_blank",action:t.url+"/Geoenrichment/CreateReport",method:"post"});e instanceof i||(e=new i(e));var s=n.jsonToRest(e.toJson());s.f="bin",s.token=o.token;for(var l in s)s.hasOwnProperty(l)&&r.create("input",{type:"hidden",name:l,value:s[l]},a);r.place(a,document.body),a.submit(),r.destroy(a)}catch(u){t.onError(u)}},function(e){t.onError(e)})},getReports:function(e){var t=this;return d(this,e).then(function(e){return n.invokeMethod(t,"/Geoenrichment/Reports/"+e,null,function(e){for(var t=0;t<e.reports.length;t++){var r=e.reports[t].reportID;delete e.reports[t].reportID,e.reports[t].id=r}return e.reports},"onGetReportsComplete","onError")})},getStandardGeographyLevels:function(e){function t(e){return n.invokeMethod(r,e,null,function(e){for(var t=e.geographyLevels,r=0;r<t.length;r++){var n=t[r];n.id=n.countryID,delete n.countryID,n.name=n.countryName,delete n.countryName;for(var o=n.datasets,a=0;a<o.length;a++){var i=o[a];i.id=i.datasetID,delete i.datasetID,i.geographyLayers=i.levels,delete i.levels}}return t},"onGetStandardGeographyLevelsComplete","onError")}var r=this;return e?d(this,e).then(function(e){return t("/Geoenrichment/StandardGeographyLevels/"+e)}):t("/Geoenrichment/StandardGeographyLevels")},getServiceLimits:function(){return n.invokeMethod(this,"/Geoenrichment/ServiceLimits",null,function(e){return e.serviceLimits.value},"onGetServiceLimitsComplete","onError")},getCountries:function(e){var r;switch(e.type){case"point":r=e;break;case"polyline":var n=e.paths[0],o=new c(e.spatialReference);o.addPath(n),r=p(o);break;case"polygon":var a=e.rings[0],i=new u(e.spatialReference);i.addRing(a),r=p(i)}return this.enrich({variables:["GlobalIntersect.*"],studyAreas:[{geometry:r}],forStorage:!1}).then(function(e){for(var r=[],n=e.featureSets[0].features,o=0;o<n.length;o++){var a=n[o].attributes.sourceCountry;t.indexOf(r,a)<0&&r.push(a)}if(0===r.length)throw new f(h.noData);return r})},onEnrichComplete:function(){},onGetAvailableCountriesComplete:function(){},onGetDataCollectionsComplete:function(){},onCreateReportComplete:function(){},onGetReportsComplete:function(){},onGetStandardGeographyLevelsComplete:function(){},onGetServiceLimitsComplete:function(){},onError:function(){}})});