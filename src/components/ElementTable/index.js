define(function (require, exports, module) {
    "use strict";
    var temp = require("./temp.html");
    module.exports = {
        name: "ElementTable",
        template: temp,
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎一',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎二',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎三',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎四',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tableColumns: [
                    { label: '日期', prop: 'date' },
                    { label: '姓名', prop: 'name' },
                    { label: '地址', prop: 'address' }
                ]
            };
        },
        mounted(){
            console.log(2)
        },
        methods: {
            onBtnDetailClick(row) {
                // 1. 用户详情存vuex
                this.$store.commit('save_detail_info', row);
                // 2. 动态改变路由的指向
                this.$router.push({ path: `/userInfo/${row.name}` });
            }
        }
    }
});