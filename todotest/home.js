
    lay('#version').html('-v' + laydate.v);

    //执行一个laydate实例
    laydate.render({
        elem: '#data' //指定元素
    });



    var todolists = "todolists";//键值,这里存储的是一整个lists
    var itemcollection = "itemcollection";
    var storelist = (function () { //封装Localstorage
        return ({
            addlist: function (val) {
                //添加数据，键为todolist
                localStorage.setItem(todolists, JSON.stringify(val));
            },
            getlists: function () {
                //读取键为todolist的数据
                return JSON.parse(localStorage.getItem(todolists));
            },
            removelist: function () {
                //移除该站点下键为todolist的数据
                localStorage.removeItem(todolists);
            },
            clearall: function () {
                //清空该站点下的所有localStorage的数据
                localStorage.clear();
            }
        });
    })();

    var storeitem = (function () { //封装Localstorage
        return ({
            additem: function (val) {
                //添加数据，键为todolist
                localStorage.setItem(storeitem, JSON.stringify(val));
            },
            getitems: function () {
                //读取键为todolist的数据
                return JSON.parse(localStorage.getItem(storeitem));
            },
            removeitem: function () {
                //移除该站点下键为todolist的数据
                localStorage.removeItem(storeitem);
            },
            clearall: function () {
                //清空该站点下的所有localStorage的数据
                localStorage.clear();
            }
        });
    })();

    var data =
    {
        searchData: "",
        cur_list: 1,
        newlist: { //单个清单列表
            id: 0,
            name: "",
        },
        newitem: {
            parent_id: 0,
            content: "",
            isCompleted: false,
            data: "",
            priority:0
        },


        lists: storelist.getlists() || [],//如果本地有数据就获取本地数据，如果没有就为空数组
        /* items: [ //代办单项列表
        { parent_id:0,item :[{isCompleted: false, content: '新aaa的一天', isDelete: false,id:0} ,
        {isCompleted: false, content: '一天', isDelete: false,id:1},
        {isCompleted: false, content: '新的一天', isDelete: false,id:2 }]},
        { parent_id:1,"item":[{isCompleted: false, content: '新aaa的一天', isDelete: false,id:0} ,
        {isCompleted: false, content: '一天', isDelete: false,id:1},
        {isCompleted: false, content: '新的一天', isDelete: false,id:2 }]},
        ],*/
        /*items: [ //代办单项列表
            { parent_id: 1, isCompleted: false, content: '新aaa的一天', isDelete: false },
            { parent_id: 1, isCompleted: false, content: '一天', isDelete: false, },
            { parent_id: 3, isCompleted: false, content: '新的一天', isDelete: false },
            { parent_id: 4, isCompleted: false, content: '新aaa的一天', isDelete: false, },
            { parent_id: 5, isCompleted: false, content: '一天', isDelete: false, },
            { parent_id: 6, isCompleted: false, content: '新的一天', isDelete: false, },
        ],*/
        items: storeitem.getitems() || [],//获取本地存储的items,如果为空则是"[]"


        content: '' //新增代办单项绑定的值
    };
    var vm = new Vue
        ({
            el: '#app',
            data: data,

            methods:
            {
                delete_List: function (index) {
                    alert(index);
                    this.lists.splice(index, 1);
                    storelist.addlist(this.lists);

                },
                delete_item: function (index) {
                    this.items.splice(index, 1);
                    storeitem.removeitem(index);
                },
                show_curlist: function (index) {
                    this.cur_list = index;
                },
                addlist: function () {//添加清单单项

                    if (this.newlist.id == 0 && this.newlist.name != "") {
                        this.newlist.id = this.lists.length + 1;
                        this.lists.push(this.newlist);
                        storelist.addlist(this.lists);//将新的lists数组存储到本地
                    }
                    this.newlist = { //单个清单列表
                        id: 0,
                        name: "",
                    }
                },

                additem: function () {
                    if (this.newitem.parent_id == 0 && this.newitem.content != "") {
                        this.newitem.parent_id = this.cur_list;
                        this.items.push(this.newitem);
                        storeitem.additem(this.items);
                    }
                    this.newitem = {
                        parent_id: 0,
                        content: "",
                        isCompleted: false,
                    }
                },

                itemCompleted: function (item) {
                    alert(item.isCompleted);
                    item.isCompleted = true;
                    alert(item.isCompleted);

                }
            },
            computed: {
                Newitems() {
                    var _this = this;
                    var Newitems = [];
                    _this.items.map(function (item) {
                        if (
                            item.content.search(_this.searchData) != -1
                        ) {
                            Newitems.push(item);
                        }
                    });
                    return Newitems;
                }
            }

        })

