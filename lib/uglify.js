"use strict";
var uglify = require("uglify-js");
var fs = require('fs');
module.exports = {
	"get" : function(context, then){
		var files = [];
		var paths = context.get("route").parameters;
		var root = require("wepesi-core").path;
		for(var i in paths){
			files.push( root + "/" + paths[i] );
		}
		var result = uglify.minify(files);
		context.get("publisher").header("content-type", "application/javascript");
		then(null, result.code);
	}
};
