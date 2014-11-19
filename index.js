"use strict";
module.exports = {
	routes: require(__dirname + "/routes.json"),
	model: function(model){
		var path = __dirname + "/models/" + model + ".json";
		return require(path);
	},
	webpage : require(__dirname + "/lib/webpage.js"),
	path: __dirname,
	less: require(__dirname + "/lib/less.js"),
	js: require(__dirname + "/lib/js.js"),
	uglify: require(__dirname + "/lib/uglify.js"),
	images: require(__dirname + "/lib/images.js")
}
