define(function() {
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    var inFlight = []

    var w = new SharedWorker('js/lib/async_worker.js');
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
});
