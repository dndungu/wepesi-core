"use strict";
var xslt = require('node_xslt');
var cache = {};
var fs = require("fs");
module.exports = function(){
	return {
		init : function(sandbox){
			this.sandbox = sandbox;
			return this;
		},
		transform : function(json){
			var self = this;
			var xml_def = '<?xml version="1.0"?>';
			try{
				var path = self.sandbox.context.get("service").path + "/templates/" + self.sandbox.context.get("route").xsl; 
				if(cache[path])
					var xsl = xslt.readXsltString(cache[path]);
				else
					var xsl = xslt.readXsltString( self.readFile(path) );
				var xml = self.json2xml(json);
				xml.unshift(xml_def);
				var doc = xslt.readXmlString(xml.join("\n"));
				return xslt.transform(xsl, doc, []);
			}catch(error){
				console.log(error.stack);
				return xml_def + '<error></error>';
			}
		},
		readFile: function(path){
			cache[path] = fs.readFileSync(path, {encoding : "utf8"});
			return cache[path];
		},
		json2xml : function(content){
			var xml = [];
			for(var i in content){
				var name = isNaN(i) ? i : 'node-' + String(i);
				var value = ['number', 'boolean', 'string'].indexOf(typeof content[i]) == -1 ? this.json2xml(content[i]) : String(content[i]);
				xml.push('<' + name + '>' + value + '</' + name + '>');
			}
			return xml;
		}
	};
};
