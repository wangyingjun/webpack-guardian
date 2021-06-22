const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const path = require('path');
const cwd = process.cwd();
const baseConfig = require('./webpack.base.config');
const cssConfig = require('./css.config')('dev')
module.exports = merge(baseConfig, cssConfig, {
    mode: 'development',
    entry: [path.join(cwd,'src/app.js')],
    output: {
        path: path.join(cwd, './dist/'),
        chunkFilename: '[name].chunk.js',
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(cwd, './dist/'),
        open: true,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 8080,
        stats: {
            colors: true
        }
    }
})