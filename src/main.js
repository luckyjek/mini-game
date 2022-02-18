'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
const game = new Game(3, 2, 2);
game.setGameStopListener(reason => {
    // console.log(reason);

    let massage;
    switch (reason) {
        case 'cancel':
            massage = 'Replay';
            break;
        case 'win':
            massage = 'YOU WON';
            break;
        case 'lose':
            massage = 'YOU LOST';
            break;
        default:
            throw new Error('not valid reason');
    }

    gameFinishBanner.showWithText(massage); //호출
})

//gameFinishBanner를 사용해서 setClickListner를 등록할건데,
//click이되면, 내가 등록한 함수를 부른다.
gameFinishBanner.setClickListner(() => {
    game.start();
})