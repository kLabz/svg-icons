package svgicons.macro;

import haxe.macro.Compiler;
import haxe.macro.Context;
import haxe.macro.Expr;
import sys.FileSystem;
import sys.io.File;

using StringTools;

class SVGSprite {
	public static function buildSVGSprite():Array<Field> {
	var fields = Context.getBuildFields();

	var path = Compiler.getDefine("SVG_PATH");
	if (path == null) path = "../img";
	path = Context.resolvePath(path);

	if (FileSystem.exists(path)) {
		var iconsMap = new Array<Expr>();
		var icons = FileSystem.readDirectory(path);

		for (icon in icons) {
			var iconName = icon.replace(".svg", "");

			// TODO: use svgo?
			var iconData = File.getContent(path + "/" + icon);

			iconsMap.push(macro $v{iconName} => $v{iconData});

			// TODO: handle "bg" icons
		}

		// TODO: create svg sprite from bg icons

		fields.push({
			pos: Context.currentPos(),
			name: "icons",
			meta: null,
			kind: FieldType.FVar(macro: Map<String, String>, macro $a{iconsMap}),
			doc: null,
			access: [Access.APrivate, Access.AStatic]
		});
	}

		return fields;
	}
}
