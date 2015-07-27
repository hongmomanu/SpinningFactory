Ext.define('SpinningFactory.store.client.ClientOrderViews', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.client.ClientOrderView',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"factory/getordersbycid"
        }
    }
});
