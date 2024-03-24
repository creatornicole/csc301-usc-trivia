import { Quiz } from './quiz.js';
import { DOMManipulation } from './manipulation.js';
import { fetch } from './fetch.js';

/**
 * main.js for trivia web application contains form submit events 
 * and first loading of page
 */

/******************************** DOM ELEMENTS **************************/
const quizCardComponent = document.getElementById("quiz"); // div of quiz content
const quizForm = document.getElementById("quizForm");
const cardHeadline = document.getElementById("card-headline");

/******************************** CLASSES *******************************/
const manipulationObj = new DOMManipulation(quizCardComponent, cardHeadline);
// load start page once DOMManipulation object is created to show start page
manipulationObj.showStartPage();

/******************************** EVENT LISTENER ************************/
quizForm.addEventListener("submit", handleClick);

/*********************** FUNCTION TO HANDLE SUBMIT EVENT ****************/
/**
 * Handles Submit Event on quizForm
 */
function handleClick(e) {
    // prevent default form submission
    e.preventDefault();
    // stop event propagation
    e.stopPropagation();

    // differentiate between start and restart quiz  
    const nameElement = document.getElementById("inputName");
    const quizElement = document.getElementById("quizType");

    // nameElement and quizElement exist on start page but not on final page
    // helps to determine which action we want to be performed
    if(nameElement !== null && quizElement !== null) {
        // submit on start page
        handleStart();
    } else {
        // submit on final page
        handleRestart();
    }
}

/**
 * Handles Submit Event on Start Page
 */
async function handleStart() {
    // get values
    const username = document.getElementById("inputName").value;
    const quizType = document.getElementById("quizType").value;

    // validate form and start quiz if form was validated
    quizForm.classList.add("was-validated"); // show validation styles with bootstrap class
    if(quizForm.checkValidity()) {
        // fetch quiz data according to chosen quiz type
        let quizData;
        try {
            quizData = await fetch(quizType);
        } catch(err) {
            console.error("Error fetching quiz:", err);
        }
        
        // create new quiz
        let quizObj = new Quiz(username, quizType, quizData);
        // start new quiz
        quizObj.start();   
    }
}

/**
 * Handles Submit Event on Final Page
 */
function handleRestart() {
    // do not show validation when reloading start page
    quizForm.classList.remove("was-validated");
    // load start page
    manipulationObj.showStartPage();
}







