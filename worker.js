addEventListener('message', function(e) {
    var f = eval('(' + e.data + ')');
    postMessage(f.apply());
});
