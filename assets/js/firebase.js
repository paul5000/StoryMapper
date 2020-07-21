// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyA8atTXmFZIh52DS_2qJKiwf0jNCkQ75jQ",
    authDomain: "storycatcher-899bb.firebaseapp.com",
    databaseURL: "https://storycatcher-899bb.firebaseio.com",
    projectId: "storycatcher-899bb",
    storageBucket: "storycatcher-899bb.appspot.com",
    messagingSenderId: "858403123719",
    appId: "1:858403123719:web:f861e1162223d0fb3f30a2",
    measurementId: "G-QS1L38GWGR",
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