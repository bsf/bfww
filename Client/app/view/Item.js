Ext.define('App.view.Item' ,{
    extend: 'Ext.form.Panel',
	
	title: 'Simple Form',
    bodyPadding: 5,
    width: 350,

  

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
   
	tbar: [
		{ xtype: 'button', text: 'Сохранить',
		        
			formBind: true, //only enabled once the form is valid
			disabled: true,
			handler: function() {
				var form = this.getForm();
				if (form.isValid()) {
					this.getPresenter().save();					
				}					
			}
		
		},
		{ xtype: 'button', text: 'Отменить', 
			handler: function() {
				this.getPresenter().closeView();				
			}
		}
		
	],
   
	listeners: {
		afterrender: function(form, eOpts) {
			for (var i = 0; i < this.items.getCount(); i++) {
				var f = this.items.getAt(i);	
				
				//if (i == 0) {
					//f.setValue('fdaf');
					//f.focus(10); 
				//}
				
				f.addListener('specialkey', function(field, e){
                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                    if (e.getKey() == e.ENTER) {
                        var idx = field.up('form').items.indexOf(field);
						if (field.up('form').items.getAt(idx + 1))
							field.up('form').items.getAt(idx + 1).focus();
                    }
					}
				);
				
				console.log(f);
			}
		}
	},
	
	initComponent: function() {
        		
		for (var i = 0; i < this.tbar.length; i++) 
			this.tbar[i].scope = this;
		
        this.callParent(arguments);
    },
	
	getPresenter: function() {
		return this.presenter;
	}
});