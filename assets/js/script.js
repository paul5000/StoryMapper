(function (window, document) {

  /* late script loading */

  // let scripts = [
  //   'assets/js/geolocation.js'
  // ];
  // scripts.forEach((scriptPath) => {
  //   let scriptElement = document.createElement('script');
  //   scriptElement.type = 'text/javascript';
  //   scriptElement.src = scriptPath;
  //   document.getElementsByTagName('body')[0].appendChild(scriptElement);
  // });

  /* webcam element */

  startWebcams = () => {
    document.querySelectorAll('video[data-webcam]').forEach(function (webcam) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      })
      .then((stream) => {
        track = stream.getTracks()[0];
        webcam.srcObject = stream;
      })
      .catch((error) => {
        console.error("Oops. Something is broken.", error);
      });
    });
  }

  /* Screens */

  // hide all screens
  hideScreens = () => {
    document.querySelectorAll('.screen').forEach((screen) => {
      screen.classList.add('d-none');
    });
  }

  // show screen by id
  showScreen = (id) => {
    hideScreens();
    document.querySelector(id).classList.remove('d-none');
  }

  /* Base64 */

  base64ImageEncode = (image, width, height) => {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext("2d").drawImage(image, 0, 0)
    let dataUrl = canvas.toDataURL()
    canvas.remove
    return dataUrl
  }

  /* Script */

  takePicture = (event, properties = {}) => {
    event.preventDefault();
    let soureElement = document.getElementById(properties.sourceId) || false;
    let destinationElement = document.getElementById(properties.destinationId) || false;

    if (soureElement && destinationElement) {
      destinationElement.src = base64ImageEncode(
        soureElement,
        soureElement.videoWidth,
        soureElement.videoHeight
      );
    }
  }

  cameraTrigger = () => {
    let cameraTriggers = document.querySelectorAll('[data-take-picture]').forEach(function (cameraTrigger) {
      let properties = JSON.parse(cameraTrigger.dataset.takePicture || '{}');
      cameraTrigger.addEventListener("click", (event) => takePicture(event, properties), false);
    });
  }

  // // startup script
  // startUp = () => {
  //   // show first screen
  //   document.querySelector('#screen-1').classList.remove('d-none')
  //   // start webcam
  //   startCameraStream()
  // }

  // reset = () => {
  //   document.querySelector("#screen-2 .text--input textarea").value = ''
  //   showScreen('#screen-1')
  // }

  // StartUp
  window.addEventListener("DOMContentLoaded", () => {
    startWebcams();
    cameraTrigger();
  }, false);

})(window, document)
