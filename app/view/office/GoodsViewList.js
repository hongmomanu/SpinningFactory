Ext.define('SpinningFactory.view.office.GoodsViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'goodsviewlist',
    //cls: 'x-contacts',
    config: {
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        variableHeights: true,
        scrollable: 'vertical',
        itemId:'goodsviewlist',
        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {

                this.select(index);
            }
        },
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,

        store: 'GoodViews',

        listeners: {
            painted: function(){
                this.fireEvent('viewshow', this);
            }
        },
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            align:'right',
            items: [

                {
                    text:'新增',
                    iconCls:'fa fa-plus-circle',
                    itemId:'newgoods'
                }


            ]
        }],
        itemTpl: [
            '<div class="headshot">',
            '{name}({data.length})',
            '</div>'
        ].join('')
    }
});