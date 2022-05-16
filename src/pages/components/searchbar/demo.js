loader.define(function(require,exports,module,global){

    // 编译的选择列表组件，编译后可全局使用
    var searchComp = null;
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "demo",
        data: {
           datas: [],
        },
        methods: {
            search(val){
                // 把搜索的关键字发给接口
                bui.ajax({
                    url: `${module.path}index.json`,
                    data: {
                        keyword: val
                    }
                }).then((result)=>{

                    // 这个接口是静态接口，通过模拟接口返回的数据过滤，
                    let datas = result.data.filter((item)=>{
                        if( val && item.name.includes(val)){
                            return item;
                        }
                    })
                    // 展示搜索结果
                    this.datas = datas
                });

            },
            compInit: function(){
                let that = this;
                // 同步获取数据及编译，这样可以获取到组件供全局使用
                let compInit = async function (){

                    // 获取组件实例
                    searchComp = await loader.syncLoad({
                        id:"#searchbar",
                        url:"pages/components/searchbar/index.html",
                        param:{
                            placeholder:"请输入图标，或者1,2,3",
                            change: function(val){
                                // 改变的时候，触发值的同步变更
                                that.search(val);
                            }
                        }
                    })
                }

                // 获取数据
                compInit();
                
            }
        },
        watch: {},
        computed: {},
        templates: {
            tpl(data){
                let html = "";
                data.forEach((item)=>{
                    html +=`<li class="bui-btn bui-box">
                    <div class="span1">${item.name}</div>
                    <i class="icon-listright"></i>
                </li>`
                })

                return html;
            }
        },
        beforeMount: function(){
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function(){
            // 数据解析后执行

            this.compInit()
        }
    })

})