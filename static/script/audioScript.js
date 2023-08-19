if (0) {
  function uploadAudioFile(file) {
    const formData = new FormData();
    formData.append("audioFile", file);

    const url = "/uploadAudio";

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(formData);
        if (response.ok) {
          console.log("Аудиофайл успешно отправлен на сервер");
        } else {
          console.error("Ошибка при отправке аудиофайла на сервер");
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке аудиофайла: ", error);
      });
  }
  function voiceRcording() {
    return {
      allowRecording() {},
      startRecordingvoice(eventName) {},
      stopRecordingvoice() {},
    };
  }
}

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
    requestAuthorizationToRequest();

    if (recordingPermission) {
      mediaRecorder.stop();
      console.log("Запись остоновлена");
    }
  });

  button.addEventListener("mousedown", () => {
    if (recordingPermission) {
      recordedChunks = [];
      mediaRecorder.start();
      console.log("Запись запущена");
    }
  });
};

function requestAuthorizationToRequest() {
  navigator.permissions.query({ name: "microphone" }).then(function (result) {
    if (result.state == "granted") {
      recordingPermission = true;

      navigator.mediaDevices.then(handleSuccess);

      return;
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }
    result.onchange = function () {};
  });
}
