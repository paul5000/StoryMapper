(function(){
    // Initialize Firebase
    firebase.initializeApp('../../config.json');
    // reference to storage    
    const storageRef = firebase.storage().ref();
    function report() {
        // name for this report
        let name = `${new Date()}`
        // elements to store
        let cameraFrame = document.querySelector("#screen2 .camera--frame")
        let textInput = document.querySelector("#screen2 .text--input textarea")
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
    }
})