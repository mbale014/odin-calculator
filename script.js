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
    if (num2 === '0' && operatorProp === '/') {
        alert('Oh no.. no.no. division by 0 is bad..');
    } else {
        return operators[operatorProp](num1, num2);
    }
    
};

// Click to populate the display function
function populateDisplay() {
    const display = document.querySelector('.display input');
    const btnDigit = document.querySelectorAll('.digits-btn button');
    const btnClear = document.querySelector('.clear-btn button');
    const btnOperator = document.querySelectorAll('.operator-btn button');
    const btnEqual = document.querySelector('.equal-sign-operator');

    // Add digit on every digits button click to show it on display
    btnDigit.forEach(item => {
        item.addEventListener('click', (e) => {
            isOnDigit = true;
            if (valueTemp !== '') {
                valueTemp = '';
                display.value = '';
            }
            const digitValue = e.target.textContent;
            display.value += digitValue;
            console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);
        })
    });

    // Clear everything on clear button click
    btnClear.addEventListener('click', () => {
        display.value = valueTemp = beforeNumber = afterNumber = operatorFunc = '';
        console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);
    });

    // Make the operator button works on click
    btnOperator.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.className !== 'equal-sign-operator') {
                valueTemp = display.value;
                operatorFunc = '';
                if (!isOnDigit) {
                    return;
                }else if (beforeNumber !== '') {
                    afterNumber = valueTemp;
                    operatorFunc = e.target.textContent; // store the operator for next operation
                    const result = operate(operatorFunc, +beforeNumber, +afterNumber); // save the operate between number and save to result var
                    display.value = result; // show the result on display
                    beforeNumber = result;
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
        };
        afterNumber = display.value;
        const resultEqual = operate(operatorFunc, +beforeNumber, +afterNumber); // save the operate between number and save to result var
        display.value = resultEqual; // show the result on display
        beforeNumber = afterNumber = operatorFunc = valueTemp = '';
        isOnDigit = false;
        console.log(valueTemp, beforeNumber, afterNumber, operatorFunc);
    })
};

populateDisplay();

