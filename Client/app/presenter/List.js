Ext.define('App.presenter.List', {	
	extend: 'App.core.Presenter',
	
	view: 'App.view.List',
	
	init: function() {
		var me = this;
		console.log('Hello');
		
		me.getStore(me.activity.model, me.onStoreReady);
			
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
		var columns = [],
			col;
							
		for (i = 0; i < model.fields.getCount(); i++) {
			col = {};
			col.header = model.fields.getAt(i).name;
			col.dataIndex = model.fields.getAt(i).name;
			col.flex = 1;
			columns.push(col);
		}				
		
		this.viewConfig.columns = columns;
		
		this.showView();		
	},
	
	onViewReady: function() {
		this.getView().store.reload();
	},
	
	openItem: function(record) {
		App.Activities.exec('views.' + this.activity.model + '.Item', {itemId: record.get('id'), data: record});
	}
	
	
});