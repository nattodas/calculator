let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let sqrt = (a) => Math.sqrt(a);
let numOne = "";
let numTwo = "";
let operator = "";
let arr = [];
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

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        currentCalcDisplay.textContent += digit.value;
        if (/[+\-*/x÷√]/.test(currentCalcDisplay.textContent)) {
            numTwo += digit.value;
        }
    })
});

operatorBtns.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
        if (numOne === "" && operator === "") {
            numOne = currentCalcDisplay.textContent;
            operator = opBtn.value;
        };
        let previousResult = currentCalcDisplay.textContent;
        currentCalcDisplay.textContent = currentCalcDisplay.textContent + " " + opBtn.value + " ";
        if (numOne != "" && numTwo != "") {
            let result = operate(Number(numOne), Number(numTwo), operator);
            pastCalcDisplay.textContent = previousResult;
            currentCalcDisplay.textContent = result + " " + opBtn.value + " ";
            console.log(result);
            numOne = result;
            numTwo = "";
            operator = opBtn.value;
        }
        // if (numOne != "" && operator === "√") {
        //     let result = sqrtOp(Number(numOne), operator);
        //     pastCalcDisplay.textContent = previousResult + " " + opBtn.value;
        //     currentCalcDisplay.textContent = result;
        //     console.log(result);
        //     numOne = result;
        //     numTwo = "";
        //     operator = opBtn.value;
        // }
    });
});

// equals.addEventListener("click", () => {
//     numTwo = currentCalcDisplay.textContent.split(operator)[1].split("equals")[0];
//     console.log(numTwo);
//     let previousResult = currentCalcDisplay.textContent;
//     let result = operate(Number(numOne), Number(numTwo), operator);
//     previousCalcDisplay.textContent = previousResult;
//     currentCalcDisplay.textContent = result;
// })

clearBtn.addEventListener("click", () => {
    currentCalcDisplay.textContent = "";
    previousCalcDisplay.textContent = "";
})

deleteBtn.addEventListener("click", () => {
    currentCalcDisplay.textContent = currentCalcDisplay.textContent.slice(0, -1);
})