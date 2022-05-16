/**
 * 个人中心模板
 * 默认模块名: pages/templates/profile/index
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module, global) {

    let props = $.extend(true, {
        datas: {
            "uid": "easybui",
            "name": "请登录",
            "image": "images/img.svg",
            "integral": 0
        },
        clickimg: null,
        clickname: null,
    }, module.props);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "profile",
        data: {
            datas: props.datas
        },
        methods: {
            clickimg(e) {
                props.clickimg && props.clickimg.call(this, e);
            },
            clickname(e) {
                props.clickname && props.clickname.call(this, e);
            }
        },
        templates: {
            tpl(data) {
                return `<div class="personal-img" b-click="profile.clickimg">
                            <img src="${data.image}">
                        </div>
                        <p class="name" b-click="profile.clickname">${data.name}</p>
                        <p class="grade">积分：${data.integral}</p>`
            }
        }
    })

    return bs;
})
