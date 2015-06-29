Ext.define('SpinningFactory.view.client.ClientMain', {
    extend: 'Ext.tab.Panel',
    xtype: 'clientmain',
    alias: 'widget.ClientMain',
    //itemId: 'loginpanel',
    requires: [
        'Ext.TitleBar',
        'Ext.NavigationView'
    ],
    config: {
        tabBarPosition: 'bottom',
        fullscreen: true,

        items: [
            {
                title: '我的工厂',
                iconCls: 'fa fa-tasks',

                styleHtmlContent: true,
                scrollable: true,
                layout:'fit',

               items: [
                   {
                       docked: 'top',
                       xtype: 'titlebar',
                       title: '我的工厂'
                   },

                   {
                       xtype: 'factorylist'

                   }

               ]


            },
            {
                title: '查找商品',
                iconCls: 'fa fa-shopping-cart',
                styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',

                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,
                        scrollable: false,
                        //fullscreen: true,
                        itemId: 'villagenavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'clientgoodsviewlist',
                                title: '查找商品'
                            }
                        ]


                    }

                ]
            },

            {
                title: '我的消息',
                iconCls: 'fa fa-weixin',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '我的消息'/*,
                        items:[

                            {
                                xtype:'mainmenu',
                                iconCls:'fa fa-cog'
                            }
                        ]*/
                    },

                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
});
