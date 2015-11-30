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
define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/fx/easing","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","dojo/i18n!../../nls/jsapi","dojo/text!./templates/SummarizeWithin.html"],function(e,t,i,s,a,r,n,o,h,l,u,m,c,y,d,p,_,g,S,L,v,f,b,M,w,T,C,j,W,A,k,P,x,N,U,F,I,O){var B=t([_,g,S,L,v,N,x],{declaredClass:"esri.dijit.analysis.SummarizeWithin",templateString:O,widgetsInTemplate:!0,sumWithinLayer:null,summaryLayers:null,summaryFields:null,outputLayerName:null,summarizeMetric:!0,summaryLayer:null,groupByField:null,minorityMajority:!1,percentPoints:!1,i18n:null,toolName:"SummarizeWithin",helpFileName:"SummarizeWithin",resultParameter:"resultLayer",constructor:function(e){this._pbConnects=[],this._statsRows=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,I.summarizeWithinTool)},postCreate:function(){this.inherited(arguments),d.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_handleShowCreditsClick:function(e){if(e.preventDefault(),this._form.validate()){var t,s={};t=this.summaryLayers[this._layersSelect.get("value")],s.summaryLayer=r.toJson(F.constructAnalysisInputLyrObj(t)),s.sumWithinLayer=r.toJson(F.constructAnalysisInputLyrObj(this.sumWithinLayer)),s.summaryFields=r.toJson(this.get("summaryFields")),this.returnFeatureCollection||(s.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),s.sumShape=this._sumMetricCheck.get("checked"),("esriGeometryPoint"!==t.geometryType||"esriGeometryMultipoint"!==t.geometryType)&&(s.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(s.groupByField=this._groupBySelect.get("value")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(s.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,s).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))}},_handleSaveBtnClick:function(){if(this._form.validate()){if(!this._sumMetricCheck.get("checked")&&0===this.get("summaryFields").length)return void this._showMessages(this.i18n.statsRequiredMsg);this._saveBtn.set("disabled",!0);var e,t,i={},s={};e=this.summaryLayers[this._layersSelect.get("value")],i.summaryLayer=r.toJson(F.constructAnalysisInputLyrObj(e)),i.sumWithinLayer=r.toJson(F.constructAnalysisInputLyrObj(this.sumWithinLayer)),i.summaryFields=r.toJson(this.get("summaryFields")),this.returnFeatureCollection||(i.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),i.sumShape=this._sumMetricCheck.get("checked"),("esriGeometryPoint"!==e.geometryType||"esriGeometryMultipoint"!==e.geometryType)&&(i.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(i.groupByField=this._groupBySelect.get("value"),this.resultParameter=["resultLayer","groupBySummary"],i.minorityMajority=this.get("minorityMajority"),i.percentShape=this.get("percentPoints")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),i.context=r.toJson(t)),s.jobParams=i,this._saveBtn.set("disabled",!1),s.itemParams={description:l.substitute(this.i18n.itemDescription,{sumWithinLayerName:this.sumWithinLayer.name,summaryLayerName:e.name}),tags:l.substitute(this.i18n.itemTags,{sumWithinLayerName:this.sumWithinLayer.name,summaryLayerName:e.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(s.itemParams.folder=this.get("folderId")),this.execute(s)}},_initializeShapeUnits:function(e){this._prevGeometryType&&this._prevGeometryType===e||(this._shapeUnitsSelect.removeOption(this._shapeUnitsSelect.getOptions()),u.set(this._shapeUnitsSelect.domNode,"display","esriGeometryPoint"===e||"esriGeometryMultipoint"===e?"none":""),"esriGeometryPolygon"===e?(u.set(this._shapeUnitsSelect.domNode,"width","49%"),this._shapeUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm},{value:"SquareMeters",label:this.i18n.sqMeters},{value:"Hectares",label:this.i18n.hectares},{value:"Acres",label:this.i18n.acres}]),"Kilometers"===this.get("shapeUnits")&&this.set("shapeUnits","SquareKilometers")):"esriGeometryPolyline"===e&&(u.set(this._shapeUnitsSelect.domNode,"width","39%"),this._shapeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters},{value:"Yards",label:this.i18n.yards}]),"SquareKilometers"===this.get("shapeUnits")&&this.set("shapeUnits","Kilometers")),this._shapeUnitsSelect.set("value",this.get("shapeUnits")),this._prevGeometryType=e)},_handleShapeUnitsChange:function(e){this.set("shapeUnits",e)},_handleLayerChange:function(e){var t;"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery),this._isAnalysisSelect=!1,this._browsedlg.show()):(t=this.summaryLayers[e],t&&(this.sumWithinLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:t.name,sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this._initializeShapeUnits(t.geometryType),"esriGeometryPolygon"===t.geometryType&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),("esriGeometryPoint"===t.geometryType||"esriGeometryMultipoint"===t.geometryType)&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===t.geometryType&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")),this.set("groupBySelect",this.groupByField),this._removeStatsRows(),this._createStatsRow()))},_handleAttrSelectChange:function(e){var t,s,a;"0"!==e&&(t=this.get("statisticSelect"),"0"!==t.get("value")&&(t.get("isnewRowAdded")||(s=t.get("removeTd"),u.set(s,"display","block"),a=t.get("referenceWidget"),i.hitch(a,a._createStatsRow()),a._sumMetricCheck.set("disabled",!1),t.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(e,t,s){var a,r,n;this.get("attributeSelect")&&(a=this.get("attributeSelect"),"0"!==a.get("value")&&"0"!==s&&(this.get("isnewRowAdded")||(r=this.get("removeTd"),u.set(r,"display","block"),n=this.get("referenceWidget"),i.hitch(n,n._createStatsRow()),n._sumMetricCheck.set("disabled",!1),this.set("isnewRowAdded",!0))))},_handleGroupBySelectChange:function(e){var t="0"===e;d.toggle(this._minmajorityLabel,"esriAnalysisTextDisabled",t),d.toggle(this._percentPointsLabel,"esriAnalysisTextDisabled",t),this._percentPointsCheck.set("disabled",t),this._minmajorityCheck.set("disabled",t)},_save:function(){},_buildUI:function(){var e=!0;if(F.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(!this.get("sumWithinLayer")&&this.get("sumWithinLayers")&&this.set("sumWithinLayer",this.sumWithinLayers[0]),F.populateAnalysisLayers(this,"sumWithinLayer","sumWithinLayers")),this.sumWithinLayer&&m.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.summarizeDefine,{sumWithinLayerName:this.sumWithinLayer.name})),this.summaryLayers){var t,a=[];s.forEach(this.summaryLayers,function(e,t){e!==this.sumWithinLayer&&a.push({value:t,label:e.name})},this),this._layersSelect.addOption(a),t=this.summaryLayers[this._layersSelect.get("value")],t&&(!this.outputLayerName&&this.sumWithinLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:t.name,sumWithinLayerName:this.sumWithinLayer.name})),m.set(this._addStatsLabel,"innerHTML",l.substitute(this.i18n.addStats,{summaryLayerName:t.name})),this._initializeShapeUnits(t.geometryType),"esriGeometryPolygon"===t.geometryType&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),("esriGeometryPoint"===t.geometryType||"esriGeometryMultipoint"===t.geometryType)&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===t.geometryType&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")))}F.addReadyToUseLayerOption(this,[this._analysisSelect,this._layersSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this._sumMetricCheck.set("checked",this.summarizeMetric),this.summarizeMetric||this._sumMetricCheck.set("disabled",this.summarizeMetric),this.summaryLayer&&this._layersSelect.set(),this.shapeUnits&&this._shapeUnitsSelect.set("value",this.shapeUnits),this._createStatsRow(),s.forEach(this.summaryFields,function(e){var t=e.split(" ");this._currentAttrSelect.set("value",t[0]),i.hitch(this._currentAttrSelect,this._handleAttrSelectChange,t[0])(),this._currentStatsSelect.set("value",t[1]),i.hitch(this._currentStatsSelect,this._handleStatsValueUpdat,"value","",t[1])()},this),u.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,F.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.set("groupBySelect",this.groupByField),this.minorityMajority&&this._minmajorityCheck.set("checked",this.minorityMajority),this.percentPoints&&this._percentPointsCheck.set("checked",this.percentPoints),u.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this._loadConnections(),this._updateAnalysisLayerUI(e)},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!1))},_createStatsRow:function(){var t,s,r,n,o,h,l,u;return u=this.summaryLayers[this._layersSelect.get("value")],t=c.create("tr",null,this._afterStatsRow,"before"),r=c.create("td",{style:{width:"49%",maxWidth:"100px"}},t),s=c.create("td",{style:{width:"50%",maxWidth:"104px"}},t),n=new T({maxHeight:200,"class":"esriLeadingMargin1 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},c.create("select",null,r)),this.set("attributes",{selectWidget:n,summaryLayer:u}),o=new T({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},c.create("select",null,s)),this.set("statistics",{selectWidget:o}),n.set("statisticSelect",o),a.connect(n,"onChange",this._handleAttrSelectChange),l=c.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},t),h=c.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+e.toUrl("./images/close.gif")+"' border='0''/>"},l),a.connect(h,"onclick",i.hitch(this,this._handleRemoveStatsBtnClick,t)),this._statsRows.push(t),o.set("attributeSelect",n),o.set("removeTd",l),o.set("isnewRowAdded",!1),o.set("referenceWidget",this),o.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=o,this._currentAttrSelect=n,!0},_handleRemoveStatsBtnClick:function(e){this._removeStatsRow(e),0===this.get("summaryFields").length&&(this._sumMetricCheck.set("disabled",!0),this._sumMetricCheck.set("checked",!0))},_removeStatsRows:function(){s.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_removeStatsRow:function(e){s.forEach(f.findWidgets(e),function(e){e.destroyRecursive()}),c.destroy(e)},_handleAnalysisLayerChange:function(e){"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"polygon"'),this._isAnalysisSelect=!0,this._browsedlg.show()):(this.sumWithinLayer=this.sumWithinLayers[e],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(e){var t,i=this.summaryLayers[this._layersSelect.get("value")],a=this._layersSelect.get("value");e&&this.get("sumWithinLayer")&&i&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:i.name,sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.summaryLayers&&this.sumWithinLayer&&(t=s.some(this._layersSelect.getOptions(),function(e){return"browse"===e.value},this),this._layersSelect.removeOption(this._layersSelect.getOptions()),s.forEach(this.summaryLayers,function(e,t){var i=!0;e.url&&this.sumWithinLayer.url&&e.url!==this.sumWithinLayer.url?i=!1:this.sumWithinLayer===e||e.analysisReady&&this.sumWithinLayer.analysisReady||(i=!1),i||(this._layersSelect.addOption({value:t,label:e.name}),a===t&&this._layersSelect.set("value",t))},this),this.get("showReadyToUseLayers")&&t&&(this._layersSelect.addOption({type:"separator",value:""}),this._layersSelect.addOption({value:"browse",label:this.i18n.browseAnalysisTitle})))},_handleBrowseItemsSelect:function(e){e&&e.selection&&F.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.sumWithinLayers:this.summaryLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:this._browsedlg,widget:this}).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setSumWithinLayersAttr:function(e){P.isDefined(e)&&(e=s.filter(e,function(e){return"esriGeometryPolygon"===e.geometryType}),this.sumWithinLayers=e)},_setSumWithinLayerAttr:function(e){P.isDefined(e)&&"esriGeometryPolygon"===e.geometryType&&(this.sumWithinLayer=e)},_setSummaryLayersAttr:function(e){this.summaryLayers=e},_setLayersAttr:function(){this.summaryLayers=[]},_setAttributesAttr:function(e){if(e.summaryLayer){var t,i,a;t=e.summaryLayer,i=e.selectWidget,a=t.fields,i.addOption({value:"0",label:this.i18n.attribute}),s.forEach(a,function(e){-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)&&i.addOption({value:e.name,label:P.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this)}},_setStatisticsAttr:function(e){var t=e.selectWidget;t.addOption({value:"0",label:this.i18n.statistic}),t.addOption({value:"SUM",label:this.i18n.sum}),t.addOption({value:"MIN",label:this.i18n.minimum}),t.addOption({value:"MAX",label:this.i18n.maximum}),t.addOption({value:"MEAN",label:this.i18n.average}),t.addOption({value:"STDDEV",label:this.i18n.standardDev})},_setSummaryFieldsAttr:function(e){this.summaryFields=e},_getSummaryFieldsAttr:function(){var e="",t=[];return y(".statsSelect",this.domNode).forEach(function(i){var s,a;s=f.byNode(i),a=s.get("attributeSelect"),"0"!==a.get("value")&&"0"!==s.get("value")&&(e+=a.get("value")+" "+s.get("value")+";",t.push(a.get("value")+" "+s.get("value")))}),t},_setGroupBySelectAttr:function(e){var t=this.summaryLayers[this._layersSelect.get("value")],i=P.isDefined(t)?t.fields:[];this._groupBySelect.getOptions().length>0&&this._groupBySelect.removeOption(this._groupBySelect.getOptions()),this._groupBySelect.addOption({value:"0",label:this.i18n.attribute}),s.forEach(i,function(e){-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeString","esriFieldTypeDate"],e.type)&&e.name!==t.objectIdField&&this._groupBySelect.addOption({value:e.name,label:P.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this),e&&this._groupBySelect.set("value",e),this._handleGroupBySelectChange(this._groupBySelect.get("value"))},_setMinorityMajorityAttr:function(e){this.minorityMajority=e},_getMinorityMajorityAttr:function(){return this._minmajorityCheck&&(this.minorityMajority=this._minmajorityCheck.get("checked")),this.minorityMajority},_setPercentPointsAttr:function(e){this.percentPoints=e},_getPercentPointsAttr:function(){return this._percentPointsCheck&&(this.percentPoints=this._percentPointsCheck.get("checked")),this.percentPoints},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setShapeUnitsAttr:function(e){this.shapeUnits=e},_getShapeUnitsAttr:function(){return this.shapeUnits},validateServiceName:function(e){return F.validateServiceName(e,{textInput:this._outputLayerInput})},_connect:function(e,t,i){this._pbConnects.push(a.connect(e,t,i))},_showMessages:function(e){m.set(this._bodyNode,"innerHTML",e),n.fadeIn({node:this._errorMessagePane,easing:p.quadIn,onEnd:i.hitch(this,function(){u.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),n.fadeOut({node:this._errorMessagePane,easing:p.quadOut,onEnd:i.hitch(this,function(){u.set(this._errorMessagePane,{display:"none"})})}).play()}});return o("extend-esri")&&i.setObject("dijit.analysis.SummarizeWithin",B,k),B});