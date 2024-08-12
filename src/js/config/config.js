loader.global(function (global) {
	// 配置全局的一些参数，返回出去，模块里就能拿到
	var host = "http://www.easybui.com";

	return {
		host: host
	}
})