const Webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfig = require('./getConfig/build');
module.exports = () => {
    rimraf.sync(webpackConfig.output.path);
    Webpack(webpackConfig,  (err, stats) => {
        if(err){
            console(err)
        }
    })
}
