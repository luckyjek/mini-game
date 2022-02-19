'use strict';
import * as sound from './sound.js';
import {
    Field,
    ItemType
} from './filed.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
})

//Builder Pattern
export class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            //클릭이되는순간 started는 false로 들어와 그래서 바로 else로 가! -> tartGame()호출
            if (this.started) { //게임이 시작이됐으면, 중지해야되고 
                this.stop(Reason.cancel);
            } else { //게임이 시작이되지않았다면, 게임을 시작하면된다.
                this.start();
            }
        })

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick); //item하나에 대한건가?

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }
    //game이 main.js에게 게임이 멈췄을 때 알려줄 수 있는 것을 만들어야된다.
    //game이 끝났으면 , 우리가 알려줄 수 있또록 콜백을 받아오면된다.
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started) { //game이 시작되지않았으면 return;
            return;
        }
        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoare();
            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === ItemType.bug) {
            this.stop(Reason.lose);
        }
    }

    showStopButton() {
        const icon = this.gameBtn.querySelector('.fa-solid');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimerSec = this.gameDuration;
        this.updateTimerText(remainingTimerSec);
        this.timer = setInterval(() => {
            //interval이 1초마다 불려질때, 만약 남아있는 시간이 0초보다 작거나 같다면 
            //더이상 인터벌을 만들면안된다.
            if (remainingTimerSec <= 0) {
                clearInterval(this.timer); //web AIP를 이용해서 clearInterval()호출
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            //만약 0초가 아닌, 아직 게임이 진행이되고있다면 
            this.updateTimerText(--remainingTimerSec);
        }, 1000)
    }

    stopGameTimer() {
        //window api이니까 this가 nono!
        clearInterval(this.timer);
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60) //floor은 소수점을 내려주는 integer로 만들어주는 함수
        const secounds = time % 60;
        this.gameTimer.innerHTML = `${minutes}:${secounds}`
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }

    updateScoreBoare() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}