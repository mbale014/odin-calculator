// Calculator project script

// Operator object function
const operators = {
    '+' : function (a,b) {return a + b},
    '-' : function (a,b) {return a - b},
    '*' : function (a,b) {return a * b},
    '/' : function (a,b) {return a / b},
}

// operate variables
let valueStored = '';
let number1 = '';
let number2 = '';
let operatorFunc = '';

// execute operator function
function operate(operatorProp, num1, num2) {
    if (num2 === '0' && operatorProp === '/') {
        alert('Oh no.. no.no. division by 0 is bad..');
    } else {
        return operators[operatorProp](num1, num2);
    }
    
}

// Click to populate the display function
function populateDisplay() {
    const display = document.querySelector('.display input');
    const buttons = document.querySelectorAll('.btn-group button');

    buttons.forEach(item => {
        item.addEventListener('click', (e) => {
            number2 = '';
            if (e.target.parentNode.className === 'clear-btn') {
                // clear display value to empty string
                number1 = number2 = operatorFunc = valueStored = display.value = '';
            } else if (e.target.className === 'operate-calc-btn') {
                // execute operate function number 1 with number 2 when '=' clicked 
                number2 = display.value;
                const calcResult = operate(operatorFunc, +number1, +number2);
                number1 = calcResult;
                number2 = '';
                valueStored = display.value = calcResult;
            } else if (e.target.parentNode.className === 'operator-btn' && e.target.className !== 'operate-calc-btn') {
                // When operator clicked, prompt user for the second number or show the result before
                if (number1 === '') {
                    number1 = display.value;
                    display.value = '';
                    operatorFunc = e.target.textContent;
                } else if (number1 !== '') {
                    number2 = display.value;
                    const calcResult = operate(operatorFunc, +number1, +number2);
                    display.value = calcResult;
                    valueStored = calcResult;
                } else {
                    e.preventDefault();
                }
                
            } else {
                // input digit by adding to display
                if (valueStored !== '') {
                    valueStored = '';
                    display.value = '';
                    const btnText = e.target.textContent;
                    display.value += btnText;
                } else {
                    const btnText = e.target.textContent;
                    display.value += btnText;
                }
                
                console.log(valueStored, number1, number2, operatorFunc);
            }
        })
    })
}

populateDisplay();

