function audioRecordingScript() {
  const audioRecording = document.getElementById("download");
  const button = document.getElementById("voiceRecording");
  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);

  let mediaRecorder;
  let recordedChunks = [];

  function initializeMediaRecorder(stream) {
    const options = { mimeType: "audio/webm" };
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", (e) => {
      recordedChunks = [];
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      audioRecording.src = URL.createObjectURL(new Blob(recordedChunks));
    });
  }
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

  function startRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log("Запись остановлена");
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          initializeMediaRecorder(stream);
          mediaRecorder.start();
          console.log("Запись запущена");
        })
        .catch((error) => {
          console.error(
            "Ошибка при запросе на использование микрофона:",
            error
          );
        });
    }
  }
  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log("Запись остановлена");
    }
  }

  if (isMobile) {
    button.addEventListener("touchstart", startRecording);
    button.addEventListener("touchend", stopRecording);
    button.addEventListener("touchleave", stopRecording);
  } else {
    button.addEventListener("mousedown", startRecording);
    button.addEventListener("mouseup", stopRecording);
    button.addEventListener("mouseout", stopRecording);
  }
}
audioRecordingScript();
