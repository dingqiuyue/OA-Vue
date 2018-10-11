
# OA-Vue
后台管理框架demo

## Description
由vue + seajs架构的后台管理框架，页面主要三部分组成：头部、左侧菜单、主界面。左侧菜单以路由控制在主界面以tab页形式展示。

![效果图](https://github.com/dingqiuyue/OA-Vue/blob/master/demo.gif)

## live-server开发环境配置说明
1. 安装node.js

  在node.js官网中下载与操作系统对应的安装包，执行默认安装即可（安装目录安装在C盘）。

2. 配置node.js全局目录

  在node.js安装目录下手动创建node_global与node_cache目录，在打开cmd命令窗口，分别执行以下命令：npm config set prefix "C:\Program Files\nodejs\node_global"、npm config set cache "C:\Program Files\nodejs\node_cache"，命令执行完后，将设置的node_global的路径添加到系统变量path中。

3. 设置安装镜像

  为解决安装慢或某些包无法访问，将镜像映射到淘宝镜像，需执行命令：npm install -g cnpm --registry=https://registry.npm.taobao.org

4. 安装vsCode

  下载与操作系统对应的安装包，执行默认安装即可。（用自己的编辑器即可）

5. 快速搭建服务

  安装live-server： cnpm install -g live-server

6. 启动运行

  在项目根目录执行命令：liver-server 回车即可。

7. 其他方法

  可用Visual Studio 打开，进行编辑开发，自行选择。
  
  
## 原理解析
### 左侧导航（自定义app-nav组件）
整个框架使用elementUI实现界面，导航使用的是左侧菜单组件-NavMenu导航菜单
将左侧菜单导航单独做成一个组件。
```
<!--html-->
<div class="app-nav-wrap">
//default-active设置当前激活的菜单。设置router使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
    //index设置的值为path
        <el-menu-item v-for="menu in menus" :index="menu.route" :key="menu.route" v-if="!menu.children">
            <i class="el-icon-menu"></i>{{menu.name}}
        </el-menu-item>
        <el-submenu v-for="menu in menus" :index="menu.route" :key="menu.route" v-if="menu.children">
            <template slot="title"><i class="el-icon-menu"></i>{{menu.name}}</template>
            <el-menu-item :index="item.route" v-for="item in menu.children" :key="item.route"> <i class="el-icon-location"></i>{{item.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
</div>

<!--菜单组件的js-->
//系统的菜单数据，渲染页面显示，灵活增删菜单
//route作为路径设置，name作为菜单名称显示，children作为是否有子菜单的判断。
data() {
    return {
        menus: [
            { route: '/', name: '首页' , children:false},
            { route: '/user', name: '用户管理' , children:false},
            { route: '/psd', name: '密码管理' , children:false},
            { route: '/salary', name: '工资管理' , children:false},
            { route: '/attendence', name: '考勤管理' , children:false},
            { route: '/perform', name: '绩效考核', children: [{ route: '/month', name: '月度绩效' }, { route: '/year', name: '年度绩效' }] },
            { route: '/admin', name: '系统管理' , children:false},
            { route: '/feedback', name: '意见反馈' , children:false}
        ]
    }
},
```

路由应该与上面组件中显示的对应，否则不会跳转。
```
<!--路由设置-->
 const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: '首页',
            component: main,
            children: [
                {
                    path: '/user',
                    name: '用户管理',
                    component: ElementTable,
                },
                {
                    path: '/userInfo/:id',
                    name: '用户详情页',
                    component: DetailInfo
                },
                {
                    path: '/psd',
                    name: '密码管理',
                    component: Template
                },
                {
                    path: '/salary',
                    name: '工资管理',
                    component: Template
                },
                {
                    path: '/attendence',
                    name: '考勤管理',
                    component: Template
                },
                {
                    path: '/perform',
                    name: '绩效考核',
                    component: Template,
                    children:[
                        {
                            path: '/month',
                            name: '月度绩效',
                            component: Monthform
                        },
                        {
                            path:'/year',
                            name: '年度绩效',
                            component: Theform
                        }
                    ]
                },
                {
                    path: '/admin',
                    name: '系统管理',
                    component: Template
                },
                {
                    path: '/feedback',
                    name: '意见反馈',
                    component: Template
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
```
以上实现点击菜单项页面跳转到对应的路由页面。

### 路由跳转显示tab页面（main框架组件）
在框架组件中，采用watch监听页面路由改变（即点击菜单操作），新增路由添加tab页，点击已打开的路由则跳转到相应的tab页。

```
 watch: {
    '$route'(to) {
            let flag = false;//判断是否页面中是否已经存在该路由下的tab页
            //options记录当前页面中已存在的tab页
            for (let option of this.options) {
            //用名称匹配，如果存在即将对应的tab页设置为active显示桌面前端
                if (option.name === to.name) {
                    flag = true;
                    this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                    break;
                }
            }
            //如果不存在，则新增tab页，再将新增的tab页设置为active显示在桌面前端
            if (!flag) {
                this.$store.commit('add_tabs', { route: '/' + to.path.split('/')[1], name: to.name });
                this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
            }

    }
}
```
来看一下框架组件的html，将菜单组件app-nav引入，主界面为tab栏。
使用elementUI的tab组件，绑定activeIndex为激活tab页显示在桌面前端，利用for循环options显示所有已打开的tab页。
```
<div class="main">
    <div class="app-header">
        <div class="title">后台管理系统</div>
    </div>
    <div class="app-content">
        <div class="app-nav">
            <app-nav></app-nav>
        </div>
        <div class="app-wrap">
            <!-- 此处放置el-tabs代码 -->
            <div class="template-tabs">
                <el-tabs v-model="activeIndex" type="border-card" closable @tab-click="tabClick" v-if="options.length" @tab-remove="tabRemove">
                    <el-tab-pane :key="item.name" v-for="(item, index) in options" :label="item.name" :name="item.route">
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="content-wrap">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
        </div>
    </div>
</div>
```
绑定两个主要函数：
- tabClick----点击tab标签将其激活显示在桌面最前端；
- tabRemove-----点击tab标签中的关闭按钮，将当前tab页关闭并从options里面移除。
对应的函数为：
```
methods: {
    // tab切换时，动态的切换路由
    tabClick(tab) {
        let path = this.activeIndex;
        // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
        if (this.activeIndex === '/userInfo') {
            path = this.activeIndex + '/' + this.$store.state.userInfo.name;
        }
        this.$router.push({ path: path });//路由跳转
    },
    tabRemove(targetName) {
        // 首页不可删除
        if (targetName == '/') {
            return;
        }
        //将改tab从options里移除
        this.$store.commit('delete_tabs', targetName);
        
        //还同时需要处理一种情况当需要移除的页面为当前激活的页面时，将上一个tab页作为激活tab
        if (this.activeIndex === targetName) {
            // 设置当前激活的路由
            if (this.options && this.options.length >= 1) {
                this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
                this.$router.push({ path: this.activeIndex });
            } else {
                this.$router.push({ path: '/' });
            }
        }
    }
},
computed: {
    options() {
        return this.$store.state.options;
    },
    //动态设置及获取当前激活的tab页
    activeIndex: {
        get() {
            return this.$store.state.activeIndex;
        },
        set(val) {
            this.$store.commit('set_active_index', val);
        }
    }
}
```

上述逻辑中采用了vuex存储tab数据，options维护一个数组，存储已经打开的tab页，activeIndex保存当前激活的tab页。
- add_tabs：添加新的tab页，向options数组中添加新数据。

- delete_tabs：关闭tab页，并将其从options数组中移除。

- set_active_index：设置当前激活的tab。
```
/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        options: [],
        activeIndex: '/user'
    },
    mutations: {
        // 添加tabs
        add_tabs(state, data) {
            this.state.options.push(data);
        },
        // 删除tabs
        delete_tabs(state, route) {
            let index = 0;
            for (let option of state.options) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.options.splice(index, 1);
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.activeIndex = index;
        },
    }
});
```
