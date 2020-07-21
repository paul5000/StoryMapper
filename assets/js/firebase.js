// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBxlBVs8pTzztz9bIEdfEwa2xuguSvDPXA",
  authDomain: "storycatcher-c2021.firebaseapp.com",
  databaseURL: "https://storycatcher-c2021.firebaseio.com",
  projectId: "storycatcher-c2021",
  storageBucket: "storycatcher-c2021.appspot.com",
  messagingSenderId: "139292647133",
  appId: "1:139292647133:web:033d6d3b986466e163c534",
  measurementId: "G-P0LNTLR72F"
});

async function startCapture() {
    let captureStream = null
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (error) {
        console.error(`Error: ${error}`)
    }
    return captureStream
}

function report() {
    // Points to the root reference
    var storageRef = firebase.storage().ref();
    let name = `${new Date()}`
    html2canvas(document.querySelector("#screen2 .camera--frame"), {
        allowTaint : false,
        useCORS: true,
        onrendered: function (canvas) {
            let imageData = canvas.toDataURL()
            storageRef
                .child(`${name}/screenshot.png`)
                .putString(imageData, "data_url")
                .then(function (snapshot) {
                    console.log(`Screenshot for '${name}' transferd.`)
                })
        },
    });
    let feedbackData = document.querySelector("#screen2 .text--input textarea").value;
    storageRef
        .child(`${name}/feedback.txt`)
        .putString(feedbackData)
        .then(function (snapshot) {
            console.log(`Feedback for '${name}' transferd.`)
        });
}
