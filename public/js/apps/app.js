"use strict";
gereji.apps.register("app", function(sandbox){
	var self;
	return {
		init : function(){
			self = this;
			sandbox.broker = new gereji.broker();
			sandbox.broker.init();
			sandbox.validator = new gereji.validator();
			sandbox.storage = new gereji.storage();
			sandbox.storage.init();
			sandbox.sync = new gereji.sync();
			sandbox.sync.init();
			sandbox.broker.on(".app:click", self.navigate);
			sandbox.broker.emit({type: "body:load", data: {}})
		},
		kill : function(){
		},
		navigate : function(event){
			event.data.event.preventDefault();
			var target = event.data.target;
			var data = {};
			for(var i = 0; i < target.attributes.length; i++){
				var attribute = target.attributes[i];
				data[attribute.name] = attribute.value;
			}
			var type = "stage:" + data.type;
			sandbox.broker.emit({ type : type, data : data });
		}
	};
});
