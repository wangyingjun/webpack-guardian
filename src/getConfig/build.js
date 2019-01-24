const { join, resolve, basename } = require('path');
const { existsSync, readFileSync } = require('fs');
const Webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = require('../config/webpack.build.config');
const webpackConfigDev = require('../config/webpack.dev.config');

const cwd = process.cwd();

const configFile = resolve(cwd, '.webpackrc.js');
let config = {};
if(existsSync(configFile)){
    config = require(configFile);
}

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
    filename: config.html.filename || 'index.html',
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    }
})

if(config.disableExtractText){
    webpackConfig.module.loaders = webpackConfigDev.module.loaders
}

if(config.env){
    let envKeys = Object.keys(config.env);
    if(envKeys.length){
        webpackConfig.plugins = webpackConfig.plugins.concat(new Webpack.DefinePlugin(config.env));
    }
}

config.output = config.output || {};
webpackConfig.output.publicPath = config.output.publicPath || '/';

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugin);

webpackConfig.babel.plugins = webpackConfig.babel.plugins || [];
if(config.babel.plugins){
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

module.exports = webpackConfig;