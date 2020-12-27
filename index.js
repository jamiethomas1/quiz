const url = "https://opentdb.com/api.php?amount=1&category=9&difficulty=medium"

const request = require('request');
//const io = require('console-read-write');

request(url, {json:true}, (err, res, body) => {
    console.log(err);
    parse(body);
})

async function parse(text){
    let qArray = [];
    let qCount = 0;
    for(let i = 0; i < text.results.length; i++){
        qArray[i] = text.results[i]
        qCount++;
    }
    await ask(qArray[0]);
}

async function ask(question){
    let aArray = question.incorrect_answers;
    let answer = question.correct_answer;
    aArray.push(answer);
    await shuffleArray(aArray);
    let answerIndex = aArray.indexOf(answer);
    // for(let i = 0; i < aArray.length; i++){
    //     aArray[i] = `${i + 1}. ` + aArray[i];
    // }
    //console.log(question.question);
    console.log(aArray);
    let buttons = [];
    if(aArray.length === 4){
        document.body.innerHTML =
        `<h1>${question.question}</h1>
        \n<ol class="center">
        \n<li><button id="button0" type="button">${aArray[0]}</button></li>
        \n<li><button id="button1" type="button">${aArray[1]}</button"></li>
        \n<li><button id="button2" type="button">${aArray[2]}</button"></li>
        \n<li><button id="button3" type="button">${aArray[3]}</button></li>
        \n</ol>
        \n<button id = "confirm" class="confirm" type="button">Confirm Answer</button>`
        buttons.push(document.getElementById("button0"));
        buttons.push(document.getElementById("button1"));
        buttons.push(document.getElementById("button2"));
        buttons.push(document.getElementById("button3"));
    }
    else if(aArray.length === 2){
        document.body.innerHTML =
        `<h1>${question.question}</h1>
        \n<ol class="center">
        \n<li><button id="button0" type="button">${aArray[0]}</button></li>
        \n<li><button id="button1" type="button">${aArray[1]}</button></li>
        \n</ol>
        \n<button id="confirm" class="confirm" type="button">Confirm Answer</button>`
        buttons.push(document.getElementById("button0"));
        buttons.push(document.getElementById("button1"));
    }

    confirmButton = document.getElementById("confirm");
    

    let playerAnswer;
    buttons.forEach(button =>{
        button.addEventListener("click", () => {
            playerAnswer = buttons.indexOf(button);
            confirmButton.addEventListener("click", () => {
                checkAnswer(aArray, answerIndex, playerAnswer, confirmButton);
                buttons.forEach(button => {
                    if(button.innerHTML == aArray[answerIndex]) button.style["background-color"] = "green";
                    else button.style["background-color"] = "red";
                })
                confirmButton.blur();
                confirmButton.innerHTML = "Next Question";
                confirmButton.setAttribute("onClick", "javascript: location.reload()");
            })
        })
    })
}

async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function checkAnswer(aArray, correctAnswer, playerAnswer){
    if(playerAnswer == correctAnswer){
        console.log("Correct!")
    } else {
        console.log(`Incorrect! The correct answer was ${aArray[correctAnswer]}.`);
    }
}