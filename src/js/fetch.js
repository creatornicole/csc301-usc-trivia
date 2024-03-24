/**
 * Get Quiz from provided Server
 * 
 * Endpoint accepts two query parameters
 * theme (required) - value can be either dev or cars,
 *                    each will provide a different set of json
 * limit (optional) - value can be an integer,
 *                    adds a cap to the amount of results returned by the API
 */
function fetch(quizType) {
    // use Promise to await value assignment
    return new Promise((resolve, reject) => {
        // Make the Axios request
        axios.get(`http://127.0.0.1:3055/quiz?theme=${quizType}`)
            .then(res => {
                // resolve the promise with the response data
                resolve(res.data);
                console(res);
            })
            .catch(err => {
                // reject the promise with an error
                reject(err);
            });
    });
}

export { fetch };