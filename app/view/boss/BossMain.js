/**
 * Created by jack on 6/23/15.
 */
Ext.define('SpinningFactory.view.boss.BossMain', {
    //extend: 'Ext.tab.Panel',
    extend: 'Ext.NavigationView',
    xtype: 'bossmain',
    requires: [
        'Ext.TitleBar',
        'Ext.Ajax',
        'Ext.Video'
    ],
    config: {

        fullscreen: true,
        centered: true,
        autoDestroy: false,
        //scrollable: 'vertical',
        scrollable:false,

        height: '100%',
        width: '100%',
        style: {
            'padding': '1px'
        },

        navigationBar : {
            docked : 'top',
            items : [

                {
                    xtype:'mainmenu',
                    iconCls:'fa fa-cog'
                }



            ]
        },



        items: [

            {

                title:'<div >'+Globle_Variable.factoryinfo.factoryname+'</div>',
                layout : 'fit',
                xtype: 'container',
                items: [



                    {
                        title: '首页',
                        iconCls: 'home',
                        //xtype:'navigationview',
                        styleHtmlContent: true,
                        scrollable: true,
                        itemId: 'homepage',
                        //styleHtmlContent: true,
                        layout: 'vbox',


                        items: [
                            {
                                xtype : 'container',
                                title : '',
                                flex:1,
                                height: '100%',
                                width: '100%',
                                centered: true,
                                style : 'background-color: #FFFFFF',
                                layout : {
                                    type : 'vbox',
                                    align : 'center'
                                },
                                items : [{
                                    xtype : 'container',
                                    flex:1,
                                    margin : '-20 0 0 0',
                                    cls : 'home',
                                    defaults : {
                                        xtype : 'container',
                                        layout : 'hbox'
                                    },
                                    centered: true,

                                    items : [{
                                        defaults : {
                                            xtype : 'container',
                                            margin : 10
                                        },

                                        items : [{
                                            xtype : 'button',
                                            text : '订单审核',
                                            iconAlign : 'top',
                                            //icon : "resources/icons/muru.png",
                                            iconCls:'fa fa-question-circle fa-color-blue',
                                            itemId:'outpatientreserve'
                                        }, {
                                            xtype : 'button',
                                            text : '订单状态',
                                            itemId:'possibleill',
                                            iconAlign : 'top',
                                            iconCls : "fa fa-info-circle fa-color-blue"
                                            //icon : "resources/icons/weinai.png"
                                        },/* {
                                         xtype : 'button',
                                         text : '取报告单',
                                         iconAlign : 'top',
                                         icon : "resources/icons/niaobu.png",
                                         handler : function() {
                                         }
                                         },*/ {
                                            xtype : 'button',
                                            text : '历史订单',
                                            iconAlign : 'top',
                                            itemId:'datequery',
                                            iconCls:'fa fa-history fa-color-blue',
                                            //icon : "resources/icons/niaobu.png",
                                            handler : function() {
                                            }
                                        }]
                                    }, {
                                        defaults : {
                                            xtype : 'container',
                                            margin : 10
                                        },
                                        items : [{
                                            xtype : 'button',
                                            text : '我的客户',
                                            iconAlign : 'top',
                                            //icon : "resources/icons/tiwen.png",
                                            iconCls : "fa fa-users fa-color-blue" ,
                                            handler : function() {
                                            }
                                        }, {
                                            xtype : 'button',
                                            text : '成交额',
                                            iconAlign : 'top',
                                            //icon : "resources/icons/weinai.png",
                                            iconCls : "fa fa-jpy fa-color-blue",
                                            handler : function() {
                                            }
                                        }, {
                                            xtype : 'button',
                                            text : '业务统计',
                                            itemId:'healthwiki',
                                            iconAlign : 'top',
                                            iconCls : "fa fa-bar-chart fa-color-blue"
                                            //icon : "resources/icons/niaobu.png"

                                        }]
                                    }, {
                                        defaults : {
                                            xtype : 'container',
                                            margin : 10
                                        },
                                        items : [{
                                            xtype : 'button',
                                            text : '合作工厂',
                                            iconAlign : 'top',
                                            itemId:'hospitalinfo',
                                            //icon : "resources/icons/muru.png",
                                            iconCls : "fa fa-user-plus fa-color-blue"
                                        }, {
                                            xtype : 'button',
                                            text : '行业咨询',
                                            iconAlign : 'top',
                                            itemId:'hospitalnews',
                                            //icon : "resources/icons/shuijiao.png",
                                            iconCls : "fa fa-newspaper-o fa-color-blue"
                                        }, {
                                            xtype : 'button',
                                            text : '潜在客户',
                                            iconAlign : 'top',
                                            itemId:'expertinfo',
                                            //icon : "resources/icons/about.png",
                                            iconCls : "fa fa-user fa-color-blue"

                                        }]
                                    }]

                                }]
                            }

                        ]
                    }
                ]

            }


        ]





    }
});