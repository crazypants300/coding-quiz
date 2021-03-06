var questionTextEl = document.querySelector("#question-text");
var buttonContainerEl = document.querySelector("#question-options");
var button1El = document.querySelector("#button-1");
var button2El = document.querySelector("#button-2");
var button3El = document.querySelector("#button-3");
var button4El = document.querySelector("#button-4");
var hiddenAnswer = document.querySelector("#question-answer");
var startButtonEl = document.querySelector("#start-button");
var buttonsEl = document.querySelectorAll(".button");
var timerEl = document.querySelector("#current-timer");
var highScoreInputEl = document.querySelector("#high-score-input");
var submitButtonEl = document.querySelector("#submit-button");
var highScoreButtonEl = document.querySelector("#high-score-button");
var mainEl = document.querySelector('#main');


var currentTime = 75;
var questionCounter = 0;
var values = [];

var questionArray = [
    {
        question: "Commonly used Data Types do not include:",
        answers: {
            a: "1. Strings",
            b: "2. Booleans",
            c: "3. alerts",
            d: "4. numbers"
        },
        correctAnswer: "c",
        isAnswered: "false"
    },
    {
        question: "The condition in an if/else statement is enclosed with ____:",
        answers: {
            a: "1. Quotes",
            b: "2. Curly braces",
            c: "3. Square brackets",
            d: "4. Parenthesis"
        },
        correctAnswer: "d",
        isAnswered: "false"
    },
    {
        question: "Arrays in Javascript can be used to store ___:",
        answers: {
            a: "1. Numbers and strings",
            b: "2. Booleans",
            c: "3. Other arrays",
            d: "4. All of the above"
        },
        correctAnswer: "d",
        isAnswered: "false"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: {
            a: "1. Commas",
            b: "2. Curly brackets",
            c: "3. Quotes",
            d: "4. Parenthesis",
        },
        correctAnswer: "c",
        isAnswered: "false"
    },
    {
        question: "A very useful tool used during development and debugging for printing " +
        "content to the debugger is:",
        answers: {
            a: "1. JavaScript",
            b: "2. Terminal/Bash",
            c: "3. For loops",
            d: "4. console.log",
        },
        correctAnswer: "d",
        isAnswered: "false"
    }
]

var subtractTime = function() {
    if (currentTime - 5 > 0) {
        currentTime = currentTime - 5;  
    } else if (currentTime > 0) {
        currentTime--;
    } else {
        currentTime = 0;
    }

}

var writeQuestion = function(question) {
    questionTextEl.textContent = question.question;
    button1El.textContent = question.answers.a;
    button2El.textContent = question.answers.b;
    button3El.textContent = question.answers.c;
    button4El.textContent = question.answers.d;

    hiddenAnswer.style.visibility = "visible";
    questionCounter++;
}


var store = function () {
    var inputName= document.getElementById("high-score-name");
    localStorage.setItem('hs-' + inputName.value, inputName.value + ": " +  currentTime);
}

var createHighScoreList = function(score) {
    var container = document.createElement('div');
    container.className = "score-container";
    var listContainer = document.createElement('ul');
    var listItem = document.createElement('li');
    listItem.textContent = score;

    listContainer.appendChild(listItem);
    container.appendChild(listContainer);

    return container;
}

var appendScoreList = function(container) {
    mainEl.appendChild(container);

}

var highScores = function () {
   // event.preventDefault();
    console.log("HighScores");
    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
        values.push(localStorage.getItem(keys[i]));
        //console.log(localStorage.getItem(keys[i]));
        console.log("i = " + i);
        //console.log(localStorage.key(i));
        if (values[i]) {

            console.log("VALUE: " + JSON.stringify(values[i]));
            // console.log("VALUE: " + JSON.stringify(values[0]));
            // console.log("VALUE: " + JSON.stringify(values[1]));
            // console.log("VALUE: " + JSON.stringify(values[2]));
            //appendScoreList(createHighScoreList(JSON.stringify(values[i])));
        }
    }
}


var checkAnswer = function (eventTarget, currentQuestion) {
    if (currentQuestion === 4) {
        for (var i = 0; i < buttonsEl.length; i++) {
            buttonsEl[i].remove();
        }
        highScoreInputEl.style.visibility = "visible";
        questionTextEl.textContent = "Save your score!";
        clearInterval(timer);
    }
    else if (eventTarget.getAttribute('data-correct') === questionArray[currentQuestion].correctAnswer && questionArray[currentQuestion].isAnswered === "false") {
        questionArray[0].isAnswered = "true";
        writeQuestion(questionArray[currentQuestion+ 1]);
        hiddenAnswer.textContent = "Correct!";
        hiddenAnswer.style.color = "#C1C1C1";
        hiddenAnswer.style.fontSize = "30px";
    } else {
        questionArray[2].isAnswered = "true";
        writeQuestion(questionArray[currentQuestion+ 1]);
        hiddenAnswer.textContent = "Wrong!";
        hiddenAnswer.style.color = "#ff0000";
        hiddenAnswer.style.fontSize = "100px";
        subtractTime();
    }
}

var buttonClickHandler = function (event) {
    hiddenAnswer.style.visibility = "hidden";
    console.log("Question 0" + JSON.stringify(questionArray[0]));
    console.log(event.target.getAttribute('data-correct'));
    console.log(questionArray[0].correctAnswer);


    if (event.target.textContent === "Start") {
        writeQuestion(questionArray[0]);
        hiddenAnswer.style.visibility = "hidden";
        for (var i = 0; i < buttonsEl.length; i++) {
            buttonsEl[i].style.visibility = "visible";
        }
        startButtonEl.remove();
    } else if (questionCounter === 1) {
        checkAnswer(event.target, 0);
    } else if (questionCounter === 2) {
        checkAnswer(event.target, 1);
    } else if (questionCounter === 3) {
        checkAnswer(event.target, 2);
    } else if (questionCounter === 4) {
        checkAnswer(event.target, 3);
    } else if (questionCounter === 5) {
        checkAnswer(event.target, 4);
    }
}

var timer = setInterval(function (){
    if (questionCounter > 0){
        if (currentTime > 0) {
            timerEl.textContent = currentTime;
            currentTime--;
        } else {
            currentTime = 0;
            timerEl.textContent = currentTime;
        }
    }
}, 1000)



if (buttonContainerEl){
    buttonContainerEl.addEventListener("click", buttonClickHandler);
}
if (submitButtonEl) {
    submitButtonEl.addEventListener('click', store);
}

highScores();
for(var i = 0; i < values.length; i++) {
    appendScoreList(createHighScoreList(values[i]));
}

//if (highScoreButtonEl) {
//    highScoreButtonEl.addEventListener('click',highScores);
// }

