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
define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/fx/easing","dojo/number","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","./TrafficTime","dojo/i18n!../../nls/jsapi","dojo/text!./templates/ConnectOriginsToDestinations.html"],function(e,t,i,s,n,a,r,o,h,l,d,u,y,c,g,_,m,L,p,f,v,I,S,D,T,b,R,F,O,w,C,A,M,j,x,P,N,k,U,E){var q=t([L,p,f,v,I,x,j],{declaredClass:"esri.dijit.analysis.ConnectOriginsToDestinations",templateString:E,widgetsInTemplate:!0,originsLayer:null,destinationsLayer:null,measurementType:"DrivingTime",outputLayerName:null,distanceDefaultUnits:"Miles",originsLayerRouteIDField:null,destinationsLayerRouteIDField:null,enableTravelModes:!0,i18n:null,toolName:"ConnectOriginsToDestinations",helpFileName:"ConnectOriginsToDestinations",resultParameter:["routesLayer","unassignedOriginsLayer","unassignedDestinationsLayer"],constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,U.common),i.mixin(this.i18n,U.bufferTool),i.mixin(this.i18n,U.driveTimes),i.mixin(this.i18n,U.routeOriginDestinationPairsTool)},postCreate:function(){this.inherited(arguments),g.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_handleShowCreditsClick:function(e){e.preventDefault();var t={};this._form.validate()&&(t.originsLayer=a.toJson(N.constructAnalysisInputLyrObj(this.originsLayer)),t.destinationsLayer=a.toJson(N.constructAnalysisInputLyrObj(this.get("destinationsLayer"))),t.measurementType=this.get("measurementType"),"none"!==d.get(this._routeIdRow,"display")&&(t.originsLayerRouteIDField=this.get("originsLayerRouteIDField"),t.destinationsLayerRouteIDField=this.get("destinationsLayerRouteIDField")),this._trafficTimeWidget.get("checked")&&(t.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(t.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(t.OutputName=a.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=a.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,t).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_handleSaveBtnClick:function(){var e,t,i={},s={};this._form.validate()&&(this._saveBtn.set("disabled",!0),i.originsLayer=a.toJson(N.constructAnalysisInputLyrObj(this.originsLayer)),i.destinationsLayer=a.toJson(N.constructAnalysisInputLyrObj(this.get("destinationsLayer"))),t=this._measureMethodSelect.getOptions(this._measureMethodSelect.get("value")),i.measurementType=t.travelMode?a.toJson(t.travelMode):this._measureMethodSelect.get("value"),"none"!==d.get(this._routeIdRow,"display")&&(i.originsLayerRouteIDField=this.get("originsLayerRouteIDField"),i.destinationsLayerRouteIDField=this.get("destinationsLayerRouteIDField")),this._trafficTimeWidget.get("checked")&&(i.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(i.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(i.OutputName=a.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=a.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),i.context=a.toJson(e)),s.jobParams=i,s.itemParams={description:l.substitute(this.i18n.itemDescription,{layername:this.originsLayer.name,distance_field:i.Distances||i.Field,units:i.Units}),tags:l.substitute(this.i18n.itemTags,{layername:this.originsLayer.name,destnlayername:this.destinationsLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(s.itemParams.folder=this.get("folderId")),this.execute(s))},_save:function(){},_buildUI:function(){var e=!0;d.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),N.initHelpLinks(this.domNode,this.showHelp),d.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,N.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),d.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),N.populateTravelModes({selectWidget:this._measureMethodSelect,addStraightLine:!0,widget:this,enableTravelModes:this.get("enableTravelModes"),selectDefaultMode:!0});var t=this.on("travelmodes-added",i.hitch(this,function(){this._handleMeasurementTypeChange(this._measureMethodSelect.get("value")),t.remove(),t=null}));this.get("showSelectAnalysisLayer")&&(!this.get("originsLayer")&&this.get("originsLayers")&&this.set("originsLayer",this.originsLayers[0]),N.populateAnalysisLayers(this,"originsLayer","originsLayers")),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this.originsLayer&&this._updateAnalysisLayerUI(e),N.addReadyToUseLayerOption(this,[this._analysisSelect,this._destPointLyrSelect]),this._loadConnections()},_updateAnalysisLayerUI:function(e){var t;if(this.originsLayer&&u.set(this._tripCalToolDescription,"innerHTML",l.substitute(this.i18n.toolDefine,{layername:this.originsLayer.name})),this.featureLayers&&(this.set("featureLayers",this.featureLayers),t=s.some(this._destPointLyrSelect.getOptions(),function(e){return"browse"===e.value},this),this._destPointLyrSelect.removeOption(this._destPointLyrSelect.getOptions()),s.forEach(this.featureLayers,function(e,t){this._destPointLyrSelect.addOption({value:t+1,label:e.name}),this.destinationsLayer&&this.destinationsLayer===e&&this._destPointLyrSelect.set("value",this.destinationsLayer)},this),this.get("showReadyToUseLayers")&&t&&(this._destPointLyrSelect.addOption({type:"separator",value:""}),this._destPointLyrSelect.addOption({value:"browse",label:this.i18n.browseAnalysisTitle}))),this.destinationsLayer||(this._destPointLyrSelect.set("value",1),this.set("destinationsLayer",this.featureLayers[0])),this.originsLayer&&this.originsLayer.graphics&&this.originsLayer.graphics.length<=1||this.destinationsLayer&&this.destinationsLayer.graphics&&this.destinationsLayer.graphics.length<=1?d.set(this._routeIdRow,"display","none"):d.set(this._routeIdRow,"display","table"),this.originsLayer&&this.originsLayer.graphics&&this.originsLayer.graphics.length>1||this.originsLayer.analysisReady){var i=this.originsLayer.fields;this._originRouteIdSelect.removeOption(this._originRouteIdSelect.getOptions()),s.forEach(i,function(e){-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeString","esriFieldTypeDate"],e.type)&&this._originRouteIdSelect.addOption({value:e.name,label:M.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this),this.originsLayerRouteIDField&&this._orginRouteIdSelect.set("value",this.originsLayerRouteIDField)}e&&this._destPointLyrSelect.get("value")&&"browse"!==this._destPointLyrSelect.get("value")&&this.set("outputLayerName",l.substitute(this.i18n.outputLayerName,{layername:this.originsLayer.name,destnlayername:this.featureLayers[this._destPointLyrSelect.get("value")-1].name}))},_handleAnalysisLayerChange:function(e){var t,i,n;"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"'),this._isAnalysisSelect=!0,this._browsedlg.show()):(t=this.originsLayers[e],i=this.featureLayers.slice(),n=s.some(i,function(e){return e===this.originsLayer},this),n||i.push(this.originsLayer),this.originsLayer=t,this.set("featureLayers",i),this.destinationsLayer=null,this.originsLayerRouteIDField=null,this.outputLayerName=null,this._updateAnalysisLayerUI(!0))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setOriginsLayerAttr:function(e){M.isDefined(e)&&"esriGeometryPoint"===e.geometryType&&(this.originsLayer=e)},_getOriginsLayerAttr:function(){return this.originsLayer},_setOriginsLayersAttr:function(e){this.originsLayers=e},_setFeatureLayersAttr:function(e){this.featureLayers=s.filter(e,function(e){var t=M.isDefined(this.originsLayer)?e===this.originsLayer:!1;return!t&&e&&e.geometryType&&"esriGeometryPoint"===e.geometryType?!0:void 0},this)},_getFeatureLayersAttr:function(){return this.featureLayers},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},validateServiceName:function(e){return N.validateServiceName(e,{textInput:this._outputLayerInput})},_setMeasurementTypeAttr:function(e){this.measurementType=e},_getMeasurementTypeAttr:function(){return this.measurementType},_setDistanceDefaultUnitsAttr:function(e){this.distanceDefaultUnits=e},_getDistanceDefaultUnitsAttr:function(){return this.distanceDefaultUnits},_setDestinationsLayerAttr:function(e){this.destinationsLayer=e},_getDestinationsLayerAttr:function(){return this._destPointLyrSelect&&(this.destinationsLayer=this.featureLayers[this._destPointLyrSelect.get("value")-1]),this.destinationsLayer},_setOriginsLayerRouteIDFieldAttr:function(e){this.originsLayerRouteIDField=e},_getOriginsLayerRouteIDFieldAttr:function(){return this._originRouteIdSelect&&this._isRouteIdAvailable()&&(this.originsLayerRouteIDField=this._originRouteIdSelect.get("value")),this.originsLayerRouteIDField},_setDestinationsLayerRouteIDFieldAttr:function(e){this.destinationsLayerRouteIDField=e},_getDestinationsLayerRouteIDFieldAttr:function(){return this._destnRouteIdSelect&&this._isRouteIdAvailable&&(this.destinationsLayerRouteIDField=this._destnRouteIdSelect.get("value")),this.destinationsLayerRouteIDField},_setOutputLayerNameAttr:function(e){this.outputLayerName=e,this._outputLayerInput&&this._outputLayerInput.set("value",this.outputLayerName)},_setEnableTravelModesAttr:function(e){this._set("enableTravelModes",e)},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!1)),n.connect(this._measureMethodSelect,"onChange",i.hitch(this,this._handleMeasurementTypeChange)),this.watch("enableTravelModes",i.hitch(this,function(e,t,i){this._updateTravelModes(i)}))},_connect:function(e,t,i){this._pbConnects.push(n.connect(e,t,i))},_handleBrowseItemsSelect:function(e){e&&e.selection&&N.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.originsLayers:this.featureLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._destPointLyrSelect,posIncrement:this._isAnalysisSelect?0:1,browseDialog:this._browsedlg,widget:this}).always(i.hitch(this,function(){this._isAnalysisSelect&&this._handleAnalysisLayerChange(this._analysisSelect.get("value"))}))},_handleDestnRouteIdChange:function(e){this._autoSelRtId||M.isDefined(this._originRouteIdSelect.getOptions(e))&&(this._autoSelRtId=!0,this._originRouteIdSelect.set("value",e))},_handleOriginRouteIdChange:function(e){this._autoSelRtId||M.isDefined(this._destnRouteIdSelect.getOptions(e))&&(this._autoSelRtId=!0,this._destnRouteIdSelect.set("value",e))},_handleMeasurementTypeChange:function(e){var t,i;i=this._measureMethodSelect.getOptions(this._measureMethodSelect.get("value")),t=M.isDefined(i)?"Time"===i.units&&"driving"===i.modei18nKey:"DrivingTime"===e,this.set("measurementType",e),d.set(this._useTrafficLabelRow,"display",t?"":"none"),this._trafficTimeWidget.set("disabled",!t),this._trafficTimeWidget.set("reset",!t)},_handleDestinationLayerChange:function(e){var t;"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"'),this._isAnalysisSelect=!1,this._browsedlg.show()):(this._autoSelRtId&&(this._autoSelRtId=!1),this._destnRouteIdSelect.removeOption(this._destnRouteIdSelect.getOptions()),this.originsLayer&&(this.originsLayer.graphics&&this.originsLayer.graphics.length>1&&this.featureLayers[e-1].graphics.length>1||this.originsLayer.analysisReady)?this.featureLayers[e-1].graphics&&this.originsLayer.graphics&&this.featureLayers[e-1].graphics.length!==this.originsLayer.graphics.length?(this._showMessages(this.i18n.inValidNumberRecordsMsg),this.set("disableRunAnalysis",!0),d.set(this._routeIdRow,"display","none")):(this._handleCloseMsg(),d.set(this._routeIdRow,"display","table"),this.set("disableRunAnalysis",!1),t=this.featureLayers[e-1].fields,s.forEach(t,function(e){-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeString","esriFieldTypeDate"],e.type)&&this._destnRouteIdSelect.addOption({value:e.name,label:M.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this)):(d.set(this._routeIdRow,"display","none"),this.set("disableRunAnalysis",!1),this._handleCloseMsg()),this.originsLayer&&this.featureLayers[e-1]&&this._outputLayerInput.set("value",l.substitute(this.i18n.outputLayerName,{layername:this.originsLayer.name,destnlayername:this.featureLayers[e-1].name})))},_isRouteIdAvailable:function(){var e=!1;return this.originsLayer.graphics&&this.originsLayer.graphics.length>1&&this.featureLayers[this._destPointLyrSelect.get("value")-1].graphics.length>1?this.originsLayer.graphics&&this.originsLayer.graphics.length===this.featureLayers[this._destPointLyrSelect.get("value")-1].graphics.length&&(e=!0):(this.originsLayer.analysisReady||this.featureLayers[this._destPointLyrSelect.get("value")-1])&&(e=!0),e},_showMessages:function(e){u.set(this._bodyNode,"innerHTML",e),r.fadeIn({node:this._errorMessagePane,easing:_.quadIn,onEnd:i.hitch(this,function(){d.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),r.fadeOut({node:this._errorMessagePane,easing:_.quadOut,onEnd:i.hitch(this,function(){d.set(this._errorMessagePane,{display:"none"})})}).play()},_updateTravelModes:function(e){var t=this._measureMethodSelect.getOptions();s.forEach(t,function(t){"StraightLine"!==t.value&&(t.disabled=!e)}),this._measureMethodSelect.updateOption(t)}});return o("extend-esri")&&i.setObject("dijit.analysis.ConnectOriginsToDestinations",q,A),q});