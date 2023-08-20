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
    test();
    mediaRecorder.stop();
    console.log("Запись остоновлена");
  });

  button.addEventListener("mousedown", () => {
    recordedChunks = [];
    mediaRecorder.start();
    console.log("Запись запущена");
  });
};

navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then(handleSuccess);

function test() {
  navigator.permissions.query({ name: "microphone" }).then(function (result) {
    if (result.state == "granted") {
      console.log("Да");
    } else {
      console.log("Нет");
      navigator.mediaDevices.getUserMedia({ audio: true });
    }
    result.onchange = function () {};
  });
}
