const Webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfig = require('./getConfig/build');
module.exports = () => {
    rimraf.sync(webpackConfig.output.path);
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
