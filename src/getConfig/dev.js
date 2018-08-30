const { join, resolve, basename } = require('path');
const { existsSync, readFileSync } = require('fs');


const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = require('../config/webpack.dev.config');

const cwd = process.cwd();

const configFile = resolve(cwd, '.webpackrc.js');
let config = {};
if(existsSync(configFile)){
    config = require(configFile);
}

webpackConfig.devtool = config.devtool || false,

webpackConfig.context = config.context || cwd;

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
entry['vendor'] = [require.resolve('es6-promise'), require.resolve('console-polyfill')]

webpackConfig.entry = entry;

config.html = config.html || {};
const htmlPlugin = new HtmlWebpackPlugin({
    template: config.html.template ? resolve(cwd, config.html.template) : '',
    filename: config.html.filename || 'index.html'
})

config.output = config.output || {};
webpackConfig.output.publicPath = config.output.publicPath || '/';

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugin);

webpackConfig.babel.plugins = webpackConfig.babel.plugins || [];
if(config.babel && config.babel.plugins && config.babel.plugins.length){
    webpackConfig.babel.plugins = webpackConfig.babel.plugins.concat(config.babel.plugins)
}
if(config.externals){
    webpackConfig.externals = config.externals
}

if(config.resolve && config.resolve.alias){
    let alias = config.resolve.alias;
    Object.keys(alias).forEach(key => {
        webpackConfig.resolve.alias[key] = resolve(cwd, alias[key])
    })
}

// dev config
config.dev = config.dev || {};
config.dev.output = config.dev.output || {};
webpackConfig.output.publicPath = config.dev.output.publicPath || '/';

webpackConfig.devServer.host = config.host || 'localhost';

webpackConfig.devServer.port = config.port || 8080;

webpackConfig.devServer.open = config.open === undefined ? true : config.open;

webpackConfig.devServer.proxy = config.proxy || {};

webpackConfig.devServer.inline = config.inline === undefined ? true : config.inline;

module.exports = webpackConfig;