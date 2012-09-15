Ext.define('App.core.Presenter', {	

    //view: '',	
	viewConfig: {},
		
	activity: null,
	itemId: null,
	args: null,
	
	constructor: function(activity, itemId, args) {
		var me = this;
	    console.log('prenter:' + activity.cls + itemId);
		me.activity = activity;
		me.itemId = itemId;
		me.args = args;
		me.viewConfig.title = me.activity.title;
		me.viewConfig.itemId = itemId;
		me.viewConfig.presenter = me;
		if (me.init) 
			me.init();		
	},
	
	getView: function() {		
		if (!this.viewInst) 
			this.viewInst = Ext.create(this.view, this.viewConfig);
		
		return this.viewInst;
	},
	
	showView: function() {	
		
		App.ShellView.showContent(this.getView());
		
		console.log('presenter.showView()');
		if (this.onViewReady) 
			this.onViewReady();
	},
	
	closeView: function() {
		this.getView().close();
	},
	
	getStore: function(model, callback) {
		App.getStore({model: model, scope: this, callback: callback});
	},
	
	getModel: function(model, callback) {
		App.getModel({model: model, scope: this, callback: callback});
	}
});