# CSC301-2024-Assignment1
CSC301 2024 Assignment 1 - Front-end development

## Task description
You have been asked to develop a trivia web application with the following components:
- A home page that allows the participant to enter a name
- The trivia page needs to display each question (one at a time) and their options. The participant needs to select an answer before proceeding to the next question. 
- This page must have a timer that will start as soon as the trivia page is loaded and will stop as soon as the last question has been answered
- The final page needs to display the name of the participant, their score and the total time taken.

### Technical requirements
- You must develop this web application using HTML, CSS and Javascript
- You must use a bundler (parcel, webpack, esbuild)
- You must style the page however it does not need to be a visual masterpice.
- Using a CSS framework is optional (e.g., bootstrap, tailwind, etc.)
- You must get your questions from the endpoint provided by the nodejs server supplied within this repo: more detail below.
- You must update `README.md` with documentation about your app eg. how to run your app.


## Quiz API

    NOTE: You will not be graded on any work done to the server. This is only a utility to provide an endpoint to retrive data from.

In a new terminal window, navigate to the server folder in this project and run:
```javascript
npm install // to install all dependencies for the server
npm start // starts the mocking server
```

You should then see a message like this
```shell
> mockserver@1.0.0 start
> node src/main.js

Mock server is listening at http://localhost:3055 or http://127.0.0.1:3055
```

### API endpoint  
```
GET http://127.0.0.1/quiz
```  

This endpoint accepts two query parameters  

`theme` (required) - value can be either `dev` or `cars`
each will provide a different set of json

`limit` (optional) - value can be an integer. Adds a cap to the amount of results returned by the API. `easy` will return a maximum of 2 results.

Note: If you're having any issues with the server, please post the issue you're having in the Canvas discussion boards.

### Front-End Development Rubric

| Criteria                               | Best Rating/ Outstanding implementation                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Object-Oriented Programming Principles | demonstrate outstanding evidence of object-oriented design principles and programming best practices |
| AJAX Requests                          | demonstrate outstanding evidence of an AJAX request call including error handling                    |
| CSS Ability                            | demonstrate outstanding evidence of use of CSS structuring and capabilities                          |
| DOM Manipulation                       | demonstrate outstanding evidence of DOM manipulation                                                 |
| Reflective Report (500 words)          | demonstrate evidence of clear reflection including challenges and solutions                          |

### File Structure
- .\src Source Code
    - \index.html = trivia home page
    - \css
        - \style.css = stylesheet for trivia home page that are used in addition to Bootstrap styles
    - \js
        - \fetch.js = gets data from server endpoint
        - \main.js = js file that is added to index.html (main)
        - manipulation.js = performs DOM manipulation
        - pages.js = handles view of start/home page and final/score page
        - questionCard.js = handles view of questions
        - quiz.js = defines quiz
        - timer.js = defines quiz timer

### Implementation of Bootstrap
- importing Bootstrap 5.3 CDN from Bootstrap website in <head> of web page
```
<!-- importing Bootstrap 5.3 CDN from Bootstrap website -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
      crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
        crossorigin="anonymous">
</script>
```

### Parcel
- [Building a web app with Parcel](https://parceljs.org/getting-started/webapp/)
- make sure that npm is installed before installing parcel
- install parcel
```
npm install --save-dev parcel
```
- parcel has a development server built in, which will automatically rebuild your app as you make changes
- to start run parcel CLI pointing to entry file
```
npx parcel src/index.html
```
- open http://localhost:1234/ in browser to see HTML file

### Helpful Resources
[Yt-Tutorial: How To Make Quiz App Using JavaScript | Build Quiz App With HTML CSS & JavaScript](https://www.youtube.com/watch?v=PBcqGxrr9g8)