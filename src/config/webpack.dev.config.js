const merge = require('webpack-merge');
const Webpack = require('webpack');
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
                test: /\.css$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader')
                ]
            },
            {
                test: /\.scss$/,
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
        })
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