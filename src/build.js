const Webpack = require('webpack');
const rimraf = require('rimraf');
const getWebpackConfig = require('./getConfig/build');
module.exports = ({config}) => {
    delete config.devServer
    const webpackConfig = getWebpackConfig(config)
    if(Array.isArray(webpackConfig)){
        webpackConfig.forEach( itemConfig => {
            rimraf.sync(itemConfig.output.path);
        })
    }else{
        rimraf.sync(webpackConfig.output.path);
    }
    Webpack(webpackConfig,  (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
    
        const info = stats.toJson({
            colors: true,
        });
    
        if (stats.hasErrors()) {
            console.error(info.errors);
        }
    
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
    })
}
