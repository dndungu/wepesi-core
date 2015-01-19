"use strict";
var fs = require('fs');
module.exports = {
	"get" : function(context, then){
		try {
			var sf = new (require(__dirname + "/static-file.js"));
			sf.path(context.get("service").path + "/public/images/" + context.get("parameters").path);
			var response = context.get("response");
			var stats = sf.stats();
			response.writeHead(200, {
				"Last-Modified": stats['mtime'],
				"Content-Length": stats['size'],
				"Content-Type": sf.type(),
				"Expires": sf.expires()
			});
			sf.pipe(response);
	}catch(error){
		context.log(error.stack);
		then(error, null);
	}
}
};
