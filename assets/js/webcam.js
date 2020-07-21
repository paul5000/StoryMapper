const cameraView = document.querySelector("#camera--view"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Start the video stream when the window loads
window.addEventListener("load", 
    // Access the device camera and stream to cameraView
    function cameraStart() {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: "user"
                },
                audio: false }
            )
            .then(function (stream) {
                track = stream.getTracks()[0];
                cameraView.srcObject = stream;
            })
            .catch(function (error) {
                console.error("Oops. Something is broken.", error);
            });
    }
, false);

cameraTrigger.addEventListener("click", function takePicture() {
    // video to image
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    // image to output
    cameraOutput.src = cameraSensor.toDataURL();
    cameraOutput.classList.add("taken");
    showScreen('#screen2');
}, false);