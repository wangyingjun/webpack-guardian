# WEBPACK-GUARDIAN

webpack-guardian 是为了cli命令行工具，提供`dev`、`build`两个命令行

**本项目采用 webpack 5.x 版本，babel 7.x**

## 开始

```bash
# install
$ npm install webpack-guardian -D

# run dev
$ webpack-guardian dev

# run build
$ webpack-guardian build
```

## 配置文件

项目中创建 `.webpackrc.js` 文件,配置与webpack配置基本相同
### `configuration`
```js
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        publicPath: '/',
    },
    // html-webpack-plugin 配置信息
    html: {
        template: './src/index.html'
    },
    // babel 配置型芯
    babel: {
        preset: [],
        plugins: []
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public", to: "public" },
            ],
        }),
    ],
    resolve: {
        alias: {
            'components': './src/components'
        }
    },
    // 环境变量
    env: {
        '__DEV__': process.env.BUILD_ENV === 'dev',
        '__PROD__': process.env.BUILD_ENV === 'prod',
        '__PRE__': process.env.BUILD_ENV === 'pre',
        '__TEST__': process.env.BUILD_ENV === 'test',
        '__MOCK__': process.env.PROXY_ENV === 'mock',
    },
    // devServer
    devServer: {
        proxy: {
        },
        host: 'local.mistong.com',
        port: 3001,
        open: true,
        inline: true
    }
}

```

## 约定

```
默认值
入口 ./src/index.js
出口 ./dist  
```
