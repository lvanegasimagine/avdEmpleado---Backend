const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//Import Routes

const empleadoRouter = require('./routes/empleado.routes');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

//Routers

app.use(`${api}/empleados`, empleadoRouter);

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME }).then(() => {
    console.log('La conexión a la BD está lista...')
}).catch((err) => {
    console.error(err);
})

const PORT = 3000 || 3000
app.listen(PORT, () => {
    console.log('Server is runnig http://localhost:3000/api/v1');
    console.log(api);
});