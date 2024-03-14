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


- For development and testing please use the testQuestions JSON file as the API is a free version and has a maximum number of calls per month. Once you have your code working replace it with a call to the API



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