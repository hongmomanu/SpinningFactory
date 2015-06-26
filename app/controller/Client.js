/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Client', {
    extend: 'Ext.app.Controller',
    config: {
        views: [

            'client.ClientMain',
            'client.GoodsViewList'

        ],
        models: [
            'client.GoodView'
        ],
        stores: [
            'client.GoodViews'

        ],
        control: {
            clientmainview:{
                initialize:'initFunc',
                returnhomemenu:'returnhomemenuFunc',
                showqrcode:'showqrcodeFunc',
                logoutmenu:'logoutShow',
                showabout:'showaboutFunc',
                loginmenu:'loginShow'


            },
            goodsviewlistview:{

                viewshow:'viewinit',
                itemtap: 'onGoodsSelect'
            }

        },
        refs: {
            officemainview: 'clientmain',
            clientgoodsviewlistview: 'clientgoodsviewlist',

            navView:'clientmain #villagenavigationview'
        }
    },
    // app init func

    initFunc:function (item,e){


        item.getTabBar().add({
            //xtype: 'button',
            xtype:'mainmenu',
            ui: 'confirm',
            iconCls:'fa fa-cog fa-color-blue'

        });

    },


    onGoodsSelect:function(list, index, node, record){

        var nav=this.getNavView();
        var me=this;

        //alert(1);
        console.log(record);
        var data=record.data;
        data.gid=data._id;
        if(!this.altergoodlView){
            this.altergoodlView=Ext.create('SpinningFactory.view.office.EditGoodsForm');
        }
        //this.altergoodlView.setTitle(record.get('name'));
        this.altergoodlView.pics=data.imgs.split(",");
        this.altergoodlView.setValues(data);
        nav.push(this.altergoodlView);
    },

    altergood:function(btn){

        var formpanel=btn.up('formpanel');
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('SpinningFactory.model.office.GoodView', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    me.getNavView().pop();
                    var store=me.getGoodsviewlistview().getStore();
                    store.load();
                }else{
                    Ext.Msg.alert('添加失败', '修改货物出错', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="factory/altergoodsbyfid";
            var params=formpanel.getValues();
            params.imgs=formpanel.pics.join(",");
            params.factoryid=Globle_Variable.factoryinfo._id;
            //params.gid=Globle_Variable.factoryinfo._id;
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    savenewgood:function(btn){
        var formpanel=btn.up('formpanel');
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('SpinningFactory.model.office.GoodView', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    me.getNavView().pop();
                    var store=me.getGoodsviewlistview().getStore();
                    store.load();
                }else{
                    Ext.Msg.alert('添加失败', '添加货物出错', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="factory/addgoodsbyfid";
            var params=formpanel.getValues();
            if(!formpanel.pics)formpanel.pics='';
            params.imgs=formpanel.pics.join(",");
            params.factoryid=Globle_Variable.factoryinfo._id;
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }


    },

    shownewgoodsform:function(btn){

        if(!this.goodsform)this.goodsform=Ext.create('SpinningFactory.view.office.NewGoodsForm');
        this.getNavView().push(this.goodsform);

    },
    viewinit:function(view){
        var store=view.getStore();
        var seachinput=view.down('#seachinput');
        store.load({
            //define the parameters of the store:
            params:{
                keyword : seachinput.getValue()/*,
                start:0,
                limit:10*/
            },
            scope: this,
            callback : function(records, operation, success) {

            }});
    },
    returnhomemenuFunc:function(){
        Ext.Viewport.hideMenu('right');
        var nav=this.getOfficemainview();
        nav.setActiveItem(0);

    },
    logoutShow:function(){


        Ext.Msg.confirm( "提示", "是否确认退出", function(btn){
            if(btn==='yes'){
                Globle_Variable.user=null;
                localStorage.user="";
                var menu=Ext.Viewport.down('mainmenu');
                menu.getMenuItems()[0].hidden=false;
                menu.getMenuItems()[1].hidden=true;
                Ext.Viewport.hideMenu('right');
                Ext.Msg.alert("提示信息","退出成功!",function(){
                    window.location.reload();
                });
            }else{

            }
        })



    },

    makeBackGroundListener:function(){
        document.addEventListener('deviceready', function () {
            // cordova.plugins.backgroundMode is now available

            /*cordova.plugins.backgroundMode.setDefaults({
                text:'e医通',
                ticker:'e医通患者端正在后台运行',
                title:'e医通患者端'
            });

            // Enable background mode
            cordova.plugins.backgroundMode.enable();*/




        }, false);

    },
    initNotificationClick:function(e){




            ///Ext.Msg.alert('clicked event0', 'is clicked');

            var factoryController=this.getApplication().getController('factory');
            var customerController=this.getApplication().getController('customer');
            cordova.plugins.notification.local.on("click", function (notification) {

                var data=JSON.parse(notification.data);
                var message=data.data;
                var type=data.type;
                if(type=='recommend'){
                    factoryController.receiveRecommendShow(message,e);
                }else if(type=='quickapplying'){
                    villageController.applywaitinginfoShow(message,e)
                }else if(type=='quickaccept'){
                    customerController.receiveQuickAcceptShow(message,e)
                }
                else if(type=='recommendconfirm'){

                    factoryController.receiverecommendConfirmShow(message, e);
                }
                else{
                    factoryController.receiveMessageShow(message,e);
                }


                //(Ext.bind(factoryController.receiveMessageShow, factoryController) (notification.data,e)) ;

            });






    },
    autoLogin:function(){

        var userinfo=JSON.parse(localStorage.user);

        if(userinfo){
            var formpanel=this.getLoginformcontent();
            formpanel.setValues(userinfo);
            this.docustomerLogin();

        }

    },
    pauseListener:function(){
        document.addEventListener("pause", onPause, false);

        function onPause() {
            // Handle the pause event
            //Ext.Msg.alert('停止测试', '停止测试', Ext.emptyFn);
            Globle_Variable.isactived=false;
        }

    },

    resumeListener:function(){
        document.addEventListener("resume", onResume, false);

        function onResume() {
            // Handle the resume event
            //Ext.Msg.alert('恢复测试', Globle_Variable.isactived+'121', Ext.emptyFn);
            Globle_Variable.isactived=true;
        }

    },
    backbuttonListener:function(){
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown() {
            navigator.Backbutton.goHome(function() {
                //console.log('success')
            }, function() {
                //console.log('fail')
            });
        }

    },


    makeLocationListener:function(){

        function onSuccess(position) {
            /*var element = document.getElementById('geolocation');
             element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
             'Longitude: ' + position.coords.longitude     + '<br />' +
             '<hr />'      + element.innerHTML;*/
            //Ext.Msg.alert('location suc',position.coords.latitude);

            localStorage.lat=position.coords.latitude;
            localStorage.lon=position.coords.longitude;

        }
        // onError Callback receives a PositionError object
        //
        function onError(error) {

            if(!localStorage.lat)localStorage.lat=30.0111;
            if(!localStorage.lon)localStorage.lon=120.0111;
        }
        // Options: throw an error if no update is received every 5 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});

    },
    docustomerLogin:function(btn){

        var formpanel=this.getLoginformcontent();
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('SpinningFactory.model.login.Login', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){

                    var user=res.user;
                    Ext.Viewport.removeAt(0);
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;
                    if(user.usertype===0){
                        Ext.Viewport.add(Ext.create('SpinningFactory.view.boss.BossMain'));
                    }
                    /*Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('SpinningFactory.view.Main'));
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;
                    var customerCotroller=me.getApplication().getController('customer');
                    var factoryCotroller=me.getApplication().getController('factory');
                    customerCotroller.initcustomerList();
                    factoryCotroller.initfactoryList();*/


                }else{
                    Ext.Msg.alert('登录失败', '用户名密码错误', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="user/customerlogin";
            var params=formpanel.getValues();
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    doNewcustomer:function(btn){
        var view=this.getLoginformview();
        var registerView=Ext.create('SpinningFactory.view.register.Register');
        view.push(registerView);
    }
});