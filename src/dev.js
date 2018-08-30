const server = require('./server');
const webpackConfig = require('./getConfig/dev');
module.exports = () => {
    server(webpackConfig, webpackConfig.devServer)
}
