'use strict';
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

/**
 * 굳이 클래스로 만들지않고, 공통적으로 쓸 수 있기 때문에 그냥 빼놨다.
 * 그리고 사용자가 어떤 사운드를 재생해야되는지 일일이 전달하지 않아도되도록
 * 즉, 사운드별로 하도록 유용한 함수를 만들어보자
 * 이런식으로 만들면 사용자가 '어떤 사운드 이름'이 있는지 이런것은 기억하지 않아도된다.
 */
export function playCattor() {
    playScound(carrotSound);
}
export function playBug() {
    playScound(bugSound);
}
export function playAlert() {
    playScound(alertSound);
}
export function playWin() {
    playScound(winSound);
}
export function playBackground() {
    playScound(bgSound);
}
export function stopBackground() {
    stopScound(bgSound);
}

function playScound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopScound(sound) {
    sound.pause();
}