"use strict";
var crypto = require('crypto');
var less = require("less");
var fs = require('fs');
module.exports = {
	"get" : function(context, then){
		var css = [];
		var paths = context.get("route").parameters;
		var root = require("wepesi-core").path;
		for(var i in paths){
			var path = root + "/" + paths[i];
			if(!fs.existsSync(path))
				path = (context.get("service")).path + "/" + paths[i]
			if(fs.existsSync(path))
				css.push(fs.readFileSync( path, {encoding : 'utf8'}));
		}
		var code = css.join('\n');
		less.render(code, { compress : true },function(error, output){
			if(error)
				return then(error, null);
			var age = context.get("host").substr(0,3) == "dev" ? 86400 : 2592000;
			context.get("publisher").header("Cache-Control", "public, max-age=" + age);
			context.get("publisher").header("Last-Modified", "Thu, 31 Dec 2014 23:59:59 GMT");
			context.get("publisher").header("Expires", "Thu, 31 Dec 2014 23:59:59 GMT");
			context.get("publisher").header("Etag", "12345");
			context.get("publisher").header("content-type", "text/css");
			then(null, output.css);
		});
	}
};
