const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackDevServerClient = require.resolve('webpack-dev-server/client');
const WebpackHotServer = require.resolve('webpack/hot/dev-server');
const open = require('open');
const server = (wpOpt, options) => {
	var protocol = options.https ? "https" : "http";
    if(options.inline) {
		let devClient = [WebpackDevServerClient + "?" + protocol + "://" + (options.public || (options.host + ":" + options.port))];

		if(options.hot)
			devClient.push(WebpackHotServer);
		[].concat(wpOpt).forEach(function(wpOpt) {
			if(typeof wpOpt.entry === "object" && !Array.isArray(wpOpt.entry)) {
				Object.keys(wpOpt.entry).forEach(function(key) {
					wpOpt.entry[key] = devClient.concat(wpOpt.entry[key]);
				});
			} else {
				wpOpt.entry = devClient.concat(wpOpt.entry);
			}
		});
    }
    new WebpackDevServer(Webpack(wpOpt), options).listen(options.port, options.host, (err) => {
        let uri = protocol + "://" + options.host + ":" + options.port + "/";
		if(!options.inline)
            uri += "webpack-dev-server/";
        if(err) throw err;
        console.log(" " + uri);
        if(options.open)
			open(uri);
    })
}
module.exports = server;