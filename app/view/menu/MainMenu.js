Ext.define('SpinningFactory.view.menu.MainMenu', {
    extend: 'Ext.ux.ActionOverFlowMenuButton',
    xtype:'mainmenu',
    alias: 'widget.mainmenus',

    requires: [

    ],

    config: {

        docked: 'right',
        align:'right',
        iconCls:'home',
        //border:0,
        menuItems: [


            {
                text: '用户退出',
                itemId:'logoutmenu',
                iconCls: 'user',

                scope: this,
                handler: function() {
                    var mainview=Ext.Viewport.down('officemain');
                    mainview=mainview?mainview:Ext.Viewport.down('bossmain');
                    mainview.fireEvent('logoutmenu', mainview);
                }
            },

            {
                xtype: 'button',
                ui: 'plain',
                text: '______',
                disabled: true,
                cls: 'separator'
            },{
                text: '返回首页',
                iconCls: 'home',
                scope: this,
                handler: function(item) {



                    var mainview=Ext.Viewport.down('navigationview');
                    mainview=mainview?mainview:Ext.Viewport.down('tabpanel');
                    mainview.fireEvent('returnhomemenu', mainview);

                }
            }, {
                text: '软件分享',
                iconCls: 'organize',
                scope: this,
                handler: function() {
                    var mainview=Ext.Viewport.down('navigationview');
                    mainview=mainview?mainview:Ext.Viewport.down('tabpanel');
                    mainview.fireEvent('showqrcode', mainview);
                    //Ext.Viewport.hideMenu('right');
                    /*Ext.getCmp('searchBar').hide();
                     this.container.setActiveItem(1);
                     this.getBBMStore().clearFilter();*/
                }
            },

            {
                text: '关于我们',
                iconCls: 'info',
                scope: this,
                handler: function() {
                    var mainview=Ext.Viewport.down('navigationview');
                    mainview=mainview?mainview:Ext.Viewport.down('tabpanel');
                    mainview.fireEvent('showabout', mainview);
                    //Ext.Viewport.hideMenu('right');
                    /*Ext.getCmp('searchBar').hide();
                     this.container.setActiveItem(1);
                     this.getBBMStore().clearFilter();*/
                }
            }]

    }
});