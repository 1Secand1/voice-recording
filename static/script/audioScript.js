const audioRecording = document.getElementById("download");
const button = document.getElementById("voiceRecording");
let recordingPermission = false;

const handleSuccess = function (stream) {
  const options = { mimeType: "audio/webm" };
  let recordedChunks = [];
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.addEventListener("dataavailable", (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  });

  mediaRecorder.addEventListener("stop", () => {
    audioRecording.src = URL.createObjectURL(new Blob(recordedChunks));
  });

  button.addEventListener("mouseup", () => {
    if (recordingPermission) {
      mediaRecorder.stop();
      console.log("Запись остановлена");
    }
  });

  button.addEventListener("mousedown", () => {
    requestAuthorizationToRequest();

    if (recordingPermission) {
      recordedChunks = [];
      mediaRecorder.start();
      console.log("Запись запущена");
    }
  });
};

function requestAuthorizationToRequest() {
  navigator.permissions
    .query({ name: "microphone" })
    .then(function (result) {
      if (result.state === "granted") {
        recordingPermission = true;
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccess)
        .catch((error) => console.log(error));

      result.onchange = function () {};
    })
    .catch((error) => console.log(error));
}

function requestAuthorizationToRequest() {
  navigator.permissions
    .query({ name: "microphone" })
    .then((result) => {
      recordingPermission = result.state === "granted";

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccess)
        .catch((error) => console.log(error));
      result.onchange = () => {};
    })
    .catch((error) => console.log(error));
}
