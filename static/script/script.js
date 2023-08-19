function addСlassPress(idTrigger, className) {
  const triggerEvents = document.getElementById(idTrigger);
  const nameClass = document.getElementById(className);

  triggerEvents.addEventListener("mousedown", () => {
    triggerEvents.classList.add(className);
  });

  triggerEvents.addEventListener("mouseup", () => {
    triggerEvents.classList.remove(className);
  });

  triggerEvents.addEventListener("mouseout", () => {
    triggerEvents.classList.remove(className);
  });
}

addСlassPress("voiceRecording", "animated");
