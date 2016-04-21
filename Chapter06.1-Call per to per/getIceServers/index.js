<script>
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
var url = 'https://service.xirsys.com/ice';
var xhr = createCORSRequest('POST', url);
xhr.onload = function () {
    window.parent.postMessage({
        iceServers: JSON.parse(xhr.responseText).d.iceServers
    }, '*');
};
xhr.onerror = function () {
    console.error('Woops, there was an error making xhr request.');
};
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
window.addEventListener('message', function (event) {
    if (!event.data || typeof event.data !== 'string') return;
    if(event.data == 'get-ice-servers') {
        xhr.send('ident=muazkh&secret=59d93f26-5b89-11e5-babe-d61aeb366a63&domain=webrtcexperiment-webrtc.netdna-ssl.com&application=default&room=default&secure=1');
    }
});
</script>
