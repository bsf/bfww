Ext.define('App.core.Activities', {		
			
	eventBus: null,
	list: {},
  
	constructor: function() {
		this.eventBus = Ext.create('Ext.util.Observable');
	},
	
	exec: function(uri, args) {
		var activity = this.get(uri);
		if (activity.cls)			
			this.eventBus.fireEvent(activity.cls, activity, args);
		else	
			this.eventBus.fireEvent(activity.uri, activity, args);
	},
	
	on: function(uri, handler, scope) {
		this.eventBus.on(uri, handler, scope);
	},
	
	get: function(uri) {
		if (!(uri in this.list)) {			
			this.list[uri] = Ext.create('App.core.Activity', uri);
		}		
		return this.list[uri];			
	}
	
});