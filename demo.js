var w = new SharedWorker('worker.js');
w.port.addEventListener('message', function(e) {
    document.body.appendChild(document.createTextNode(e.data));
});
function hello() {
    return "Hello World";
}
w.port.start();
w.port.postMessage(hello.toString());
