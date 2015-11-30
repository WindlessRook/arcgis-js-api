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
define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dijit/InlineEditBox","../../kernel","../../lang","./AnalysisBase","./utils","./CreditEstimator","./_AnalysisOptions","dojo/i18n!../../nls/jsapi","dojo/text!./templates/AggregatePoints.html"],function(t,e,i,s,n,o,a,r,l,h,c,y,u,d,p,g,m,_,f,S,L,v,b,w,A,j,C,P,x,k,I,F,B,T,N,D,M,O){var R=e([p,g,m,_,f,D,B],{declaredClass:"esri.dijit.analysis.AggregatePoints",templateString:O,widgetsInTemplate:!0,pointLayer:null,polygonLayers:null,summaryFields:null,outputLayerName:null,keepBoundariesWithNoPoints:!0,polygonLayer:null,groupByField:null,minorityMajority:!1,percentPoints:!1,i18n:null,toolName:"AggregatePoints",helpFileName:"AggregatePoints",resultParameter:"AggregatedLayer",_afterAnalysisStr:"",_beforeAnalysisStr:"",constructor:function(t){this._pbConnects=[],this._statsRows=[],t.containerNode&&(this.container=t.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,M.aggregatePointsTool),this._beforeAnalysisStr=this.i18n.aggregateDefine.substring(0,this.i18n.aggregateDefine.indexOf("<b>${layername}</b>")),this._afterAnalysisStr=this.i18n.aggregateDefine.substring(this.i18n.aggregateDefine.indexOf("<b>${layername}</b>")+"<b>${layername}</b>".length)},postCreate:function(){this.inherited(arguments),d.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(t){t&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:t})},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var t,e,i={},s={};t=this.polygonLayers[this._layersSelect.get("value")],i.PolygonLayer=o.toJson(T.constructAnalysisInputLyrObj(t)),i.PointLayer=o.toJson(T.constructAnalysisInputLyrObj(this.pointLayer)),i.SummaryFields=o.toJson(this.get("summaryFields")),this.returnFeatureCollection||(i.OutputName=o.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),i.KeepBoundariesWithNoPoints=this._keepPolygonsCheck.get("checked"),"0"!==this._groupBySelect.get("value")&&(i.GroupByField=this._groupBySelect.get("value"),this.resultParameter=["aggregatedLayer","groupSummary"],i.minorityMajority=this.get("minorityMajority"),i.percentPoints=this.get("percentPoints")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),i.context=o.toJson(e)),s.jobParams=i,s.itemParams={description:l.substitute(this.i18n.itemDescription,{pointlayername:this.pointLayer.name,polygonlayername:t.name}),tags:l.substitute(this.i18n.itemTags,{pointlayername:this.pointLayer.name,polygonlayername:t.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(s.itemParams.folder=this.get("folderId")),this.execute(s)}},_handleLayerChange:function(t){"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"polygon"'),this._isAnalysisSelect=!1,this._browsedlg.show()):this.polygonLayers[t]&&this.pointLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{pointlayername:this.pointLayer.name,polygonlayername:this.polygonLayers[t].name}),this._outputLayerInput.set("value",this.outputLayerName))},_handleBrowseItemsSelect:function(t){t&&t.selection&&T.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.pointLayers:this.polygonLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:this._browsedlg,widget:this}).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},_handleAttrSelectChange:function(t){var e,s,n;"0"!==t&&(e=this.get("statisticSelect"),"0"!==e.get("value")&&(e.get("isnewRowAdded")||(s=e.get("removeTd"),h.set(s,"display","block"),n=e.get("referenceWidget"),i.hitch(n,n._createStatsRow()),e.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(t,e,s){var n,o,a;this.get("attributeSelect")&&(n=this.get("attributeSelect"),"0"!==n.get("value")&&"0"!==s&&(this.get("isnewRowAdded")||(o=this.get("removeTd"),h.set(o,"display","block"),a=this.get("referenceWidget"),i.hitch(a,a._createStatsRow()),this.set("isnewRowAdded",!0))))},_handleShowCreditsClick:function(t){t.preventDefault();var e,s={};this._form.validate()&&(e=this.polygonLayers[this._layersSelect.get("value")],s.PolygonLayer=o.toJson(T.constructAnalysisInputLyrObj(e)),s.PointLayer=o.toJson(T.constructAnalysisInputLyrObj(this.pointLayer)),s.SummaryFields=o.toJson(this.get("summaryFields")),this.returnFeatureCollection||(s.OutputName=o.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),s.KeepBoundariesWithNoPoints=this._keepPolygonsCheck.get("checked"),"0"!==this._groupBySelect.get("value")&&(s.GroupByField=this._groupBySelect.get("value")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(s.Context=o.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,s).then(i.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()})))},_save:function(){},_buildUI:function(){var t=!0;T.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(!this.get("pointLayer")&&this.get("pointLayers")&&this.set("pointLayer",this.pointLayers[0]),T.populateAnalysisLayers(this,"pointLayer","pointLayers")),this.pointLayer&&c.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.aggregateDefine,{layername:this.pointLayer.name})),this.polygonLayers&&s.forEach(this.polygonLayers,function(t,e){"esriGeometryPolygon"===t.geometryType&&this._layersSelect.addOption({value:e,label:t.name})},this),T.addReadyToUseLayerOption(this,[this._analysisSelect,this._layersSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this._keepPolygonsCheck.set("checked",this.keepBoundariesWithNoPoints),this.polygonLayer&&this._layersSelect.set("value",this.polygonLayer),s.forEach(this.summaryFields,function(t){var e=t.split(" ");this._currentAttrSelect.set("value",e[0]),i.hitch(this._currentAttrSelect,this._handleAttrSelectChange,e[0])(),this._currentStatsSelect.set("value",e[1]),i.hitch(this._currentStatsSelect,this._handleStatsValueUpdat,"value","",e[1])()},this),h.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(t){this.folderStore=t,T.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),h.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.set("groupBySelect",this.groupByField),h.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.minorityMajority&&this._minmajorityCheck.set("checked",this.minorityMajority),this.percentPoints&&this._percentPointsCheck.set("checked",this.percentPoints),h.set(this._closeBtn,"display",this.get("showCloseIcon")?"block":"none"),this._updateAnalysisLayerUI(t),this._loadConnections()},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!1))},_createStatsRow:function(){var e,s,o,a,r,l,h;return e=y.create("tr",null,this._afterStatsRow,"before"),o=y.create("td",{style:{width:"45%",maxWidth:"100px"}},e),s=y.create("td",{style:{width:"55%",maxWidth:"104px"}},e),a=new w({maxHeight:200,"class":"esriLeadingMargin1 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},y.create("select",null,o)),this.set("attributes",{selectWidget:a,pointLayer:this.pointLayer}),r=new w({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},y.create("select",null,s)),this.set("statistics",{selectWidget:r}),a.set("statisticSelect",r),n.connect(a,"onChange",this._handleAttrSelectChange),h=y.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},e),l=y.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+t.toUrl("./images/close.gif")+"' border='0''/>"},h),n.connect(l,"onclick",i.hitch(this,this._removeStatsRow,e)),this._statsRows.push(e),r.set("attributeSelect",a),r.set("removeTd",h),r.set("isnewRowAdded",!1),r.set("referenceWidget",this),r.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=r,this._currentAttrSelect=a,!0},_removeStatsRow:function(t){s.forEach(S.findWidgets(t),function(t){t.destroyRecursive()}),y.destroy(t)},_removeStatsRows:function(){s.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_handleGroupBySelectChange:function(t){var e="0"===t;d.toggle(this._minmajorityLabel,"esriAnalysisTextDisabled",e),d.toggle(this._percentPointsLabel,"esriAnalysisTextDisabled",e),this._percentPointsCheck.set("disabled",e),this._minmajorityCheck.set("disabled",e)},_handleAnalysisLayerChange:function(t){"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"'),this._isAnalysisSelect=!0,this._browsedlg.show()):(this.pointLayer=this.pointLayers[t],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(t){if(this.pointLayer){c.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.aggregateDefine,{layername:this.pointLayer.name}));var e=this.polygonLayers[this._layersSelect.get("value")];t&&e&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{pointlayername:this.pointLayer.name,polygonlayername:e.name}),this._outputLayerInput.set("value",this.outputLayerName)),this._removeStatsRows(),this._createStatsRow(),this.set("groupBySelect",this.groupByField)}},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setPointLayerAttr:function(t){!F.isDefined(t)||"esriGeometryPoint"!==t.geometryType&&"esriGeometryMultipoint"!==t.geometryType||(this.pointLayer=t)},_setPolygonLayersAttr:function(t){this.polygonLayers=t},_setLayersAttr:function(t){this.polygonLayers=[],s.forEach(t,function(t){"esriGeometryPolygon"===t.geometryType?this.polygonLayers.push(t):"esriGeometryPoint"===t.geometryType&&(this.pointLayer=t)},this)},_setAttributesAttr:function(t){if(t.pointLayer){var e,i,n;e=t.pointLayer,i=t.selectWidget,n=e.fields,i.addOption({value:"0",label:this.i18n.attribute}),s.forEach(n,function(t){-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],t.type)&&t.name!==e.objectIdField&&i.addOption({value:t.name,label:F.isDefined(t.alias)&&""!==t.alias?t.alias:t.name})},this)}},_setStatisticsAttr:function(t){var e=t.selectWidget;e.addOption({value:"0",label:this.i18n.statistic}),e.addOption({value:"SUM",label:this.i18n.sum}),e.addOption({value:"MIN",label:this.i18n.minimum}),e.addOption({value:"MAX",label:this.i18n.maximum}),e.addOption({value:"MEAN",label:this.i18n.average}),e.addOption({value:"STDDEV",label:this.i18n.standardDev})},_setSummaryFieldsAttr:function(t){this.summaryFields=t},_getSummaryFieldsAttr:function(){var t,e,i="",s=[];return u(".statsSelect",this.domNode).forEach(function(n){t=S.byNode(n),e=t.get("attributeSelect"),"0"!==e.get("value")&&"0"!==t.get("value")&&(i+=e.get("value")+" "+t.get("value")+";",s.push(e.get("value")+" "+t.get("value")))}),s},_setGroupBySelectAttr:function(t){if(this.pointLayer){var e=this.pointLayer.fields;this._groupBySelect.removeOption(this._groupBySelect.getOptions()),this._groupBySelect.addOption({value:"0",label:this.i18n.attribute}),s.forEach(e,function(t){-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeString","esriFieldTypeDate"],t.type)&&t.name!==this.pointLayer.objectIdField&&this._groupBySelect.addOption({value:t.name,label:F.isDefined(t.alias)&&""!==t.alias?t.alias:t.name})},this),t&&this._groupBySelect.set("value",t),this._handleGroupBySelectChange(this._groupBySelect.get("value"))}},_setMinorityMajorityAttr:function(t){this.minorityMajority=t},_getMinorityMajorityAttr:function(){return this._minmajorityCheck&&(this.minorityMajority=this._minmajorityCheck.get("checked")),this.minorityMajority},_setPercentPointsAttr:function(t){this.percentPoints=t},_getPercentPointsAttr:function(){return this._percentPointsCheck&&(this.percentPoints=this._percentPointsCheck.get("checked")),this.percentPoints},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},validateServiceName:function(t){return T.validateServiceName(t,{textInput:this._outputLayerInput})},_setPointLayersAttr:function(t){F.isDefined(t)&&(t=s.filter(t,function(t){return"esriGeometryPoint"===t.geometryType||"esriGeometryMultipoint"===t.geometryType}),this.pointLayers=t)},_connect:function(t,e,i){this._pbConnects.push(n.connect(t,e,i))}});return a("extend-esri")&&i.setObject("dijit.analysis.AggregatePoints",R,I),R});