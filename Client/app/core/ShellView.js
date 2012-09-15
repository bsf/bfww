Ext.define('App.core.ShellView', { 
	extend: 'Ext.container.Viewport',			
	layout: 'border',
	
	
	navTree: null,
	shellContent: null,
	
	initComponent: function() {
		
		var panelTest = Ext.create('Ext.panel.Panel', {
			title: 'test1',
			html: 'бла бла',
			id: 'TestPanel1'
		});  
		
		var shellTitle = Ext.create('Ext.panel.Panel', {
			region: 'north',
			title: 'Гермес',
			//html: '<h1 class="x-panel-header">Page Title</h1>',
			autoHeight: true,
			border: false,
			margins: '0 0 5 0'
		});
	
		this.navTree = Ext.create('Ext.tree.Panel', {
					region: 'west',					
					collapsible: true,
					split: true,
					title: 'Главное меню',
					width: 200,
					rootVisible: false,
					useArrows: true,
					listeners: {
						itemclick: {
							fn: function (view, record, item, index, e) {
								if (record.isLeaf&&record.get('id'))
									App.Activities.exec(record.get('id'));																	
							}
						}
					}
					
		});
		
		/*var shellNotify = Ext.create('Ext.panel.Panel', {
			region: 'south',
			title: 'Информация',
			collapsible: true,
			split: true,
			height: 150
			
		});*/
		
		this.shellContent = Ext.create('Ext.tab.Panel', {
			region: 'center',
			autoDestroy: false,
			plain: true,
			activeTab: 0,      // First tab active by default
			items: {
				title: 'Welcome',
			    html: 'Привет!',
				itemId: 'views.APP.About'
			}
		});										
	
	
	
        Ext.apply(this, {items: [shellTitle, this.navTree, this.shellContent]});

        this.callParent(arguments);
    },
	
	
	init: function() {
		console.log('shellView init');
		this.fillNav();
		App.Activities.on('views.APP.About', App.UI.showView, App.UI);		
	},
	
	fillNav: function() {
		var root = {expanded: true,	children: []},		    
		    groupHash = {},
		    activity = null,
			groupName = '',
			trItem = null,
			trGroup = null,
			trGroups = [];

			//groups.push({ text: "Сервис", expanded: true, children: []});
		
		for (var key in App.Activities.list) {		
			activity = App.Activities.list[key];
			groupName = activity.grp;
			if (!groupName) continue;
			
			trItem = {};
			trItem.text = activity.title;
			trItem.leaf = true;
			trItem.id = activity.uri;
			trItem.qtip = activity.hint;
			
			if (groupHash[groupName]) 			
				groupHash[groupName].push(trItem);				
			else {
				groupHash[groupName] = [];
				groupHash[groupName].push(trItem);	
			}	
		}
		
		for (var key in groupHash) {
			trGroup = {expanded: true, children: []};
			trGroup.text = key;
			trGroup.children = groupHash[key];
			trGroups.push(trGroup);
		}
		
		root.children = trGroups;
		
		this.navTree.setRootNode(root);
	},
	
	showContent: function(content) {		
		var check = this.findContent(content.itemId);
		if (!check) {
			content.closable = true;
			this.shellContent.add(content);		
			this.shellContent.setActiveTab(content);
		}
		else
		  this.shellContent.setActiveTab(check);
		
	},
	
	findContent: function(itemId) {
		return this.shellContent.getComponent(itemId);
	}
	
});	