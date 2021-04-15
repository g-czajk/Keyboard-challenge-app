// GENERAL VARIABLES

const menu = document.querySelector(".mode-list");
const text = document.querySelector(".text p");
const textArea = document.querySelector(".insert-text");
const timeDisplay = document.querySelector(".timer");
const timeDisplayBig = document.querySelector(".timer-big");
const record = document.querySelector(".record");
const reset = document.querySelector(".reset");

const scoreShortSpan = document.querySelector(".score-short span");
const scoreNormalSpan = document.querySelector(".score-normal span");
const scoreLongSpan = document.querySelector(".score-long span");

let scoreboard;
let textType = null;
let clickedMenu = false;

// LOAD FROM LOCAL STORAGE

let data = localStorage.getItem("records");

const loadRecords = () => {
    scoreboard.short
        ? (scoreShortSpan.textContent = `${scoreboard.short}s`)
        : (scoreShortSpan.textContent = "");
    scoreboard.normal
        ? (scoreNormalSpan.textContent = `${scoreboard.normal}s`)
        : (scoreNormalSpan.textContent = "");
    scoreboard.long
        ? (scoreShortLong.textContent = `${scoreboard.long}s`)
        : (scoreLongSpan.textContent = "");
};

if (data) {
    scoreboard = JSON.parse(data);
    loadRecords();
} else {
    scoreboard = {
        short: 0,
        normal: 0,
        long: 0,
    };
}

// REMOVE APP DATA FROM LOCAL STORAGE

reset.addEventListener("click", function () {
    localStorage.removeItem("records");
    location.reload();
});

// RULES

const rules = document.querySelector(".rules-wrap");
const btnRulesHide = document.querySelector(".rules-wrap .hide");
const btnRulesShow = document.querySelector(".rules-btn");
const textPanel = document.querySelector(".text");
const textAreaPanel = document.querySelector(".insert-text-wrap");

if (scoreboard.short || scoreboard.normal || scoreboard.long) {
    window.addEventListener("DOMContentLoaded", function () {
        rules.classList.add("hide");
    });
}

const rulesHide = () => {
    rules.classList.add("hide");
    if (!textPanel.classList.contains("active") && clickedMenu) {
        textPanel.classList.add("active");
        textAreaPanel.classList.add("active");
    }
    if (!timeDisplayBig.classList.contains("show")) {
        if (textType) {
            if (!textPanel.classList.contains("active")) {
                timeDisplayBig.classList.add("show");
            }
        }
    }
};

const rulesShow = () => {
    rules.classList.remove("hide");
    if (textPanel.classList.contains("active")) {
        textPanel.classList.remove("active");
        textAreaPanel.classList.remove("active");
    }
    if (timeDisplayBig.classList.contains("show")) {
        timeDisplayBig.classList.remove("show");
    }
};

btnRulesHide.addEventListener("click", rulesHide);

btnRulesShow.addEventListener("click", rulesShow);

// DRAW TEXT

const insertText = (targetElement, btnType) => {
    // determine the current array to draw the text from

    let currentArray;

    if (btnType === "short") {
        currentArray = shortTextArray;
    } else if (btnType === "normal") {
        currentArray = normalTextArray;
    } else if (btnType === "long") {
        currentArray = longTextArray;
    }

    // determine the active text and whether the menu has been clicked

    textType = btnType;
    clickedMenu = true;

    // handle show/hide the rules

    if (
        !textPanel.classList.contains("active") &&
        rules.classList.contains("hide")
    ) {
        textPanel.classList.add("active");
        textAreaPanel.classList.add("active");
    } else if (
        !textPanel.classList.contains("active") &&
        !rules.classList.contains("hide")
    ) {
        rules.classList.add("hide");
        textPanel.classList.add("active");
        textAreaPanel.classList.add("active");
    }

    // handle styling interface elements

    document.querySelector(".mode h2").classList.add("animate-stop");
    textArea.value = "";
    document
        .querySelectorAll(".mode-list li")
        .forEach((li) => (li.style.transform = "translateY(0) scale(1)"));
    targetElement.style.transform = "translateY(30%) scale(1.2)";
    timeDisplay.textContent = "--.--";
    timeDisplay.classList.remove("fade");
    timeDisplayBig.classList.remove("show");
    record.textContent = "";

    // draw and insert text

    text.textContent = currentArray.splice(
        Math.floor(Math.random() * currentArray.length),
        1
    );

    // alert when ran out of texts in the category

    if (currentArray.length == 0) {
        alert(
            "To już ostatni tekst o tej długości w bazie. Aby grać dalej, wybierz tekst o innej długości lub odśwież stronę."
        );
    }
};

menu.addEventListener("click", (e) => {
    if (
        e.target.dataset.type === "short" ||
        e.target.dataset.type === "normal" ||
        e.target.dataset.type === "long"
    ) {
        insertText(e.target, e.target.dataset.type);
    }
});

// TIMER

let idInterval;

let time = 0;

const timer = () => {
    idInterval = setInterval(timerFunction, 10);
};

const timerFunction = () => {
    time++;
    let seconds = (time / 100).toFixed(2);
    timeDisplay.textContent = seconds;
    if (Number(seconds) < 10) {
        timeDisplay.textContent = `0${seconds}`;
    }
};

textArea.addEventListener("focus", () => {
    textAreaPanel.querySelector("h2").style.opacity = "0";
    timer();
});

textArea.addEventListener("blur", () => {
    textAreaPanel.querySelector("h2").style.opacity = "1";
    clearInterval(idInterval);
    time = 0;
    textArea.value = "";
    timeDisplay.textContent = "--.--";
});

const stopTimer = () => {
    if (text.textContent === textArea.value) {
        clearInterval(idInterval);
        textArea.value = "";
        time = 0;
        clickedMenu = false;
        timeDisplay.classList.add("fade");
        timeDisplayBig.classList.add("show");
        timeDisplayBig.querySelector(
            "p"
        ).textContent = `${timeDisplay.textContent}s`;
        textPanel.classList.remove("active");
        textAreaPanel.classList.remove("active");
        document.querySelector(".mode h2").classList.remove("animate-stop");
        document
            .querySelectorAll(".mode-list li")
            .forEach((li) => (li.style.transform = "translateY(0) scale(1)"));
        if (textType === "short") {
            if (
                Number(timeDisplay.textContent) < scoreboard.short ||
                scoreboard.short === 0
            ) {
                scoreboard.short === 0
                    ? (record.textContent = "")
                    : (record.textContent = "Nowy rekord !!!");
                scoreboard.short = timeDisplay.textContent;
                scoreShortSpan.textContent = `${scoreboard.short}s`;
                localStorage.setItem("records", JSON.stringify(scoreboard));
            }
        } else if (textType === "normal") {
            if (
                Number(timeDisplay.textContent) < scoreboard.normal ||
                scoreboard.normal === 0
            ) {
                scoreboard.normal === 0
                    ? (record.textContent = "")
                    : (record.textContent = "Nowy rekord !!!");
                scoreboard.normal = timeDisplay.textContent;
                scoreNormalSpan.textContent = `${scoreboard.normal}s`;
                localStorage.setItem("records", JSON.stringify(scoreboard));
            }
        } else if (textType === "long") {
            if (
                Number(timeDisplay.textContent) < scoreboard.long ||
                scoreboard.long === 0
            ) {
                scoreboard.long === 0
                    ? (record.textContent = "")
                    : (record.textContent = "Nowy rekord !!!");
                scoreboard.long = timeDisplay.textContent;
                scoreLongSpan.textContent = `${scoreboard.long}s`;
                localStorage.setItem("records", JSON.stringify(scoreboard));
            }
        }
    }
};

textArea.addEventListener("input", stopTimer);

// REPEAT TEXT

const btnRepeat = document.querySelector(".repeat");

const repeatText = () => {
    timeDisplay.classList.remove("fade");
    timeDisplayBig.classList.remove("show");
    textPanel.classList.add("active");
    textAreaPanel.classList.add("active");
    document.querySelector(".mode h2").classList.add("animate-stop");
    if (textType === "short") {
        btnTxtShort.style.transform = "translateY(30%) scale(1.2)";
        clickedMenu = true;
    } else if (textType === "normal") {
        btnTxtNormal.style.transform = "translateY(30%) scale(1.2)";
        clickedMenu = true;
    } else if (textType === "long") {
        btnTxtLong.style.transform = "translateY(30%) scale(1.2)";
        clickedMenu = true;
    }
};

btnRepeat.addEventListener("click", repeatText);
