Ext.define('SpinningFactory.store.client.GoodViews', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.client.GoodView',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"factory/getgoodsbykeyword"
        }
    }
});
