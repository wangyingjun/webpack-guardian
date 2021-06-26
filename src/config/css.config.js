const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getPostCssLoader = (config) => {
    // post-css customer config
    let postCssConfig = [];
    if(Array.isArray(config.postcss) && config.postcss.length > 0 ){
        postCssConfig = config.postcss
    }
    return {
        loader: require.resolve('postcss-loader'),
        options: {
            postcssOptions: {
                plugins: [
                    require.resolve('postcss-preset-env'),
                    ...postCssConfig,
                ]
            }
        }
    }
}

const getCssLoader = (options = {modules: false}) => {
    return {
        loader: require.resolve('css-loader'),
        options
    }
}

const exportConfig = (env) => {
    return (config) => {
        if(env === 'dev'){
            return {
                module: {
                    rules: [
                        // scss css
                        {
                            test: /\.modules\.css$/,
                            use: [
                                require.resolve('style-loader'),
                                getCssLoader({modules: {
                                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                }}),
                                getPostCssLoader(config)
                            ]
                        },
                        {
                            test: /\.modules\.scss$/,
                            use: [
                                require.resolve('style-loader'),
                                getCssLoader({modules: {
                                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                }}),
                                getPostCssLoader(config),
                                require.resolve('sass-loader')
                            ]
                        },
                        {
                            test: /^((?!\.modules).)*\.css$/,
                            use: [
                                require.resolve('style-loader'),
                                getCssLoader(),
                                getPostCssLoader(config)
                            ]
                        },
                        {
                            test: /^((?!\.modules).)*\.scss$/,
                            use: [
                                require.resolve('style-loader'),
                                getCssLoader(),
                                getPostCssLoader(config),
                                require.resolve('sass-loader')
                            ]
                        },
                    ]
                }
            }
        }
    
        return {
            module: {
                rules: [
                    // scss css
                    {
                        test: /\.modules\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            getCssLoader({modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            }}),
                            getPostCssLoader(config)
                        ]
                    },
                    {
                        test: /\.modules\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            getCssLoader({modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            }}),
                            getPostCssLoader(config),
                            require.resolve('sass-loader')
                        ]
                    },
                    {
                        test: /^((?!\.modules).)*\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            getCssLoader(),
                            getPostCssLoader(config)
                        ]
                    },
                    {
                        test: /^((?!\.modules).)*\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            getCssLoader(),
                            getPostCssLoader(config),
                            require.resolve('sass-loader')
                        ]
                    },
                ]
            },
            plugins: [
                new MiniCssExtractPlugin({
                filename: config.output&&config.output.library ? '[name].css' : '[name].[contenthash].css',
                }),
            ],
        }
    }
}

module.exports = exportConfig