/**
 * 图标列表
 * 默认模块名: pages/templates/profile/navlist
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module, global) {

    var props = $.extend(true, {
        datas: [],
        callback: null
    }, module.props);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "navlist",
        data: {
            datas: props.datas
        },
        methods: {
            clickitem(index, e) {
                let item = this.datas[index];

                props.callback && props.callback.call(this, item, e)
            },
        },
        templates: {
            tpl(data) {
                let html = ""
                data.forEach((item, index) => {
                    let version = "";
                    if (item.name === "版本更新") {
                        version = bui.version;
                    }
                    html += `<li class="bui-btn bui-box" b-click="navlist.clickitem($itemIndex)">
                            <div class="icon"><img src="${item.image}"/></div>
                            <div class="span1">${item.name}</div>
                            <span>${version}</span>
                            <i class="icon-listright"></i>
                        </li>`
                })

                return html;
            }
        }
    })

    return bs;
})
