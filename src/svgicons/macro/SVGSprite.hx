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

		#if SVG_SPRITE_OUTPUT
		var spriteOutput:String = '<svg xmlns="http://www.w3.org/2000/svg">' +
		'<defs><style>svg { display: none; } svg:target { display: inline; }</style></defs>';

		var svgIdReg = ~/^\s*<svg(.*)(\sid=("|')[a-zA-Z0-9_-]+("|'))/;

		#end

		for (icon in icons) {
			var iconName = icon.replace(".svg", "");
			var iconPath = path + "/" + icon;

			#if SVG_SPRITE_OUTPUT
				var isBG:Bool = iconName.endsWith("-bg");
			#end

			#if USE_SVGO
				var configPath = Context.resolvePath("../svgo.yml");
				var process = new Process("./node_modules/svgo/bin/svgo", ["-i", iconPath, "-o", "-", "--config", configPath]);
				var iconData = process.stdout.readLine();
			#else
				var iconData = File.getContent(path + "/" + icon);
			#end

			#if SVG_SPRITE_OUTPUT
				if (isBG) {
					if (svgIdReg.match(iconData)) {
						iconData = svgIdReg.replace(iconData, '<svg$1');
					}

					iconData = iconData.replace('<svg ', '<svg id="' + iconName + '" ');
					spriteOutput += iconData;
				} else {
			#end
					iconsMap.push(macro $v{iconName} => $v{iconData});
			#if SVG_SPRITE_OUTPUT
				}
			#end
		}

		#if SVG_SPRITE_OUTPUT
			spriteOutput += '</svg>';

			var spritePath = Context.resolvePath(Compiler.getDefine("SVG_SPRITE_OUTPUT")) + "svg-backgrounds.svg";
			var file = File.write(spritePath);
			file.writeString(spriteOutput);
			file.close();
		#end

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
