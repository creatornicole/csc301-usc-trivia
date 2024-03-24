import { QuestionCard } from "./questionCard.js";
import { StartPage, FinalPage } from "./pages.js";

/**
 * Class that performs DOM Manipulation
 */
class DOMManipulation {
    constructor(quizCardComponent, cardHeadline) {
        this.quizCardComponent = quizCardComponent;
        this.cardHeadline = cardHeadline;
    }

    /**
     * Removes Content from Quiz Card Component to replace with new
     */
    resetState() {
        // remove all childs to reset quiz card component
        while(this.quizCardComponent.firstChild) {
            this.quizCardComponent.removeChild(this.quizCardComponent.firstChild);
        }
    }

    /**
     * Prepares Quiz Card to show Questions
     */
    createQuestionCard(quiz, numQuest, numOptPerQuest) {
        this.resetState();
        QuestionCard.create(quiz, numQuest, numOptPerQuest);
    }

    /**
     * Adjusts Quiz Card to Show Start Page
     */
    showStartPage() {
        this.resetState();
        StartPage.create(this.cardHeadline, this.quizCardComponent);
    }

    /**
     * Adjusts Quiz Card to Show Final Page
     */
    showFinalPage(name, score, numQuestion) {
        this.resetState();
        FinalPage.create(this.quizCardComponent, name, score, numQuestion);
    }

    /**
     * Updates Question Counter/ Progress Bar in Card Headline
     */
    updateProgressBar(current, overall, element) {
        element.innerHTML = `; ${current}/${overall}`;
    }

    /**
     * Updates Timer in Card Headline
     */
    updateTimer(minutes, seconds, element) {
        let displayMin = (minutes < 10) ? `0${minutes}` : minutes;
        let displaySec = (seconds < 10) ? `0${seconds}` : seconds;
        element.innerHTML = `; ${displayMin}:${displaySec}`;
    }
}

export { DOMManipulation };