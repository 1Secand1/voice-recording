function addСlassPress(idTrigger, className) {
  const triggerEvents = document.getElementById(idTrigger);
  const isMobile =
    "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/);

  function classListAdd() {
    triggerEvents.classList.add(className);
  }
  function classListRemove() {
    triggerEvents.classList.remove(className);
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
