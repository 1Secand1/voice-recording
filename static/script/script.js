function addСlassPress(idButton, className) {
  const button = document.getElementById(idButton);
  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.toLowerCase().indexOf("chrome") == -1;

  function classListAdd() {
    button.classList.add(className);
  }
  function classListRemove() {
    button.classList.remove(className);
  }

  if (isMobile) {
    button.addEventListener("touchstart", classListAdd);
    button.addEventListener("touchend", classListRemove);
    button.addEventListener("touchleave", classListRemove);
  } else {
    button.addEventListener("mousedown", classListAdd);
    button.addEventListener("mouseup", classListRemove);
    button.addEventListener("mouseout", classListRemove);
  }
}

addСlassPress("voiceRecording", "animated");
