Ext.define('App.view.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',

    title : 'All Users',
	
	tbar: [
		{ xtype: 'button', text: 'Закрыть',
			handler: function() {
				this.close();				
			}
		
		},
		{ xtype: 'button', text: 'Обновить', 
			handler: function() {
				this.store.reload();				
			}
		},
		{ xtype: 'button', text: 'Открыть', 
			handler: function() {
			    console.log(this.getSelectionModel().getSelection().length);
				this.getPresenter().openItem(this.getSelectionModel().getSelection()[0]);				
				//App.Activities.exec('views.BDS_MG.Item', this.getSelectionModel().getSelection[0]);				
			}
		}
		
	],
	
	
	stripeRows: true,
		
	listeners: {
		itemdblclick: function(view, record, item, index, e, eOpts ) {
			this.getPresenter().openItem(record);
			//App.Activities.exec('views.BDS_MG.Item', record);// this.getSelectionModel().getSelection[0]);				
		}
	},
	
    initComponent: function() {
        
		//console.log('list args '  + args);
       /*this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];
		*/
		/*this.title = this.activity.title;
		
		var model = Ext.create(this.activity.model),
			columns = [],
			col;
							
		for (y = 0; y < model.fields.getCount(); y++) {
			col = {};
			col.header = model.fields.getAt(y).name;
			col.dataIndex = model.fields.getAt(y).name;
			col.flex = 1;
			columns.push(col);
		}		

		this.columns = columns;
		*/
		
		for (var i = 0; i < this.tbar.length; i++) 
			this.tbar[i].scope = this;
		
        this.callParent(arguments);
    },
	
	getPresenter: function() {
		return this.presenter;
	}
});