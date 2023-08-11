
const background = document.getElementById("modal-background");

function backgrounClickHandler() {
  overlay.classList.remove("open");
}

background.addEventListener("click", backgrounClickHandler);


