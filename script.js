'use strict';

//Selecting Score Elements
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const diceNewBtn = document.querySelector(".btn--new");
const diceRollBtn = document.querySelector(".btn--roll");
const diceHoldBtn = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

//Starting Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceEl.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
const totalScore = [0, 0];
let playing = true;

const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
};

diceRollBtn.addEventListener('click', () => {
    if (playing) {
        // generating Dice Number
        const score = Math.trunc(Math.random() * 6 + 1);

        //displaying the dice
        diceImg.classList.remove("hidden");
        diceImg.src = `dice-${score}.png`;
        // console.log(score);

        //Checking the dice is 1 or not
        if (score !== 1) {
            currentScore += score;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            setTimeout(function () {
                diceImg.classList.add("hidden");
            }, 300);
            document.getElementById(`current--${activePlayer}`).classList.add("shake");
            switchPlayer();
            document.getElementById(`current--${activePlayer}`).classList.remove("shake");
        }
    }
});

diceHoldBtn.addEventListener('click', () => {
    diceImg.classList.add("hidden");
    if (playing) {
        totalScore[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];
        if (totalScore[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        } else {
            switchPlayer();
        }
    }
});

diceNewBtn.addEventListener('click', () => {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--winner`);
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
    document.querySelector(`.player--0`).classList.add(`player--active`);
    currentScore = 0;
    activePlayer = 0;
    totalScore[0] = 0;
    totalScore[1] = 0;
    playing = true;
});