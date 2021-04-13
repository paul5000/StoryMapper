(function (window, document) {

  /* webcam element */

  initWebcams = () => {
    document.querySelectorAll('[data-webcam]').forEach((webcamContainer) => {
      let video = webcamContainer.querySelector('video');
      webcamContainer.querySelectorAll('button,a').forEach((element) => { element.disabled = true; });
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      })
      .then((stream) => {
        track = stream.getTracks()[0];
        video.srcObject = stream;
      })
      .then(() => {
        webcamContainer.querySelectorAll('button,a').forEach((element) => { element.disabled = false; });
      })
      .catch((error) => {
        console.error("Oops. Something is broken.", error);
      });
    });
  }

  initCameraTriggers = () => {
    document.querySelectorAll('[data-take-picture]').forEach((cameraTrigger) => {
      let properties = JSON.parse(cameraTrigger.dataset.takePicture || '{}');
      cameraTrigger.addEventListener("click", (event) => takePicture(event, properties), false);
    });
  }

  takePicture = (event, properties = {}) => {
    event.preventDefault();
    const _base64ImageEncode = (image, width, height) => {
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext("2d").drawImage(image, 0, 0)
      let dataUrl = canvas.toDataURL()
      canvas.remove
      return dataUrl
    };
    let soureElement = document.getElementById(properties.sourceId) || false;
    let destinationElement = document.getElementById(properties.destinationId) || false;

    if (soureElement && destinationElement) {
      if (soureElement.videoWidth > 0 && soureElement.videoHeight > 0) {
        destinationElement.src = _base64ImageEncode(
          soureElement,
          soureElement.videoWidth,
          soureElement.videoHeight
        );
      }
    }
  }

  sendReport = () => {
    const storageRef = firebase.storage().ref();
    // name for this report
    let reportName = `${new Date()}`;
    // elements to store
    let userPicture = document.querySelector("#report-form #camera-picture");
    let userStory = document.querySelector("#report-form #user-story");
    let userRelationship = document.querySelector("#report-form #user-relationship");
    let userName = document.querySelector("#report-form #user-name");
    let userAge = document.querySelector("#report-form #user-age");
    let userGender = document.querySelector("#report-form #user-gender");
    let userEmail = document.querySelector("#report-form #user-email");
    let userCoordinates = document.querySelector("#report-form #user-coordinates");
    // let userGPS = document.querySelector("#screen-2 .text--input textarea");

    storageRef
      .child(`${reportName}/${reportName}_screenshot.png`)
      .putString(userPicture.src, "data_url")
      .then(() => console.log(`Screenshot for report '${reportName}' transferd.`));

    storageRef
      .child(`${reportName}/${reportName}_feedback.txt`)
      .putString(
`
Story: ${userStory.value}

Name: ${userName.value}
Email: ${userEmail.value}
Age: ${userAge.value}
Gender: ${userGender.value}
Relationship: ${userRelationship.value}
Coordinates: ${userCoordinates.value}
`)
      .then(() => console.log(`Feedback for report '${reportName}' transferd.`));
  }

  initGPSInputs = () => {
    document.querySelectorAll('input[data-current-position]').forEach((gpsInput) => {
      gpsInput.addEventListener('click', (event) => {
        navigator.geolocation.getCurrentPosition(
          (position) => event.target.value = `${position.coords.latitude},${position.coords.longitude}`,
          () => event.target.value ="we cant locate you"
        );
      }, false);
    });
  }

  // StartUp
  window.addEventListener("DOMContentLoaded", () => {
      // Initialize Firebase
      firebase.initializeApp({
        "apiKey": "AIzaSyBxlBVs8pTzztz9bIEdfEwa2xuguSvDPXA",
        "authDomain": "storycatcher-c2021.firebaseapp.com",
        "databaseURL": "https://storycatcher-c2021.firebaseio.com",
        "projectId": "storycatcher-c2021",
        "storageBucket": "storycatcher-c2021.appspot.com",
        "messagingSenderId": "139292647133",
        "appId": "1:139292647133:web:033d6d3b986466e163c534",
        "measurementId": "G-P0LNTLR72F"
    });
    initWebcams();
    initCameraTriggers();
    initGPSInputs();
    document.querySelectorAll('#submit-report').forEach((button) => {
      button.addEventListener('click', (event) => {
        sendReport();
      }, false);
    });
  }, false);

})(window, document)
