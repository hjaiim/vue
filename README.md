# Vue环境搭建文档

> 本工程以vue-router官方脚手架为模板,具体see the [pagejs branch](https://github.com/chrisvfritz/vue-2.0-simple-routing-example/tree/pagejs).
--------------------------

## webstome配置
> 详见[Webstome_config.md](./md/Webstome_config.md)

***

## 环境搭建

``` 在工程目录执行
# 安装全局模块
$ setup

# 安装本地工程模块
$ npm install

#克隆js运行库
$ cd src
$ git clone https://git.coding.net/billypc025/jslib.git

# 本地调试命令 (./dist/)
$ npm run dev

# 导出调试包 (./release/)
$ npm run build

# 打包命令 (./package/)
$ npm run package
```


## 目录结构
```
.
├── /bin/                       # 脚本目录
├── /assets/                    # 静态资源目录
│   ├── /images/                # 图片资源
│   └── /data/                  # 静态数据文件
│
├── /node_modules/              # 第三方类库
├── /dist/                      # 编译目录（debug）
├── /libs/                      # 运行时公共类库目录
│   └── /config.js              # 全局配置文件
│
├── /mock/                      # 前端调试假数据目录
│   ├── /mock-min.js            # mock库文件
│   └── /mockData.js            # mock假数据文件
│
├── /publish/                   # 打包导出目录
├── /release/                   # 编译目录（release）
├── /src/                       # 源代码目录
│   ├── /components/            # 公共组件目录
│   ├── /css/                   # css目录（scss文件）
│   ├── /jslib/                    # 框架包目录
│   ├── /pages/                 # 页面文件（.vue文件）
│   ├── /global.js              # 框架库文件（只要挂这一个文件就可以了）
│   ├── /routes.js              # 路由文件
│   └── /main.js                # 网站入口主文件
│
├── /static/                    # 存储前期制作的静态页面
├── /template/                  # 打包发布模块目录
├── index.html                  # 网站入口html文件
├── package.json                # node配置文件
└── webpack.config.js           # webpack配置文件
```


## 测试打包文件
> 在工程目录中运行publish.cmd（双击可直接执行）
> 测试debug版：
>> 打开publish>debug目录，在该目录打开cmd，执行openthis命令
>
> 测试release版：
>> 打开publish>release目录，在该目录打开cmd，执行openthis命令


## 配置文件libs/config.js
config.js中配置了一些在不同工作环境中需要设置的一些参数及变量，重点关注以下几点：
```
var SERVER_URL = "http://192.168.0.31:9001/vfund"; //服务端接口地址，修改此地址以调用服务端接口
SERVER_URL="";  //将SERVER_URL设空，将会调用前端假数据（即Mock里面配置的数据，用于前端本地调试）
```

For a detailed explanation of the build process, read the [docs for vue-loader](http://vuejs.github.io/vue-loader).
