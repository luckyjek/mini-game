'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import {
    GameBuilder,
    Reason
} from './game.js';

//game끝나는 배너를 만듬.
const gameFinishBanner = new PopUp();
// const game = new Game(3, 2, 2);
const game = new GameBuilder()
    .withGameDuration(5) //5초동안
    .withCarrotCount(3)
    .withBugCount(3)
    .build();

game.setGameStopListener(reason => {
    // console.log(reason);
    let massage;
    switch (reason) {
        // case 'cancel':
        case Reason.cancel:
            massage = 'Replay';
            sound.playAlert();
            break;
        case Reason.win:
            massage = 'YOU WON';
            sound.playWin();
            break;
        case Reason.lose:
            massage = 'YOU LOST';
            sound.playBug();
            break;
        default:
            throw new Error('not valid reason');
    }
    //게임이 끝나면 그 이유에 맞게 배너를 보여준다.
    gameFinishBanner.showWithText(massage); //호출
})

//gameFinishBanner를 사용해서 setClickListner를 등록할건데,
//click이되면, 내가 등록한 함수를 부른다.
gameFinishBanner.setClickListner(() => {
    game.start(); //배너 클릭시, 게임이 다시 시작
})