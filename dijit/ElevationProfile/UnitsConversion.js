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
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","../../lang","../../units"],function(e,r,s,i,t,a){var E=r([e],{declaredClass:"UnitsConversion",UNIT_TYPE:{UNKNOWN:-1,UNSUPPORTED:0,LENGTH:1,AREA:2},UNIT_LABEL:{esriMillimeters:"Millimeters",esriCentimeters:"Centimeters",esriDecimeters:"Decimeters",esriMeters:"Meters",esriKilometers:"Kilometers",esriInches:"Inches",esriFeet:"Feet",esriYards:"Yards",esriMiles:"Miles",esriNauticalMiles:"Nautical Miles",esriAcres:"Acres",esriAres:"Ares",esriHectares:"Hectares",esriSquareInches:"Square Inches",esriSquareFeet:"Square Feet",esriSquareYards:"Square Yards",esriSquareMiles:"Square Miles",esriSquareNauticalMiles:"Square Nautical Miles",esriSquareMillimeters:"Square Millimeters",esriSquareCentimeters:"Square Centimeters",esriSquareDecimeters:"Square Decimeters",esriSquareMeters:"Square Meters",esriSquareKilometers:"Square Kilometers"},UNIT_ABBR_LABEL:{esriMillimeters:"mm",esriCentimeters:"cm",esriDecimeters:"dm",esriMeters:"m",esriKilometers:"km",esriInches:"in",esriFeet:"ft",esriYards:"yd",esriMiles:"mi",esriNauticalMiles:"nmi",esriAcres:"ac",esriHectares:"ha",esriSquareInches:"in²",esriSquareFeet:"ft²",esriSquareYards:"yd²",esriSquareMiles:"mi²",esriSquareNauticalMiles:"nmi²",esriSquareMillimeters:"mm²",esriSquareCentimeters:"cm²",esriSquareDecimeters:"dm²",esriSquareMeters:"m²",esriSquareKilometers:"km²"},constructor:function(e){r.safeMixin(this,e),this.runTests&&this._runTests()},convert:function(e,r,s){return e instanceof Array?this._convertMultipleFromValues(e,r,s):s instanceof Array?this._convertMultipleToUnits(e,r,s):this._convertSingle(e,r,s)},_convertMultipleFromValues:function(e,r,s){return i.forEach(e,function(e){return this._convertSingle(e,r,s)},this)},_convertMultipleToUnits:function(e,r,s){return i.forEach(s,function(s){return this._convertSingle(e,r,s)},this)},_convertSingle:function(e,r,s){var i=!0;(!t.isDefined(e)||isNaN(e))&&(this._emitError("The 'From' Value must be a valid numeric value: "+e),i=!1),t.isDefined(r)||(this._emitError("The 'From' Units must be defined: "+r),i=!1),t.isDefined(s)||(this._emitError("The 'To' Units must be defined: "+s),i=!1),e instanceof Array&&(this._emitError("Only single 'From' Value supported: "+e),i=!1),r instanceof Array&&(this._emitError("Only single 'From' Units supported: "+r),i=!1),s instanceof Array&&(this._emitError("Only single 'To' Units supported: "+s),i=!1);var a=this._getType(r),E=this._getType(s);return a===this.UNIT_TYPE.UNSUPPORTED&&(this._emitError("Unsupported 'From' Units: "+r),i=!1),E===this.UNIT_TYPE.UNSUPPORTED&&(this._emitError("Unsupported 'To' Units: "+s),i=!1),a!==E&&(this._emitError("Incompatible 'From' and 'To' Units: "+r+" and "+s),i=!1),i?r===s?+e:+e/this._perMeter(r)*this._perMeter(s):Number.NaN},_getType:function(e){var r=null;switch(e){case a.ACRES:r=this.UNIT_TYPE.AREA;break;case a.ARES:r=this.UNIT_TYPE.AREA;break;case a.CENTIMETERS:r=this.UNIT_TYPE.LENGTH;break;case a.DECIMETERS:r=this.UNIT_TYPE.LENGTH;break;case a.FEET:r=this.UNIT_TYPE.LENGTH;break;case a.HECTARES:r=this.UNIT_TYPE.AREA;break;case a.INCHES:r=this.UNIT_TYPE.LENGTH;break;case a.KILOMETERS:r=this.UNIT_TYPE.LENGTH;break;case a.METERS:r=this.UNIT_TYPE.LENGTH;break;case a.MILES:r=this.UNIT_TYPE.LENGTH;break;case a.MILLIMETERS:r=this.UNIT_TYPE.LENGTH;break;case a.NAUTICAL_MILES:r=this.UNIT_TYPE.LENGTH;break;case a.SQUARE_CENTIMETERS:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_DECIMETERS:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_FEET:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_INCHES:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_KILOMETERS:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_METERS:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_MILES:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_MILLIMETERS:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_NAUTICAL_MILES:r=this.UNIT_TYPE.AREA;break;case a.SQUARE_YARDS:r=this.UNIT_TYPE.AREA;break;case a.YARDS:r=this.UNIT_TYPE.LENGTH;break;default:r=this.UNIT_TYPE.UNSUPPORTED}return r},_perMeter:function(e){var r=1;switch(e){case a.MILLIMETERS:r=1e3;break;case a.CENTIMETERS:r=100;break;case a.DECIMETERS:r=10;break;case a.METERS:r=1;break;case a.KILOMETERS:r=.001;break;case a.INCHES:r=39.370079;break;case a.FEET:r=3.2808399;break;case a.YARDS:r=1.0936133;break;case a.MILES:r=.00062137119;break;case a.NAUTICAL_MILES:r=.0005399568;break;case a.ACRES:r=.00024710538;break;case a.ARES:r=.01;break;case a.HECTARES:r=1e-4;break;case a.SQUARE_INCHES:r=1550.0031;break;case a.SQUARE_FEET:r=10.7639104;break;case a.SQUARE_YARDS:r=1.19599005;break;case a.SQUARE_MILES:r=3.86102159e-7;break;case a.SQUARE_NAUTICAL_MILES:r=2.9155335e-7;break;case a.SQUARE_MILLIMETERS:r=1e6;break;case a.SQUARE_CENTIMETERS:r=1e4;break;case a.SQUARE_DECIMETERS:r=100;break;case a.SQUARE_METERS:r=1;break;case a.SQUARE_KILOMETERS:r=1e-6}return r},getAbbrLabel:function(e){return this.UNIT_ABBR_LABEL[e]||"Unknown"},getFullLabel:function(e){return this.UNIT_LABEL[e]||"Unknown"},_emitError:function(e){this.emit("error",new Error(e))}});return E.version="0.1.0",E});