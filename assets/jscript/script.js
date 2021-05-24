//Wait for DOM to finish loading before running game
//Get button elements and add event listeners

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                // alert("You Clicked Submit!");
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                // alert(`You Clicked ${gameType}`);
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})



function runGame(gameType) {
    //generate 2 random integer numbers for the game between 1 and 25

    document.getElementById("answer-box").value = "";

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        if (num1 > num2) {
            displaySubtractQuestion(num1, num2);
        } else {
            displaySubtractQuestion(num2, num1);
        }
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}

function checkAnswer() {
    // Checks user answer against first element of returned
    // calculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Yay! Correct!!!! :D");
        incrementScore();
    } else {
        alert(`Gobshite!! - you answered ${userAnswer} The correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    //Gets the operands and operator from the DOM (remember -NO Global Variables!)
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];

    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];

    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];

    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimnplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {
    //Get Current Score from DOM and increment
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    //Get Current Incorrect from DOM and increment
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}