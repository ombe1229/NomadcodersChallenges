import "./styles.css";

const nowTime = document.querySelector("h3");

// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const today = new Date();
  const day = Math.floor((xmasDay - today) / (24 * 60 * 60 * 1000));
  const hour = Math.floor(((xmasDay - today) / (60 * 60 * 1000)) % 24, 10);
  const min = Math.floor(((xmasDay - today) / (60 * 1000)) % 60, 10);
  const sec = Math.floor(((xmasDay - today) / 1000) % 60, 10);

  nowTime.innerText = `${day}d ${hour}h ${min}m ${sec}s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();

// ❤
