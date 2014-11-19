"use strict";
gereji.extend('os', {
	sandbox: {},
	apps: {},
	register : function(appId, creator) {
		this.apps[appId] = {
			creator : creator,
			instance : null
		};
	},
	start : function(appId) {
		var app = this.apps[appId];
		app.instance = app.creator(this.sandbox);
		try {
			app.instance.init();
		} catch (e) {
			console && console.error(e.stack);
		}
	},
	stop : function(appId) {
		var data = this.apps[appId];
		if(!data.instance)
			return;
		data.instance.kill();
		data.instance = null;
	},
	boot : function() {
		for (var i in this.apps) {
			this.apps.hasOwnProperty(i) && this.start(i);
		}
	},
	halt : function() {
		for ( var i in this.apps) {
			this.apps.hasOwnProperty(i) && this.stop(i);
		}
	}
});
gereji.apps = new gereji.os();
