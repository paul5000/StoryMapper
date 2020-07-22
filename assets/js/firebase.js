(function(window, document){
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
    // reference to storage    
    const storageRef = firebase.storage().ref();

    report = () => {
        // name for this report
        let name = `${new Date()}`
        // elements to store
        let cameraFrame = document.querySelector("#screen-2 .camera--frame")
        let textInput = document.querySelector("#screen-2 .text--input textarea")
        // store textarea value in firebase
        storageRef
            .child(`${name}/feedback.txt`)
            .putString(textInput.value)
            .then(function (snapshot) {
                console.log(`Feedback for '${name}' transferd.`)
            });
        // store screenshot from picture in firebase
        html2canvas(cameraFrame, {
            allowTaint : false,
            useCORS: true,
            onrendered: function (canvas) {
                storageRef
                    .child(`${name}/screenshot.png`)
                    .putString(canvas.toDataURL(), "data_url")
                    .then(function (snapshot) {
                        console.log(`Screenshot for '${name}' transferd.`)
                    })
            },
        });
        // show screen 2
        showScreen('#screen-3')
    }
})(window, document)