define(function (require, exports, module) {
    'use strict';
    var main = require("@/main")
    var ElementTable = require("@/ElementTable/index")
    var DetailInfo = require("@/DetailInfo/index")
    var Template = require("@/Template/index")
    var Theform = require("@/Theform/index")
    var Monthform = require("@/Monthform/index")
    
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
    module.exports = router;
});