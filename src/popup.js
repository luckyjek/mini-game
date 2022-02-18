'use strict';

export default class Popup {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            //등록된 onClick이라는 함수가 있으면, 멤버변수가 있으면 this.onClick && 가 true이니까,
            //뒤에꺼가 실행될 것이다.  onClick이 있을때만 onClick()을 호출한다.
            this.onClick && this.onClick();
            //그리고 PopUp자체를 hidePopUp();이니까 PopUp을 없애면 된다.
            hide();

        })
    }

    setClickListner(onClick) {
        //아래의 멤버변수는 함수를 가르킨다. 그리고 전달받은 onClick을 할당한다.
        this.onClick = onClick
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}