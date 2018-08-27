
define(function (require, exports, module) {
    "use strict";
    var temp = require("@/main.html");
    var AppNav = require("@/AppNav/index");
    module.exports = {
        name: "main",
        template: temp,
        components: {
            AppNav
        },
        methods: {
            // tab切换时，动态的切换路由
            tabClick(tab) {
                let path = this.activeIndex;
                // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
                if (this.activeIndex === '/userInfo') {
                    path = this.activeIndex + '/' + this.$store.state.userInfo.name;
                }
                this.$router.push({ path: path });
            },
            tabRemove(targetName) {
                // 首页不可删除
                if (targetName == '/') {
                    return;
                }
                this.$store.commit('delete_tabs', targetName);
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
            activeIndex: {
                get() {
                    return this.$store.state.activeIndex;
                },
                set(val) {
                    this.$store.commit('set_active_index', val);
                }
            }
        },
        mounted() {
            console.log(this.activeIndex);
        },
        watch: {
            '$route'(to) {
                    let flag = false;
                    for (let option of this.options) {
                        if (option.name === to.name) {
                            flag = true;
                            console.log(to.path);
                            console.log('/' + to.path.split('/')[1]);
                            this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                            break;
                        }
                    }
                    if (!flag) {
                        console.log(to.path);
                        console.log('/' + to.path.split('/')[1]);
                        this.$store.commit('add_tabs', { route: '/' + to.path.split('/')[1], name: to.name });
                        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                    }

            }
        }
    }
});