/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Boss', {
    extend: 'Ext.app.Controller',


    config: {

        views: [
         'menu.MainMenu',
         'boss.BossMain',
         'boss.NewMemberForm',
         'boss.MembersViewList'
        ],
        models: [
            'boss.MemberView'
        ],
        stores: [

            'boss.MemberViews'
            //'customers.customers',

            //'Contacts'
        ],
        control: {


            bossmainview:{
                initialize:'initFunc',
                returnhomemenu:'returnhomemenuFunc',
                showqrcode:'showqrcodeFunc',
                logoutmenu:'logoutShow',
                showabout:'showaboutFunc',
                loginmenu:'loginShow'


            },
            membersview:{
                viewshow:'viewInit'
            },
            customersbtn:{
                tap:'showcustomers'

            },
            usersmanagerbtn:{
                tap:'showusers'

            },
            mymessagesbtn:{
                tap:'showmymessages'

            },
            newuserbtn:{
                tap:'shownewuser'

            },
            addnewuserbtn:{
                tap:'addnewuser'

            },
            cancelnewuserbtn:{
                tap:'cancelnewuser'

            }

        },
        refs: {
            bossmainview: 'bossmain',
            membersview:'bossmain #membersviewlist',
            customersbtn: 'bossmain #mycustomers',
            usersmanagerbtn: 'bossmain #usersmanager',
            newuserbtn: 'bossmain #newuser',
            addnewuserbtn: 'newmemberform #add',
            cancelnewuserbtn: 'newmemberform #cancel',
            mymessagesbtn: 'bossmain #mymessages'

        }
    },
    // app init func

    initFunc:function (item,e){
        this.websocketInit();

    },
    returnhomemenuFunc:function(){
        Ext.Viewport.hideMenu('right');
        var nav=this.getBossmainview();
        nav.pop(nav.getInnerItems().length - 1);

    },
    shownewuser:function(btn){

        if(!this.newmermbersView){
            this.newmermbersView=Ext.create('SpinningFactory.view.boss.NewMemberForm');
        }
        this.getBossmainview().push(this.newmermbersView);


    },
    viewInit:function(view){
        var store=view.getStore();
        store.load({
            //define the parameters of the store:
            params:{
                factoryid : Globle_Variable.user.factoryid
            },
            scope: this,
            callback : function(records, operation, success) {

            }});
    },

    addnewuser:function(btn){

        alert(1);
    },
    cancelnewuser:function(btn){

        alert(2);

    },

    showusers:function(btn){

        if(!this.mermbersView){
            //this.reserveView=Ext.create('AffiliatedHospital.view.outpatient.ReserveView');
            this.mermbersView=Ext.create('SpinningFactory.view.boss.MembersViewList');

        }
        var store=this.mermbersView.getStore();
        store.load({
            params:{
                userid:Globle_Variable.user._id
            }
        });

        this.getBossmainview().push(this.mermbersView);


    },
    showcustomers:function(btn){

        if(!this.customersView){
            //this.reserveView=Ext.create('AffiliatedHospital.view.outpatient.ReserveView');
            this.customersView=Ext.create('SpinningFactory.view.customer.Customers');

        }
        var store=this.customersView.getStore();
        store.load({
            params:{
                userid:Globle_Variable.user._id
            }
        });

        this.getBossmainview().push(this.customersView);
    },

    showmymessages:function(){

        if(!this.mymessageView){
            //this.reserveView=Ext.create('AffiliatedHospital.view.outpatient.ReserveView');
            this.mymessageView=Ext.create('SpinningFactory.view.factory.MessageList');

        }
        testobjs=this.getBossmainview();


        if(this.getBossmainview().getInnerItems().length<2){
            this.getBossmainview().push(this.mymessageView);
        }



    },



    showngoodsdetailchatview:function(btn){


        var form=btn.up('formpanel');
        var formvalues=form.getValues();
        var factoryid=formvalues.factoryid;
        var userid=Globle_Variable.user._id;
        var me=this;
        var successFunc = function (response, action) {

            var res=JSON.parse(response.responseText);
            if(res.success){
                //Ext.Msg.alert('成功', '推荐医生成功', Ext.emptyFn);
                console.log(res);
                testobj=me;
                me.getClientmainview().setActiveItem(2);
                var messagelist=me.getMessagelist();
                var store=messagelist.getStore();
                var data=store.data.items;
                var flag=false;
                for(var i=0;i<data.length;i++){
                    if(data[i]._id==res.factoryuser._id){
                        flag=true;
                        messagelist.select(i);
                        messagelist.fireEvent('itemtap',messagelist,i,messagelist.getActiveItem(),store.getAt(i));
                        break;
                    }

                }
                if(!flag){
                    store.add(res);
                    var index=data.length-1;
                    messagelist.fireEvent('itemtap',messagelist,index,messagelist.getActiveItem(),store.getAt(index));

                }





            }else{
                Ext.Msg.alert('提示', res.message, Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            //Ext.Msg.alert('test', 'test', Ext.emptyFn);
        }
        var url="factory/getfactoryinfobyid";

        var params={
            factoryid:factoryid
        };
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },

    logoutShow:function(){


        Ext.Msg.confirm( "提示", "是否确认退出", function(btn){
            if(btn==='yes'){
                Globle_Variable.user=null;
                localStorage.user="";
                localStorage.isfactory="";
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

    hideloadingimg:function(data){
        //console.log(imgid);
        var me=this;
        var factoryController=me.getApplication().getController('Factory');

        var store=factoryController.messageView[data["toid"]].getStore();

        //var store=Ext.getStore('PatientMessages');
        store.data.each(function(a){
            if(a.get('imgid')==data["imgid"]){
                a.set('issend','none');
            }
        });
        testobj=factoryController;
        if(factoryController.getMessagecontent())factoryController.getMessagecontent().setValue('');
        if(factoryController.getMessagecontentboss())factoryController.getMessagecontentboss().setValue('');
    },

    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        url=url.replace(/(:\d+)/g,":3003");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;

        this.socket.onmessage = function(event) {
            var data=JSON.parse(event.data);
            var factoryController=me.getApplication().getController('Factory');
            var customerController=me.getApplication().getController('Cutomer');
            if(data.type=='factorychat'){
                //聊天咨询
                console.log("factorychat");
                console.log(data.data);
                factoryController.receiveMessageProcess(data.data,event);
            }
            else if(data.type=='recommend'){
                //推荐
                console.log('recommend');
                console.log(data.data);
                factoryController.receiveRecommendProcess(data.data,event,1);

            }else if(data.type=='recommendconfirm'){

                console.log('recommendconfirm')
                factoryController.recommendConfirmProcess(data.data,event);
            }
            else if(data.type=='quickaccept'){
                //门诊应答
                console.log('quickaccept');

                console.log(data.data);

                customerController.receiveQuickAcceptProcess(data.data,event);


            }
            else if(data.type=='chatsuc'){
                console.log('recommendconfirm');
                me.hideloadingimg(data.data)

            }


        };

        this.socket.onclose = function(event) {

            var d = new Ext.util.DelayedTask(function(){
                me.websocketInit();
            });
            d.delay(5000);
        };
        this.socket.onopen = function() {
            me.socket.send(JSON.stringify({
                type:"factoryconnect",
                content: Globle_Variable.user._id
            }));
        };

    },
    initNotificationClick:function(e){




            ///Ext.Msg.alert('clicked event0', 'is clicked');

            var factoryController=this.getApplication().getController('Factory');
            var customerController=this.getApplication().getController('Customer');
            cordova.plugins.notification.local.on("click", function (notification) {

                var data=JSON.parse(notification.data);
                var message=data.data;
                var type=data.type;
                if(type=='recommend'){
                    factoryController.receiveRecommendShow(message,e,1);
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