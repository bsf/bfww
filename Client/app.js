Ext.ns('App');
Ext.application({  
	
    name: 'App',

    appFolder: 'app',

	shell: null,
	
    controllers: [  ],	
	
	views: [],
	
	//stores: ['Users', 'Activities'],


	init: function() {
		this.shell = Ext.create('App.core.Shell');
	//	this.shell.init();			
	},
	
    launch: function() {
		this.shell.load();		
	}
	
});