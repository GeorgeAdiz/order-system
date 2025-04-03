const express = require("express")
const mongoose = require('mongoose')
const myRouter = require('./routes')

const app = express()

app.use(express.json())
mongoose.connect("kunyare meron/ url dapat ng database nakalagay dito HAHAHA")
    .then(() => {
        app.listen(3000, () =>{
            console.log("listening to port 3000")
        })
    })
    .catch(error =>{
        console.log(error)
    })

app.use(myRouter)