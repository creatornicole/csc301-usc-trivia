axios
    .get("http://127.0.0.1:3055/quiz?theme=dev")
    .then(res => {
        console.log(res);
    });