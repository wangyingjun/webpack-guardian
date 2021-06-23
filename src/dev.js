const server = require('./server');
const getWebpackConfig = require('./getConfig/dev');
const portfinder = require('portfinder');
module.exports = ({config}) => {
    const webpackConfig = getWebpackConfig(config);
    let devServer = {};
    if(Array.isArray(webpackConfig)){
        devServer = webpackConfig[0].devServer
    }else{
        devServer = webpackConfig.devServer
    }
    portfinder.basePort = devServer.port;
    portfinder.getPort( (err, port) => {
        if(err){
            console.log(err);
            return;
        }
        devServer.port = port;
        server(webpackConfig, devServer)
    })
}
