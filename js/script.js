const btnTxtShort = document.querySelector('.short');
const btnTxtNormal = document.querySelector('.normal');
const btnTxtLong = document.querySelector('.long');

const text = document.querySelector('.text p');

const textArea = document.querySelector('.insert-text');

const timeDisplay = document.querySelector('.timer');

const timeDisplayBig = document.querySelector('.timer-big');

const record = document.querySelector('.record');

const reset = document.querySelector('.reset');

const scoreShortSpan = document.querySelector('.score-short span');
const scoreNormalSpan = document.querySelector('.score-normal span');
const scoreLongSpan = document.querySelector('.score-long span');

let scoreboard

let textType = 0;

let clickedMenu = 0;

// LOAD FROM LOCAL STORAGE

let data = localStorage.getItem("records");

const loadRecords = () => {
    scoreboard.short ? scoreShortSpan.textContent = `${scoreboard.short}s` : scoreShortSpan.textContent = '';
    scoreboard.normal ? scoreNormalSpan.textContent = `${scoreboard.normal}s` : scoreNormalSpan.textContent = '';
    scoreboard.long ? scoreShortLong.textContent = `${scoreboard.long}s` : scoreLongSpan.textContent = '';
}

if (data) {
    scoreboard = JSON.parse(data);
    loadRecords();
} else {
    scoreboard = {
        short: 0,
        normal: 0,
        long: 0,
    }
}

reset.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// RULES

const rules = document.querySelector('.rules-wrap');

const btnRulesHide = document.querySelector('.rules-wrap .hide');

const btnRulesShow = document.querySelector('.rules-btn');

const textPanel = document.querySelector('.text');

const textAreaPanel = document.querySelector('.insert-text-wrap');

if (scoreboard.short || scoreboard.normal || scoreboard.long) {
    window.addEventListener('DOMContentLoaded', function () {
        rules.classList.add('hide')
    });
}

const rulesHide = () => {
    rules.classList.add('hide');
    if (!textPanel.classList.contains('active') && clickedMenu) {
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    }
    if (!timeDisplayBig.classList.contains('show')) {
        if (textType) {
            if (!textPanel.classList.contains('active')) {
                timeDisplayBig.classList.add('show');
            }
        }
    }
}

const rulesShow = () => {
    rules.classList.remove('hide');
    if (textPanel.classList.contains('active')) {
        textPanel.classList.remove('active');
        textAreaPanel.classList.remove('active');
    }
    if (timeDisplayBig.classList.contains('show')) {
        timeDisplayBig.classList.remove('show');
    }
}

btnRulesHide.addEventListener('click', rulesHide);

btnRulesShow.addEventListener('click', rulesShow)

// DRAW TEXT

const insertShortText = (e) => {
    if (!textPanel.classList.contains('active') && rules.classList.contains('hide')) {
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    } else if (!textPanel.classList.contains('active') && !rules.classList.contains('hide')) {
        rules.classList.add('hide');
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    }
    document.querySelector('.mode h2').classList.add('animate-stop');
    text.textContent = shortTextArray.splice(Math.floor((Math.random() * shortTextArray.length)), 1);
    textArea.value = '';
    document.querySelectorAll('.mode-list li').forEach(li => li.style.transform = 'translateY(0) scale(1)');
    e.target.style.transform = 'translateY(30%) scale(1.2)';
    textType = 1;
    clickedMenu = 1;
    timeDisplay.textContent = '--.--';
    timeDisplay.classList.remove('fade');
    timeDisplayBig.classList.remove('show');
    record.textContent = '';
    if (shortTextArray.length == 0) {
        alert('To już ostatni tekst o tej długości w bazie. Aby grać dalej, wybierz tekst o innej długości lub odśwież stronę.')
    }
}

btnTxtShort.addEventListener('click', insertShortText);

const insertNormalText = (e) => {
    if (!textPanel.classList.contains('active') && rules.classList.contains('hide')) {
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    } else if (!textPanel.classList.contains('active') && !rules.classList.contains('hide')) {
        rules.classList.add('hide');
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    }
    document.querySelector('.mode h2').classList.add('animate-stop');
    text.textContent = normalTextArray.splice(Math.floor((Math.random() * normalTextArray.length)), 1);
    textArea.value = '';
    document.querySelectorAll('.mode-list li').forEach(li => li.style.transform = 'translateY(0) scale(1)');
    e.target.style.transform = 'translateY(30%) scale(1.2)';
    textType = 2;
    clickedMenu = 1;
    timeDisplay.textContent = '--.--';
    timeDisplay.classList.remove('fade');
    timeDisplayBig.classList.remove('show');
    record.textContent = '';
    if (normalTextArray.length == 0) {
        alert('To już ostatni tekst o tej długości w bazie. Aby grać dalej, wybierz tekst o innej długości lub odśwież stronę.')
    }
}

btnTxtNormal.addEventListener('click', insertNormalText);

const insertLongText = (e) => {
    if (!textPanel.classList.contains('active') && rules.classList.contains('hide')) {
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    } else if (!textPanel.classList.contains('active') && !rules.classList.contains('hide')) {
        rules.classList.add('hide');
        textPanel.classList.add('active');
        textAreaPanel.classList.add('active');
    }
    document.querySelector('.mode h2').classList.add('animate-stop');
    text.textContent = longTextArray.splice(Math.floor((Math.random() * longTextArray.length)), 1);
    textArea.value = '';
    document.querySelectorAll('.mode-list li').forEach(li => li.style.transform = 'translateY(0) scale(1)');
    e.target.style.transform = 'translateY(30%) scale(1.2)';
    textType = 3;
    clickedMenu = 1;
    timeDisplay.textContent = '--.--';
    timeDisplay.classList.remove('fade');
    timeDisplayBig.classList.remove('show');
    record.textContent = '';
    if (longTextArray.length == 0) {
        alert('To już ostatni tekst o tej długości w bazie. Aby grać dalej, wybierz tekst o innej długości lub odśwież stronę.');
    }
}

btnTxtLong.addEventListener('click', insertLongText);

// TIMER

let idInterval

let time = 0;

const timer = () => {
    idInterval = setInterval(timerFunction, 10);
}

const timerFunction = () => {
    time++;
    let seconds = (time / 100).toFixed(2);
    timeDisplay.textContent = seconds;
    if (Number(seconds) < 10) {
        timeDisplay.textContent = `0${seconds}`;
    }
}

textArea.addEventListener('focus', () => {
    textAreaPanel.querySelector('h2').style.opacity = '0';
    timer();
})

textArea.addEventListener('blur', () => {
    textAreaPanel.querySelector('h2').style.opacity = '1';
    clearInterval(idInterval);
    time = 0;
    textArea.value = '';
    timeDisplay.textContent = '--.--';
})

const stopFunction = () => {
    if (text.textContent === textArea.value) {
        clearInterval(idInterval);
        textArea.value = '';
        // text.textContent = '';
        time = 0;
        clickedMenu = 0;
        timeDisplay.classList.add('fade');
        timeDisplayBig.classList.add('show');
        timeDisplayBig.querySelector('p').textContent = `${timeDisplay.textContent}s`;
        textPanel.classList.remove('active');
        textAreaPanel.classList.remove('active');
        document.querySelector('.mode h2').classList.remove('animate-stop');
        document.querySelectorAll('.mode-list li').forEach(li => li.style.transform = 'translateY(0) scale(1)');
        if (textType == 1) {
            if (Number(timeDisplay.textContent) < scoreboard.short || scoreboard.short === 0) {
                scoreboard.short === 0 ? record.textContent = '' :
                    record.textContent = 'Nowy rekord !!!';
                scoreboard.short = timeDisplay.textContent;
                scoreShortSpan.textContent = `${scoreboard.short}s`;
                localStorage.setItem("records", JSON.stringify(scoreboard));
            }
        } else if (textType == 2) {
            if (Number(timeDisplay.textContent) < scoreboard.normal || scoreboard.normal === 0) {
                scoreboard.normal === 0 ? record.textContent = '' :
                    record.textContent = 'Nowy rekord !!!';
                scoreboard.normal = timeDisplay.textContent;
                scoreNormalSpan.textContent = `${scoreboard.normal}s`;
                localStorage.setItem("records", JSON.stringify(scoreboard));
            }
        } else if (textType == 3) {
            if (Number(timeDisplay.textContent) < scoreboard.long || scoreboard.long === 0) {
                scoreboard.long === 0 ? record.textContent = '' :
                    record.textContent = 'Nowy rekord !!!';
                scoreboard.long = timeDisplay.textContent;
                scoreLongSpan.textContent = `${scoreboard.long}s`;
                localStorage.setItem("records", JSON.stringify(scoreboard));
            }
        }
    }
}

textArea.addEventListener('input', stopFunction);

// REPEAT TEXT

const btnRepeat = document.querySelector('.repeat');

const repeatText = () => {
    timeDisplay.classList.remove('fade');
    timeDisplayBig.classList.remove('show');
    textPanel.classList.add('active');
    textAreaPanel.classList.add('active');
    document.querySelector('.mode h2').classList.add('animate-stop');
    if (textType == 1) {
        btnTxtShort.style.transform = 'translateY(30%) scale(1.2)';
        clickedMenu = 1;
    } else if (textType == 2) {
        btnTxtNormal.style.transform = 'translateY(30%) scale(1.2)';
        clickedMenu = 1;
    } else if (textType == 3) {
        btnTxtLong.style.transform = 'translateY(30%) scale(1.2)';
        clickedMenu = 1;
    }
}

btnRepeat.addEventListener('click', repeatText)