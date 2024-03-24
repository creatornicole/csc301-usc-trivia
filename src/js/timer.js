/**
 * Class to handle the Quiz Timer for the Trivia Web Application
 */
class Timer {
    constructor(domManipulator, element) {
        this.timerId;
        this.domManipulator = domManipulator; // DOMManipulator class to change minutes:seconds
        this.element = element; // html element to show timer
        this.minutes = 0;
        this.seconds = 0;
    }

    /**
     * Starts Timer
     */
    start() {
        this.timerId = setInterval(this.clockTick.bind(this), 1000);
    }

    /**
     * Stops Timer
     */
    stop() {
        clearInterval(this.timerId);
        this.domManipulator.updateTimer(this.minutes, this.seconds, this.element);
    }

    /**
     * Updates Seconds and Minutes
     */
    clockTick() {
        this.seconds++;
        if(this.seconds % 60 == 0) {
            this.minutes++;
            this.seconds = 0;
        }
        this.domManipulator.updateTimer(this.minutes, this.seconds, this.element);
    }
}

export { Timer };