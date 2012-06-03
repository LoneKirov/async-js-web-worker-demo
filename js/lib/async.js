define(['undefined-vars', 'guid'], function(undefined_vars, guid) {
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
        var fnStr = f.toString();
        var undef = undefined_vars(fnStr);

        var env = new Object;
        for (v in undef) {
            env[v] = JSON.stringify(e(v));
        }

        r.id = guid();
        r.ready = false;
        inFlight[r.id] = r;
        w.port.postMessage({'function': f.toString(), 'environment': env, 'id': r.id});
        return r;
    }
});
