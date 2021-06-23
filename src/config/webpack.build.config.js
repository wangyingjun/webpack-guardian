const { merge } = require('webpack-merge');
const path = require('path');
const cwd = process.cwd();
const getBaseConfig = require('./webpack.base.config')
const getCssConfig = require('./css.config')('prod')
module.exports = (config) => {
    const baseConfig = getBaseConfig(config)
    const cssConfig = getCssConfig(config)
    return merge(baseConfig, cssConfig, {
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
}

