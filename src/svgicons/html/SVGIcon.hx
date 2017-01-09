package svgicons.html;

import org.tamina.html.component.HTMLComponent;

@:keep
@view('null', 'svg-icon')
@:build(svgicons.macro.SVGSprite.buildSVGSprite())
class SVGIcon extends HTMLComponent {

	private static function getObservedAttributes():Array<String> {
		return ["icon"];
	}

	override private function attributeChangedCallback(attrName:String, oldVal:String, newVal:String):Void {
		super.attributeChangedCallback(attrName, oldVal, newVal);

		if (attrName == "icon") {
			loadIcon(newVal);
		}
	}

	private function loadIcon(iconName:String):Void {
		innerHTML = "";

		if (icons.exists(iconName)) {
			innerHTML = icons.get(iconName);

			var svg = querySelector("svg");
			if (svg != null) {
				svg.setAttribute("width", "100%");
				svg.setAttribute("height", "100%");
			}
		} else {
			if (iconName != "default") loadIcon("default");
		}
	}

}
