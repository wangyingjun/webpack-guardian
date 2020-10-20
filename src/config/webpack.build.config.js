const merge = require('webpack-merge');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
const cwd = process.cwd();
const baseConfig = require('./webpack.base.config')
module.exports = merge(baseConfig, {
    devtool: false,
    entry: [path.join(cwd,'src/app.js')],
    output: {
        path: path.join(cwd, './dist/'),
        chunkFilename: 'js/[id].[hash].chunk.js',
        filename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.modules\.css$/,
                loader: ExtractTextPlugin.extract(
                    [
                        require.resolve('css-loader')+'?modules&localIdentName=[local]--[hash:base64:5]',
                        require.resolve('postcss-loader')
                    ]
                )
            },
            {
                test: /\.modules\.scss$/,
                loader: ExtractTextPlugin.extract(
                    [
                        require.resolve('css-loader')+'?modules&localIdentName=[local]--[hash:base64:5]',
                        require.resolve('postcss-loader'),
                        require.resolve('sass-loader')
                    ]
                )
            },
            {
                test: /([^\.modules])\.css$/,
                loader: ExtractTextPlugin.extract(
                    [
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader')
                    ]
                )
            },
            {
                test: /([^\.modules])\.scss$/,
                loader: ExtractTextPlugin.extract(
                    [
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                        require.resolve('sass-loader')
                    ]
                )
            },
        ]
    },
    
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin("style/[name].[hash:8].css",{
            allChunks: true
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: 'js/[name].[hash].js',
            minChunks: Infinity
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'children-async'
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: true
            }
        })
    ],
    devServer: {
        contentBase: path.join(cwd, './dist/'),
        progress:true,
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