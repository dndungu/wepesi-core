"use strict";
gereji.apps.register('form', function(sandbox){
	var self;
	return {
		init: function(){
			self = this;
			self.counters = {};
			sandbox.broker.on("stage:form", self.stage);
			sandbox.broker.on(['input:change', 'textarea:change', 'select:change'], self.validate);
			sandbox.broker.on('input:change', self.putFile);
			sandbox.broker.on('form:submit', self.submit);
			sandbox.broker.on(".select-add:change", self.toggleTag);
			sandbox.broker.on(".select-add:keyup", self.revertTag);
			sandbox.broker.on(".upload-box-uncheck:click", self.removeUpload);
			sandbox.broker.on("input:keypress", self.supress);
			return this;
		},
		kill: function(){
		},
		supress: function(event){
			if(event.data.event.keyCode == 13)
				event.preventDefault();
		},
		stage: function(event){
			var view = new gereji.view.form();
			view.init(event.data);
			view.render();
		},
		createIdInput: function(form){
			var _id = (new gereji.storage()).uuid();
			var input = document.createElement("input");
			input.name = "_id";
			input.value = _id;
			input.setAttribute("type", "hidden");
			input.setAttribute("property", "_id");
			form.self.ndChild(input);
			return _id;
		},
		findId: function(target){
			var elements = (new gereji.query()).init('*[name="_id"]', target);
			return elements.length ? elements[0] : null;
		},
		submit: function(){
			var target = arguments[0].data.target;
			var event = arguments[0].data.event;
			var options = {};
			options.about = target.getAttribute('about');
			options.name = target.getAttribute("name");
			if(!options.about || !options.name)
				return this;
			if(typeof tinymce != "undefined")
				tinymce.triggerSave();
			options.type = "form";
			options.about = options.about.replace(/\/$/, "");
			event.preventDefault();
			var model = new gereji.model();
			model.init();
			model.meta("about", options.about);
			model.meta("name", options.name);
			if(!self.parse(["input", "textarea", "select"], target, model))
				return this;
			sandbox.broker.emit({type: options.name + ":sync", data: model});
			model.broker.on(["sync"], console.log);
			model.sync();
			sandbox.broker.emit(".dashboard-dismiss:click");
			if(typeof tinymce != "undefined")
				tinymce.remove('textarea.html-editor');
			return this;
		},
		parse: function(tags, target, model){
			for(var i in tags){
				var tagName = tags[i];
				var elements = target.getElementsByTagName(tagName);
				for(var i = 0; i < elements.length; i++){
					var property = elements[i].getAttribute("property");
					var type = elements[i].getAttribute("type");
					if(!property)
						continue;
					if(["radio", "checkbox"].indexOf(type) != -1 && !elements[i].checked)
						continue;
					if(!self.validate({data: {target : elements[i]}}))
						return false;
					model.set(property, elements[i].value);
				}
			}
			return true;
		},
		validate: function(){
			var target = arguments[0].data.target;
			var element = (new gereji.query()).set(target);
			element.removeClass('invalid-input');
			var cls = target.className.split(' ');
			for(var i in cls){
				if(sandbox.validator.test(cls[i], target.value))
					continue;
				target.focus();
				element.addClass(" invalid-input");
				if(target.tagName.toLowerCase() != 'select')
					target.value = "";
				if(element.hasClass("required"))
					return false;
			}
			return true;
		},
		putFile: function(){
			var target = arguments[0].data.target;
			if(target.getAttribute("type") != "file")
				return;
			var about = target.getAttribute("about");
			if(!about)
				return;
			var box = target.parentNode.parentNode;
			var multiple = (typeof target.getAttribute("multiple") == "string");
			for(var i = 0; i < target.files.length; i++){
				var file = target.files.item(i);
				var filename = self.rename(target, file.name);
				var sync = new gereji.sync();
				sync.init();
				sync.broker.on(["loadstart"], function(){
					self.putStart(target);
				});
				sync.broker.on(["progress"], function(){
					self.putProgress(target, arguments[0].data);
				});
				sync.broker.on(["loadend"], function(){
					self.putEnd(target, arguments[0].data);
				});
				sync.header("content-type", file.type);
				var url = about + "/" + filename;
				sync.put(url, file, function(){
					var response = JSON.parse(arguments[0]);
					self.setFileProperty(target, response);
					if(!multiple)
						return self.showThumbnail(box, response);
					var clone = box.cloneNode(true);
					self.showThumbnail(clone, response);
					box.parentNode.self.ndChild(clone);
					clone.style.display = "inline-block";
					box.style.display = "none";
				});
			}
		},
		rename: function(target, filename){
			var rename = target.getAttribute("rename");
			var blacklist = /["'\s]/g;
			if(!rename)
				return filename;
			var name = document.getElementById(rename).value.replace(blacklist, '-').toLowerCase();
			if(name && name.length)
				return name + filename.substr(filename.lastIndexOf("."));
			return filename.replace(blacklist, "").toLowerCase();
		},
		putStart: function(target){
			(new gereji.query())
			.set(target.parentNode.parentNode)
			.children("label.placeholder")
			.css({display: "none"});
			(new gereji.query())
			.set(target.parentNode.parentNode)
			.children("label.animation")
			.css({display: "inline-block"});
		},
		putProgress: function(target, event){
            var animation =(new gereji.query()).set(target.parentNode.parentNode).children("label.animation");
			var max = animation.get(0).clientHeight;
			var progress = event.position / event.totalSize;
			var border = String(Math.ceil(progress * max)) + "px";
            animation.css({"border-bottom-width": border});
		},
		putEnd: function(target, event){
			var animation = (new gereji.query()).set(target.parentNode.parentNode).children("label.animation");
			var max = animation.get(0).offsetHeight;
			animation.css({"border-bottom-width": max + "px"});
		},
		next: function(name){
			if(!self.counters.hasOwnProperty(name))
				self.counters[name] = -1;
			self.counters[name] += 1;
			return self.counters[name];
		},
		showThumbnail: function(box, response){
			(new gereji.query())
			.set(box)
			.children("label.animation")
			.css({display: "none"});
			(new gereji.query())
			.set(box).children("i.upload-box-uncheck")
			.css({display: "inline-block"});
			(new gereji.query())
			.set(box).children("i.upload-box-add")
			.css({display: "none"});
			var placeholder = (new gereji.query()).set(box).children("label.placeholder");
			var style = {};
			style.backgroundImage = "url('/images/" + response.filename + "')";
			style["border-width"] = 0;
			style.display = "block";
			placeholder.css(style);
		},
		setFileProperty: function(target, response){
			var input = document.getElementById(target.getAttribute("name"));
			var value = String(input.value);
			if(!value.length || typeof target.getAttribute("multiple") != "string")
				return (input.value = response.filename);
			var gallery = value.split(",");
			gallery.push(response.filename);
			input.value = gallery.join(",");
		},
		toggleTag: function(){
			var target = arguments[0].data.target;
			if(target.tagName.toLowerCase() == "input"){
				if(!self.validate({data: {target: target}}))
					return;
				var element = (new gereji.query()).set(target).next();
				var about = element.attribute("about");
				var text = element.attribute("text");
				var data = '{ "' + text + '" : "' + target.value + '" }';
				var sync = new gereji.sync();
				sync.init();
				sync.post(about, data, function(){});
				var options = element.findChildrenTag("option").getElements();
				var lastOption = options[(options.length - 1)];
				var option = document.createElement("option");
				option.innerHTML = target.value;
				option.value = target.value;
				lastOption.parentNode.insertBefore(option, lastOption);
				lastOption.parentNode.value = target.value;
				self.revertTag({data: {event: {keyCode: 27}, target: target}});
				return;
			}
			if(target.value != "add-new")
				return;
			var element = document.createElement("input");
			self.copyAttributes(element, target);
			target.parentNode.insertBefore(element, target);
			target.style.display = "none";
			element.focus();
		},
		copyAttributes: function(element, target){
			var style = "width: " + target.clientWidth + "px;";
			element.setAttribute("style", style);
			element.setAttribute("name", target.getAttribute("name"));
			element.setAttribute("about", target.getAttribute("about"));
			element.setAttribute("placeholder", target.getAttribute("placeholder"));
			element.setAttribute("class", target.getAttribute("class"));
			return this;
		},
		revertTag: function(){
			var event = arguments[0].data.event;
			var target = arguments[0].data.target;
			var tagName = target.tagName.toLowerCase();
			if(tagName != "input")
				return this;
			if(event.keyCode == 13)
				return target.blur();
			if(event.keyCode != 27)
				return this;
			var element = (new gereji.query()).set(target).next();
			element.css({"display": "inline-block"});
			element.removeClass("invalid-input");
			target.remove();
		},
		removeUpload: function(){
			var event = arguments[0].data.event;
			event.stopPropagation();
			event.preventDefault();
			var target = arguments[0].data.target;
			target.style.display = "none";
			var placeholder = (new gereji.query()).set(target.parentNode);
			var pe = placeholder.getElements()[0];
			var file = pe.getElementsByTagName('input')[0];
			var name = file.getAttribute('name');
			var value = pe.style.backgroundImage.replace('url(', '').replace(')', '').split('/').pop();
			placeholder.css({"backgroundImage" : "", "border-width" : "2px"});
			var sync = new gereji.sync();
			sync.init();
			var url = file.getAttribute("about") + "/" + value;
			sync["delete"](url, function(){});
			placeholder.findChildrenTag('i').findClass('upload-box-add').css({display: "inline-block"});
			var input = document.getElementById(name);
			var items = input.value.split(',');
			if(items.length == 1) 
				input.value = "";
			if(items.length > 1)
				items.splice(items.indexOf(value), 1) && (input.value = items.join(","));
			var data = {};
			data.target = placeholder.findParentTag("form").getElements()[0];
			data.event = {preventDefault: function(){}};
			self.submit({data : data});
		}
	};
});
