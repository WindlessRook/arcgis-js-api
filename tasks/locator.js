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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/_base/json","dojo/has","../kernel","../request","../deferredUtils","./Task","./AddressCandidate"],function(e,o,t,n,s,r,a,i,c,d,l){var u=e(d,{declaredClass:"esri.tasks.Locator",_eventMap:{"address-to-locations-complete":["addresses"],"addresses-to-locations-complete":["addresses"],"location-to-address-complete":["address"],"suggest-locations-complete":["suggestions"]},constructor:function(){this._geocodeHandler=o.hitch(this,this._geocodeHandler),this._geocodeAddressesHandler=o.hitch(this,this._geocodeAddressesHandler),this._reverseGeocodeHandler=o.hitch(this,this._reverseGeocodeHandler),this.registerConnectEvents()},outSpatialReference:null,setOutSpatialReference:function(e){this.outSpatialReference=e},_geocodeHandler:function(e,o,t,n,s){try{var r,a,i,c=e.candidates,d=[],u=c.length,h=e.spatialReference;for(a=0;u>a;a++)r=c[a],i=r.location,i&&(i.spatialReference=h),d[a]=new l(r);this._successHandler([d],"onAddressToLocationsComplete",t,s)}catch(f){this._errorHandler(f,n,s)}},_geocodeAddressesHandler:function(e,o,t,n,s){try{var r,a,i=e.locations,c=[],d=i.length,u=e.spatialReference;for(r=0;d>r;r++)a=i[r].location,a&&(a.spatialReference=u),c[r]=new l(i[r]);this._successHandler([c],"onAddressesToLocationsComplete",t,s)}catch(h){this._errorHandler(h,n,s)}},addressToLocations:function(e,t,r,a,d){var l,u,h,f,_,g,m;e.address&&(a=r,r=t,t=e.outFields,d=e.searchExtent,m=e.countryCode,l=e.magicKey,u=e.distance,g=e.categories,e.location&&this.normalization&&(h=e.location.normalize()),f=e.maxLocations,_=e.forStorage,e=e.address),d&&(d=d.shiftCentralMeridian());var p=this.outSpatialReference,C=this._encode(o.mixin({},this._url.query,e,{f:"json",outSR:p&&s.toJson(p.toJson()),outFields:t&&t.join(",")||null,searchExtent:d&&s.toJson(d.toJson()),category:g&&g.join(",")||null,countryCode:m||null,magicKey:l||null,distance:u||null,location:h||null,maxLocations:f||null,forStorage:_||null})),H=this._geocodeHandler,v=this._errorHandler,y=new n(c._dfdCanceller);return y._pendingDfd=i({url:this._url.path+"/findAddressCandidates",content:C,callbackParamName:"callback",load:function(e,o){H(e,o,r,a,y)},error:function(e){v(e,a,y)}}),y},suggestLocations:function(e){var t,r;r=new n(c._dfdCanceller),e.hasOwnProperty("location")&&this.normalization&&(e.location=e.location.normalize()),e.searchExtent&&(e.searchExtent=e.searchExtent.shiftCentralMeridian()),t=this._encode(o.mixin({},this._url.query,{f:"json",text:e.text,maxSuggestions:e.maxSuggestions,searchExtent:e.searchExtent&&s.toJson(e.searchExtent.toJson()),category:e.categories&&e.categories.join(",")||null,countryCode:e.countryCode||null,location:e.location||null,distance:e.distance||null},{f:"json"}));var a=i({url:this._url.path+"/suggest",content:t,callbackParamName:"callback"});return r._pendingDfd=a,a.then(o.hitch(this,function(e){var o=e.suggestions||[];this.onSuggestLocationsComplete(o),r.resolve(o)}),o.hitch(this,function(e){this._errorHandler(e),r.reject(e)})),r},addressesToLocations:function(e,r,a){var d=this.outSpatialReference,l=[],u=e.categories,h=e.countryCode,f=e.addresses;t.forEach(f,function(e){l.push({attributes:e})});var _=this._encode(o.mixin({},this._url.query,{category:u&&u.join(",")||null,sourceCountry:h||null},{addresses:s.toJson({records:l})},{f:"json",outSR:d&&s.toJson(d.toJson())})),g=this._geocodeAddressesHandler,m=this._errorHandler,p=new n(c._dfdCanceller);return p._pendingDfd=i({url:this._url.path+"/geocodeAddresses",content:_,callbackParamName:"callback",load:function(e,o){g(e,o,r,a,p)},error:function(e){m(e,a,p)}}),p},_reverseGeocodeHandler:function(e,o,t,n,s){try{var r=new l({address:e.address,location:e.location,score:100});this._successHandler([r],"onLocationToAddressComplete",t,s)}catch(a){this._errorHandler(a,n,s)}},locationToAddress:function(e,t,r,a){e&&this.normalization&&(e=e.normalize());var d=this.outSpatialReference,l=this._encode(o.mixin({},this._url.query,{outSR:d&&s.toJson(d.toJson()),location:e&&s.toJson(e.toJson()),distance:t,f:"json"})),u=this._reverseGeocodeHandler,h=this._errorHandler,f=new n(c._dfdCanceller);return f._pendingDfd=i({url:this._url.path+"/reverseGeocode",content:l,callbackParamName:"callback",load:function(e,o){u(e,o,r,a,f)},error:function(e){h(e,a,f)}}),f},onSuggestLocationsComplete:function(){},onAddressToLocationsComplete:function(){},onAddressesToLocationsComplete:function(){},onLocationToAddressComplete:function(){}});return r("extend-esri")&&o.setObject("tasks.Locator",u,a),u});