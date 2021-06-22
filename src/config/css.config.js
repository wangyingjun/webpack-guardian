const path = require('path');
const { existsSync } = require('fs');
const cwd = process.cwd();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// post-css customer config
const configFile = path.resolve(cwd, '.webpackrc.js');
let extraConfig = {}, postCssConfig = [];
if(existsSync(configFile)){
    extraConfig = require(configFile);
}
if(Array.isArray(extraConfig.postcss) && extraConfig.postcss.length > 0 ){
    postCssConfig = extraConfig.postcss
}

const getPostCssLoader = () => {
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
                            getPostCssLoader()
                        ]
                    },
                    {
                        test: /\.modules\.scss$/,
                        use: [
                            require.resolve('style-loader'),
                            getCssLoader({modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            }}),
                            getPostCssLoader(),
                            require.resolve('sass-loader')
                        ]
                    },
                    {
                        test: /^((?!\.modules).)*\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            getCssLoader(),
                            getPostCssLoader()
                        ]
                    },
                    {
                        test: /^((?!\.modules).)*\.scss$/,
                        use: [
                            require.resolve('style-loader'),
                            getCssLoader(),
                            getPostCssLoader(),
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
                        getPostCssLoader()
                    ]
                },
                {
                    test: /\.modules\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        getCssLoader({modules: {
                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                        }}),
                        getPostCssLoader(),
                        require.resolve('sass-loader')
                    ]
                },
                {
                    test: /^((?!\.modules).)*\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        getCssLoader(),
                        getPostCssLoader()
                    ]
                },
                {
                    test: /^((?!\.modules).)*\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        getCssLoader(),
                        getPostCssLoader(),
                        require.resolve('sass-loader')
                    ]
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            }),
        ],
    }
}

module.exports = exportConfig