import { DOMManipulation } from './manipulation.js';
import { Timer } from './timer.js';
 
// global variable to interact with DOM of trivia web application
let manipulationObj;

/**
 * Main Class for Trivia Web Application
 */
class Quiz {

    constructor(username, type, data) {
        this.username = username;
        this.type = type;
        this.data = data;
        this.timer;

        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    /**
     * Start Quiz
     */
    async start() {
        // reset variables when starting new quiz
        this.reset();
        // define DOMManipulation object to interact with page
        this.defineDOMInteraction();
        // create question card view
        this.initQuestionCard();
        // initialize and start timer
        this.initTimer();
        this.timer.start();
        // fill generated question card with data
        this.showQuestion();
    }

    /**
     * Reset variables before each new quiz start
     */
    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    /**
     * Define DOMManipulation Object to interact with page
     */
    defineDOMInteraction() {
        // get needed elements from existing html page
        const quizCardComponent = document.getElementById("quiz");
        const cardHeadline = document.getElementById("card-headline");
        // define manipulationObj to interact with page
        manipulationObj = new DOMManipulation(quizCardComponent, cardHeadline);
    }

    /**
     * Initialize quiz card view to show questions of quiz
     */
    initQuestionCard() {
        // number of options per question - every question needs to have same amount of options!
        let numOptPerQuest = Object.keys(this.data[this.currentQuestionIndex].options).length;
        // create html elements to show question
        manipulationObj.createQuestionCard(this, numOptPerQuest);
    }

    /**
     * Initialize timer
     */
    initTimer() {
        let timerElement = document.getElementById("timer");
        this.timer = new Timer(manipulationObj, timerElement);
    }

    /**
     * Show quiz data by filling created question card with data
     */
    showQuestion() {
        // show question
        document.getElementById("question").innerHTML = this.data[this.currentQuestionIndex].question;
        // show options
        document.getElementById("option1").innerHTML = this.data[this.currentQuestionIndex].options.A;
        document.getElementById("option2").innerHTML = this.data[this.currentQuestionIndex].options.B;
        document.getElementById("option3").innerHTML = this.data[this.currentQuestionIndex].options.C;
        document.getElementById("option4").innerHTML = this.data[this.currentQuestionIndex].options.D;
        // update progress bar
        let progressBar = document.getElementById("numQuestion");
        manipulationObj.updateProgressBar(this.currentQuestionIndex+1, this.data.length, progressBar);
    }

    /**
     * Performs action of next question button
     */
    showNextQuestion() {
        this.currentQuestionIndex++;
        if(this.currentQuestionIndex < this.data.length) {
            // there are still more questions to be answered
            this.showQuestion()
        } else {
            // no more questions in quiz
            // stop timer
            this.timer.stop();
            // update question card content
            manipulationObj.showFinalPage(this.username, this.score, this.data.length);
        }
    }

    /**
     * Increments Score if user selected correct option
     */
    updateScore() {
        const options = document.querySelectorAll("#quiz .btn");
        let correctOption, correctAnswer, chosenOption;
        options.forEach(option => {
            // option that has class 'active' is selected answer/option
            if(option.classList.contains("active")) {
                // get correct answer from dataset
                correctOption = this.data[this.currentQuestionIndex].answer;
                // get option behind answer letter
                switch(correctOption) {
                    case "A":
                        correctAnswer = this.data[this.currentQuestionIndex].options.A;
                        break;
                    case "B":
                        correctAnswer = this.data[this.currentQuestionIndex].options.B;
                        break;
                    case "C":
                        correctAnswer = this.data[this.currentQuestionIndex].options.C;
                        break;
                    case "D":
                        correctAnswer = this.data[this.currentQuestionIndex].options.D;
                        break;
                }
                // get chosen option
                chosenOption = option.textContent;
            }
        });
        if(chosenOption == correctAnswer) {
            this.score++;
        }
    }
}

export { Quiz };