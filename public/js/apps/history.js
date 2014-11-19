"use strict";
gereji.apps.register("history", function(sandbox){
	var self;
	return {
		init: function(){
			self = this;
			if(!window.history || !history.pushState)
				return self.kill();
			window.addEventListener("popstate", self.navigate);
		},
		kill: function(){
		},
		navigate: function(event){
			var href = event.state.href;
			var target = (new gereji.query()).init('*[href="' + href + '"]').get();
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
