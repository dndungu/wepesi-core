"use strict";
var xslt = require(__dirname + "/xslt.js");
module.exports = {
	"get" : function(context, then){
		try{
			console.time("xslt");
			var processor = new xslt();
			processor.init( { context : context } );
			var html = processor.transform({test : "test"});
			console.timeEnd("xslt");
			then(null, html);
		}catch(error){
			context.log(error.stack);
			then(error, null);
		}
	}
};
