const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackDevServerClient = require.resolve('webpack-dev-server/client');
const WebpackHotServer = require.resolve('webpack/hot/dev-server');
const server = (wpOpt, options) => {
	var protocol = options.https ? "https" : "http";
    new WebpackDevServer(Webpack(wpOpt), options).listen(options.port, options.host, (err) => {
        let uri = protocol + "://" + options.host + ":" + options.port;
		if(!options.inline)
            uri += "webpack-dev-server/";
        if(err) throw err;
        console.log(" " + uri);
    })
}
module.exports = server;