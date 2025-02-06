import express, { Application } from 'express';
const bodyParser = require('body-parser')
const cors = require('cors');

const app: Application = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome to the Personal Budget API');
})

export default app; 