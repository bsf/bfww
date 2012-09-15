Ext.define('App.presenter.Item', {	
	extend: 'App.core.Presenter',
	
	view: 'App.view.Item',
	
	init: function() {
		var me = this;
		console.log('Hello');
		
		//me.getStore(me.activity.model, me.onStoreReady);
		me.getModel(me.activity.model, me.onModelReady);	
			
	},
	
	onStoreReady: function(store, success) {
		console.log('store ready');
		var me = this;
		if (success) {
			me.viewConfig.store = store;
			me.getModel(me.activity.model, me.onModelReady);	
		}
	},
	
	onModelReady: function(model, success) {
		console.log('model ready');
		
		var me = this,
		    items = [],
			item;
					
		for (i = 0; i < model.fields.getCount(); i++) {
			item = {};
			item.fieldLabel = model.fields.getAt(i).name;
			item.name = model.fields.getAt(i).name;			
			items.push(item);
		}				
		
		this.viewConfig.title = me.args.data.get('name');
		this.viewConfig.items = items;
	
		this.showView();		
	},
	
	onViewReady: function() {
		this.getView().getForm().loadRecord(this.args.data);
	},
	
	save: function() {
		var me = this,
		    form = this.getView().getForm(),		
			record = form.getRecord(),
			values = form.getValues();

		record.set(values);		
		record.save({
			success: function() {
				console.log('The User was updated');
				me.closeView();
			}
		});
	}
		
	
	
});