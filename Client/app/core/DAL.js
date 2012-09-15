Ext.define('App.core.DAL', {	
	requires: ['App.core.Metadata'],
			
	METADATA_MODEL: 'App.core.Metadata',
	
	meta: {},
		
	getStore: function(options) {
		var me = this;
		options = options || {};
		
		if (!(options.model in me.meta)) { 
					
			/*Ext.ModelManager.getModel(this.METADATA_MODEL).load(options.model, {
				scope: this,
				failure: function(record, operation) {
					console.log('error get metadata: ' + options.model + ' error: ' + operation.error);
					Ext.callback(options.callback, scope, [null, false, operation.error]);
				},
				success: function(record) {														
					console.log('1');
					var modelId = record.get('modelId'),
					    modelCfg = record.get('model'),
						storeCfg = record.get('store');
						
					modelCfg.extend = 'Ext.data.Model';
					if (!Ext.ModelManager.isRegistered(modelId))
						Ext.define(modelId, modelCfg);					
						
					storeCfg.model = modelId;
					this.metaStores[options.model] = storeCfg;
					this.makeStore(options.model, options.callback, options.scope);					
				}
			});*/
			me.loadMetadata(options, 'store');
		}
		else 
			me.makeStore(options);			
	},

	getModel: function(options) {
		var me = this;
		options = options || {};
		
		if (!(options.model in me.meta)) 
			me.loadMetadata(options, 'model');		
		else 
			me.makeModel(options);			
	},
	
	loadMetadata: function(options, kind) {
		var me = this;
		console.log('load metadata:' + options.model);		
		Ext.ModelManager.getModel(me.METADATA_MODEL).load(options.model, {
			scope: me,
			failure: function(record, operation) {
				debugger;
				console.log('error get metadata: ' + options.model + ' error: ' + operation.error);
				Ext.callback(options.callback, scope, [null, false, operation.error]);
			},
			success: function(record) {														
				console.log('1');				
				var meta = {},
				    modelId = record.get('modelId'),
				    modelCfg = record.get('model'),
					storeCfg = record.get('store');
						
				modelCfg.extend = 'Ext.data.Model';
				console.log('def ' + modelId);
				if (!Ext.ModelManager.isRegistered(modelId))
					Ext.define(modelId, modelCfg);					
						
				storeCfg.model = modelId;
				
				meta.modelId = modelId;
				meta.storeCfg = storeCfg;
				meta.modelCfg = modelCfg;
				me.meta[options.model] = meta;
								
				if (kind == 'store')
					me.makeStore(options);
				else
					me.makeModel(options);
			}
		});
			
	},
	
	makeModel: function(options) {
		//debugger;
		var cfg = this.meta[options.model].modelCfg;
		Ext.callback(options.callback, options.scope, [Ext.create(this.meta[options.model].modelId, cfg), true]);
	},
	
	makeStore: function(options) {
		//debugger;
		var cfg = this.meta[options.model].storeCfg;
		//cfg.model = model;
		cfg.autoLoad = false;		
		console.log(cfg);	
		Ext.callback(options.callback, options.scope, [Ext.create('Ext.data.Store', cfg), true]);
	}
});