let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let sqrt = (a) => Math.sqrt(a);
let numOne;
let numTwo;
let operator;
let operate = (num, num2, op) => {
    if (op === "+") {
        return add(num, num2);
    } else if (op === "-") {
        return subtract(num, num2);
    } else if (op === "x") {
       return multiply(num, num2);
    } else if (op === "÷") {
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
let equals = document.querySelector(".equals");
let clearBtn = document.querySelector(".clearBtn");
let deleteBtn = document.querySelector(".deleteBtn");
// let counter = 0;

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        currentCalcDisplay.textContent += digit.value;
    })
});

operatorBtns.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
        numOne = currentCalcDisplay.textContent;
        console.log(numOne);
        currentCalcDisplay.textContent = currentCalcDisplay.textContent + " " + opBtn.value + " ";
        operator = opBtn.value;
        // counter++; 
        // if (counter === 1) {
        //     operatorOne = opBtn.value;
        //     console.log(operatorOne);
        //     numOne = currentCalcDisplay.textContent.split(operatorOne)[0];
        //     console.log(numOne);
        // } else if (counter === 2) {
        //     operatorTwo = opBtn.value;
        //     numTwo = currentCalcDisplay.textContent.split(operatorOne)[1].split(operatorTwo)[0];
        //     console.log(numTwo);
        //     operator = operatorOne;
        //     let previousResult = currentCalcDisplay.textContent.slice(0, -2);
        //     let result = operate(Number(numOne), Number(numTwo), operator);
        //     console.log(result);
        //     previousCalcDisplay.textContent = previousResult;
        //     currentCalcDisplay.textContent = result + " " + operatorTwo;
        //     }
        });
    });

equals.addEventListener("click", () => {
    numTwo = currentCalcDisplay.textContent.split(operator)[1].split("equals")[0];
    console.log(numTwo);
    let previousResult = currentCalcDisplay.textContent;
    let result = operate(Number(numOne), Number(numTwo), operator);
    previousCalcDisplay.textContent = previousResult;
    currentCalcDisplay.textContent = result;
})

clearBtn.addEventListener("click", () => {
    currentCalcDisplay.textContent = "";
    previousCalcDisplay.textContent = "";
})

deleteBtn.addEventListener("click", () => {
    currentCalcDisplay.textContent = currentCalcDisplay.textContent.slice(0, -1);
})