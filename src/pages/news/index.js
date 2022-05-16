// 嵌套Tab示例

loader.define(function (requires, exports, module, global) {

    // 全局配置的信息
    console.log("全局配置的信息", global)

    var footTab = null;
    var headTab = null;
    var pageview = {
        init() {
            this.footTab();
        },
        footTab() {
            // html:
            // <div id="uiTabFoot" class="bui-tab"></div>
            footTab = bui.tab({
                id: "#uiTabFoot",
                position: "bottom",
                iconPosition: "top",
                data: [{
                    id: "uiTab0",
                    icon: "icon-pic",
                    // image: "images/img.svg",
                    title: "首页",
                    name: `${module.path}home/index`,
                    param: {}
                }, {
                    id: "uiTab1",
                    icon: "icon-pic",
                    // image: "images/img.svg",
                    title: "我的",
                    name: `${module.path}usercenter/index`,
                    param: {},
                }
                ]
            })
        }
    }

    pageview.init();


})