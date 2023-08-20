const audioRecording = document.getElementById("download");
const button = document.getElementById("voiceRecording");
let recordingPermission = false;

button.addEventListener("mouseup", () => {
  console.log(checkAccess(), "-");

  if (checkAccess()) {
    console.log("Записать звук");
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

    navigator.mediaDevices.then(handleSuccess);
  }

  if (!checkAccess()) {
    console.log("Запрос");

    navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  }
});

// navigator.mediaDevices
//   .getUserMedia({ audio: true, video: false })
//   .then(handleSuccess);

function checkAccess() {
  let useAuthorization = false;
  navigator.mediaDevices.getUserMedia({ audio: true });

  navigator.permissions.query({ name: "microphone" }).then(function (result) {
    if (result.state == "granted") {
      console.log("Да");
      useAuthorization = true;
    }

    if (result.state == "prompt") {
      console.log("Нет");
      useAuthorization = false;
    }

    if (result.state == "denied") {
      console.log("Заблокировано");
      useAuthorization = false;
    }

    result.onchange = function () {};
  });
}
