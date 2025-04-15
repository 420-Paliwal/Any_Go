const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')

connectToDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send("Subbmitted")
})

app.use('/users', userRoutes);
app.use('/captains', captainRoutes)

module.exports = app