window.router = bui.router();

bui.ready(function (global) {
    // 初始化路由
    router.init({
        id: "#bui-router",
        progress: true,
        hash: true,
        // 选项卡嵌套的首页，配置首页main的新指向
        indexModule: {
            "template": "pages/news/index.html",
            "script": "pages/news/index.js",
        },
        // 不需要嵌套的首页
        // indexModule: {
        //     "template": "pages/news/home/index.html",
        //     "script": "pages/news/home/index.js",
        // }
    })

    // 绑定事件
    bind();

})

// 事件类定义
function bind() {
    // 绑定页面的所有按钮有href跳转
    bui.btn({ id: "#bui-router", handle: ".bui-btn" }).load();

    // 统一绑定页面所有的后退按钮
    $("#bui-router").on("click", ".btn-back", function (e) {
        // 支持后退多层,支持回调
        bui.back();
    })
}