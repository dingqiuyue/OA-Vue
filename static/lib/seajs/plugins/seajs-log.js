//log插件 log 信息默认不会显示，在 Sea.js 的 debug 为 true 时才显示
!function () { var a = seajs.data; seajs.log = function (b, c) { window.console && (c || a.debug) && console[c || (c = "log")] && console[c](b) }, define("seajs/seajs-log/1.0.1/seajs-log", [], {}) }();
/*
 seajs.log('订单流程', 'group'); // 调用 console.group
 seajs.log('a 的值是 ' + a.value); // 调用 console.log
 seajs.log('发现错误 ' + msg, 'warn'); // 调用 console.warn
 seajs.log('订单流程', 'groupEnd'); // 调用 console.groupEnd
 */