(function (window, document) {
  const cameraOptions = {
    video: { facingMode: "environment" },
    audio: false
  },
    cameraView = document.querySelector("#camera--view"),
    cameraPicture = document.querySelector("#camera--picture")

  // hide all screens
  hideScreens = () => {
    document.querySelectorAll('.screen').forEach(function (screen) {
      screen.classList.add('d-none')
    })
  }

  // show screen by id
  showScreen = (id) => {
    hideScreens()
    document.querySelector(id).classList.remove('d-none')
  }

  // stream webcam into camera_view
  startCameraStream = () => {
    navigator.mediaDevices
      .getUserMedia(cameraOptions)
      .then(function (stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Oops. Something is broken.", error);
      });
  }

  base64ImageEncode = (image, width, height) => {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext("2d").drawImage(image, 0, 0)
    let dataUrl = canvas.toDataURL()
    canvas.remove
    return dataUrl
  }

  // take a picture from camera stream
  takePicture = () => {
    // camera view to camera picture
    cameraPicture.src = base64ImageEncode(
      cameraView,
      cameraView.videoWidth,
      cameraView.videoHeight)
    // show screen 2
    showScreen('#screen-2')
  }

  // startup script
  startUp = () => {
    // show first screen
    document.querySelector('#screen-1').classList.remove('d-none')
    // start webcam
    startCameraStream()
  }

  reset = () => {
    document.querySelector("#screen-2 .text--input textarea").value = ''
    showScreen('#screen-1')
  }

  // run startup script if DOM loaded
  window.addEventListener("DOMContentLoaded", startUp, false)

  geoFindMe = () => {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
      output.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
      return;
    }

    success = (position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Die Latitude ist ' + latitude + '° <br>Die Longitude ist ' + longitude + '°</p>';

      var img = new Image();
      img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      output.appendChild(img);
    };

    error = () => {
      output.innerHTML = "Es war nicht möglich Sie zu lokalisieren";
    };

    output.innerHTML = "<p>Lokalisieren…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }
})(window, document)