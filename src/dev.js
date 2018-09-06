const server = require('./server');
const webpackConfig = require('./getConfig/dev');
const portfinder = require('portfinder');
module.exports = () => {
    portfinder.basePort = webpackConfig.devServer.port;
    portfinder.getPort( (err, port) => {
        if(err){
            console.log(err);
            return;
        }
        webpackConfig.devServer.port = port;
        server(webpackConfig, webpackConfig.devServer)
    })
}
