const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const server = (config, options) => {
	// WebpackDevServer.addDevServerEntrypoints
	// 直接修改config值 插入了
	// entry： webpack/hot/dev-server 
	// plugin: webpack.HotModuleReplacementPlugin 等配置
	WebpackDevServer.addDevServerEntrypoints(config, options);
	const compiler = Webpack(config);
	
	const server = new WebpackDevServer( compiler, options);
	server.listen(options.port, options.host, () => {
		const protocol = options.https ? "https" : "http";
		const uri = protocol + "://" + options.host + ":" + options.port;
		console.log(`Starting server on ${uri}`);
	});
}
module.exports = server;