alert("main.js working");

function submitIfOptionChosen(selectedElement) {
  if (selectedElement.value) {
    selectedElement.form.submit();
  }
}
