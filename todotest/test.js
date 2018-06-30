


   
    



  



    var todolists = "todolists";//键值,这里存储的是一整个lists
    var itemcollection = "itemcollection";//相当于items的别名，根据名字取值
    var storelist = (function () { //封装Localstorage
        return ({
            savelist: function (val) {
                //添加数据，键为todolist
                
                localStorage.setItem(todolists, JSON.stringify(val));
            },
            getlists: function () {
                //读取键为todolist的数据
                return JSON.parse(localStorage.getItem(todolists));
            },
            removelist: function () {
                //移除该站点下键为todolist的数据,就是所有list,整个lists对象数组
                localStorage.removeItem(todolists);
            },
            clearall: function () {
                //清空该站点下的所有localStorage的数据
                localStorage.clear();
            }
        });
    })();

    var storeitem = (function () { //封装Localstorage，存取整个items
        return ({ 
            saveitem: function (val) {//这里用来存取整个items的对象数组,storeitem是键(名称)，根据键名可以取出所有的list单项
                //添加数据，键为storeitem
                localStorage.setItem(itemcollection, JSON.stringify(val));
            },
            getitems: function () {
                //读取键为todolist的数据,一整个items数组
                return JSON.parse(localStorage.getItem(itemcollection));
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
       
        
        completed:true,//控制完成事项的显示
        todoitems:false,//控制未完成事项的显示
        showsearch:false,
        showitems:true,
        searchData: "",
        showbutton:true,//控制增加list的按钮
        showadds:false,//控制增加list列表的文本框
        cur_list:0,
        newlist: { //单个清单列表
            id: -1,
            name: "",
            isedit:false,
        },
        newitem: {
            parent_id: -1,//对应事项的list的id
            content: "",
            isCompleted: false,//事项是否完成的状态
            data: new Date(),
            priority:3,//优先级
            itemid:0,//事项自己的id
            edit:false,//判断事项是否在编辑状态
        },


        lists:storelist.getlists()||[],
       
        items: storeitem.getitems() || [],//获取本地存储的items,如果为空则是"[]"


        content: '' //新增代办单项绑定的值
    };
    var vm = new Vue
        ({
            el: '#app',
            
            data: data,

            methods:{
                isediting:function(list){
//首先在lists数组中遍历查找当前要编辑的是哪一个，然后通过v-model监听的重新赋值，从而实现编辑
                   
                    for(var i=0;i<this.lists.length;i++)
                    {
                        if(this.lists[i].id==list.id)
                        {
                            this.lists[i].name=list.name;
                            list.isedit=true;
                        }
                    }
                },
            saveedit:function(list){
                for(var i=0;i<this.lists.length;i++)
                    {
                        if(this.lists[i].id==list.id)
                        {
                            this.lists[i].name=list.name;
                            list.isedit=false;
                        }
                    }
            },
            
            
            showtodo:function(){
                this.todoitems=!this.todoitems;
                this.completed=!this.todoitems;
                
            },

            
            outfocus:function(){//添加清单文本框失去焦点时自动变成按钮样式
                this.showbutton= !this.showbutton;
                this.showadds=!this.showbutton;
            },
            

            sortclick:function(){
                return this.prioritysort;
            },//优先级排序,prioritysort返回计算属性排序好的数组

                click_button:function(){//点击add清单按钮后出现文本框
                    
                    this.showbutton= !this.showbutton;
                    this.showadds=!this.showbutton;
                   
                },
                delete_list: function (list) {//删除一个list时删除其下所有待办事项
                   
            
                   
                   
                    for(var i=0;i<this.items.length;i++)
                    {

                        if(list.id==this.items[i].parent_id)
                        {
                            this.items.splice(this.items[i].itemid, 1,this.newitem);
                        
                        }   
                        
                }           
                for(var i=0;i<this.items.length;i++)
                {
                                      
                    if(this.items[i].parent_id==-1)
                    {
                        this.items.splice(i, 1);
                        for(var j=0;j<this.items.length;j++)
                        {
                            if(this.items[j].parent_id==-1)
                            this.items.splice(j, 1);
                        }
                    
                    }                     
          }

                this.lists.splice(list.id, 1);//删除选择的list
                    for(var i=0;i<this.lists.length;i++)
                    {
                        this.lists[i].id=i;
                    }
                },
                delete_item: function (item) {//删除单个待办事项
                    //if(item.parent_id==1&&item.itemid==1)
                  // this.items.splice(0,1);
                  // else
                   // {
                       
                    this.items.splice(item.itemid, 1);
                    for(var i=0;i<this.items.length;i++)//删除事项后的数组的下标是动态变化的
                    {
                        this.items[i].itemid=i;
                    }
                    //storeitem.saveitem(this.items);
                    //}
                    
                },
                show_curlist: function (index) {//指示当前进行操作的是哪个清单,cur_list是全局变量
                    this.cur_list = index;
                },

                search:function(){
                    this.showsearch=!this.showsearch;
                    this.showitems=!this.showsearch;
                },
              
                addlist: function () {//添加清单单项

                    if (this.newlist.id === -1 && this.newlist.name != "") {
                        this.newlist.id = this.lists.length;
                        this.lists.push(this.newlist);
                        //var temp=JSON.stringify(this.newlist);
                        //localStorage.setItem("list"+this.newlist.id,temp);//将新的list单项存储到本地,键名是"list"+list.id
                    }
                        storelist.savelist(this.lists);//存取整个lists


                    this.newlist = { //单个清单列表
                        id: -1,
                        name: "",
                        isedit:false,
                    }
                },

                additem: function () {

                    if (this.newitem.parent_id == -1 && this.newitem.content != "") {
                        this.newitem.parent_id = this.cur_list;
                        this.newitem.itemid=this.items.length;
                        
                        this.items.push(this.newitem);
                         //var temp=JSON.stringify(this.newitem);//josn.stringify将JSON转换成JSON字符串
                         //console.log(temp);
                         //localStorage.setItem("item"+this.newitem.itemid,temp);//item的id是键值,存储一整个对象
                    }
                    storeitem.saveitem(this.items);

                  this.newitem = {
                        parent_id: -1,
                        content: "",
                        isCompleted: false,
                        itemid:0,
                        priority:3,
                        edit:false,
                    }
                },
                change_state: function(item) {
                  item.edit=!item.edit; //修改item的edit状态,控制它的显示，false表明正在编辑
                },

                clearall:function(){
                    storeitem.clearall();
                },


                edititem:function(item){
                    for(i=0;i<this.items.length;i++)
                    {
                        if(item.itemid==this.items[i].itemid){
                         
                            this.items[i].content=item.content;
                            this.items[i].edit=false;
                        }
                    }
                },

                itemCompleted: function (item) {//用于最右边展示的已完成待办事项的判断
                   
                    item.isCompleted  = ! item.isCompleted ;
                  
                },
               /* compare: function(property){
                    return function(a,b){
                        return a[property] - b[property];
                    }
                },*/
                
               /* itemCompleted: function (item) {
                    alert(item.isCompleted);
                    item.isCompleted = true;
                    alert(item.isCompleted);

                },*/
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
                },
                prioritysort(){
                    var _this=this;
                    var prioritysort=[];
                    function compare(property){//property是比较对象中哪个属性
                        return function(a,b){
                            return a[property]-b[property];
                        }
                    };
                    return _this.items.sort(compare('priority'));//这里是按优先级排序,priority在我的属性里面
                },
                uncompleted(){
                    var _this = this;
                    var uncompleted = [];
                    _this.items.map(function (item) {
                        if(item.isCompleted==false)
                        
                            uncompleted.push(item);
                        
                    });
                    return uncompleted;},
                },
                
                
          
            watch:{
               
                items:{
                    handler(newval,oldval){
                    storeitem.saveitem(newval); 
                    },
                    deep:true,
                },
                lists:
                {  handler(newlists,oldlists){
                    storelist.savelist(newlists);
                },
                deep:true,

            }
            },
           

          
        })

