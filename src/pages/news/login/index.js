/**
 * 通用登录模板,包含输入交互,提交需要自己绑定验证
 * 默认模块名: pages/templates/login/index
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (requires, exports, module, global) {

    var props = module.props;
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "login",
        data: {
            userinfo: {
                username: "",
                password: ""
            },
            passtype: "password", // 1.7.2 才支持
            remember: false,
            auto: false
        },
        methods: {
            sign(e) {
                let userinfo = this.userinfo;

                // 加密后传输
                userinfo.password = this.md5(userinfo.password);

                // 检测是否为空
                let canSign = this.checkEmpty(userinfo);

                if (!canSign) {
                    bui.hint('账号密码不能为空')
                    return false;
                }
                // 模拟登录登陆
                bui.ajax({
                    url: `${module.path}index.json`,
                    data: userinfo,//接口请求的参数
                    // 可选参数
                    // method: "POST"
                }).then((result) => {
                    // 成功
                    // 3. 登录成功后关闭对话框，并执行登录后的回调
                    if (result.status == 200) {
                        var dialog = bui.history.getPageDialog(module.id);
                        dialog.close();

                        props.loginsuccess && props.loginsuccess(result);
                    }


                }, function (result, status) {
                    // 失败 console.log(status)
                });
            },
            md5(password) {
                // 只是示例，应该先引入md5 插件
                return password;
            },
            empty() {
                this.userinfo = {
                    username: "",
                    password: ""
                }
            },
            checkEmpty(userinfo) {

                for (let keyname in userinfo) {
                    if (userinfo[keyname] == "") {
                        return false;
                    }
                }
                return true;
            },
            check(e) {
                // 校验
                let val = e.target.value;
                let rule = e.target.getAttribute('rule');
                let tip = e.target.getAttribute('tip');
                let name = e.target.getAttribute('name');
                if (rule && new RegExp(rule).test(val)) {
                    return true;
                } else {
                    // 清空输入值
                    // this.setState(`userinfo.${name}`,"");
                    tip && bui.hint(tip);
                    return false;
                }
            },
            clear(str) {
                // 清空值
                this.setState(str, "");
            },
            changetype(str) {
                // 改变类型
                switch (this.passtype) {
                    case "text":
                        this.passtype = "password";
                        break;
                    case "password":
                        this.passtype = "text";
                        break;
                }
            }
        },
        watch: {},
        computed: {},
        templates: {},
        mounted: function () {
            // 数据解析后执行
        }
    })

    return bs;
})