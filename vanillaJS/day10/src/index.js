// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const rangeBar = document.getElementById("jsRange");
const rangeText = document.getElementById("rangeText");
const numberBox = document.getElementById("js-numberBox");
const playBtn = document.getElementById("js-playBtn");
const infoBox = document.getElementById("infoBox");
const resultBox = document.getElementById("resultBox");


function getRandomNum(max) {
    return Math.floor(Math.random() * max + 1);
}


function handleRangeChange(max) {
    rangeText.innerText = `Generate a number between 0 and ${max}`;
}

function play() {
    const num = numberBox.value;
    const max = rangeBar.value;
    const randomNum = getRandomNum(max);
    if (Number(num) > Number(max)) {
        infoBox.innerText = `Please choose a number less than ${max}.`;
        resultBox.innerText = "";
        return
    }
    infoBox.innerText = `You chose: ${num}, the machine chose: ${randomNum}`;
    if (parseInt(num) === parseInt(randomNum)) {
        resultBox.innerText = "You win!";
    } else {
        resultBox.innerText = "You lost!";
    }
}


function init() {
    playBtn.addEventListener("click", play);
}

init();

//❤