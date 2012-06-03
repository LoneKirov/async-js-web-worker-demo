define(['async'], function(async) {
    var x = {'hello': 'world'};
    function hello() {
        var sTime = new Date().getTime();
        while (new Date().getTime() - sTime < 1000) {}
        var r = new Object;
        return function(v) { v.test = x; return v; }(r);
    }

    document.body.appendChild(document.createTextNode('Running (' + hello.toString() + ') with async'));
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(document.createElement('br'));
    var f = async(hello, function(v) { return eval(v); });
    document.body.appendChild(document.createTextNode('Initial return ' + JSON.stringify(f)));
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(document.createElement('br'));
    var waitForF = function() {
        if (f.ready) {
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createTextNode('Done ' + JSON.stringify(f))); 
        } else {
            document.body.appendChild(document.createTextNode('Waiting... ' + JSON.stringify(f)));
            document.body.appendChild(document.createElement('br'));
            setTimeout(waitForF, 500);
        }
    }
    setTimeout(waitForF, 100);
});
