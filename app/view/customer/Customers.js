Ext.define('SpinningFactory.view.customer.customers', {
    extend: 'Ext.List',
    xtype: 'customers',
    alias: 'widget.customers',
    config: {

        variableHeights: true,
        itemId:'customerlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        store: 'customers',

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