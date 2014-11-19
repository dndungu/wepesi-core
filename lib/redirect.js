"use strict";
var xslt = require(__dirname + "/xslt.js");
module.exports = {
	"get" : function(context, then){
		try{
			var processor = new xslt();
			processor.init( { context : context } );
			var html = processor.transform({uri : context.get("query").uri});
			then(null, html);
		}catch(error){
			context.log(error.stack);
			then(error, null);
		}
	}
};
