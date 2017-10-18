# @talentui/dll-webpack-config

## 说明

用来协助生成talent-ui 2.0可以自动识别的dll的工具， 你可以自己配置[DllPlugin](https://webpack.js.org/plugins/dll-plugin/)来生成Dll, 但是@talentui/dll-webpack-config集成了一套统一的逻辑和命名规则，可以让[@talentui/webpack-config](https://github.com/talentui/webpack-config)自动识别出文件路径。并且可以自动根据生产或者开发环境自动选取对应文件。

输出的dll文件名称是通过读取dll项目的package.json中的name和version并交给 [@talentui/dll-naming](https://github.com/talentui/dll-naming)来自动生成。在**@talentui/webpack-config**中也使用了这个**@talentui/dll-naming**。所以通过@talentui/dll-webpack-config生成的dll被自动识别出来。

通过@talentui/dll-webpack-config生成的dll会同时输出生产环境和开发环境的dll, 开发环境的dll, 使用了NamedModulePlugin，而生成环境的dll没有使用NamedModulePlugin， 使用了UglifyJSPlugin来压缩输出代码。

## 应用

初始化项目：

```bash
    yarn init -y
```

安装@talentui/dll-webpack-config

```bash
    yarn add @talentui/dll-webpack-config --dev
    
```

在你的应用项目下面创建webpack.config.js

```js
    const dllWebpackConfig = require('@talentui/dll-webpack-config');
    const path = require('path');

    module.exports = dllWebpackConfig({
        root: path.resove(__dirname /**/) //这里统一为项目的根目录，方便使用统一的context,
        venders: require('./vender-list')
    })

```

创建vender-list.js

```js
    module.exports = [
        'react',
        'react-dom',
        ...所有你想引进来的库
    ]

```

安装你需要打包的库

```bash
    yarn add react react-dom ....
```

执行打包：

```bash
    webpack -c webpack/webpack.config.js
```

查看输出文件，假如你package.json中的name是 qd-fed-dll, 版本号是1.0.0, 则输出的文件应该包含：

```js
    //生产环境带版本号
    - qd-fed-dll-1.0.0.min.js
    - qd-fed-dll-1.0.0.manifest.json
    //开发环境不带版本号
    - qd-fed-dll.dev.js
    - qd-fed-dll.dev.manifest.json
```

## 更新日志

#### 10.10 

> 添加对dllList参数支持，如果当前需要打包的dll依赖了其他的dll，添加到dllList参数中即可

```js
    const dllWebpackConfig = require('@talentui/dll-webpack-config');
    const path = require('path');

    module.exports = dllWebpackConfig({
        root: path.resove(__dirname /**/), //这里统一为项目的根目录，方便使用统一的context,
        venders: require('./vender-list'),
        dllList: ['@talentui/dll-react']
    })
```