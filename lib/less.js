"use strict";
var less = require("less");
var fs = require('fs');
module.exports = {
	"get" : function(context, then){
		var parser = new (less.Parser);
		var dev = [];
		var paths = context.get("route").parameters;
		var root = require("wepesi-core").path;
		for(var i in paths){
			var path = root + "/" + paths[i];
			if(!fs.existsSync(path))
				path = (context.get("service")).path + "/" + paths[i]
			dev.push(fs.readFileSync( path, {encoding : 'utf8'}));
		}
		parser.parse(dev.join('\n'), function(error, tree){
			if(error)
				return then(error, null);
			context.get("publisher").header("content-type", "text/css");
			then(null, tree.toCSS({ compress : true }));
		});
	}
};
