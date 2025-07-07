function submitIfOptionChosen(selectedElement) {
  if (selectedElement.value) {
    selectedElement.form.submit();
  }
}
