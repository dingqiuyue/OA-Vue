# OA-Vue
后台管理框架demo

## Description
由vue + seajs架构的后台管理框架，页面主要三部分组成：头部、左侧菜单、主界面。左侧菜单以路由控制在主界面以tab页形式展示。

![效果图](https://github.com/dingqiuyue/OA-Vue/blob/master/demo.gif)

## Vue-OA  live-server开发环境配置说明
1、安装node.js
在node.js官网中下载与操作系统对应的安装包，执行默认安装即可（安装目录安装在C盘）。
2、配置node.js全局目录
在node.js安装目录下手动创建node_global与node_cache目录，在打开cmd命令窗口，分别执行以下命令：npm config set prefix "C:\Program Files\nodejs\node_global"、npm config set cache "C:\Program Files\nodejs\node_cache"，命令执行完后，将设置的node_global的路径添加到系统变量path中。
3、设置安装镜像
为解决安装慢或某些包无法访问，将镜像映射到淘宝镜像，需执行命令：npm install -g cnpm --registry=https://registry.npm.taobao.org
4、安装vsCode
下载与操作系统对应的安装包，执行默认安装即可。
5、快速搭建服务
安装live-server： cnpm install -g live-server
6、启动运行
在项目根目录执行命令：liver-server 回车即可。
7、其他方法
可用Visual Studio 打开，进行编辑开发，自行选择。
