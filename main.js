'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFiledClick); //=== field.addEventListener('click', (event)=>onFiledClick(event));
gameBtn.addEventListener('click', () => {
    //클릭이되는순간 started는 false로 들어와 그래서 바로 else로 가! -> tartGame()호출
    if (started) { //게임이 시작이됐으면, 중지해야되고 
        stopGame();
    } else { //게임이 시작이되지않았다면, 게임을 시작하면된다.
        startGame();
    }
})
popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
})

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('RERLAY❓');
}

function finishGame(win) {
    //게임이 끝났다면 먼저 started = false로
    started = false;
    hideGameButton();
    showPopUpWithText(win ? 'YOU WON' : 'YOU LOST');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
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

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    //벌레와 당근을 생성한뒤 field에 추가해준다.
    // console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFiledClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        //당근!!
        target.remove();
        score++;
        updateScoreBoare();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        //벌레!!
        stopGameTimer();
        finishGame(false);
    }
}

function updateScoreBoare() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}