const express = require('express')
const app = express()
const connectToDb = require('./db/db')

connectToDb( )
app.get('/', (req,res)=>{
    res.send("Subbmitted")
})

module.exports = app