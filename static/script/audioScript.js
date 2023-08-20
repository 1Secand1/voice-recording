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
  navigator.mediaDevices.getUserMedia({ audio: true });

  navigator.permissions.query({ name: "microphone" }).then(function (result) {
    if (result.state == "granted") {
      console.log("Да");
    } else if (result.state == "prompt") {
      console.log("Нет");
    } else if (result.state == "denied") {
      console.log("Заблокировано");
    }
    result.onchange = function () {};
  });
}
