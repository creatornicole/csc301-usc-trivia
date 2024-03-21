/******************************** QUIZ QUESTIONS ************************/
// Get Quiz from provided Server
/**
 * Endpoint accepts two query parameters
 * theme (required) - value can be either dev or cars each will provide 
 *                    a different set of json
 * limit (optional) - value can be an integer. Adds a cap to the amount 
 *                    of results returned by the API.
 */
axios.get("http://127.0.0.1:3055/quiz?theme=dev").then(res => {
    quiz = res;
});

/******************************** VARIABLES *****************************/ 
const quizCardComponent = document.getElementById("quiz"); // div of quiz content
let quiz; // store quiz inside this variable, get from server via axios
let currentQuestionIndex = 0;
let score = 0;
let username; // to store username from start/home page to display on score/final page

/******************************** FUNCTIONS *****************************/
// Start Quiz
function startQuiz() {
    // reset variables
    currentQuestionIndex = 0;
    score = 0;
    // get username
    username = document.getElementById("inputName").value;

    // show question
    showQuestion();
}


// Show next Question of Quiz
function showQuestion() {
    resetState();
    // get all the data form the quiz variable to display the current question
    let currentQuestion = quiz.data[currentQuestionIndex];
    // get current question, possible answers and correct question
    let question = currentQuestion.question;
    let options = currentQuestion.options; // array of objects
    // let correctAnswer = currentQuestion.answer;
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
    if(currentQuestionIndex < quiz.data.length) {
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
    scoreParagraph.innerHTML = `${score} / ${quiz.data.length}`;

    const restartBtn = document.createElement("button");
    restartBtn.innerHTML = "Restart Quiz";
    // add bootstrap classes
    restartBtn.classList.add("btn", "btn-primary", "m-2");
    // add event listener to restart quiz
    restartBtn.addEventListener("click", startQuiz);

    // append all the elements to the card component
    quizCardComponent.appendChild(headline);
    quizCardComponent.appendChild(paragraph);
    quizCardComponent.appendChild(scoreParagraph);
    quizCardComponent.appendChild(restartBtn);
}

// Checks if user selected correct option, if yes: increment score
function checkRightAnswer() {
    const options = document.querySelectorAll("#quiz .btn");
    options.forEach(option => {
        // option that has class 'active' is selected answer/option
        if(option.classList.contains("active")) {
            // get correct answer from dataset
            let correctAnswer = quiz.data[currentQuestionIndex].answer;
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


