loader.define(function (require, exports, module, global) {

	let mid = module.id;

	let props = module.props;

	console.log('接收到传过来的参数', props)
	// 初始化数据行为存储
	var bs = bui.store({
		el: `#${module.id}`,
		scope: "article",
		data: {
			datas: {},
		},
		methods: {
			getData(opt) {
				return bui.ajax(opt);
			},
			shareInit(opt) {
				// 绑定分享
				var uiActionsheet = bui.actionsheet({
					trigger: ".btn-share",
					buttons: [{ name: "分享到微博", value: "weibo" }, { name: "朋友圈", value: "pyq" }],
					callback: function (e) {
						var val = $(e.target).attr("value");
						if (val == "cancel") {
							this.hide();
						}
					}
				})

				return uiActionsheet;
			},
			slideInit(opt) {
				var uiSlide = null;

				if (opt.images && bui.typeof(opt.images) === "array") {
					let data = opt.images.map((item) => {
						return {
							image: item
						}
					})
					// 焦点图 js 初始化:
					uiSlide = bui.slide({
						id: `#${mid} .bui-slide`,
						height: 380,
						relative: true,
						cross: true,
						autopage: true,
						loop: true,
						data: data,
						callback() {
							let index = this.index();

						}
					})
				}

				return uiSlide;
			}
		},
		watch: {},
		templates: {
			tpl(data) {
				let html = "";
				html += `<h1>${data.title}</h1>
						<div class="article-info bui-box">
							<span class="article-from">${data.author}</span>
							<div class="span1"> <i class="icon-time"> ${data.date}</i></div>
							<i class="icon-comment"> ${data.comment}</i>
							<i class="icon-eye"> ${data.read}</i>
						</div>
						<section>
							<div class="bui-slide bui-slide-skin01"></div>
							${data.content}
						</section>`

				return html;
			}

		},
		mounted: function () {
			// 请求后赋值
			this.getData({
				url: `${module.path}index.json`
			}).then((res) => {
				// 赋值
				this.datas = res.data;
				// 多个图片生成组图
				this.slideInit(res.data);
				// 绑定分享
				this.shareInit(res.data);
			})

		}
	})
	return bs;
})
