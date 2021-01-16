// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const selector = document.getElementById("select");

const country = localStorage.getItem("country");
if (country !== null) {
  selector.value = country;
}

selector.addEventListener("change", (event) => {
  localStorage.setItem("country", event.target.value);
});
