Ext.define('SpinningFactory.view.customer.Customers', {
    extend: 'Ext.List',
    xtype: 'customers',
    alias: 'widget.Customers',
    config: {

        variableHeights: true,
        itemId:'customerlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        title:'我的客户',
        store: 'Customers',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{customerinfo.realname}',
            '</div>'
        ].join('')
    }
});