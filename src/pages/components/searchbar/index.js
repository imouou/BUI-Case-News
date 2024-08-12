
/**
 * 组件名: pages/components/searchbar/index
 * @name pages/components/searchbar/index
 * @since 1.7.1
 * @author imouou
 * @date 2022-04-07
 * @param {string}} [placeholder] [ 占位提示 默认 "请选择关键字" ]
 * @param {string}} [value] [ 输入框的值 ]
 * @param {boolean}} [lazy] [ 优化输入延迟 默认：true | false ]
 * @param {boolean}} [showtext] [ 展示搜索的文本 默认：false | true ]
 * @param {function}} [change] [ 改变的时候触发 默认：null ]
 * @param {function}} [search] [ 点击按钮的时候触发 默认：null ]
 * @static
 * @example 
 *
   html: 
   <component id="searchbar" name="pages/components/searchbar/index"></component>
   
   js:
   let searchComp = null;
    // 同步获取数据及编译，这样可以获取到组件供全局使用
    let compInit = async function (){

        // 获取组件实例
        searchComp = await loader.syncLoad({
            id:"#searchbar",
            url:"pages/components/searchbar/index.html",
            param:{
                placeholder:"请输入图标，或者1,2,3",
                change: function(val){
                    // 改变的时候，触发
                }
            }
        })
    }

    // 初始化
    compInit();

*
*/


loader.define(function (requires, exports, module, global) {


    // 合并接收的参数
    let props = $.extend(true, {
        placeholder: "请输入关键词",
        lazy: true,
        showtext: false,
        value: "",
    }, module.props);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "searchbar",
        data: {
            placeholder: props.placeholder,
            value: props.value,
            datas: null
        },
        methods: {
            search(val) {
                // 搜索
                props.search && props.search.call(this, val || this.value);
            },
            change() {
                // 搜索
                props.change && props.change.call(this, this.value);

            },
            remove() {
                // 清空选择
                this.value = "";

                props.remove && props.remove.call(this, this.value);

            }
        },
        watch: {
        },
        templates: {
            tpl(data) {
                // 是否延迟触发
                let lazyModel = props.lazy ? `b-model-lazy="searchbar.value"` : `b-model="searchbar.value"`;
                let searchText = props.showtext ? `<div class="btn-search" b-click="searchbar.search">搜索</div>` : "";
                return `<div class="span1">
                            <div class="bui-input">
                                <i class="icon-search" b-click="searchbar.search"></i>
                                <input type="search" value="" b-placeholder="searchbar.placeholder" b-trigger="searchbar.change" ${lazyModel}/>
                                <i class="icon-remove" b-show="searchbar.value" b-click="searchbar.remove"></i>
                            </div>
                        </div>
                        ${searchText}

                        `
            }
        },
        mounted: function () {

        }
    })

    return bs;
})