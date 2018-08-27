define(function (require, exports, module) {
    "use strict";
    require("./style.css");
    var temp = require("./temp.html");
    module.exports = {
        name: "Template",
        template: temp,
        data() {
            return {
                time: 0
            };
        },
        mounted() {
            console.log(1)
        }
    }
});