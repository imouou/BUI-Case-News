// 首页Tab

loader.define(function (requires, exports, module, global) {

    // home-tab 的路径
    var modpath = module.path;
    var uiTabHead = null;
    var pageview = {
        init() {
            this.tab();
            this.bind();
        },
        bind() {
            bui.$(".bui-searchbar").click((e) => {
                bui.load({ url: `pages/news/searchlist/index.html`, param: {} });
            })
        },
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
        },
        templateRight: function (data) {
            var html = "";
            data && data.forEach(function (el, index) {
                // 跳转地址
                html += `<li class="bui-btn bui-box" href="pages/news/article/index.html?id=${el.id}&title=${el.title}">
                    <div class="span1">
                        <h3 class="item-title">${el.title}</h3>
                        <p class="item-text">${el.desc}</p>
                    </div>
                    <div class="bui-thumbnail" style="width:2rem;height:1.6rem;"><img src="${el.image}" alt=""></div>
                    </li>`
            });

            return html;
        },
        tab: function () {
            uiTabHead = bui.tab({
                id: "#uiTabHead",
                position: "top",
                iconPosition: "left",
                data: [{
                    id: "uiTabHead0",
                    icon: "",
                    title: "推荐",
                    name: `${modpath}recommend/index`,
                    param: { template: this.templateRight }
                }, {
                    id: "uiTabHead1",
                    icon: "",
                    title: "分类1",
                    name: `pages/components/list/index`,
                    // 模拟数据的接口
                    param: { url: `pages/components/list/index.json`, data: { type: "fenlei1" }, headers: {}, method: "GET", template: this.template },
                }, {
                    id: "uiTabHead2",
                    icon: "",
                    title: "分类2",
                    name: `pages/components/list/index`,
                    param: { url: `pages/components/list/index.json`, data: { type: "fenlei2" }, headers: {}, method: "GET", template: this.template },
                }, {
                    id: "uiTabHead3",
                    icon: "",
                    title: "分类3",
                    name: `pages/components/list/index`,
                    param: { url: `pages/components/list/index.json`, data: { type: "fenlei3" }, headers: {}, method: "GET", template: this.template },
                }
                ]
            })
        }
    }

    pageview.init();


})