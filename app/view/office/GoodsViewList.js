Ext.define('SpinningFactory.view.office.GoodsViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'goodsviewlist',
    //cls: 'x-contacts',
    config: {
        title: '成员管理',
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        variableHeights: true,
        itemId:'goodsviewlist',
        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {

                this.select(index);
            }
        },
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        //grouped:true,
        //indexBar:true,
        store: 'GoodViews',

        listeners: {
            painted: function(){
                this.fireEvent('viewshow', this);
            }
        },
        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{name}({data.length})',
            '</div>'
        ].join('')
    }
});