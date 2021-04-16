import {
    textAreaPanel,
    timeDisplay,
    text,
    textArea,
    timeDisplayBig,
    textPanel,
    record,
    scoreShortSpan,
    scoreNormalSpan,
    scoreLongSpan,
} from "./Variables";

let idInterval;
let time = 0;

const startTimer = () => {
    textAreaPanel.querySelector("h2").style.opacity = "0";
    idInterval = setInterval(runTimer, 10);
};

const runTimer = () => {
    time++;
    let seconds = (time / 100).toFixed(2);
    timeDisplay.textContent = seconds;
    if (Number(seconds) < 10) {
        timeDisplay.textContent = `0${seconds}`;
    }
};

const stopTimer = (scoreboard, clickedMenu, textType) => {
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
    return clickedMenu;
};

const handleBlur = () => {
    textAreaPanel.querySelector("h2").style.opacity = "1";
    clearInterval(idInterval);
    time = 0;
    textArea.value = "";
    timeDisplay.textContent = "--.--";
};

export { startTimer, stopTimer, handleBlur };
