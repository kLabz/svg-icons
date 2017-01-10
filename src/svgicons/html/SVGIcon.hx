package svgicons.html;

import org.tamina.html.component.HTMLComponent;

@:keep
@view('null', 'svg-icon')
@:build(svgicons.macro.SVGSprite.buildSVGSprite())
class SVGIcon extends HTMLComponent {

	private var _alt:String;
	private var _iconNotFound:Bool;

	private static function getObservedAttributes():Array<String> {
		return ["alt", "icon"];
	}

	private function new() {
		super();

		_alt = "";
		_iconNotFound = false;
	}

	override private function attributeChangedCallback(attrName:String, oldVal:String, newVal:String):Void {
		super.attributeChangedCallback(attrName, oldVal, newVal);

		switch (attrName) {
			case "alt":
			_alt = newVal;
			updateAlt();

			case "icon":
			loadIcon(newVal);
		}
	}

	private function loadIcon(iconName:String, ?isAlt:Bool = false):Void {
		if (Reflect.hasField(icons, iconName)) {
			innerHTML = Reflect.field(icons, iconName);
			_iconNotFound = false;

			var svg = querySelector("svg");
			if (svg != null) {
				svg.setAttribute("width", "100%");
				svg.setAttribute("height", "100%");
			}
		} else {
			_iconNotFound = true;

			if (hasDefaultIcon) {
				loadIcon("default", true);
			} else {
				updateAlt();
			}
		}
	}

	private function updateAlt():Void {
		if (_iconNotFound) {
			innerHTML = '<span class="alt">' + _alt + '</span>';
		}
	}

}
