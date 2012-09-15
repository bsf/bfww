Ext.define('App.core.UI', {
   
	views: ['List', 'Item'],
	
	presenters: [],
	
    init: function() {        
		console.log('ui init');		
		for (var i = 0; i < this.views.length; i++) {
			App.Activities.on(this.views[i], this.showView, this);					
		}
		
					
    },
	
	showView: function(activity, args) {		

		console.log('show view ' + activity.uri);
		var itemId = activity.uri;
		
		//for (p in args)
		if (args)
		  itemId += args.itemId;
			
		var view = App.ShellView.findContent(itemId);
		if (!view) {
			this.createView(activity, itemId, args)
			//App.ShellView.showContent(this.createView(activity, itemId, args));			
		}
		else
			App.ShellView.showContent(view);
	},
	
	createView: function(activity, itemId, args) {
		console.log('create view ' + itemId);
		this.presenters[itemId] = Ext.create('App.presenter.' + activity.cls, activity, itemId, args);
		//console.log('presenter '+presenter.view);		
	}
	
    
});