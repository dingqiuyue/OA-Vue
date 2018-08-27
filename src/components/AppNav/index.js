define(function (require, exports, module) {
    'use strict'
    var temp = require("./temp.html");

    module.exports = {
        name: "AppNav",
        template: temp,
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
                ],
                sublist: false
            }
        },
        computed: {
            options() {
                return this.$store.state.options;
            }
        },
        mounted() {
            // 刷新时以当前路由做为tab加入tabs
            if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') == -1) {
                this.$store.commit('add_tabs', { route: '/', name: '首页' });
                this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name });
                this.$store.commit('set_active_index', this.$route.path);
            } else {
                this.$store.commit('add_tabs', { route: '/', name: '首页' });
                this.$store.commit('set_active_index', '/');
                this.$router.push('/');
            }
            this.GetMenuList();
        },
        methods: {
            GetMenuList: function () {
                var that = this;

                this.$http.get('/MenuHandler?method=get_menu_list', {
                    params: {
                        parent_id: 0
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        }
    }

});