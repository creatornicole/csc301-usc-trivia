
/**
 * Handles View of Question Card
 */
class QuestionCard {
    /**
     * Creates Question Card for Trivia Web Application
     */
    static create(quiz, numOptPerQuest) {
        // needed html elements on page to append new elements to
        const quizCardComponent = document.getElementById("quiz");
        const cardHeadline = document.getElementById("card-headline");

        // CARD HEADLINE COMPONENTS
        // initialize question count/ progress bar
        const numQuestionElement = QuestionCard.createProgressBar();
        // initialize timer element
        const timerElement = QuestionCard.createTimerE();

        // append to card headline to display on web page
        cardHeadline.appendChild(numQuestionElement);
        cardHeadline.appendChild(timerElement);   

        // QUIZ CARD COMPONENTS
        // initialize question element
        const questionElement = QuestionCard.createQuestionE();
        // append to card component to display on web page
        quizCardComponent.appendChild(questionElement);

        // initialize option elements
        for(let i = 1; i <= numOptPerQuest; i++) {
            const optionElement = QuestionCard.createOptionE(i);
            // append each option to card component to display on web page
            quizCardComponent.appendChild(optionElement);
        }

        // initialize next question button
        const nextBtnElement = QuestionCard.initNextBtn(quiz);
        // append to card component to show element on web page
        quizCardComponent.appendChild(nextBtnElement);
    }

    /**
     * Adds Bootstrap class 'active' to selected option and shows next button
     */
    static selectAnswer(e) {
        const selectedOption = e.target;
        // remove bootstrap class 'active' from all options
        QuestionCard.resetSelectedAnswer();
        // add bootstrap class 'active' to selected option
        selectedOption.classList.add("active");
        // show next question button
        const nextBtnElement = document.getElementById("next-question-btn");
        nextBtnElement.style.display = "block";
    }

    /**
     * Removes Bootstrap class 'active' from all option elements
     */
    static resetSelectedAnswer() {
        const options = document.querySelectorAll("#quiz .btn");
        options.forEach(option => {
            option.classList.remove("active");
        });
    }

    /**
     * Handles Next Button
     */
    static handleNextButton(quiz) {
        quiz.updateScore();
        QuestionCard.resetSelectedAnswer();
        quiz.showNextQuestion();
    }

    /**
     * Creates Progress Bar to Show current Question Number
     */
    static createProgressBar() {
        const progressBar = document.createElement("span");
        progressBar.setAttribute("id", "numQuestion");
        return progressBar;
    }

    /**
     * Creates Timer Element to Display Timer in Card Headline
     */
    static createTimerE() {
        const timer = document.createElement("span");
        timer.setAttribute("id", "timer");
        return timer;
    }

    /**
     * Creates HTML Element to Display Question
     */
    static createQuestionE() {
        const question = document.createElement("p");
        question.setAttribute("id", "question");
        return question;
    }

    /**
     * Creates HTML Element for Option
     */
    static createOptionE(num) {
        const option = document.createElement("button");
        // prevent from submit behavior of button inside form
        option.setAttribute("type", "button");
        // add id for identification
        option.setAttribute("id", `option${num}`);
        // add bootstrap classes
        option.classList.add("btn", "btn-outline-primary");
        // add additional styles
        option.style.width = "100%";
        option.style.margin = "5px 0";
        // add event listener to select answer and show next question button
        option.addEventListener("click", this.selectAnswer);
        return option;
    }

    /**
     * Adds Button to Go to Next Question
     */
    static initNextBtn(quiz) {
        const btn = document.createElement("button");
        btn.innerHTML = "Next";
        // add id for identification purposes
        btn.setAttribute("id", "next-question-btn");
        // prevent from submit behavior of button in form
        btn.setAttribute("type", "button");
        // add bootstrap classes
        btn.classList.add("btn", "btn-primary", "m-2");
        // should only be visible once answer is selected
        btn.style.display = "none";
        // add event listener to handle next button event
        btn.addEventListener("click", function() {
            this.handleNextButton(quiz);
        }.bind(this));
        return btn;
    }
}

export { QuestionCard };