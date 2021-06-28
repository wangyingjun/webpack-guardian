const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, basename } = require('path');
const cwd = process.cwd();
module.exports = (config, currentConfig) => {
    const webpackConfig = {...currentConfig}

    webpackConfig.devtool = config.devtool || false,

    webpackConfig.context = config.context || cwd;

    // entry
    let entry = {};
    if(config.entry){
        let cEntry = config.entry;
        if(typeof cEntry === 'string'){
            entry[basename(cEntry, '.js')] = cEntry;
        }
        if(Array.isArray(cEntry)){
            cEntry.forEach(item => {
                entry[basename(item, '.js')] = item;
            })
        }
    }else{
        entry['index'] = './src/index.js';
    }
    webpackConfig.entry = entry;

    // output
    if(config.output){
        webpackConfig.output = {...webpackConfig.output, ...config.output};
    }

    // externals
    if(config.externals){
        webpackConfig.externals = config.externals
    }

    // resolve
    if(config.resolve){
        const originAlias = webpackConfig.resolve.alias || {};
        webpackConfig.resolve = {...webpackConfig.resolve, ...config.resolve};
        // absolutePath alias path
        if(config.resolve.alias){
            let alias = config.resolve.alias;
            Object.keys(alias).forEach(key => {
                webpackConfig.resolve.alias[key] = resolve(cwd, alias[key])
            })
            webpackConfig.resolve.alias = {...webpackConfig.resolve.alias, ...originAlias}
        }
        
    }
    // define env plugin
    if(config.env){
        let envKeys = Object.keys(config.env);
        if(envKeys.length){
            webpackConfig.plugins = webpackConfig.plugins.concat(new Webpack.DefinePlugin(config.env));
        }
    }

    // html plugin
    config.html = config.html || {};
    const htmlPlugin = new HtmlWebpackPlugin({
        template: config.html.template ? resolve(cwd, config.html.template) : '',
        filename: config.html.filename || 'index.html'
    })
    webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugin);

    // other plugins
    webpackConfig.plugins = webpackConfig.plugins.concat(config.plugins || []);

    // watch
    if(config.watch){
        webpackConfig.watch = config.watch;
        if(config.watchOptions){
            webpackConfig.watchOptions = config.watchOptions;
        }
    }

    // devServer
    if(config.devServer){
        webpackConfig.devServer = {...webpackConfig.devServer, ...config.devServer}        
        // devServer.publicPath force cover output.publicPath
        if(webpackConfig.devServer.publicPath){
            webpackConfig.output.publicPath = webpackConfig.devServer.publicPath
        }
    }

    return webpackConfig;
}