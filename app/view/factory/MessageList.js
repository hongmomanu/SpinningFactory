Ext.define('SpinningFactory.view.factory.MessageList', {
    extend: 'Ext.List',
    xtype: 'messagelist',
    alias: 'widget.MessageList',
    config: {
        title: '我的工厂',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'messagelist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        store: 'Messages',

        listeners: {
            painted: function(){

                //this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{factoryinfo.factoryname} {factoryuser.realname}',
            '</div>'
        ].join('')
    }
});