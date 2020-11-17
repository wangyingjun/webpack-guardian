const merge = require('webpack-merge');
const Webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const cwd = process.cwd();
const baseConfig = require('./webpack.base.config')
module.exports = merge(baseConfig, {
    devtool: false,
    entry: [path.join(cwd,'src/app.js')],
    output: {
        path: path.join(cwd, './dist/'),
        chunkFilename: '[name].chunk.js',
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.modules\.css$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader')+'?modules&localIdentName=[local]--[hash:base64:5]',
                    require.resolve('postcss-loader')
                ]
            },
            {
                test: /\.modules\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader')+'?modules&localIdentName=[local]--[hash:base64:5]',
                    require.resolve('postcss-loader'),
                    require.resolve('sass-loader')
                ]
            },
            {
                test: /(?<!\.modules)\.css$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader')
                ]
            },
            {
                test: /(?<!\.modules)\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader'),
                    require.resolve('sass-loader')
                ]
            },
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new FriendlyErrorsPlugin(),
    ],
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