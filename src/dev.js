const server = require('./server');
const getWebpackConfig = require('./getConfig/dev');
module.exports = ({config}) => {
    const webpackConfig = getWebpackConfig(config);
    let devServer = {};
    if(Array.isArray(webpackConfig)){
        devServer = webpackConfig[0].devServer
    }else{
        devServer = webpackConfig.devServer
    }
    server(webpackConfig, devServer)
}
