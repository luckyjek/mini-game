'use strict'
import * as sound from './sound.js';
/**
 * 이 필드클래스는 게임정보에 대한 아이들은모른다.
 * 게임을 정확하게 생성하고, 즉 아이템들을 원래 자리에 배치하고,
 * 클릭까지 핸들링하는 아이이다.
 * -> 아이템들을 어디에다가 배치해야되는지 잘 아는 클래스이다.
 */

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug',
})
export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        //container에 클릭이되면 아이템을 클릭하는것을 처리했었다.
        // this.onClick는그럼, Field클래스안에서의 ? onClick 저거인가? 
        //그리고 이벤트를 저기 에다가 넘겨주는거?
        // this.onClick = this.onClick.bind(this);
        //this.field.addEventListener('click', event => this.onClick(event));
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) { //ref 전달
        this.onItemClick = onItemClick;
    }

    //addItem은 이Field안에서만 쓰이는 것인데, 타입스크립트같은경우는 
    //프라이빗 멤버변수를만들 수 있는데, JS에서는 프라이빗이 통용적으로
    //쓰여지고 있지 않기때문에 대부분 underscore(_)를 이용해서 
    //외부에서봤을때 '아 underscore는 내가 외부에서 부르면 안되겠구나'이렇게 생각할 수 있다.
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick = event => {
        //onClick(event) {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCattor();

            // onItemClick에 대해 받아온 정보(ref)가 있다면? 뒤에꺼를 실행하라.  
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}


/**
 * randomNumber는 아무런 이 Field와 상관이없다.
 * 즉, field안에있는 데이터에 무관하게 공통적으로 쓸 수 있는 아이이기때문에
 * 클래스는 청사진/템플릿같은 아이고, 이 클래스를 이용해서 new라는 키워드를 이용해서
 * Object를만든다. 즉 gameField , ..필드, ..필드 이렇게 다양한 Object를 만든다.
 * 함수들은 이렇게 새로 만들어준 오브젝트마다 다 들어있다.즉, 메모리에 다 이렇게 동일하게 올라간다.
 * 하지만 클래스에 상관없는 함수라면 클래스에 포함하는 것보다 밖에다가 두면, 
 * 똑같이 반복해서 Object에 만들어지지 않기 때문에 더 효율적이다.
 * 
 * 이런것들을 스태틱함수라고 부른다. 그래서 클래스안에서도 this.randomNumber라고 안해도된다.
 */
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}