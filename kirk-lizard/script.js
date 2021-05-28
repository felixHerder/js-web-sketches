import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";


const gifArray = [
    'https://thumbs.gfycat.com/HeavyLiquidEastrussiancoursinghounds-max-1mb.gif',
    'https://thumbs.gfycat.com/UnderstatedAthleticGallinule-max-1mb.gif',
    'https://thumbs.gfycat.com/InexperiencedBitesizedBordercollie-size_restricted.gif',
    'https://thumbs.gfycat.com/FrankSpectacularCarpenterant-max-1mb.gif',
    'https://thumbs.gfycat.com/FancySandyLangur-max-1mb.gif',
    'https://thumbs.gfycat.com/UnfortunateSingleBrahmanbull-max-1mb.gif'
];

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');
const reset = document.getElementById('reset');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerPhaser = document.getElementById('playerPhaser');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerPhaser = document.getElementById('computerPhaser');

const allGameIcons = document.querySelectorAll('.far');

const resultGif = document.querySelector('.resultGif');

let g = 0;

function newGif() {
    // const r1 = Math.floor(Math.random() * gifArray.length);
    g = (g + 1) % gifArray.length;
    resultGif.src = gifArray[g];
}


const choices = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'phaser'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'phaser'] },
    phaser: { name: 'Phaser', defeats: ['scissors', 'rock'] },
};


function computerRandomChoice() {
    const choiceRand = Math.floor((Math.random() * 5))
    const choiceArr = ['rock', 'paper', 'scissors', 'lizard', 'phaser'];
    const computerChoice = choiceArr[choiceRand];
    computerChoiceEl.textContent = computerChoice[0].toUpperCase() + computerChoice.slice(1);
    const choiceEls = Array.from(computerRock.parentElement.children);
    choiceEls.forEach((el) => {
        if (el.title.toLowerCase() === computerChoice)
            el.classList.add('selected');
        else
            el.classList.remove('selected');
    });
    return computerChoice;
}


function checkResult(player) {
    const comp = computerRandomChoice();
    const playerDefeats = choices[player].defeats;
    const computerDefeats = choices[comp].defeats;

    if (player === comp) {
        resultText.textContent = 'Draw!'
        resultText.style.color = "var(--clr0)"
        resultGif.classList.add("result-gif-draw");
    }

    if (computerDefeats.indexOf(player) > -1) {
        resultText.textContent = 'You Lose!'
        resultText.style.color = "var(--clr2)"
        computerScore++;
        computerScoreEl.textContent = computerScore;
        resultGif.classList.add("result-gif-lose");
    }

    if (playerDefeats.indexOf(comp) > -1) {
        resultText.textContent = 'You Win!'
        resultText.style.color = "var(--clr1)"
        playerScore++;
        playerScoreEl.textContent = playerScore;
        resultGif.classList.add("result-gif-win");
        startConfetti();
    }
    newGif();
}


let playerScore = 0;
let computerScore = 0;

function select(e, playerChoice) {
    stopConfetti();
    allGameIcons.forEach(e => e.classList.remove('selected'));
    e.classList.add('selected');
    playerChoiceEl.textContent = playerChoice[0].toUpperCase() + playerChoice.slice(1);
    const choicesArr = Array.from(e.parentElement.children);
    choicesArr.forEach((choice) => {
        if (e != choice) choice.classList.remove('selected');
    });
    //simulate loading choice
    reset.classList.add('loading');
    resultText.textContent = "computer's turn...";
    resultText.style.color = "var(--clr0)";
    setTimeout(() => {
        checkResult(playerChoice);
        reset.classList.remove('loading');
    }, 1000);
}
window.select = select;

reset.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    computerScoreEl.textContent = computerScore;
    playerScoreEl.textContent = playerScore;
    allGameIcons.forEach(e => e.classList.remove('selected'));
    resultText.textContent = 'Play the Game!';
    resultText.style.color = "var(--clr0)";
    playerChoiceEl.textContent = 'pick one';
    computerChoiceEl.textContent = '';
    stopConfetti();
})