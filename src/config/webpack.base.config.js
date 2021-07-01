const Webpack = require('webpack');
const path = require('path');
const cwd = process.cwd();

module.exports = (config = {}) => {
    // babel config
    let babelConfig = {presets: [], plugins: []};
    if(config.babel){
        babelConfig.presets = config.babel.presets || [];
        babelConfig.plugins = config.babel.plugins || [];
    }
    return (
        {
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
                        test: /\.(jsx?|tsx?)$/,
                        include: [path.resolve(cwd, 'src')],
                        use: [{
                            loader: require.resolve('babel-loader'),
                            options: {
                                presets: [
                                    [require.resolve('@babel/preset-env'), {
                                        "useBuiltIns": "usage",
                                        "corejs": 3
                                    }],
                                    require.resolve('@babel/preset-react'),
                                    [require.resolve('@babel/preset-typescript'),{
                                        allowNamespaces: true
                                    }],
                                    ...babelConfig.presets
                                ],
                                plugins: [
                                    require.resolve('@babel/plugin-transform-runtime'),
                                    require.resolve('@babel/plugin-syntax-dynamic-import'),
                                    ...babelConfig.plugins
                                ]
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
    )
}