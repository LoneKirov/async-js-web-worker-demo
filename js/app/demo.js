define(['async'], function(async) {
    var x = {'hello': 'world'};
    function hello() {
        var r = new Object;
        r.test = x;
        return r;
    }

    var f = async(hello, function(v) { return eval(v); });
    document.body.appendChild(document.createTextNode(JSON.stringify(f)));
    var waitForF = function() {
        if (f.ready) {
            document.body.appendChild(document.createTextNode(JSON.stringify(f))); 
        } else {
            setTimeout(waitForF, 100);
        }
    }
    setTimeout(waitForF, 100);
});
