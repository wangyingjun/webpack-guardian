const { merge } = require('webpack-merge');
const path = require('path');
const cwd = process.cwd();
const baseConfig = require('./webpack.base.config')
const cssConfig = require('./css.config')('prod')
module.exports = merge(baseConfig, cssConfig, {
    devtool: false,
    mode: 'production',
    entry: [path.join(cwd,'src/app.js')],
    output: {
        path: path.join(cwd, './dist/'),
        chunkFilename: 'js/[id].[hash].chunk.js',
        filename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {}
    }
})
