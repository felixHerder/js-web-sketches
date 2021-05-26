const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let counddownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
dateEl.setAttribute('value', tomorrow);
dateEl.setAttribute('min', tomorrow);

function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        inputContainer.style.display = "none";
        if (distance < 0) {
            countdownEl.style.display = "none";
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.style.display = 'block';
        } else {
            const days = Math.floor(distance / day);
            const hours = Math.floor((distance % day) / hour);
            const minutes = Math.floor((distance % hour) / minute);
            const seconds = Math.floor((distance % minute) / second);

            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.style.display = 'none';
            countdownEl.style.display = "block";
        }
    }, second);

}

function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    window.localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

function reset() {
    inputContainer.style.display = "block";
    countdownEl.style.display = "none";
    completeEl.style.display = "none";
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restoreCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.style.display = "none";
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restoreCountdown();