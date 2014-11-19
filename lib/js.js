"use strict";
var uglify = require("uglify-js");
var fs = require('fs');
module.exports = {
	"get" : function(context, then){
		var files = [];
		var paths = context.get("route").parameters;
		var root = require("wepesi-core").path;
		for(var i in paths){
			files.push( fs.readFileSync(root + "/" + paths[i], {encoding : 'utf-8'}));
		}
		context.get("publisher").header("content-type", "application/javascript");
		then(null, files.join('\n'));
	}
};
