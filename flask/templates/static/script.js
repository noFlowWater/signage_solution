var socket = io.connect(window.location.protocol + '//' + document.domain + ':' + location.port, {
    transports: ['websocket']
});
socket.on('connect', function () {
    console.log("Connected...!", socket.connected)
});


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const video = document.querySelector("#videoElement");

video.width = 400;
video.height = 300;


if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.error('Error accessing the camera:', error);
        });
} else {
    console.error('getUserMedia is not supported in this browser.');
}

const FPS = 10;
setInterval(() => {
    width = video.width;
    height = video.height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/jpeg', 0.5); // 웹캠 화면을 캡쳐하여, 압축률 0.5,데이터를 URL형식으로 변환/ base64로 인코딩 됨.
    context.clearRect(0, 0, width, height);
    socket.emit('image', data);
}, 1000 / FPS);
socket.on('processed_image', function (image) {

    photo.setAttribute('src', image);

});
