'use strict';
import PopUp from './popup.js';
import Field from './filed.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
//gameFinishBanner를 사용해서 setClickListner를 등록할건데,
//click이되면, 내가 등록한 함수를 부른다.
gameFinishBanner.setClickListner(() => {
    startGame();
})

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    if (item === 'carrot') {
        score++;
        updateScoreBoare();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item === 'bug') {
        finishGame(false);
    }
}


gameBtn.addEventListener('click', () => {
    //클릭이되는순간 started는 false로 들어와 그래서 바로 else로 가! -> tartGame()호출
    if (started) { //게임이 시작이됐으면, 중지해야되고 
        stopGame();
    } else { //게임이 시작이되지않았다면, 게임을 시작하면된다.
        startGame();
    }
})

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('RERLAY❓');
    sound.playAlert();
    sound.stopBackground();
}

function finishGame(win) {
    //게임이 끝났다면 먼저 started = false로
    started = false;
    hideGameButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stopGameTimer();
    stopScound(bgSound);
    gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimerSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimerSec);
    timer = setInterval(() => {
        //interval이 1초마다 불려질때, 만약 남아있는 시간이 0초보다 작거나 같다면 
        //더이상 인터벌을 만들면안된다.
        if (remainingTimerSec <= 0) {
            clearInterval(timer); //web AIP를 이용해서 clearInterval()호출
            finishGame(CARROT_COUNT === score);
            return;
        }
        //만약 0초가 아닌, 아직 게임이 진행이되고있다면 
        updateTimerText(--remainingTimerSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60) //floor은 소수점을 내려주는 integer로 만들어주는 함수
    const secounds = time % 60;
    gameTimer.innerHTML = `${minutes}:${secounds}`
}

function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
}


function updateScoreBoare() {
    gameScore.innerText = CARROT_COUNT - score;
}