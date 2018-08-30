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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    [
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader')
                    ]
                )
            },
            {
                test: /\.scss$/,
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
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                beautify: true,
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: false
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