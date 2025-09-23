// Calculator project script

// Operator object function
// Add function 
function add(a,b) {
    return a + b;
};

// subtract function
function subtract(a,b) {
    return a - b;
};

//multiply function 
function multiply(a,b) {
    return a*b;
};

// divide function
function divide(a,b) {
    return a/b;
};

// operate variables
let number1 = 5;
let number2 = 4;
let operatorVar = divide;

// execute operator function
function operate(operatorFunc, num1, num2) {
    return operatorFunc(num1,num2);
};

// Click to populate the display function
function populateDisplay() {
    const display = document.querySelector('display .input');
    const buttons = document.querySelectorAll('.btn-group button');

    buttons.forEach(item => {
        item.addEventListener('click', (e) => {
            const btnText = e.target.textContent;
            display.value += btnText;
        })
    })
}

populateDisplay();