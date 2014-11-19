"use strict";
gereji.apps.register('collapsible', function(sandbox){
	var app;
	return {
		init: function(){
			app = this;
			sandbox.on(["body:load", "body:change"], app.close);
			sandbox.on([".collapsible-single-openclose:click"], app.toggle)
			sandbox.on([".collapsible-openclose:click"], app.dance);
		},
		close: function(){
			var tags = (new gereji.query()).init(".collapsible-closed");
			tags.each(function(element){
				var tag = (new gereji.query()).setElement(element);
				if(!tag.attribute("collapsible-height"))
					tag.attribute("collapsible-height", element.clientHeight);
			});
		},
		toggle: function(){
			var target = (new gereji.query()).setElement(arguments[0].data.target).ancestor(".collapsible");
			if(!target.hasClass("collapsible-single-closed"))
				return target.css("collapsible-height", "auto").addClass("collapsible-single-closed");
			var height = target.attribute("collapsible-height") + "px";
			target.css("height", height).removeClass("collapsible-single-closed");
		},
		dance: function(){
			var target = arguments[0].data.target;
			var open = (new gereji.query()).setElement(target).ancestor(".collapsible").hasClass('collapsible-open');
			var tags = (new gereji.query()).init(".collapsible");
			tags.each(function(element){
				element.className = element.className.replace('collapsible-open').replace(/\s\s/, /\s/)
			});
			if(!open)
				subject.addClass("collapsible-open");
			return this;
		}
	}
});
