define((require, exports, module) => {

    "use strict";

    require("styles/common.css")

    var router = require("router/index");
    var store = require("store/index");

    Vue.prototype.$http = axios;
    //http request拦截器
    axios.interceptors.request.use(function (config) {
        store.dispatch('showloader')
        return config
    }, function (err) {
        return Promise.reject(err)
    });
    //http response 拦截器
    axios.interceptors.response.use(function (response) {
        store.dispatch('hideloader')
        return response
    }, function (err) {
        return Promise.reject(err)
    });
    axios.defaults.baseURL = "http://113.108.136.90:8099/xhdgis_admin/Handler";

    var vm = new Vue({
        el: "#app",
        router,
        store,
    });

    
    module.exports = {}
});