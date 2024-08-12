/**
 * 搜索列表页模板
 * 默认模块名: pages/templates/searchbar/index
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (requires, exports, module, global) {

    // 同步加载示例

    var compSearchbar = null;
    var compList = null;
    var pageview = {
        init: async function () {
            // 延迟加载有delay属性的列表,跳到tab才加载
            compList = await loader.syncLoad({
                id: "#complist",
                url: "pages/components/list/index.html",
                param: {
                    // url:"",
                    autoinit: false,    // 默认不初始化
                    template: function (data) {
                        var html = "";
                        data && data.forEach(function (el, index) {
                            // 跳转地址
                            html += `<li class="bui-btn bui-box" href="pages/news/article/index.html?id=${el.id}&title=${el.title}">
                                <div class="bui-thumbnail" style="width:2rem;height:1.6rem;"><img src="${el.image}" alt=""></div>
                                <div class="span1">
                                    <h3 class="item-title">${el.title}</h3>
                                    <p class="item-text">${el.desc}</p>
                                </div>
                                </li>`
                        });

                        return html;
                    }
                }
            })
            // 延迟加载有delay属性的列表,跳到tab才加载
            compSearchbar = await loader.syncLoad({
                id: "#compsearchbar",
                url: "pages/components/searchbar/index.html",
                param: {
                    placeholder: "请输入搜索词",
                    change: function (val) {
                        // 输入的时候，修改列表的参数

                        // 清空数据
                        compList && compList.empty();

                        // 初始化
                        compList && compList.init({
                            data: {
                                keyword: val
                            },
                        })
                    },
                    remove: function () {

                        // 清空数据
                        compList && compList.empty();
                    }
                }
            })

        }
    };

    pageview.init();

    return pageview;

})