Ext.define('SpinningFactory.view.factory.Factorys', {
    extend: 'Ext.List',
    xtype: 'factorys',
    alias: 'widget.factorylist',
    config: {
        title: '我的工厂',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'factorylist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        grouped:true,
        //indexBar:true,
        store: 'factorys',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{userinfo.sectionname} {userinfo.realname}',
            '</div>'
        ].join('')
    }
});