import express, { Application } from 'express';
import envelopeRoutes from './routes/envelopes'
const bodyParser = require('body-parser')
const cors = require('cors');

const app: Application = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use("/api/envelopes", envelopeRoutes);


export default app; 