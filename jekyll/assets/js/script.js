(function (window, document) {

  /* webcam element */

  initWebcams = () => {
    document.querySelectorAll('[data-webcam]').forEach((webcamContainer) => {
      let video = webcamContainer.querySelector('video');
      webcamContainer.querySelectorAll('button,a').forEach((element) => { element.disabled = true })
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      })
      .then((stream) => {
        track = stream.getTracks()[0]
        video.srcObject = stream
      })
      .then(() => {
        webcamContainer.querySelectorAll('button,a').forEach((element) => { element.disabled = false; })
      })
      .catch((error) => {
        console.error("Oops. Something is broken.", error)
      })
    })
  }

  initCameraTriggers = () => {
    document.querySelectorAll('[data-take-picture]').forEach((cameraTrigger) => {
      let properties = JSON.parse(cameraTrigger.dataset.takePicture || '{}')
      cameraTrigger.addEventListener("click", (event) => takePicture(event, properties), false)
    })
  }

  takePicture = (event, properties = {}) => {
    event.preventDefault()
    const _base64ImageEncode = (image, width, height) => {
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext("2d").drawImage(image, 0, 0)
      let dataUrl = canvas.toDataURL()
      canvas.remove
      return dataUrl
    }
    let soureElement = document.getElementById(properties.sourceId) || false
    let destinationElement = document.getElementById(properties.destinationId) || false

    if (soureElement && destinationElement) {
      if (soureElement.videoWidth > 0 && soureElement.videoHeight > 0) {
        destinationElement.src = _base64ImageEncode(soureElement, soureElement.videoWidth, soureElement.videoHeight)
      }
    }
  }

  sendReport = () => {
    // name for this report
    let reportName = `${new Date()}`
    // elements to store
    let userPicture = document.querySelector("#report-form #camera-picture"),
        userStory = document.querySelector("#report-form #user-story"),
        userRelationship = document.querySelector("#report-form #user-relationship"),
        userName = document.querySelector("#report-form #user-name"),
        userAge = document.querySelector("#report-form #user-age"),
        userGender = document.querySelector("#report-form #user-gender"),
        userEmail = document.querySelector("#report-form #user-email"),
        userCoordinates = document.querySelector("#report-form #user-coordinates")

    firebase.storage().ref().child(`story-mapper-v1/${reportName}.html`).putString(`
        <table>
          <tr><th>Picture</th><td><img src="${userPicture.src}" alt="no picture"/></td></tr>
          <tr><th>Picture</th><td><a download="${reportName}.png" href="${userPicture.src}" alt="picture downlaod">downlaod</a></td></tr>
          <tr><th>Story</th><td><p>${userStory.value || 'no story'}</p></td></tr>
          <tr><th>Name</th><td>${userName.value || 'no answer'}</td></tr>
          <tr><th>Email</th><td><a href="mailto:${userEmail.value}">${userEmail.value || 'no email'}</a></td></tr>
          <tr><th>Age</th><td>${userAge.value || 'no answer'}</td></tr>
          <tr><th>Gender</th><td>${userGender.value || 'no answer'}</td></tr>
          <tr><th>Relationship</th><td>${userRelationship.value || 'no answer'}</td></tr>
          <tr><th>Coordinates</th><td>${userCoordinates.value || 'no coordinates'} (<a href="http://www.google.com/maps/place/${userCoordinates.value}" target="_blank">map</a>)</td></tr>
        </table>
      `.trim(), 'raw', {
        contentType: 'text/html',
      })
      .then(() => console.log(`Report '${reportName}' transferd.`))
  }

  initGPSInputs = () => {
    document.querySelectorAll('input[data-current-position]').forEach((gpsInput) => {
      gpsInput.addEventListener('click', (event) => {
        navigator.geolocation.getCurrentPosition(
          (position) => event.target.value = `${position.coords.latitude},${position.coords.longitude}`,
          () => event.target.value ="we cant locate you"
        );
      }, false)
    })
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
    })
    initWebcams()
    initCameraTriggers()
    initGPSInputs()
    document.querySelectorAll('#submit-report').forEach((button) => {
      button.addEventListener('click', (event) => sendReport(), false);
    })
  }, false)

})(window, document)
