(function(window, document){
  const cameraOptions = {
    video: { facingMode: "environment" },
    audio: false
  },
  cameraView    = document.querySelector("#camera--view"),
  cameraPicture = document.querySelector("#camera--picture")

  // hide all screens
  hideScreens = () => {
    document.querySelectorAll('.screen').forEach(function (screen) {
      screen.classList.remove('screen--active')
    })
  }

  // show screen by id
  showScreen = (id) => {
    hideScreens()
    document.querySelector(id).classList.add('screen--active')
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
    let canvas    = document.createElement('canvas')
    canvas.width  = width
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
    document.querySelector('#screen-1').classList.add('screen--active')
    // start webcam
    startCameraStream()
  }

  // run startup script if DOM loaded
  window.addEventListener("DOMContentLoaded", startUp, false)
})(window, document)