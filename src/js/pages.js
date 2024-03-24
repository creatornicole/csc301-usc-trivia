/**
 * Handles View of Start Page
 */
class StartPage {
    /**
     * Creates Start Page for Trivia Web Application
     */
    static create(headline, card) {
        // manipulate card headline
        headline.innerHTML = "Trivia Web Application";

        // initialize username input
        const inputNameLabel = StartPage.createUsernameLabel();
        const inputName = StartPage.createUsernameInput();
        const inputNameVal = StartPage.createUsernameFeedback();

        // initialize quiz selection with options
        const selectQuizLabel = StartPage.createSelectionLabel();
        const selectQuiz = StartPage.createSelection();
        const selectQuizVal = StartPage.createSelectionValidation();

        // initialize submit button
        const submitBtn = StartPage.createSubmitButton();
    
        // append all the elements to the card component
        card.appendChild(inputNameLabel);
        card.appendChild(inputName);
        card.appendChild(inputNameVal);
        card.appendChild(selectQuizLabel);
        card.appendChild(selectQuiz);
        card.appendChild(selectQuizVal);
        card.appendChild(submitBtn);
    }

    /**
     * Create Username Input Label 
     */
    static createUsernameLabel() {
        const label = document.createElement("label");
        label.setAttribute("for", "inputName");
        label.classList.add("form-label"); // bootstrap class
        label.innerHTML = "Please enter your name:";
        return label;
    }

    /**
     * Create Username Input 
     */
    static createUsernameInput() {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "inputName");
        input.classList.add("form-control");
        input.required = true;
        return input;
    }

    /**
     * Initialize Username Validation Feedback
     */
    static createUsernameFeedback() {
        const validation = document.createElement("div");
        validation.classList.add("invalid-feedback"); // bootstrap class
        validation.innerHTML = "Please enter your name.";
        return validation;
    }

    /**
     * Create Quiz Type Selection Label
     */
    static createSelectionLabel() {
        const label = document.createElement("label");
        label.setAttribute("for", "quizType");
        label.classList.add("form-label"); // bootstrap class
        label.innerHTML = "Choose the Quiz:";
        return label;
    }

    /**
     * Create Quiz Type Selection
     */
    static createSelection() {
        const selection = document.createElement("select");
        selection.setAttribute("id", "quizType");
        selection.classList.add("form-select"); // bootstrap class
        selection.required = true;

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
        selection.appendChild(defaultOption);
        selection.appendChild(devOption);
        selection.appendChild(carsOption);

        return selection;
    }

    /**
     * Initialize Quiz Type Selection Validation Feedback
     */
    static createSelectionValidation() {
        const validation = document.createElement("div");
        validation.classList.add("invalid-feedback"); // bootstrap class
        validation.innerHTML = "Please choose a quiz type.";
        return validation;
    }

    /**
     * Create Submit Button
     */
    static createSubmitButton() {
        const btn = document.createElement("button");
        btn.setAttribute("type", "submit");
        btn.classList.add("btn", "m-2", "next-btn"); // bootstrap and custom classes
        btn.innerHTML = "Start Quiz";
        return btn;
    }


}

/**
 * Handles View of Final Page
 */
class FinalPage {
    /**
     * Creates Final Page for Trivia Web Application
     */
    static create(card, name, score, numQuestion) {
        const headline = document.createElement("h5");
        headline.innerHTML = `Congratulations ${name}!`;

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "You scored";

        const scoreParagraph = document.createElement("p");
        scoreParagraph.innerHTML = `${score} / ${numQuestion}`;

        const restartBtn = document.createElement("button");
        restartBtn.setAttribute("type", "submit")
        restartBtn.classList.add("btn", "m-2", "next-btn"); // bootstrap and customm classes
        restartBtn.innerHTML = "Restart Quiz";
        
        // add event listener to restart quiz
        //restartBtn.addEventListener("click", domManipulator.showStartPage());

        // append all the elements to the card component
        card.appendChild(headline);
        card.appendChild(paragraph);
        card.appendChild(scoreParagraph);
        card.appendChild(restartBtn);
    }
}

export {StartPage, FinalPage };