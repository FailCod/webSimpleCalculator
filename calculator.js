'use strict';
let dpCurrentNum = document.getElementById('dp-current-num'),
    dpSign = document.getElementById('dp-sign'),
    dpLastNum = document.getElementById('dp-last-num'),
    backspace = document.getElementById('backspace'),
    cleanAll = document.getElementById('clean-all'),
    mathOperators = document.querySelectorAll('.math-operator'),
    equality = document.getElementById('equalityBtn');

backspace.onclick = function () {
    dpCurrentNum.textContent = dpCurrentNum.textContent.slice(0, -1);
    if (dpCurrentNum.textContent == '') {
        dpCurrentNum.textContent = '0';
        setMainDisplayFontSize();
    }
};
cleanAll.onclick = () => {
    dpCurrentNum.textContent = '0';
    dpSign.textContent = '';
    dpLastNum.textContent = '';
    setMainDisplayFontSize();
};

function setMainDisplayFontSize() {
    if (dpCurrentNum.textContent.length > 15) {
        dpCurrentNum.style.fontSize = '23px';
    } else if (dpCurrentNum.textContent.length > 10) {
        dpCurrentNum.style.fontSize = '31px';
    } else {
        dpCurrentNum.style.fontSize = null;
    }
}

function numberBtn(button) {
    if (dpCurrentNum.textContent == '0' && button.textContent != '.' ||
        !isFinite(dpCurrentNum.textContent)) {
        dpCurrentNum.textContent = '';
    }
    if (dpCurrentNum.textContent.length < 20) {
        dpCurrentNum.textContent += button.textContent;
        setMainDisplayFontSize();
    }
}

// function math () {
//     this.test = function() {
//         console.log('tessst');
//     };
// }
// new math()[test]; чёт такое надо (мб let self = this;?)

let math = { // give only str type!!!
    plus: function (first, second) {
        if (first && second) {
            return +first + +second;
        }
        dpSign.textContent = '+';
    },
    minus: function (first, second) {
        if (first && second) {
            return +first - +second;
        }
        dpSign.textContent = '-';
    },
    mpl: function (first, second) {
        if (first && second) {
            return +first * +second;
        }
        dpSign.textContent = 'X';
    },
    divide: function (first, second) {
        if (first && second) {
            return +first / +second;
        }
        dpSign.textContent = '/';
    },
    percent: function (first, second) {
        if (first && second) {
            return (+first / 100) * +second;
        }
        dpSign.textContent = '%';
    },
};

mathOperators.forEach((item) => {
    item.addEventListener('click', function() {
        if (dpLastNum.textContent) {
            compute(); // если хотят сделать несколько вычислений без нажатий на равно
        }
        dpLastNum.textContent = dpCurrentNum.textContent;

        if (dpLastNum.textContent.length > 17) {
            dpLastNum.style.fontSize = '23px';
        } else {
            dpLastNum.style.fontSize = null;
        }

        dpCurrentNum.textContent = '0';
        setMainDisplayFontSize();
        let action = this.getAttribute('data-math');
        math[action]();
    });
});

let operators = {
    '+': 'plus',
    '-': 'minus',
    'X': 'mpl',
    '/': 'divide',
    '%': 'percent'
};

equality.onclick = compute;

function compute () {
    let newDpSignContent = document.getElementById('dp-sign').textContent;
    if (!newDpSignContent) return false;

    let compute = math[operators[newDpSignContent]](dpLastNum.textContent, dpCurrentNum.textContent); // give only str to math func
    dpCurrentNum.textContent = String(compute).length > 20 ? compute.toExponential(4) : String(+compute.toFixed(10));
    setMainDisplayFontSize();
    dpLastNum.textContent = '';
    dpSign.textContent = '';
} 
// TODO: форматирование чисел
// TODO: клавиатура