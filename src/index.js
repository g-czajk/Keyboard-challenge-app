import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
    faSync,
    faTimes,
    faLevelDownAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSync, faTimes, faLevelDownAlt);

dom.i2svg();

import "./css/index.css";
import * as vars from "./tools/Variables";
import { renderRecords } from "./tools/LoadRecords";
import { clearStorage } from "./tools/ClearStorage";
import { renderRules, hideRules, showRules } from "./tools/HandleRules";
import { drawText } from "./tools/DrawText";
import { startTimer, stopTimer, handleBlur } from "./tools/HandleTimer";
import { repeatText } from "./tools/RepeatText";

let scoreboard = null;
let data = localStorage.getItem("records");
let textType = null;
let clickedMenu = false;

// LOAD RECORDS FROM LOCAL STORAGE UPON APP START

scoreboard = renderRecords(data, scoreboard);

// REMOVE APP DATA FROM LOCAL STORAGE

vars.reset.addEventListener("click", clearStorage);

// HANDLE RULES PANEL

renderRules(scoreboard);

vars.btnRulesHide.addEventListener("click", () => {
    hideRules(clickedMenu, textType);
});

vars.btnRulesShow.addEventListener("click", showRules);

// DRAW TEXT AND DISPLAY IT IN THE UI

vars.menu.addEventListener("click", (e) => {
    if (
        e.target.dataset.type === "short" ||
        e.target.dataset.type === "normal" ||
        e.target.dataset.type === "long"
    ) {
        drawText(e.target, e.target.dataset.type);
        textType = e.target.dataset.type;
        clickedMenu = true;
    }
});

// HANDLE TIMER

vars.textArea.addEventListener("focus", startTimer);

vars.textArea.addEventListener("blur", handleBlur);

vars.textArea.addEventListener("input", () => {
    clickedMenu = stopTimer(scoreboard, clickedMenu, textType);
});

// REPEAT TEXT

vars.btnRepeat.addEventListener("click", () => {
    clickedMenu = repeatText(clickedMenu, textType);
});
