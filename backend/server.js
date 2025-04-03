const express = require('express');
const mongoose = require('mongoose');
const myRoutes = require('./routes');
require("dotenv").config()

const app = express();
const PORT = process.env.PORT;


app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => console.log(error));    

app.use(myRoutes);
