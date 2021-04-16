import { shortTextArray, normalTextArray, longTextArray } from "../data/texts";
import {
    textPanel,
    rules,
    textAreaPanel,
    textArea,
    timeDisplay,
    timeDisplayBig,
    record,
    text,
} from "./Variables";

const drawText = (targetElement, btnType) => {
    // determine the current array to draw the text from

    let currentArray;

    if (btnType === "short") {
        currentArray = shortTextArray;
    } else if (btnType === "normal") {
        currentArray = normalTextArray;
    } else if (btnType === "long") {
        currentArray = longTextArray;
    }

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

export { drawText };
