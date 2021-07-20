const { merge } = require('webpack-merge');
const path = require('path');
const cwd = process.cwd();
const getBaseConfig = require('./webpack.base.config');
const getCssConfig = require('./css.config')('dev')
module.exports = (config) => {
    const baseConfig = getBaseConfig(config)
    const cssConfig = getCssConfig(config)
    return merge(baseConfig, cssConfig, {
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
}