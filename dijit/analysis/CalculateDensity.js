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
define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/NumberSpinner","dijit/form/NumberTextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../toolbars/draw","../PopupTemplate","../../layers/FeatureLayer","../../graphic","./utils","./CreditEstimator","../../symbols/PictureMarkerSymbol","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","dojo/i18n!../../nls/jsapi","dojo/text!./templates/CalculateDensity.html"],function(t,e,i,s,n,a,o,l,r,h,u,d,c,y,p,_,g,f,m,b,L,v,S,C,A,w,U,N,j,I,D,O,k,P,B,x,T,F,E,R,M,q,z,J,G,H,V,K,W,Y,Q){var X=e([g,f,m,b,L,T,x],{declaredClass:"esri.dijit.analysis.CalculateDensity",templateString:Q,widgetsInTemplate:!0,inputLayer:null,field:null,classificationType:"EqualInterval",numClasses:10,boundingPolygonLayer:null,outputName:null,classBreaks:null,radius:null,radiusUnits:null,arealUnits:null,_NOVALUE_:"NOVALUE",map:null,i18n:null,toolName:"CalculateDensity",helpFileName:"CalculateDensity",resultParameter:"resultLayer",constructor:function(t){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,Y.findHotSpotsTool),i.mixin(this.i18n,Y.interpolatePointsTool),i.mixin(this.i18n,Y.calculateDensityTool),this.set("drawLayerName",this.i18n.blayerName),this.set("drawPointLayerName",this.i18n.pointlayerName)},postCreate:function(){this.inherited(arguments),p.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._classBreaksInput.set("validator",i.hitch(this,this.validateClassBreaks)),this._buildUI()},startup:function(){},_onClose:function(t){t&&this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,function(t,e){return t===this._featureLayer?(this._boundingAreaSelect.removeOption({value:e+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(e,1)):void 0},this)),this._handleBoundingBtnChange(!1),this.emit("close",{save:!t})},clear:function(){this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,function(t,e){return t===this._featureLayer?(this._boundingAreaSelect.removeOption({value:e+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(e,1)):void 0},this)),this._handleBoundingBtnChange(!1)},_handleShowCreditsClick:function(t){t.preventDefault();var e={};this._form.validate()&&(e.inputLayer=o.toJson(J.constructAnalysisInputLyrObj(this.get("inputLayer"))),this.get("field")&&(e.field=this.get("field")),this.get("radius")&&(e.radius=this.radius),this.radius&&this.get("radiusUnits")&&(e.radiusUnits=this.radiusUnits),this.get("areaUnits")&&(e.areaUnits=this.areaUnits),this.get("classificationType")&&(e.classificationType=this.get("classificationType")),"Manual"!==this.classificationType?e.numClasses=this.get("numClasses"):e.classBreaks=this.get("classBreaks"),this.get("boundingPolygonLayer")&&(e.boundingPolygonLayer=o.toJson(J.constructAnalysisInputLyrObj(this.boundingPolygonLayer))),this.returnFeatureCollection||(e.OutputName=o.toJson({serviceProperties:{name:this.get("outputName")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,e).then(i.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()})))},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var t,e={},i={};e.inputLayer=o.toJson(J.constructAnalysisInputLyrObj(this.get("inputLayer"))),this.get("field")&&(e.field=this.get("field")),this.get("radius")&&(e.radius=this.radius),this.radius&&this.get("radiusUnits")&&(e.radiusUnits=this.radiusUnits),this.get("areaUnits")&&(e.areaUnits=this.areaUnits),this.get("classificationType")&&(e.classificationType=this.get("classificationType")),"Manual"!==this.classificationType?e.numClasses=this.get("numClasses"):e.classBreaks=this.get("classBreaks"),this.get("boundingPolygonLayer")&&(e.boundingPolygonLayer=o.toJson(J.constructAnalysisInputLyrObj(this.boundingPolygonLayer))),this.returnFeatureCollection||(e.OutputName=o.toJson({serviceProperties:{name:this.get("outputName")}})),this.showChooseExtent&&!this.get("DisableExtent")&&this._useExtentCheck.get("checked")&&(e.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),e.context=o.toJson(t)),e.returnFeatureCollection=this.returnFeatureCollection,i.jobParams=e,i.itemParams={description:this.i18n.itemDescription,tags:h.substitute(this.i18n.itemTags,{layername:this.inputLayer.name,fieldname:e.field?e.field:""}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(i.itemParams.folder=this.get("folderId")),this.execute(i)}},_handleBrowseItemsSelect:function(t){t&&t.selection&&J.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.inputLayers:this.boundingPolygonLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._boundingAreaSelect,posIncrement:this._isAnalysisSelect?0:1,browseDialog:this._browsedlg,widget:this}).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},_save:function(){},_buildUI:function(){var t=!0;if(this._radiusUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._areaUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm}]),this.signInPromise.then(i.hitch(this,J.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",this.inputLayers[0]),J.populateAnalysisLayers(this,"inputLayer","inputLayers")),this.outputName&&(this._outputLayerInput.set("value",this.outputName),t=!1),this.inputLayer&&this._updateAnalysisLayerUI(t),this.classificationType&&this._classifySelect.set("value",this.classificationType),this.boundingPolygonLayers){this._boundingAreaSelect.addOption({value:"-1",label:this.i18n.defaultBoundingOption,selected:!0});var e=!1;s.forEach(this.boundingPolygonLayers,function(t,i){"esriGeometryPolygon"===t.geometryType&&(e=this.get("boundingPolygonLayer")&&this.get("boundingPolygonLayer").name===t.name,this._boundingAreaSelect.addOption({value:i+1,label:t.name,selected:e}))},this)}J.addReadyToUseLayerOption(this,[this._analysisSelect,this._boundingAreaSelect]),this.classBreaks&&this._classBreaksInput.set("value",this.classBreaks.join().replace(/,/g," ")),this.radius&&this._searchDistanceInput.set("value",this.radius),this.radiusUnits&&this._radiusUnitsSelect.set("value",this.radiusUnits),this.areaUnits&&this._areaUnitsSelect.set("value",this.areaUnits),u.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(t){this.folderStore=t,J.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),u.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this._loadConnections()},_updateAnalysisLayerUI:function(t){this.inputLayer&&(d.set(this._interpolateToolDescription,"innerHTML",h.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),t&&(this.outputName=h.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputName),this.set("fields",this.inputLayer))},_handleAnalysisLayerChange:function(t){"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND (tags:"point" OR tags:"line") '),this._isAnalysisSelect=!0,this._browsedlg.show()):(this.inputLayer=this.inputLayers[t],this._updateAnalysisLayerUI(!0))},_handleMethodChange:function(t){"NN"===t?(p.add(this._optionsDiv,"disabled"),p.contains(this._optionsDiv,"optionsOpen")&&(p.remove(this._optionsDiv,"optionsOpen"),p.add(this._optionsDiv,"optionsClose"))):(p.contains(this._optionsDiv,"disabled")&&p.remove(this._optionsDiv,"disabled"),"KG"===t?(u.set(this._barrierLabelRow,"display","none"),u.set(this._barrierSelectRow,"display","none"),u.set(this._speedLabelRow,"display",""),u.set(this._speedSliderRow,"display","")):"LP"===t&&(u.set(this._barrierLabelRow,"display",""),u.set(this._barrierSelectRow,"display",""),u.set(this._speedLabelRow,"display","none"),u.set(this._speedSliderRow,"display","none")))},_handleOptimizeSliderChange:function(t){console.log(t,this._optimizeSlider.get("value")),this.set("interpolateOption",this._optimizeSlider.get("value"))},_handleFieldChange:function(){},_handleOptionsBtnClick:function(){p.contains(this._optionsDiv,"disabled")||(p.contains(this._optionsDiv,"optionsClose")?(p.remove(this._optionsDiv,"optionsClose"),p.add(this._optionsDiv,"optionsOpen")):p.contains(this._optionsDiv,"optionsOpen")&&(p.remove(this._optionsDiv,"optionsOpen"),p.add(this._optionsDiv,"optionsClose")))},_handleBoundingSelectChange:function(t){"browse"===t&&(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"polygon"'),this._isAnalysisSelect=!1,this._browsedlg.show())},_handleArealUnitsSelectChange:function(){},_handleBoundingBtnChange:function(t){t?(this.emit("drawtool-activate",{}),this._featureLayer||this._createBoundingPolyFeatColl(),this._toolbar.activate(R.POLYGON)):(this._toolbar.deactivate(),this.emit("drawtool-deactivate",{}))},_handleDistValueChange:function(){},_handleDistUnitsChange:function(){},_handleClassifySelectChange:function(t){u.set(this._classifyOtherOptionLabelRow,"display","Manual"===t?"none":"block"),u.set(this._classifyOtherOptionInputRow,"display","Manual"===t?"none":"block"),u.set(this._manualOptionInputRow,"display","Manual"===t?"block":"none"),u.set(this._manualOptionLabelRow,"display","Manual"===t?"block":"none")},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0))},_createBoundingPolyFeatColl:function(){var t=J.createPolygonFeatureCollection(this.drawLayerName);this._featureLayer=new q(t,{id:this.drawLayerName}),this.map.addLayer(this._featureLayer),n.connect(this._featureLayer,"onClick",i.hitch(this,function(t){this.map.infoWindow.setFeatures([t.graphic])}))},_addFeatures:function(t){var e=[],i={},n=new F(F.STYLE_NULL,new E(E.STYLE_SOLID,new a([0,0,0]),4)),o=new z(t,n);if(this.map.graphics.add(o),i.description="blayer desc",i.title="blayer",o.setAttributes(i),e.push(o),this._featureLayer.applyEdits(e,null,null),0===this.boundingPolygonLayers.length||this.boundingPolygonLayers[this.boundingPolygonLayers.length-1]!==this._featureLayer){var l=this.boundingPolygonLayers.push(this._featureLayer),r=this._boundingAreaSelect.getOptions();this._boundingAreaSelect.removeOption(r),r=s.map(r,function(t){return t.selected=!1,t}),r.push({value:l,label:this._featureLayer.name,selected:!0}),this._boundingAreaSelect.addOption(r)}},validateServiceName:function(t){return J.validateServiceName(t,{textInput:this._outputLayerInput})},validateClassBreaks:function(){var t,e,n,a=[],o=[];return t=i.trim(this._classBreaksInput.get("value")).split(" "),"Manual"!==this.get("classificationType")?!0:t||"Manual"!==this.get("classificationType")?t.length<2||t.length>31?!1:(s.some(t,function(s,l){return s=_.parse(s),isNaN(s)?(a.push(0),!1):o[t[l]]?(o[t[l]]=!1,a.push(0),!1):(o[t[l]]=!0,e=_.format(s,{locale:"root"}),B.isDefined(e)?B.isDefined(e)||(e=_.format(s,{locale:"en-us"})):e=_.format(s,{locale:"en"}),B.isDefined(e)&&(n=i.trim(e).match(/\D/g)),n&&n.length>0?(a.push(0),!1):void 0)}),-1!==s.indexOf(a,0)?!1:!0):!1},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(t){this.inputLayer=t},_getInputLayerAttr:function(){return this.inputLayer},_setInputLayersAttr:function(t){this.inputLayers=t},_setFieldsAttr:function(t){var e,i,n=t.fields;this._fieldSelect&&this._fieldSelect.removeOption(this._fieldSelect.getOptions()),this._fieldSelect.addOption({value:this._NOVALUE_,label:this.i18n.chooseCountField}),s.forEach(n,function(n){n.name!==t.objectIdField&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],n.type)&&(e={value:n.name,label:B.isDefined(n.alias)&&""!==n.alias?n.alias:n.name},this.field&&e.value===this.field&&(e.selected="selected",i=n.name),this._fieldSelect.addOption(e))},this),i&&this._fieldSelect.set("value",i)},_setFieldAttr:function(t){this.field=t},_getFieldAttr:function(){return this._fieldSelect&&(this.field=this._fieldSelect.get("value")!==this._NOVALUE_?this._fieldSelect.get("value"):null),this.field},_setRadiusAttr:function(t){this._set("radius",t)},_getRadiusAttr:function(){return this._searchDistanceInput&&this.set("radius",this._searchDistanceInput.get("value")),this.radius},_setRadiusUnitsAttr:function(t){this._set("radiusUnits",t)},_getRadiusUnitsAttr:function(){return this._radiusUnitsSelect&&this.set("radiusUnits",this._radiusUnitsSelect.get("value")),this.radiusUnits},_setAreaUnitsAttr:function(t){this._set("areaUnits",t)},_getAreaUnitsAttr:function(){return this._areaUnitsSelect&&this.set("areaUnits",this._areaUnitsSelect.get("value")),this.areaUnits},_setClassificationTypeAttr:function(t){this.classificationType=t},_getClassificationTypeAttr:function(){return this._classifySelect&&(this.classificationType=this._classifySelect.get("value")),this.classificationType},_getNumClassesAttr:function(){return this._numClassesInput&&(this.numClasses=this._numClassesInput.get("value")),this.numClasses},_setNumClassesAttr:function(t){this.numClasses=t},_getClassBreaksAttr:function(){if(this._classBreaksInput){var t=i.trim(this._classBreaksInput.get("value")).split(" "),e=[];s.forEach(t,function(t){e.push(_.parse(t))}),this.classBreaks=e}return this.classBreaks},_setClassBreaksAttr:function(t){t&&(this.classBreaks=t)},_getBoundingPolygonLayerAttr:function(){return this._boundingAreaSelect&&(this.boundingPolygonLayer=null,"-1"!==this._boundingAreaSelect.get("value")&&(this.boundingPolygonLayer=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1])),this.boundingPolygonLayer},_setBoundingPolygonLayerAttr:function(t){this.boundingPolygonLayer=t},_setBoundingPolygonLayersAttr:function(t){this.boundingPolygonLayers=t},_getOutputNameAttr:function(){return this._outputLayerInput&&(this.outputName=this._outputLayerInput.get("value")),this.outputName},_setOutputNameAttr:function(t){this.outputName=t},_setMapAttr:function(t){this.map=t,this._toolbar=new R(this.map),n.connect(this._toolbar,"onDrawEnd",i.hitch(this,this._addFeatures))},_getMapAttr:function(){return this.map},_setDrawLayerNameAttr:function(t){this.drawLayerName=t},_getDrawLayerNameAttr:function(){return this._featureLayer.name},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},_getDrawLayerAttr:function(){var t=[];return this._featureLayer&&t.push(this._featureLayer),this._pointfeatureLayer&&t.push(this._pointfeatureLayer),t},_setDisableExtentAttr:function(t){this._useExtentCheck.set("checked",!t),this._useExtentCheck.set("disabled",t)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_connect:function(t,e,i){this._pbConnects.push(n.connect(t,e,i))}});return l("extend-esri")&&i.setObject("dijit.analysis.CalculateDensity",X,P),X});