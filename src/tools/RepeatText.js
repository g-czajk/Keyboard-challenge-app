import {
    timeDisplay,
    timeDisplayBig,
    textPanel,
    textAreaPanel,
} from "./Variables";

const repeatText = (clickedMenu, textType) => {
    timeDisplay.classList.remove("fade");
    timeDisplayBig.classList.remove("show");
    textPanel.classList.add("active");
    textAreaPanel.classList.add("active");
    document.querySelector(".mode h2").classList.add("animate-stop");
    document.querySelector(`[data-type="${textType}"]`).style.transform =
        "translateY(30%) scale(1.2)";
    clickedMenu = true;
    return clickedMenu;
};

export { repeatText };
