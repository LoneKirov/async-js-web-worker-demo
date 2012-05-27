var async_call = (
function() {
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    var inFlight = []

    var w = new SharedWorker('async_worker.js');
    w.port.addEventListener('message', function(e) {
        var f = inFlight[e.data.id];
        f.result = e.data.result;
        f.ready = true;
        delete inFlight[f.id];
    });
    w.port.start();

    return function(f, e) {
        var r = new Object;
        r.id = guidGenerator();
        r.ready = false;
        inFlight[r.id] = r;
        w.port.postMessage({'function': f.toString(), 'environment': {'x': JSON.stringify(e('x')) }, 'id': r.id});
        return r;
    }
}());

var x = {'hello': 'world'};
function hello() {
    var r = new Object;
    r.test = x;
    return r;
}

var f = async_call(hello, function(v) { return eval(v); });
document.body.appendChild(document.createTextNode(JSON.stringify(f)));
var waitForF = function() {
    if (f.ready) {
        document.body.appendChild(document.createTextNode(JSON.stringify(f))); 
    } else {
        setTimeout(waitForF, 100);
    }
}
setTimeout(waitForF, 100);
