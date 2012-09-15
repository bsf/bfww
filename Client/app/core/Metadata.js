Ext.define('App.core.Metadata', {
    extend: 'Ext.data.Model',
	primaryId: 'modelId',
	fields: ['modelId', 'model', 'store'],
    proxy: {
        type: 'rest',
        url : 'data/meta',
		format: 'json',
        reader: {
            type: 'json',
            root: 'metadata',
            successProperty: 'success'
        }
    }
});