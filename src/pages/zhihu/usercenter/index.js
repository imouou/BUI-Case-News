/**
 * 个人中心模板
 * 默认模块名: pages/templates/usercenter/index
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module, global) {


    // 组件实例
    var uiProfile = null;
    var uiNavicon = null;
    var loginPage = null;
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "usercenter",
        methods: {
            profile(opt) {
                return loader.syncLoad({
                    id: "#profile",
                    url: `${module.path}profile/index.html`,
                    param: opt || {}
                })
            },
            getData(opt) {

                return bui.ajax(opt)
            },
            navlist(opt) {

                return loader.syncLoad({
                    id: "#navlist",
                    url: `${module.path}navlist/index.html`,
                    param: opt
                })
            },
        },
        mounted: async function () {
            // 业务逻辑
            var that = this;

            // 如果有登录，换成获取登录的信息
            let profiledata = {
                "uid": "easybui",
                "name": "请登录",
                "image": "images/img.svg",
                "integral": 0
            };

            // 初始化
            uiProfile = await this.profile({
                datas: profiledata,
                clickimg: (e) => {
                    console.log("点击了图片")

                    // 头像点击应该判断，如果未登录才打开
                    loginPage.open();
                },
                clickname: (e) => {
                    console.log("点击了名字")
                    // 头像点击应该判断，如果未登录才打开
                    loginPage.open();

                }
            });


            // 登录页初始化
            loginPage = bui.page({
                url: `pages/news/login/index.html`,
                param: {
                    loginsuccess(result) {
                        // 登录成功
                        bui.hint({
                            position: "center",
                            content: "登录成功"
                        })

                        // 修改头像资料信息
                        uiProfile.datas = result.data
                    }
                },
                close: true,
                autoload: false,    // 自动加载
                openFirst: false,   // 弹出动画的时候执行，如果为true会看到部分元素隐藏
                style: {
                    top: "3rem"
                },
                effect: "fadeInUp"
            })

            // 获取导航数据
            let navdatas = await this.getData({
                url: `${module.path}index.json`,
                data: {},//接口请求的参数
                // 可选参数
                method: "GET"
            });

            // 渲染导航
            uiNavicon = await this.navlist({
                datas: navdatas.data,
                callback: function (item) {
                    // 新开窗口
                    if (item.url.indexOf("http") === 0 || item.url.indexOf(".zip") > -1) {
                        window.open(item.url, "_blank")
                        return;
                    }
                    // 跳转
                    bui.load({
                        url: item.url,
                        param: item
                    })
                }
            });
        }
    })

    return bs;
})
