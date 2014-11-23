var cookie = require('cookie');

window.onload = function () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var localMediaStream = null;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true, audio: false}, function (stream) {
      localMediaStream = stream;
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    }, function (error) {
      // error
    });
  }

  width = 320;
  streaming = false;
  video.addEventListener('canplay', function (e) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
    }
    streaming = true;
  });

  var capture = function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log(canvas.toDataURL('image/png'));
  };
  setTimeout(function () {
    capture();
    setTimeout(arguments.callee, 2000);
  }, 2000);
};