(function (console) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
};
var org_tamina_html_component_HTMLApplication = function() {
};
$hxClasses["org.tamina.html.component.HTMLApplication"] = org_tamina_html_component_HTMLApplication;
org_tamina_html_component_HTMLApplication.__name__ = true;
org_tamina_html_component_HTMLApplication.get_componentsXTagList = function() {
	if(org_tamina_html_component_HTMLApplication.componentsXTagList == null) org_tamina_html_component_HTMLApplication.componentsXTagList = new haxe_ds_StringMap();
	return org_tamina_html_component_HTMLApplication.componentsXTagList;
};
org_tamina_html_component_HTMLApplication.prototype = {
	loadComponents: function() {
		var customElements = window.customElements;
		var $it0 = (function($this) {
			var $r;
			var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
			$r = this1.keys();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var tag = $it0.next();
			var componentClass = Type.resolveClass((function($this) {
				var $r;
				var this2 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
				$r = this2.get(tag);
				return $r;
			}(this)));
			customElements.define(tag,componentClass);
		}
		var unknownCustomElements = window.document.querySelectorAll(":not(:defined)");
		var _g = 0;
		while(_g < unknownCustomElements.length) {
			var el = unknownCustomElements[_g];
			++_g;
			window.console.warn("Custom element not defined: " + el.nodeName);
		}
	}
};
var org_tamina_html_component_HTMLComponent = function() {
	this.initDefaultValues();
	this.created = true;
};
$hxClasses["org.tamina.html.component.HTMLComponent"] = org_tamina_html_component_HTMLComponent;
org_tamina_html_component_HTMLComponent.__name__ = true;
org_tamina_html_component_HTMLComponent.__super__ = HTMLHtmlElement;
org_tamina_html_component_HTMLComponent.prototype = $extend(HTMLHtmlElement.prototype,{
	attributeChangedCallback: function(attrName,oldVal,newVal) {
	}
	,initDefaultValues: function() {
		this._visible = true;
		this._useExternalContent = false;
		this._defaultDisplayStyle = "";
	}
});
var svgicons_html_SVGApp = function() {
	org_tamina_html_component_HTMLApplication.call(this);
};
$hxClasses["svgicons.html.SVGApp"] = svgicons_html_SVGApp;
svgicons_html_SVGApp.__name__ = true;
svgicons_html_SVGApp.main = function() {
	var app = new svgicons_html_SVGApp();
	app.loadComponents();
};
svgicons_html_SVGApp.__super__ = org_tamina_html_component_HTMLApplication;
svgicons_html_SVGApp.prototype = $extend(org_tamina_html_component_HTMLApplication.prototype,{
});
var svgicons_html_SVGIcon = function() {
	org_tamina_html_component_HTMLComponent.call(this);
	this._alt = "";
	this._iconNotFound = false;
};
$hxClasses["svgicons.html.SVGIcon"] = svgicons_html_SVGIcon;
svgicons_html_SVGIcon.__name__ = true;
svgicons_html_SVGIcon.getObservedAttributes = function() {
	return ["alt","icon"];
};
svgicons_html_SVGIcon.__super__ = org_tamina_html_component_HTMLComponent;
svgicons_html_SVGIcon.prototype = $extend(org_tamina_html_component_HTMLComponent.prototype,{
	attributeChangedCallback: function(attrName,oldVal,newVal) {
		org_tamina_html_component_HTMLComponent.prototype.attributeChangedCallback.call(this,attrName,oldVal,newVal);
		switch(attrName) {
		case "alt":
			this._alt = newVal;
			this.updateAlt();
			break;
		case "icon":
			this.loadIcon(newVal);
			break;
		}
	}
	,loadIcon: function(iconName,isAlt) {
		if(isAlt == null) isAlt = false;
		if(svgicons_html_SVGIcon.icons.exists(iconName)) {
			this.innerHTML = svgicons_html_SVGIcon.icons.get(iconName);
			this._iconNotFound = false;
			var svg = this.querySelector("svg");
			if(svg != null) {
				svg.setAttribute("width","100%");
				svg.setAttribute("height","100%");
			}
		} else {
			this._iconNotFound = true;
			if(svgicons_html_SVGIcon.hasDefaultIcon) this.loadIcon("default",true); else this.updateAlt();
		}
	}
	,updateAlt: function() {
		if(this._iconNotFound) this.innerHTML = "<span class=\"alt\">" + this._alt + "</span>";
	}
});
$hxClasses.Math = Math;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
var __map_reserved = {}
svgicons_html_SVGIcon.__meta__ = { obj : { view : ["null","svg-icon"]}};
svgicons_html_SVGIcon.__registered = (function($this) {
	var $r;
	{
		var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		var key = "svg-icon".toLowerCase();
		this1.set(key,"svgicons.html.SVGIcon");
	}
	$r = true;
	return $r;
}(this));
svgicons_html_SVGIcon.hasDefaultIcon = true;
svgicons_html_SVGIcon.icons = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved["social-fb"] != null) _g.setReserved("social-fb","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 52 96\"><defs/><path d=\"M50.041.019l-12.473-.02c-14.011 0-23.065 9.273-23.065 23.626v10.893H1.962a1.96 1.96 0 0 0-1.961 1.959V52.26a1.96 1.96 0 0 0 1.961 1.958h12.54v39.826c0 1.081.877 1.957 1.961 1.957h16.361a1.96 1.96 0 0 0 1.961-1.957V54.218h14.662a1.958 1.958 0 0 0 1.961-1.958l.006-15.783a1.958 1.958 0 0 0-1.962-1.959H34.786v-9.234c0-4.438 1.059-6.692 6.851-6.692l8.402-.003c1.083 0 1.96-.877 1.96-1.957V1.976A1.96 1.96 0 0 0 50.041.019z\" class=\"cls-1\"/></svg>"); else _g.h["social-fb"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 52 96\"><defs/><path d=\"M50.041.019l-12.473-.02c-14.011 0-23.065 9.273-23.065 23.626v10.893H1.962a1.96 1.96 0 0 0-1.961 1.959V52.26a1.96 1.96 0 0 0 1.961 1.958h12.54v39.826c0 1.081.877 1.957 1.961 1.957h16.361a1.96 1.96 0 0 0 1.961-1.957V54.218h14.662a1.958 1.958 0 0 0 1.961-1.958l.006-15.783a1.958 1.958 0 0 0-1.962-1.959H34.786v-9.234c0-4.438 1.059-6.692 6.851-6.692l8.402-.003c1.083 0 1.96-.877 1.96-1.957V1.976A1.96 1.96 0 0 0 50.041.019z\" class=\"cls-1\"/></svg>";
	if(__map_reserved.bin != null) _g.setReserved("bin","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 612 774\"><defs/><path d=\"M566.634 230.241v491.432c0 29.657-23.116 52.327-52.783 52.327H98.149c-29.667 0-52.346-22.67-52.346-52.327V230.241H0v-86.338c0-29.657 23.116-52.765 52.783-52.765h103.816V23.982C156.599 10.465 167.068 0 180.589 0H427.046c.437 0 1.312.437 1.749.874.429-.437 1.303-.874 2.615-.874 13.522 0 24.428 10.465 24.428 23.982v67.156h103.379c29.658 0 52.783 23.108 52.783 52.765v86.338h-45.366zM93.784 721.673c0 3.06 1.313 4.363 4.365 4.363h415.702c3.052 0 4.364-1.303 4.364-4.363V230.241H93.784v491.432zM407.42 47.964H204.58v43.174h202.84V47.964zm156.162 95.939c0-3.052-1.313-4.801-4.365-4.801H52.783c-3.053 0-4.365 1.749-4.365 4.801v38.373h515.164v-38.373zM393.898 286.494h48.419v396.805h-48.419V286.494zm-111.67 0h48.418v396.805h-48.418V286.494zm-111.67 0h48.418v396.805h-48.418V286.494z\" class=\"cls-1\"/></svg>"); else _g.h["bin"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 612 774\"><defs/><path d=\"M566.634 230.241v491.432c0 29.657-23.116 52.327-52.783 52.327H98.149c-29.667 0-52.346-22.67-52.346-52.327V230.241H0v-86.338c0-29.657 23.116-52.765 52.783-52.765h103.816V23.982C156.599 10.465 167.068 0 180.589 0H427.046c.437 0 1.312.437 1.749.874.429-.437 1.303-.874 2.615-.874 13.522 0 24.428 10.465 24.428 23.982v67.156h103.379c29.658 0 52.783 23.108 52.783 52.765v86.338h-45.366zM93.784 721.673c0 3.06 1.313 4.363 4.365 4.363h415.702c3.052 0 4.364-1.303 4.364-4.363V230.241H93.784v491.432zM407.42 47.964H204.58v43.174h202.84V47.964zm156.162 95.939c0-3.052-1.313-4.801-4.365-4.801H52.783c-3.053 0-4.365 1.749-4.365 4.801v38.373h515.164v-38.373zM393.898 286.494h48.419v396.805h-48.419V286.494zm-111.67 0h48.418v396.805h-48.418V286.494zm-111.67 0h48.418v396.805h-48.418V286.494z\" class=\"cls-1\"/></svg>";
	if(__map_reserved["social-pint"] != null) _g.setReserved("social-pint","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 77.406 100\"><defs/><path d=\"M31.987 66.139C29.361 79.906 26.154 93.106 16.654 100c-2.932-20.808 4.307-36.435 7.668-53.027-5.73-9.646.689-29.062 12.777-24.277 14.873 5.885-12.881 35.865 5.75 39.611 19.454 3.908 27.395-33.752 15.332-46-17.427-17.684-50.733-.403-46.637 24.916.996 6.191 7.391 8.068 2.555 16.611-11.154-2.472-14.484-11.27-14.055-23C.734 15.637 17.294 2.195 33.904.336 54.91-2.016 74.625 8.047 77.347 27.807c3.066 22.303-9.48 46.459-31.943 44.721-6.088-.473-8.645-3.489-13.417-6.389z\" class=\"cls-1\"/></svg>"); else _g.h["social-pint"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 77.406 100\"><defs/><path d=\"M31.987 66.139C29.361 79.906 26.154 93.106 16.654 100c-2.932-20.808 4.307-36.435 7.668-53.027-5.73-9.646.689-29.062 12.777-24.277 14.873 5.885-12.881 35.865 5.75 39.611 19.454 3.908 27.395-33.752 15.332-46-17.427-17.684-50.733-.403-46.637 24.916.996 6.191 7.391 8.068 2.555 16.611-11.154-2.472-14.484-11.27-14.055-23C.734 15.637 17.294 2.195 33.904.336 54.91-2.016 74.625 8.047 77.347 27.807c3.066 22.303-9.48 46.459-31.943 44.721-6.088-.473-8.645-3.489-13.417-6.389z\" class=\"cls-1\"/></svg>";
	if(__map_reserved.people != null) _g.setReserved("people","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 383 452\"><defs/><path d=\"M352 452H32c-17.687 0-32-14.313-32-32v-36c0-53.031 43-96 96-96h16c0 44.187 35.813 80 80 80 44.188 0 80-35.813 80-80h16c53.063 0 96 42.969 96 96v36c0 17.687-14.313 32-32 32zM211.375 254.047C255.125 245.094 288 206.406 288 160c0-4.781-.687-9.344-1.375-13.938-22.75 9.109-57.812 4.406-90.875-14.672-25.219-14.578-43.531-34.328-52.5-53.656C115.094 94.469 96 124.859 96 160c0 46.406 32.938 85.094 76.656 94.047C111.25 244.656 64 192.063 64 128 64 57.313 121.344 0 192 0c70.688 0 128 57.313 128 128 0 64.063-47.187 116.656-108.625 126.047z\" class=\"cls-1\"/></svg>"); else _g.h["people"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 383 452\"><defs/><path d=\"M352 452H32c-17.687 0-32-14.313-32-32v-36c0-53.031 43-96 96-96h16c0 44.187 35.813 80 80 80 44.188 0 80-35.813 80-80h16c53.063 0 96 42.969 96 96v36c0 17.687-14.313 32-32 32zM211.375 254.047C255.125 245.094 288 206.406 288 160c0-4.781-.687-9.344-1.375-13.938-22.75 9.109-57.812 4.406-90.875-14.672-25.219-14.578-43.531-34.328-52.5-53.656C115.094 94.469 96 124.859 96 160c0 46.406 32.938 85.094 76.656 94.047C111.25 244.656 64 192.063 64 128 64 57.313 121.344 0 192 0c70.688 0 128 57.313 128 128 0 64.063-47.187 116.656-108.625 126.047z\" class=\"cls-1\"/></svg>";
	if(__map_reserved["social-g+"] != null) _g.setReserved("social-g+","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 94 97\"><defs/><path d=\"M93.502 51.618H81.351v12.225a.5.5 0 0 1-.499.501h-5.227a.5.5 0 0 1-.5-.501V51.619H63.037a.501.501 0 0 1-.5-.501v-5.313a.5.5 0 0 1 .5-.501h12.088V33.158a.5.5 0 0 1 .5-.501h5.227a.5.5 0 0 1 .499.501v12.146h12.151c.277 0 .499.223.499.501v5.312a.5.5 0 0 1-.499.501zM54.858 5.083a.483.483 0 0 1-.265.078H46.94c2.897 2.403 8.925 7.403 8.925 17.077 0 9.623-5.629 14.072-10.595 17.996l-.163.165c-1.562 1.559-3.331 3.326-3.331 6.003 0 2.723 1.769 4.193 3.19 5.374l4.599 3.588c5.451 4.605 10.587 8.943 10.584 17.729 0 11.879-11.37 23.905-33.099 23.905-18.687 0-27.052-9.087-27.052-18.092 0-2.262.699-10.065 9.694-15.43 7.615-4.697 18.04-5.413 23.641-5.798l.39-.027-.219-.283c-1.747-2.24-3.553-4.557-3.553-8.314 0-1.929.516-3.165 1.061-4.476l.188-.457c-1.274.119-2.718.253-4.022.253-13.564 0-20.884-10.235-20.884-19.866 0-6.251 3.005-12.584 8.04-16.941C20.736 2.262 27.849.002 38.124.002h23.059a.501.501 0 0 1 .266.924l-6.591 4.157zM21.884 63.234c-7.169 2.606-10.808 6.988-10.808 13.02 0 9.237 8.899 15.443 22.144 15.443 11.411 0 18.501-5.235 18.502-13.664 0-6.617-4.456-10.091-13.724-16.707-1.002-.126-1.633-.126-2.889-.126-.074 0-7.484.096-13.225 2.034zm7.06-58.453c-3.333 0-6.792 1.638-8.812 4.173-1.862 2.313-2.766 5.377-2.766 9.368 0 7.848 4.613 22.507 15.729 22.507 3.004 0 6.442-1.422 8.556-3.538 3.144-3.171 3.144-7.736 3.144-9.236 0-9.512-5.644-23.274-15.851-23.274z\" class=\"cls-1\"/></svg>"); else _g.h["social-g+"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 94 97\"><defs/><path d=\"M93.502 51.618H81.351v12.225a.5.5 0 0 1-.499.501h-5.227a.5.5 0 0 1-.5-.501V51.619H63.037a.501.501 0 0 1-.5-.501v-5.313a.5.5 0 0 1 .5-.501h12.088V33.158a.5.5 0 0 1 .5-.501h5.227a.5.5 0 0 1 .499.501v12.146h12.151c.277 0 .499.223.499.501v5.312a.5.5 0 0 1-.499.501zM54.858 5.083a.483.483 0 0 1-.265.078H46.94c2.897 2.403 8.925 7.403 8.925 17.077 0 9.623-5.629 14.072-10.595 17.996l-.163.165c-1.562 1.559-3.331 3.326-3.331 6.003 0 2.723 1.769 4.193 3.19 5.374l4.599 3.588c5.451 4.605 10.587 8.943 10.584 17.729 0 11.879-11.37 23.905-33.099 23.905-18.687 0-27.052-9.087-27.052-18.092 0-2.262.699-10.065 9.694-15.43 7.615-4.697 18.04-5.413 23.641-5.798l.39-.027-.219-.283c-1.747-2.24-3.553-4.557-3.553-8.314 0-1.929.516-3.165 1.061-4.476l.188-.457c-1.274.119-2.718.253-4.022.253-13.564 0-20.884-10.235-20.884-19.866 0-6.251 3.005-12.584 8.04-16.941C20.736 2.262 27.849.002 38.124.002h23.059a.501.501 0 0 1 .266.924l-6.591 4.157zM21.884 63.234c-7.169 2.606-10.808 6.988-10.808 13.02 0 9.237 8.899 15.443 22.144 15.443 11.411 0 18.501-5.235 18.502-13.664 0-6.617-4.456-10.091-13.724-16.707-1.002-.126-1.633-.126-2.889-.126-.074 0-7.484.096-13.225 2.034zm7.06-58.453c-3.333 0-6.792 1.638-8.812 4.173-1.862 2.313-2.766 5.377-2.766 9.368 0 7.848 4.613 22.507 15.729 22.507 3.004 0 6.442-1.422 8.556-3.538 3.144-3.171 3.144-7.736 3.144-9.236 0-9.512-5.644-23.274-15.851-23.274z\" class=\"cls-1\"/></svg>";
	if(__map_reserved["social-twitter"] != null) _g.setReserved("social-twitter","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 89 62\"><defs/><path d=\"M79.803 27.56c5.054-.417 8.483-2.715 9.803-5.832-1.824 1.12-7.484 2.341-10.61 1.178a38.41 38.41 0 0 0-.492-2.062C76.122 12.1 67.967 5.055 59.422 5.906a36.1 36.1 0 0 1 2.092-.772c.94-.337 6.459-1.235 5.59-3.182-.733-1.713-7.475 1.294-8.745 1.687 1.676-.63 4.448-1.714 4.745-3.639-2.568.352-5.088 1.566-7.036 3.33.703-.756 1.237-1.679 1.35-2.671C50.57 5.033 46.57 13.851 43.333 22.405c-2.542-2.463-4.795-4.403-6.816-5.48-5.67-3.04-12.449-6.211-23.091-10.161-.327 3.52 1.741 8.201 7.7 11.314-1.291-.173-3.652.212-5.54.664.769 4.033 3.28 7.356 10.079 8.963-3.107.205-4.713.912-6.168 2.435 1.415 2.805 4.868 6.106 11.08 5.428-6.906 2.976-2.816 8.489 2.804 7.666-9.587 9.899-24.702 9.173-33.381.892C22.661 75 71.921 62.385 79.262 32.647c5.499.048 8.733-1.904 10.738-4.055-3.169.537-7.761-.018-10.197-1.032z\" class=\"cls-1\"/></svg>"); else _g.h["social-twitter"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 89 62\"><defs/><path d=\"M79.803 27.56c5.054-.417 8.483-2.715 9.803-5.832-1.824 1.12-7.484 2.341-10.61 1.178a38.41 38.41 0 0 0-.492-2.062C76.122 12.1 67.967 5.055 59.422 5.906a36.1 36.1 0 0 1 2.092-.772c.94-.337 6.459-1.235 5.59-3.182-.733-1.713-7.475 1.294-8.745 1.687 1.676-.63 4.448-1.714 4.745-3.639-2.568.352-5.088 1.566-7.036 3.33.703-.756 1.237-1.679 1.35-2.671C50.57 5.033 46.57 13.851 43.333 22.405c-2.542-2.463-4.795-4.403-6.816-5.48-5.67-3.04-12.449-6.211-23.091-10.161-.327 3.52 1.741 8.201 7.7 11.314-1.291-.173-3.652.212-5.54.664.769 4.033 3.28 7.356 10.079 8.963-3.107.205-4.713.912-6.168 2.435 1.415 2.805 4.868 6.106 11.08 5.428-6.906 2.976-2.816 8.489 2.804 7.666-9.587 9.899-24.702 9.173-33.381.892C22.661 75 71.921 62.385 79.262 32.647c5.499.048 8.733-1.904 10.738-4.055-3.169.537-7.761-.018-10.197-1.032z\" class=\"cls-1\"/></svg>";
	if(__map_reserved.search != null) _g.setReserved("search","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 612 612\"><defs/><path d=\"M597.029 524.702L464.074 391.749c-.707-.707-1.536-1.2-2.274-1.858 26.161-39.685 41.43-87.188 41.43-138.273C503.23 112.652 390.578 0 251.615 0 112.652 0 0 112.652 0 251.615 0 390.575 112.65 503.23 251.613 503.23c51.088 0 98.589-15.269 138.273-41.43.658.736 1.149 1.565 1.856 2.271L524.7 597.029c19.973 19.971 52.354 19.971 72.329 0 19.971-19.973 19.971-52.354 0-72.327zM251.615 416.003c-90.792 0-164.39-73.599-164.39-164.388 0-90.792 73.601-164.39 164.39-164.39 90.787 0 164.388 73.601 164.388 164.39 0 90.789-73.601 164.388-164.388 164.388z\" class=\"cls-1\"/></svg>"); else _g.h["search"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 612 612\"><defs/><path d=\"M597.029 524.702L464.074 391.749c-.707-.707-1.536-1.2-2.274-1.858 26.161-39.685 41.43-87.188 41.43-138.273C503.23 112.652 390.578 0 251.615 0 112.652 0 0 112.652 0 251.615 0 390.575 112.65 503.23 251.613 503.23c51.088 0 98.589-15.269 138.273-41.43.658.736 1.149 1.565 1.856 2.271L524.7 597.029c19.973 19.971 52.354 19.971 72.329 0 19.971-19.973 19.971-52.354 0-72.327zM251.615 416.003c-90.792 0-164.39-73.599-164.39-164.388 0-90.792 73.601-164.39 164.39-164.39 90.787 0 164.388 73.601 164.388 164.39 0 90.789-73.601 164.388-164.388 164.388z\" class=\"cls-1\"/></svg>";
	if(__map_reserved.cart != null) _g.setReserved("cart","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 510 510\"><defs/><path d=\"M153 408c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zM0 0v51h51l91.8 193.8-35.7 61.2c-2.55 7.65-5.1 17.85-5.1 25.5 0 28.05 22.95 51 51 51h306v-51H163.2c-2.55 0-5.1-2.55-5.1-5.1v-2.55l22.95-43.35h188.7c20.4 0 35.7-10.2 43.35-25.5l91.8-165.75c5.1-5.1 5.1-7.65 5.1-12.75 0-15.3-10.2-25.5-25.5-25.5H107.1L84.15 0H0zm408 408c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z\" class=\"cls-1\"/></svg>"); else _g.h["cart"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 510 510\"><defs/><path d=\"M153 408c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zM0 0v51h51l91.8 193.8-35.7 61.2c-2.55 7.65-5.1 17.85-5.1 25.5 0 28.05 22.95 51 51 51h306v-51H163.2c-2.55 0-5.1-2.55-5.1-5.1v-2.55l22.95-43.35h188.7c20.4 0 35.7-10.2 43.35-25.5l91.8-165.75c5.1-5.1 5.1-7.65 5.1-12.75 0-15.3-10.2-25.5-25.5-25.5H107.1L84.15 0H0zm408 408c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z\" class=\"cls-1\"/></svg>";
	if(__map_reserved["default"] != null) _g.setReserved("default","<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 612 774\" id=\"svg4198\"><defs id=\"defs4200\"/><path style=\"line-height:125%;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal\" d=\"M306.898 28.113c-65.089 0-120.72 18.008-162.73 54.936a23.974 23.974 0 0 0-.072.062c-41.818 37.059-66.388 90.524-74.385 156.104a23.974 23.974 0 0 0 20.965 26.707l83.111 9.883a23.974 23.974 0 0 0 26.512-20.09c6.669-42.515 20.283-70.658 38.064-87.285 18.713-17.498 40.443-25.885 69.883-25.885 30.269 0 53.149 9.215 73.559 29.127a23.974 23.974 0 0 0 .11.105c20.736 19.979 29.497 40.191 29.497 65.399 0 13.514-3.055 25.038-9.42 36.176-5.546 9.705-22.58 29.136-49.863 53.226-28.254 24.912-47.979 43.818-60.467 58.735a23.974 23.974 0 0 0-.06.072c-15.995 19.259-28.107 38.957-35.834 59.297-10.304 26.5-15.069 56.837-15.069 90.795 0 5.834.155 14.032.457 24.925a23.974 23.974 0 0 0 23.963 23.305h77.719a23.974 23.974 0 0 0 23.967-23.527c.582-31.45 3.123-53.962 5.912-64.26 3.205-11.836 7.938-21.75 14.193-30.322 5.504-7.543 22.34-24.932 48.194-47.848l.007-.008c40.283-35.671 68.21-66.155 84.123-94.799 15.43-27.774 23.23-58.661 23.23-91.158 0-55.878-22.797-105.981-65.3-144.832-43.27-39.55-101.525-58.84-170.266-58.84zm-46.722 577.735a23.974 23.974 0 0 0-23.97 23.97v92.098a23.974 23.974 0 0 0 23.97 23.97h92.097a23.974 23.974 0 0 0 23.971-23.97v-92.098a23.974 23.974 0 0 0-23.97-23.97h-92.098z\" id=\"path4247\" color=\"#000\" font-weight=\"400\" font-size=\"767.628\" font-family=\"sans-serif\" letter-spacing=\"0\" word-spacing=\"0\" white-space=\"normal\" overflow=\"visible\" stroke-width=\"47.943\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>"); else _g.h["default"] = "<svg preserveAspectRatio=\"xMidYMid\" viewBox=\"0 0 612 774\" id=\"svg4198\"><defs id=\"defs4200\"/><path style=\"line-height:125%;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal\" d=\"M306.898 28.113c-65.089 0-120.72 18.008-162.73 54.936a23.974 23.974 0 0 0-.072.062c-41.818 37.059-66.388 90.524-74.385 156.104a23.974 23.974 0 0 0 20.965 26.707l83.111 9.883a23.974 23.974 0 0 0 26.512-20.09c6.669-42.515 20.283-70.658 38.064-87.285 18.713-17.498 40.443-25.885 69.883-25.885 30.269 0 53.149 9.215 73.559 29.127a23.974 23.974 0 0 0 .11.105c20.736 19.979 29.497 40.191 29.497 65.399 0 13.514-3.055 25.038-9.42 36.176-5.546 9.705-22.58 29.136-49.863 53.226-28.254 24.912-47.979 43.818-60.467 58.735a23.974 23.974 0 0 0-.06.072c-15.995 19.259-28.107 38.957-35.834 59.297-10.304 26.5-15.069 56.837-15.069 90.795 0 5.834.155 14.032.457 24.925a23.974 23.974 0 0 0 23.963 23.305h77.719a23.974 23.974 0 0 0 23.967-23.527c.582-31.45 3.123-53.962 5.912-64.26 3.205-11.836 7.938-21.75 14.193-30.322 5.504-7.543 22.34-24.932 48.194-47.848l.007-.008c40.283-35.671 68.21-66.155 84.123-94.799 15.43-27.774 23.23-58.661 23.23-91.158 0-55.878-22.797-105.981-65.3-144.832-43.27-39.55-101.525-58.84-170.266-58.84zm-46.722 577.735a23.974 23.974 0 0 0-23.97 23.97v92.098a23.974 23.974 0 0 0 23.97 23.97h92.097a23.974 23.974 0 0 0 23.971-23.97v-92.098a23.974 23.974 0 0 0-23.97-23.97h-92.098z\" id=\"path4247\" color=\"#000\" font-weight=\"400\" font-size=\"767.628\" font-family=\"sans-serif\" letter-spacing=\"0\" word-spacing=\"0\" white-space=\"normal\" overflow=\"visible\" stroke-width=\"47.943\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>";
	$r = _g;
	return $r;
}(this));
svgicons_html_SVGApp.main();
})(typeof console != "undefined" ? console : {log:function(){}});
