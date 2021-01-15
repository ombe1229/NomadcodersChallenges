// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const body = document.querySelector("body");

const blue = "#2e8cd5";
const purple = "#904eac";
const yellow = "#eebc12";

function resizeHandler(event) {
  let width = window.innerWidth;

  if (width <= 500) {
    body.style.backgroundColor = blue;
  } else if (width > 500 && width <= 650) {
    body.style.backgroundColor = purple;
  } else if (width > 650) {
    body.style.backgroundColor = yellow;
  }
}

window.addEventListener("resize", resizeHandler);

// ❤
