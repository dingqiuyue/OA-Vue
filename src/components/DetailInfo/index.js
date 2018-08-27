define(function(require,exports,module){
    "use strict";
    var temp = require("./temp.html");
    module.exports ={
        name:"DetailInfo",
        template: temp,
        data(){
            return {
                time: 1
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo;
            }
        }
    }
});