# WEBPACK-GUARDIAN

webpack-guardian 是为了cli命令行工具，提供`dev`、`build`两个命令行

**本项目采用 webpack 1.x 版本，作为IE8项目的配置工具命令行，为减小体积，请在 html模板 head标签中添加如下js,否则IE8下无法运行**
```html
<head>
    <!--[if lt IE 9]>
        <script src="https://cdn.bootcss.com/es5-shim/4.5.10/es5-shim.min.js"></script>
        <script src="https://cdn.bootcss.com/es5-shim/4.5.10/es5-sham.min.js"></script>
    <![endif]-->
</head>
```

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

```js
#configuration
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        publicPath: '/register/',
    },
    dev: {
        output: {
            publicPath: '/',
        },
    },
    html: {
        template: './src/index.html'
    },
    babel: {
        plugins: [
			["import",
			{
				"libraryName": "antd",
				"style": "css"
			}]
		]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        alias: {
            'components': './src/components',
            'common': './src/common',
            'img': './src/img'
        }
    },
    proxy: {
    },
    port: 3001,
    open: true,
    inline: true
}
```

## 约定

```
默认值
入口 ./src/index.js
出口 ./dist  #不可修改
dev环境配置 dev: {} #当前只增加 output.publicPath
```