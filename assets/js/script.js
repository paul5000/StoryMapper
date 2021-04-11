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

  const cameraOptions = {
    video: { facingMode: "environment" },
    audio: false
  };

  // stream webcams
  startWebcams = () => {
    document.querySelectorAll('video[data-webcam]').forEach(function (webcam) {
      navigator.mediaDevices.getUserMedia(cameraOptions)
      .then((stream) => {
        track = stream.getTracks()[0];
        webcam.srcObject = stream;
      })
      .catch((error) => {
        console.error("Oops. Something is broken.", error);
      });
    });
  }
  window.addEventListener("DOMContentLoaded", startWebcams, false);

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

  takePicture = () => {
  }

  cameraTrigger = () => {
    let cameraTriggers = document.querySelectorAll('[data-take-picture]').forEach(function (cameraTrigger) {
      let properties = (typeof cameraTrigger.dataset.takePicture !== 'undefined' && toggleElement.dataset.toggleClass !== '') ? toggleElement.dataset.toggleClass : 'active';
      window.addEventListener(element, takePicture, false);
    });
  }
  window.addEventListener("DOMContentLoaded", cameraTrigger, false)

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
  // window.addEventListener("DOMContentLoaded", startUp, false)

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
