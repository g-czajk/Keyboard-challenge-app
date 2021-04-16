import { rules, textPanel, textAreaPanel, timeDisplayBig } from "./Variables";

const renderRules = (scoreboard) => {
    if (scoreboard.short || scoreboard.normal || scoreboard.long) {
        rules.classList.add("hide");
    }
};

const hideRules = (clickedMenu, textType) => {
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

const showRules = () => {
    rules.classList.remove("hide");
    if (textPanel.classList.contains("active")) {
        textPanel.classList.remove("active");
        textAreaPanel.classList.remove("active");
    }
    if (timeDisplayBig.classList.contains("show")) {
        timeDisplayBig.classList.remove("show");
    }
};

export { renderRules, hideRules, showRules };
