const audioRecording = document.getElementById("download");
const button = document.getElementById("voiceRecording");

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
    console.log("Запись остановлена");
  });

  button.addEventListener("mousedown", () => {
    recordedChunks = [];
    mediaRecorder.start();
    console.log("Запись запущена");
  });
};

function test() {
  navigator.permissions.query({ name: "microphone" }).then(function (result) {
    if (result.state == "granted") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleSuccess)
        .catch(function (error) {
          console.log("Ошибка при получении медиа-потока:", error);
        });
    } else if (result.state == "prompt") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleSuccess)
        .catch(function (error) {
          console.log("Ошибка при получении медиа-потока:", error);
        });
    } else if (result.state == "denied") {
      console.log("Доступ к микрофону заблокирован");
    }
    result.onchange = function () {};
  });
}

test();
