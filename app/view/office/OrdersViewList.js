Ext.define('SpinningFactory.view.office.OrdersViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'ordersviewlist',
    //cls: 'x-contacts',
    config: {
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        variableHeights: true,
        scrollable: 'vertical',
        itemId:'ordersviewlist',
        /*onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {

                this.select(index);
            }
        },*/
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,

        store: 'OrderViews',

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
        itemTpl:new Ext.XTemplate(
            [
                '<table width="100%" height="100%"><tr>',

                '<td width="50%">',

                '<div style="text-align: center;">',
                '<img width="80px" height="80px"  src="'+Globle_Variable.serverurl+'{[this.shorterimg(values)]}">',
                '</div>',
                '<div class="headshot" style="text-align: center;">{goodinfo.goodsname}',
                '</div>',
                '</td>',

                '<td width="50%">',
                '<div style="text-align: center;color: #0946a2">',
                '<div style="text-align: left">数量:{num}<br></div>',
                '<div style="text-align: left"> 单位:{goodinfo.unit}<br></div>',
                '<div style="text-align: left">颜色:{colors}<br></div>',
                '<div style="text-align: left"><tpl if="status == 0">',
                '<p>新订单</p>',
                '<tpl elseif="status == 1">',
                '<p>已完成</p>',
                '<tpl else>',
                '<p>正在生产</p>',
                '</tpl></div>',
                '</div></td>',




                '</tr></table>'
            ].join(''),
            {
                shorterimg: function(values) {
                    return values.goodinfo.imgs.split(",")[0];
                }
            }
        )
    }
});