// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const taskForm = document.querySelector(".js-form"),
    taskInput = taskForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");


let pending = [];
let finished = [];


function getRandomId() {
    min = Math.ceil(100000000000);
    max = Math.floor(1000000000000);
    return Math.floor(Math.random() * (max - min)) + min;
}


function saveTasks(mode) {
    if (mode === "pending") {
        localStorage.setItem("PENDING", JSON.stringify(pending));
    } else if (mode === "finished") {
        localStorage.setItem("FINISHED", JSON.stringify(finished));
    }
}

function moveToFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const name = li.querySelector("span").innerText;
    pendingList.removeChild(li);
    const newPending = pending.filter(function(task) {
        return task.id !== parseInt(li.id);
    });
    pending = newPending;
    saveTasks("pending");
    paintTask(name, "finished");
}

function moveToPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const name = li.querySelector("span").innerText;
    finishedList.removeChild(li);
    const newFinished = finished.filter(function(task) {
        return task.id !== parseInt(li.id);
    });
    finished = newFinished;
    saveTasks("finished");
    paintTask(name, "pending");
}

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const newPending = pending.filter(function(task) {
        return task.id !== parseInt(li.id);
    });
    pending = newPending;
    saveTasks("pending");
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const newFinished = finished.filter(function(task) {
        return task.id !== parseInt(li.id);
    });
    finished = newFinished;
    saveTasks("finished");
}


function paintTask(name, mode) {
    const li = document.createElement("li");
    const moveBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const _id = getRandomId();
    span.innerText = name;
    delBtn.innerText = "❌";
    if (mode === "pending") {
        moveBtn.innerText = "✔";
        moveBtn.addEventListener("click", moveToFinished);
        delBtn.addEventListener("click", deletePending);
    } else if (mode === "finished") {
        moveBtn.innerText = "🔺";
        moveBtn.addEventListener("click", moveToPending);
        delBtn.addEventListener("click", deleteFinished);
    }
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = _id;
    const taskObj = {
        id: _id,
        text: name
    };
    if (mode === "pending") {
        pendingList.appendChild(li);
        pending.push(taskObj);
        saveTasks("pending");
    } else if (mode === "finished") {
        finishedList.appendChild(li);
        finished.push(taskObj);
        saveTasks("finished");
    }
}


function loadPending() {
    const loadedPending = localStorage.getItem("PENDING");
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function(task) {
            paintTask(task.text, "pending");
        });
    }
}

function loadFinished() {
    const loadedFinished = localStorage.getItem("FINISHED");
    if (loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function (task) {
            paintTask(task.text, "finished");
        });
    }
}


function handleSubmit(event) {
    event.preventDefault();
    const currentValue = taskInput.value;
    paintTask(currentValue, "pending");
    taskInput.value = "";
}


function init() {
    loadPending();
    loadFinished();
    taskForm.addEventListener("submit", handleSubmit);
}

init();