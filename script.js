/******************************** QUIZ QUESTIONS ************************/
// Get Quiz from provided Server
/**
 * Endpoint accepts two query parameters
 * theme (required) - value can be either dev or cars each will provide 
 *                    a different set of json
 * limit (optional) - value can be an integer. Adds a cap to the amount 
 *                    of results returned by the API.
 */

function fetchQuiz(quizType) {
    // use Promise to await value assignment
    return new Promise((resolve, reject) => {
        // Make the Axios request
        axios.get(`http://127.0.0.1:3055/quiz?theme=${quizType}`)
            .then(res => {
                // resolve the promise with the response data
                resolve(res.data);
            })
            .catch(err => {
                // reject the promise with an error
                reject(err);
            });
    });
}

/******************************** VARIABLES *****************************/ 
const quizCardComponent = document.getElementById("quiz"); // div of quiz content
const quizForm = document.getElementById("quizForm");
const cardHeadline = document.getElementById("card-headline");
let timerElement;
let timerId;
let quiz; // store quiz inside this variable, get from server via axios
let currentQuestionIndex = 0;
let score = 0;
let username; // to store username from start/home page to display on score/final page

// timer variables
let minutes = 0;
let seconds = 0;

/******************************** EVENT LISTENER ************************/
quizForm.addEventListener("submit", validateStartPageForm);

/******************************** FUNCTIONS *****************************/
// Start Quiz
async function startQuiz() {
    // reset variables
    currentQuestionIndex = 0;
    score = 0;
    // get username
    username = document.getElementById("inputName").value;
    // get quiz type
    let quizType = document.getElementById("quizType").value;
    try {
        // get quiz data according to chosen quiz type
        quiz = await fetchQuiz(quizType);
        // show first question once quiz data is fetched
        showQuestion();
    } catch(err) {
        console.error("Error fetching quiz:", err);
    }

    timerElement = document.getElementById("timer");
    timerId = setInterval(
        clockTick,
        1000
    );
}

function clockTick() {
    seconds++;
    if(seconds % 60 == 0) {
        minutes++;
        seconds = 0;
    }
    // convert minutes and seconds to strings with leading zeros for display
    let displayMin = (minutes < 10) ? `0${minutes}` : minutes;
    let displaySec = (seconds < 10) ? `0${seconds}` : seconds;
    //update timer display
    timerElement.innerHTML = `${displayMin}:${displaySec}`;
}

// Show next Question of Quiz
function showQuestion() {
    resetState();
    // get all the data form the quiz variable to display the current question
    let currentQuestion = quiz[currentQuestionIndex];
    // get current question, possible answers and correct question
    let question = currentQuestion.question;
    let options = currentQuestion.options; // array of objects
    // manipulate headline to show progress and timer
    manipulateHeadlineElement();
    // fill Quiz Card Component with new elements
    // question element
    createQuestionElement(question);
    // options/ possible answers
    for(let key in options) {
        console.log(`${key} ${options[key]}`);
        createOptionElement(key, options[key]);
    }
    // button to go to next question
    createNextButton();
}

// Remove Content from Quiz Card Component to replace with new
function resetState() {
    // remove all childs to reset quiz card component
    while(quizCardComponent.firstChild) {
        quizCardComponent.removeChild(quizCardComponent.firstChild);
    }
}

// Manipulate HTML Element to Show Progress and Timer as Card Headline
function manipulateHeadlineElement() {
    timerElement = document.createElement("span");
    timerElement.setAttribute("id", "timer");
    timerElement.innerHTML = ""

    cardHeadline.innerHTML = `${currentQuestionIndex+1}/${quiz.length}, `;

    cardHeadline.appendChild(timerElement);
}

// Create HTML Element to Show Question
function createQuestionElement(question) {
    const questionElement = document.createElement("p");
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${question}`;
    // append to card component to show element on web page
    quizCardComponent.appendChild(questionElement);
}

// Create HTML Element to Show possible Answers
function createOptionElement(key, option) {
    const optionElement = document.createElement("button");
    optionElement.innerHTML = `${key}: ${option}`;
    // prevent from submit behavior of button in form
    optionElement.setAttribute("type", "button");
    // add bootstrap classes
    optionElement.classList.add("btn", "btn-outline-primary");
    // add additional styles
    optionElement.style.width = "100%";
    optionElement.style.margin = "5px 0";
    // add event listener to select answer and show next question button
    optionElement.addEventListener("click", selectAnswer);
    // append to card component to show element on web page
    quizCardComponent.appendChild(optionElement);
}

// Create HTML Element to Show Next Button
function createNextButton() {
    const nextBtnElement = document.createElement("button");
    nextBtnElement.innerHTML = "Next";
    // add id for identification purposes
    nextBtnElement.setAttribute("id", "next-question-btn");
    // prevent from submit behavior of button in form
    nextBtnElement.setAttribute("type", "button");
    // add bootstrap classes
    nextBtnElement.classList.add("btn", "btn-primary", "m-2");
    // should only be visible once answer is selected
    nextBtnElement.style.display = "none";
    // add event listener to handle next button event
    nextBtnElement.addEventListener("click", handleNextButton);
    // append to card component to show element on web page
    quizCardComponent.appendChild(nextBtnElement);
}

// Make Selected Option 'active' and Show Next Question Button
function selectAnswer(event) {
    const selectedOption = event.target;
    // remove bootstrap class 'active' from all options
    const options = document.querySelectorAll("#quiz .btn");
    options.forEach(option => {
        option.classList.remove("active");
    });
    // add bootstrap class 'active' to selected option
    selectedOption.classList.add("active");
    // show next question button
    const nextBtnElement = document.getElementById("next-question-btn");
    nextBtnElement.style.display = "block";
}

function handleNextButton() {
    checkRightAnswer();
    // show next question
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length) {
        showQuestion()
    } else {
        showFinalPage();
    }
}

function showFinalPage() {
    resetState();
    const headline = document.createElement("h5");
    headline.innerHTML = `Congratulations ${username}!`;

    const paragraph = document.createElement("p");
    paragraph.innerHTML = "You scored";

    const scoreParagraph = document.createElement("p");
    scoreParagraph.innerHTML = `${score} / ${quiz.length}`;

    const restartBtn = document.createElement("button");
    restartBtn.innerHTML = "Restart Quiz";
    // add bootstrap classes
    restartBtn.classList.add("btn", "btn-primary", "m-2");
    // add event listener to restart quiz
    restartBtn.addEventListener("click", showStartPage);

    // append all the elements to the card component
    quizCardComponent.appendChild(headline);
    quizCardComponent.appendChild(paragraph);
    quizCardComponent.appendChild(scoreParagraph);
    quizCardComponent.appendChild(restartBtn);

    // stop timer
    let displayMin = (minutes < 10) ? `0${minutes}` : minutes;
    let displaySec = (seconds < 10) ? `0${seconds}` : seconds;
    timerElement.innerHTML = `${displayMin}:${displaySec}`;
    clearInterval(timerId);
}

// Checks if user selected correct option, if yes: increment score
function checkRightAnswer() {
    const options = document.querySelectorAll("#quiz .btn");
    options.forEach(option => {
        // option that has class 'active' is selected answer/option
        if(option.classList.contains("active")) {
            // get correct answer from dataset
            let correctAnswer = quiz[currentQuestionIndex].answer;
            // get first letter to determine chosen option
            let chosenOption = option.textContent.charAt(0);
            // if selected option is right increment score
            if(chosenOption == correctAnswer) {
                score++;
            }
            return; // end the forEach loop once selected option is found
        }
    });
}

function showStartPage() {
    resetState();
    // manipulate card headline
    cardHeadline.innerHTML = "Trivia Web Application";
    // add input username label
    const inputNameLabel = document.createElement("label");
    inputNameLabel.setAttribute("for", "inputName");
    inputNameLabel.classList.add("form-label"); // bootstrap class
    inputNameLabel.innerHTML = "Please enter your name:";
    // add input username
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "inputName");
    inputName.classList.add("form-control");
    inputName.required = true;
    // add input username validation feedback
    const inputNameVal = document.createElement("div");
    inputNameVal.classList.add("invalid-feedback"); // bootstrap class
    inputNameVal.innerHTML = "Please enter your name.";

    // add quiz type selection label
    const selectQuizLabel = document.createElement("label");
    selectQuizLabel.setAttribute("for", "quizType");
    selectQuizLabel.classList.add("form-label"); // bootstrap class
    selectQuizLabel.innerHTML = "Choose the Quiz:";
    // add quiz type selection
    const selectQuiz = document.createElement("select");
    selectQuiz.setAttribute("id", "quizType");
    selectQuiz.classList.add("form-select"); // bootstrap class
    selectQuiz.required = true;

    // add options
    const defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "");
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.innerHTML = "Choose...";

    const devOption = document.createElement("option");
    devOption.setAttribute("value", "dev");
    devOption.innerHTML = "Development";

    const carsOption = document.createElement("option");
    carsOption.setAttribute("value", "cars");
    carsOption.innerHTML = "Cars";
    // append options to quiz type selection
    selectQuiz.appendChild(defaultOption);
    selectQuiz.appendChild(devOption);
    selectQuiz.appendChild(carsOption);

    // add quiz type selection validation feedback
    const selectQuizVal = document.createElement("div");
    selectQuizVal.classList.add("invalid-feedback"); // bootstrap class
    selectQuizVal.innerHTML = "Please choose a quiz type.";

    // add submit button
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("btn", "m-2", "next-btn"); // bootstrap and custom classes
    submitBtn.innerHTML = "Start Quiz";

    // append all the elements to the card component
    quizCardComponent.appendChild(inputNameLabel);
    quizCardComponent.appendChild(inputName);
    quizCardComponent.appendChild(inputNameVal);
    quizCardComponent.appendChild(selectQuizLabel);
    quizCardComponent.appendChild(selectQuiz);
    quizCardComponent.appendChild(selectQuizVal);
    quizCardComponent.appendChild(submitBtn);
}

// Validate Home Page Form
function validateStartPageForm(e) {
    // prevent default form submission
    e.preventDefault();
    // stop event propagation
    e.stopPropagation();
    // show validation styles with bootstrap class
    quizForm.classList.add("was-validated");
    // start quiz if form was validated
    if(quizForm.checkValidity()) {
        startQuiz();
    }
}