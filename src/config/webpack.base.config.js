const Webpack = require('webpack');
const path = require('path');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const cwd = process.cwd();
module.exports = {
    context: cwd,
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            '~': path.resolve(cwd, './src')
        }
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin(),
        new Webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(cwd, 'src')],
                loader: require.resolve('babel-loader')
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: require.resolve('url-loader')+'?limit=10000&fonts=media/[name].[hash:7].[ext]'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: require.resolve('url-loader')+'?limit=10000&name=media/[name].[hash:7].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: require.resolve('url-loader')+'?limit=10000&name=img/[name].[hash:7].[ext]'
            }
        ],
        postLoaders: [
            {
                test: /(\.js|jsx)$/,
                loaders: [require.resolve('es3ify-loader')]
            }
        ]
    },
    babel: {
        presets: [require.resolve("babel-preset-es2015"), require.resolve("babel-preset-react"), require.resolve("babel-preset-stage-0")],
        plugins: [require.resolve("babel-plugin-transform-runtime")]
    }
}