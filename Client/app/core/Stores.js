Ext.define('App.core.Stores', {	
	requires: ['App.core.MetadataModel'],
	
	METADATA_MODEL: 'App.core.MetadataModel',
	
	metadataModel: null,
	cache: {},		
	cached: true,
	
	constructor: function() {
		eventBus = Ext.create('Ext.util.Observable');
	},
	
	get: function(options) {
		
		options = options || {};
					
		if (!(options.model in this.cache)) { 
			if (!this.model) 
				this.model = Ext.create(this.METADATA_MODEL);
			/*//this.store.getProxy().uri = 'data/meta/' + options.model + '.json';
			//debugger;
			this.store.load({
				scope: this,
				failure: function(record, operation) {
					
					console.log('error App.Stores.get: ' + operation.error);
				},
				callback: function(records, operation, success) {
					console.log('success App.Stores.get ');
					this.cache[options.model] = record.get('cfg');
					this.makeStore(options.model, options.callback, options.scope);					
				}
			});*/
			Ext.ModelManager.getModel(this.METADATA_MODEL).load(options.model, {
				scope: this,
				failure: function(record, operation) {
					console.log('error App.Stores.get: ' + operation.error);
				},
				success: function(record) {					
					this.cache[options.model] = record.get('cfg');
					this.makeStore(options.model, options.callback, options.scope);					
				}
			});
		}
		else 
			this.makeStore(options.model, options.callback, options.scope);			
	},
	
	
	makeStore: function(model, callback, scope) {
		//debugger;
		var cfg = this.cache[model];
		cfg.autoLoad = true;
		//
		Ext.callback(callback, scope, [Ext.create('Ext.data.Store', cfg)]);
	}
});