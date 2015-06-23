/**
 * Created by jack on 6/23/15.
 */
Ext.define('SpinningFactory.view.boss.BossMain', {
    //extend: 'Ext.tab.Panel',
    extend: 'Ext.NavigationView',
    xtype: 'main',
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


        items: [

            {

                //xtype:'panel',
                //xtype:'tabpanel',
                //tabBarPosition: 'bottom',
                //title:'<img style="float:left;padding-top: 5px;"  width="30px" height="30px" src="resources/icons/title.jpg">绍兴文理学院附属医院',
                //activeItem:0,
                //fullscreen : true,
                title:'<div >绍兴文理学院附属医院</div>',


                layout : 'fit',
                xtype: 'container',
                //layout: 'fit',

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
                                            text : '门诊预约',
                                            iconAlign : 'top',
                                            //icon : "resources/icons/muru.png",
                                            iconCls:'fa fa-ambulance fa-color-blue',
                                            itemId:'outpatientreserve'
                                        }, {
                                            xtype : 'button',
                                            text : '智能分诊',
                                            itemId:'possibleill',
                                            iconAlign : 'top',
                                            iconCls : "fa fa-bed fa-color-blue"
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
                                            text : '预约查询',
                                            iconAlign : 'top',
                                            itemId:'datequery',
                                            iconCls:'fa fa-search fa-5x fa-color-blue',
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
                                            text : '消费记录',
                                            iconAlign : 'top',
                                            //icon : "resources/icons/tiwen.png",
                                            iconCls : "fa fa-jpy fa-color-blue" ,
                                            handler : function() {
                                            }
                                        }, {
                                            xtype : 'button',
                                            text : '诊疗记录',
                                            iconAlign : 'top',
                                            //icon : "resources/icons/weinai.png",
                                            iconCls : "fa fa-hospital-o fa-color-blue",
                                            handler : function() {
                                            }
                                        }, {
                                            xtype : 'button',
                                            text : '健康百科',
                                            itemId:'healthwiki',
                                            iconAlign : 'top',
                                            iconCls : "fa fa-book fa-color-blue"
                                            //icon : "resources/icons/niaobu.png"

                                        }]
                                    }, {
                                        defaults : {
                                            xtype : 'container',
                                            margin : 10
                                        },
                                        items : [{
                                            xtype : 'button',
                                            text : '医院导航',
                                            iconAlign : 'top',
                                            itemId:'hospitalinfo',
                                            //icon : "resources/icons/muru.png",
                                            iconCls : "fa fa-car fa-color-blue"
                                        }, {
                                            xtype : 'button',
                                            text : '医院动态',
                                            iconAlign : 'top',
                                            itemId:'hospitalnews',
                                            //icon : "resources/icons/shuijiao.png",
                                            iconCls : "fa fa-hacker-news fa-color-blue"
                                        }, {
                                            xtype : 'button',
                                            text : '专家介绍',
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