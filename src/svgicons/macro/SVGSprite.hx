package svgicons.macro;

import haxe.macro.Compiler;
import haxe.macro.Context;
import haxe.macro.Expr;
import sys.FileSystem;
import sys.io.File;
import sys.io.Process;

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
			var iconPath = path + "/" + icon;

			#if USE_SVGO
				var configPath = Context.resolvePath("../svgo.yml");
				var process = new Process("./node_modules/svgo/bin/svgo", ["-i", iconPath, "-o", "-", "--config", configPath]);
				var iconData = process.stdout.readLine();
			#else
				var iconData = File.getContent(path + "/" + icon);
			#end

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
