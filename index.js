"use strict";
module.exports = {
    routes: require(__dirname + "/routes.json"),
    model : function(model){
        var path = __dirname + "/models/" + model + ".json";
        return require(path);
    }
}
