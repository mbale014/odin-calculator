// Calculator project script

// Operator object function
const operators = {
    '+' : function (a,b) {return a + b},
    '-' : function (a,b) {return a - b},
    '*' : function (a,b) {return a * b},
    '/' : function (a,b) {return a / b},
};

// operate variables
let valueTemp = '';
let beforeNumber = '';
let afterNumber = '';
let operatorFunc = '';
let isOnDigit = false;

// execute operator function
function operate(operatorProp, num1, num2) {
    const display = document.querySelector('.display input')
    if (num2 === 0 && operatorProp === '/') {
        alert('Oh no.. no.no. division by 0 is bad..');
        return display.value;
    } else if (!operatorProp) {
        alert('Chose an operator or do new calculation by input numbers');
        return display.value;
    } else {
        let output = operators[operatorProp](num1, num2);
        return Math.round(output * 100)/100;
    }
};

// Click to populate the display function
function populateDisplay() {
    const display = document.querySelector('.display input');
    const btnDigit = document.querySelectorAll('.digits-btn button');
    const btnClear = document.querySelector('.clear-btn');
    const btnOperator = document.querySelectorAll('.operator-btn button');
    const btnEqual = document.querySelector('.equal-sign-operator');
    const btnDel = document.querySelector('.backspace-btn');

    // Add digit on every digits button click to show it on display
    btnDigit.forEach(item => {
        item.addEventListener('click', (e) => {
            isOnDigit = true;
            if (valueTemp !== '') {
                valueTemp = '';
                display.value = '';
            };
            // Prevent user from entering decimal (.) twice
            if (display.value.includes('.') && e.target.textContent === '.') {
                return;
            } else {
                if (display.value[0] === '0' && !display.value.includes('.') && e.target.textContent !== '.' ) {
                    // initial zero handling. 
                    // this will check a zero in first index and replace with input unless user go with decimal
                    display.value = display.value.replace('0','');
                }
                const digitValue = e.target.textContent;
                display.value += digitValue;
                console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);
            }
        })
    });

    // Clear everything on clear button click
    btnClear.addEventListener('click', () => {
        display.value = valueTemp = beforeNumber = afterNumber = operatorFunc = '';
        console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);
    });

    // backspace button as delete function on display
    btnDel.addEventListener('click', () => {
        display.value = display.value.slice(0, -1);
    });

    // Make the operator button works on click
    btnOperator.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.className !== 'equal-sign-operator') {
                valueTemp = display.value;
                if (!isOnDigit) {
                    operatorFunc = e.target.textContent;
                    return;
                }else if (beforeNumber !== '') {
                    afterNumber = valueTemp;
                    const result = operate(operatorFunc, +beforeNumber, +afterNumber); // save the operate between number and save to result var
                    display.value = result; // show the result on display
                    beforeNumber = result;
                    operatorFunc = e.target.textContent; // store the operator for next operation
                    isOnDigit = false;
                } else if (beforeNumber === '') {
                    // second condition when user resets or first time using operator
                    beforeNumber = valueTemp;
                    operatorFunc = e.target.textContent;
                    isOnDigit = false;
                }
                console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);
            }
        }); 
    });

    // Make the equal button works on click to operate
    btnEqual.addEventListener('click', () => {
        if (!isOnDigit) {
            return;
        } else {
            afterNumber = display.value;
            const resultEqual = operate(operatorFunc, +beforeNumber, +afterNumber); // save the operate between number and save to result var
            display.value = resultEqual; // show the result on display
            afterNumber = resultEqual;
            valueTemp = resultEqual;
            beforeNumber = operatorFunc = '';
            console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);

        }
        
    });
};

// run the function
populateDisplay();


