function submitIfOptionChosen(selectedElement) {
  if (selectedElement.value) {
    selectedElement.form.submit();
  }
}

document.querySelectorAll(".randomRotation").forEach((element) => {
  let rotateDegrees = Math.random() * 0.02 - 0.01;
  element.style.setProperty("--rotation", `${rotateDegrees}turn`);
});

const sortToggle = document.querySelector("#sortToggle");
const sortOptions = document.querySelector(".sortOptions");

document.addEventListener("click", (event) => {
  let clickedToggle = sortToggle.contains(event.target);
  let clickedInsideSortOptions = sortOptions.contains(event.target);
  let isOpen = sortOptions.dataset.open === "true";

  if (clickedToggle) {
    sortOptions.style.setProperty("--xPosition", isOpen ? `150px` : `15px`);
    sortOptions.dataset.open = (!isOpen).toString();
  } else if (!clickedInsideSortOptions) {
    sortOptions.style.setProperty("--xPosition", `150px`);
    sortOptions.dataset.open = "false";
  }
});

document.querySelectorAll(".sortOptions li").forEach((listedItem) => {
  listedItem.addEventListener("click", () => {
    document.querySelector("#sortInput").value = listedItem.dataset.value;
    document.querySelector("#sortForm").submit();
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    document.querySelector(".auto-scrollUp").classList.add("show");
  } else {
    document.querySelector(".auto-scrollUp").classList.remove("show");
  }
});
