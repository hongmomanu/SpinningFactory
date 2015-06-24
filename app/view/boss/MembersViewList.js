Ext.define('SpinningFactory.view.boss.MembersViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'membersviewlist',
    //cls: 'x-contacts',
    config: {
        title: '成员管理',
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        variableHeights: true,
        itemId:'membersviewlist',
        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {
                //alert('点击小按钮触发的事件');
                //console.log(record)
                this.select(index);
            }
        },
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        //grouped:true,
        //indexBar:true,
        store: 'MemberViews',

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