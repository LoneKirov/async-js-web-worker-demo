self.addEventListener('connect', function(e) {
    var port = e.ports[0];
    port.addEventListener('message', function(e) {
        var f = eval('(' + e.data + ')');
        port.postMessage(f.apply());
    });
    port.start();
});
