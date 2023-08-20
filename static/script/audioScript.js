const audioRecording = document.getElementById("download");
const button = document.getElementById("voiceRecording");
let recordingPermission = false;

async function checkAccess() {
  let useAuthorization = true;
  await navigator.mediaDevices.getUserMedia({ audio: true });

  const result = await navigator.permissions.query({ name: "microphone" });

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

  console.log("Отдаёт", useAuthorization);
  return useAuthorization;
}

button.addEventListener("mouseup", async () => {
  const getCheckAccess = await checkAccess();

  console.log("Получает", getCheckAccess);

  if (getCheckAccess) {
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
        console.log("Запись остановлена");
      });

      button.addEventListener("mousedown", () => {
        recordedChunks = [];
        mediaRecorder.start();
        console.log("Запись запущена");
      });
    };

    navigator.mediaDevices.then(handleSuccess);
  }

  if (!getCheckAccess) {
    console.log("Запрос");

    navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  }
});

// navigator.mediaDevices
//   .getUserMedia({ audio: true, video: false })
//   .then(handleSuccess);
