function addСlassPress(idButton, className) {
  const button = document.getElementById(idButton);
  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);

  function classListAdd() {
    button.classList.add(className);
  }
  function classListRemove() {
    button.classList.remove(className);
  }

  button.addEventListener("touchstart", classListAdd);
  button.addEventListener("touchend", classListRemove);
  button.addEventListener("touchleave", classListRemove);

  button.addEventListener("mousedown", classListAdd);
  button.addEventListener("mouseup", classListRemove);
  button.addEventListener("mouseout", classListRemove);
}

addСlassPress("voiceRecording", "animated");
