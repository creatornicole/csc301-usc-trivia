const express = require('express')
const cors = require('cors')
const app = express()
const port = 3055

const fs = require('node:fs');
const path = require('node:path');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Congratulations! You have successfully started the server');
});


app.get('/quiz', (req, res) => {
    
    let gate = req.query.theme;
    let limit;
    if(req.query.limit){
        limit = parseInt(req.query.limit);
    }else{
        limit = 0;
    }

    gate = gate ? gate.toLowerCase() : null;
    if(gate == 'dev' || gate == 'cars' ){
        fs.readFile(path.join(__dirname, `${gate.toLocaleLowerCase()}.json`), 'utf8', (err, data) => {
            res.set('Content-Type', 'application/json')

            if (err) {
                console.error(err)
                res.send({error: 'Error reading file'})
            }

            if(!isNaN(limit) && limit > 0){
                let parsedData = JSON.parse(data);
                let newData = parsedData.slice(0, limit);
                res.send(newData)
            }else if(isNaN(limit)){
                res.send({error: 'Invalid query parameter'})
            }else{
                res.send(data)
            }
        });
    }else{
        res.status(400).send({error: 'Invalid query parameter'})
    }
})

app.listen(port, () => {
  console.log(`Mock server is listening at http://localhost:${port} or http://127.0.0.1:${port}`)
})