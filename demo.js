var w = new Worker('worker.js');
w.addEventListener('message', function(e) {
    document.body.appendChild(document.createTextNode(e.data));
});
function hello() {
    return "Hello World";
}
w.postMessage(hello.toString());
