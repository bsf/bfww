Ext.ns('App');
Ext.define('App.core.Shell', {		
		
	shellView: null,
	dal: null,
	ui: null,
	
	constructor: function() {
		var me = this;
		console.log('shell initialize');	
			
		App.Activities = Ext.create('App.core.Activities');
		
		me.ui = Ext.create('App.core.UI');
		me.ui.init(); 
		
		App.UI = me.ui;
		
		this.dal = Ext.create('App.core.DAL');		
		App.getStore = function(config) {
			me.dal.getStore(config);
		}
		
		App.getModel = function(config) {
			me.dal.getModel(config);
		}
		console.log('shell initialized');	
	},
	
	load: function() {
		console.log('shell load');
				
        this.shellView = Ext.create('App.core.ShellView');
		App.ShellView = this.shellView;
		
		App.getStore({model: 'Activity', scope: this, 
			callback: this.onActivityStoreReady            
		});
				
	},
	
	onActivityStoreReady: function(store, success) {
		
		console.log('shell activity loaded');
		
		store.load({		
			scope: this,
			callback: function(records, operation, success) {								
			
				//load activities from server
				for (i = 0; i < records.length; i++) {
					var activityModel = records[i];
					var activity = App.Activities.get(activityModel.get('uri'));
					for (y = 0; y < activityModel.fields.getCount(); y++) {
						var propName = activityModel.fields.getAt(y).name;
						//if (propName in activity)
							activity[propName] = activityModel.get(propName);
					}					
				}
				this.shellView.init();				
			}
		});
	}
	
	
});