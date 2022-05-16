
// 推荐页
loader.define(function (requires, exports, module, global) {
    // 这里列表要嵌入轮播图，结构会比较特殊，不能复用之前的list组件
    // 接收外部参数
    var props = $.extend(true, {}, module.props);
    var pageview = {
        init() {
            this.slide();
            // 分页做法
            this.list();
        },
        slide() {

            // 焦点图 js 初始化:
            var uiSlide = bui.slide({
                id: "#uiSlide",
                height: 360,
                autopage: true,
                loop: true,
                data: [{
                    image: "images/img.svg",
                    url: "main",
                }, {
                    image: "images/img.svg",
                    url: "main",
                }],
                callback(e) {
                    console.log()
                }
            })
        },
        list() {

            // 列表控件 js 初始化: 
            var uiList = bui.list({
                id: "#uiListRecommend",
                url: `${module.path}index.json`,
                pageSize: 5,
                data: {},
                //如果分页的字段名不一样,通过field重新定义
                field: {
                    page: "page",
                    size: "pageSize",
                    data: "data"
                },
                callback: function (e) { },
                template: props.template || function (data) {
                    var html = "";
                    data && data.forEach(function (el, index) {
                        // 跳转地址
                        html += `<li class="bui-btn bui-box">
                            <div class="bui-thumbnail" style="width:2rem;height:1.6rem;"><img src="${el.image}" alt=""></div>
                            <div class="span1">
                                <h3 class="item-title">${el.title}</h3>
                                <p class="item-text">${el.desc}</p>
                            </div>
                        </li>`
                    });

                    return html;
                }
            });
        }
    }

    pageview.init();

})