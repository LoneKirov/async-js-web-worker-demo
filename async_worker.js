self.addEventListener('connect', function(e) {
    var port = e.ports[0];
    port.addEventListener('message', function(e) {
        var defs = "";
        for (v in e.data.environment) {
            var def = "var " + v + " = " + e.data.environment[v] + ";";
            defs += def;
        }
        var f = eval('(function() {' + defs + "return " + e.data.function + ';})()');
        port.postMessage({'id': e.data.id, 'result': f.apply()});
    });
    port.start();
});
