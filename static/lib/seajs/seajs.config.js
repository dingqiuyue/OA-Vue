//seajs配置
seajs.config({

    //1.顶级标识始终相对 base 基础路径解析。
    //2.绝对路径和根路径始终相对当前页面解析。
    //3.require 和 require.async 中的相对路径相对当前模块路径来解析。
    //4.seajs.use 中的相对路径始终相对当前页面来解析。

    // Sea.js 的基础路径  在解析顶级标识时，会相对 base 路径来解析   base 的默认值为 sea.js 的访问路径的父级
    base: "./js/",

    // 路径配置  当目录比较深，或需要跨目录调用模块时，可以使用 paths 来简化书写
    paths: {
        //gallery: "https://a.alipayobjects.com/gallery"
        /*
            var underscore = require('gallery/underscore');
            //=> 加载的是 https://a.alipayobjects.com/gallery/underscore.js
         */
        js: "/js"
    },

    // 别名配置  当模块标识很长时，可以使用 alias 来简化（相当于 base 设置的目录为基础）
    //Sea.js 在解析模块标识时， 除非在路径中有问号（?）或最后一个字符是井号（#），否则都会自动添加 JS 扩展名（.js）。如果不想自动添加扩展名，可以在路径末尾加上井号（#）。
    alias: {
        //jquery: "jquery/1.10.1/jquery"//=> 加载的是 /html/module/jquery/1.10.1/jquery.js
        
    },

    // 变量配置  有些场景下，模块路径在运行时才能确定，这时可以使用 vars 变量来配置
    vars: {
        //locale: "zh-cn"
        /*
            var lang = require('./i18n/{locale}.js');
            //=> 加载的是 path/to/i18n/zh-cn.js 
         */
    },

    // 映射配置  该配置可对模块路径进行映射修改，可用于路径转换、在线调试等
    map: [
        //[".js", "-debug.js"]
        /*
            var a = require('./a');
            //=> 加载的是 ./js/a-debug.js
        */
    ],

    // 预加载项  在普通模块加载前，提前加载并初始化好指定模块  preload 中的配置，需要等到 use 时才加载
    //preload: ["seajs-text", "seajs-combo"],

    // 调试模式  值为 true 时，加载器不会删除动态插入的 script 标签。插件也可以根据 debug 配置，来决策 log 等信息的输出
    //debug: true,

    // 文件编码  获取模块文件时，<script> 或 <link> 标签的 charset 属性。 默认是 utf-8   还可以是一个函数
    charset: "utf-8"
});
