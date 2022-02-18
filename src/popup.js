'use strict';

//사용자에게 데이터를 빰! 하고 보여줄 수 있는 PopUp class이다.
export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            //등록된 onClick이라는 함수가 있으면, 멤버변수가 있으면 this.onClick && 가 true이니까,
            //뒤에꺼가 실행될 것이다.  onClick이 있을때만 onClick()을 호출한다.
            this.onClick && this.onClick();
            //그리고 PopUp자체를 hidePopUp();이니까 PopUp을 없애면 된다.
            this.hide();
        })
    }
    //사용자가 PopUp에 setClickListner를 등록하면, 등록된 onClick을 호출해준다.
    //이말은 , PopUp class안에 있는 멤버변수 onClick에 setClickListner로 전달받은
    //onClick라는 인자를 this.onClick에 할당해주는것이다.
    setClickListner(onClick) {
        //아래의 멤버변수는 함수를 가르킨다. 그리고 전달받은 onClick을 할당한다.
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}