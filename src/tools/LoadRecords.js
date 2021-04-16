import { scoreShortSpan, scoreNormalSpan, scoreLongSpan } from "./Variables";

const loadRecords = (scoreboard) => {
    scoreboard.short
        ? (scoreShortSpan.textContent = `${scoreboard.short}s`)
        : (scoreShortSpan.textContent = "");
    scoreboard.normal
        ? (scoreNormalSpan.textContent = `${scoreboard.normal}s`)
        : (scoreNormalSpan.textContent = "");
    scoreboard.long
        ? (scoreLongSpan.textContent = `${scoreboard.long}s`)
        : (scoreLongSpan.textContent = "");
};

const renderRecords = (data, scoreboard) => {
    if (data) {
        scoreboard = JSON.parse(data);
        loadRecords(scoreboard);
    } else {
        scoreboard = {
            short: 0,
            normal: 0,
            long: 0,
        };
    }
    return scoreboard;
};

export { renderRecords };
