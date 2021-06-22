const Webpack = require('webpack');
const path = require('path');
const { existsSync } = require('fs');
const cwd = process.cwd();

// post-css config
const configFile = path.resolve(cwd, '.webpackrc.js');
let extraConfig = {}, babelConfig = {presets: [], plugins: []};
if(existsSync(configFile)){
    extraConfig = require(configFile);
}
if(Array.isArray(extraConfig.babel) ){
    babelConfig = extraConfig.babel
}

module.exports = {
    context: path.resolve(cwd, './src'),
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '~': path.resolve(cwd, './src')
        }
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(cwd, 'src'), path.resolve(__dirname, '../../node_modules')],
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [
                            [require.resolve('@babel/preset-env'), {
                            "useBuiltIns": "usage",
                            "corejs": 3
                        }], require.resolve('@babel/preset-react'), ...babelConfig.presets],
                        plugins: [require.resolve('@babel/plugin-syntax-dynamic-import')]
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'media/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            },
            
        ],
    },
}