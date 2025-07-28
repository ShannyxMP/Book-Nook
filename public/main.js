function submitIfOptionChosen(selectedElement) {
  if (selectedElement.value) {
    selectedElement.form.submit();
  }
}

document.querySelectorAll(".randomRotation").forEach((element) => {
  let rotateDegrees = Math.random() * 0.02 - 0.01;
  element.style.setProperty("--rotation", `${rotateDegrees}turn`);
});
