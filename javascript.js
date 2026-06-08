let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let sqrt = (a) => Math.sqrt(a);
let numOne = "";
let numTwo = "";
let operator = "";
let operate = (num, num2, op) => {
    if (op === "+") {
        return add(num, num2);
    } else if (op === "-") {
        return subtract(num, num2);
    } else if (op === "x") {
       return multiply(num, num2);
    } else if (op === "÷") {
        if (num2 === 0) {
            currentCalcDisplay.textContent = "";
            previousCalcDisplay.textContent = "Nice try. Divide by a non-zero number.";
            numOne = "";
            numTwo = "";
            operator = "";
            decimalBtn.disabled = false;
            return;
        }
        return divide(num, num2);
    }
}; 
let sqrtOp = (num, op) => {
    if (op === "√") {
        return sqrt(num);
    }
}; 

let container = document.querySelector("#container");
let buttons = document.querySelectorAll("button");
let display = document.querySelector("#display");
let previousCalcDisplay = document.querySelector("#pastCalcDisplay");
let currentCalcDisplay = document.querySelector("#currentCalcDisplay");
let operatorBtns = document.querySelectorAll(".operatorBtn");
let digits = document.querySelectorAll(".digit");
let equalsBtn = document.querySelector(".equalsBtn");
let clearBtn = document.querySelector(".clearBtn");
let deleteBtn = document.querySelector(".deleteBtn");
let decimalBtn = document.querySelector(".decimalBtn");

let counter = 0;

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (numOne != "" && operator === "" && numTwo === "") {
            previousCalcDisplay.textContent = currentCalcDisplay.textContent; 
            currentCalcDisplay.textContent = "";
            numOne = "";
            counter = 0;
        }
        currentCalcDisplay.textContent += digit.value;
        if (/[+\-*/x÷√]/.test(currentCalcDisplay.textContent)) {
            decimalBtn.disabled = false;
            numTwo += digit.value;
            if (/[.]/.test(numTwo) && counter >= 1) {
            decimalBtn.disabled = true;
            }
        }
        if (digit.value === ".") {
            counter++;
            if (/[.]/.test(currentCalcDisplay.textContent) && counter >= 1) {
            decimalBtn.disabled = true;
            }
        }
    })
});

operatorBtns.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
        if (numOne === "" && operator === "") {
            numOne = currentCalcDisplay.textContent;
            operator = opBtn.value;
            decimalBtn.disabled = false;
        }
        if (operator === "") {
            operator = opBtn.value;
        }
        let previousResult = currentCalcDisplay.textContent;
        currentCalcDisplay.textContent = currentCalcDisplay.textContent + " " + opBtn.value + " ";
        if (numOne != "" && numTwo != "") {
            let result = operate(Number(numOne), Number(numTwo), operator);
            let roundedResult = round(result);
            pastCalcDisplay.textContent = previousResult;
            currentCalcDisplay.textContent = roundedResult + " " + opBtn.value + " ";
            numOne = roundedResult;
            numTwo = "";
            operator = opBtn.value;
            counter = 0;
        }
        if (operator === "√" && numOne != "" || numTwo != "") {
            let previousResult = currentCalcDisplay.textContent;
            let result = sqrtOp(numOne || numTwo, operator);
            let roundedResult = round(result);
            pastCalcDisplay.textContent = previousResult;
            currentCalcDisplay.textContent = roundedResult;
            numOne = roundedResult;
            numTwo = "";
            operator = "";
            counter = 0;
        }
    });
});

function round(num) {
   return parseFloat(num.toFixed(6));
}

equalsBtn.addEventListener("click", () => {
    if (operator != "√" && numTwo === "") return;
    let previousResult = currentCalcDisplay.textContent;
    let result = operate(Number(numOne), Number(numTwo), operator);
    let roundedResult = round(result);
    pastCalcDisplay.textContent = previousResult;
    currentCalcDisplay.textContent = roundedResult;
    numOne = roundedResult;
    numTwo = "";
    operator = "";
    counter = 0;
})

clearBtn.addEventListener("click", () => {
    currentCalcDisplay.textContent = "";
    previousCalcDisplay.textContent = "";
    numOne = "";
    numTwo = "";
    operator = "";
    counter = 0;
    decimalBtn.disabled = false;
})

deleteBtn.addEventListener("click", () => {
    currentCalcDisplay.textContent = currentCalcDisplay.textContent.slice(0, -1);
    if (numOne != "" && /[+\-*/x÷√]/.test(currentCalcDisplay.textContent) && numTwo != "") {
        numTwo = "";   
    } else if (numOne != "" && operator != "" && numTwo === "") {
        operator = "";
    } else if (operator === "") {
        numOne = "";
    }
})

document.addEventListener("keydown", function(event) {
    let key = event.key;
    if (key === "Backspace") {
        key = "delete";
    } else if (key === "Enter") {
        key = "=";
    } else if (key === "/") {
        key = "÷";
    } else if (key === "*") {
        key = "x";
    }
    let keyBtn = document.querySelector(`[value="${key}"]`);
    if (keyBtn) {
        keyBtn.click();
    }
})
