require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cityRouter = require('./routes/city');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/cities', cityRouter);

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})
