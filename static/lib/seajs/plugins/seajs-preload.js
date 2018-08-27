//预加载项插件
!function () {
    var a = seajs.data, b = document;
    seajs.Module.preload = function (b) {
        var c = a.preload, d = c.length;
        d ? seajs.Module.use(c, function () {
            c.splice(0, d), seajs.Module.preload(b);
        }, a.cwd + "_preload_" + a.cid()) : b();
    }, seajs.use = function (b, c) {
        return seajs.Module.preload(function () { seajs.Module.use(b, c, a.cwd + "_use_" + a.cid()) }), seajs;
    }, a.preload = function () {
        var a = [], c = location.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
        return c += " " + b.cookie, c.replace(/(seajs-\w+)=1/g, function (b, c) { a.push(c) }), a;
    }(), define("seajs/seajs-preload/1.0.0/seajs-preload", [], {});
}();
/*
 seajs.config({
    preload: ['jquery']
 })

 seajs.use("path/to/mod")
 */