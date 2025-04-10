const dotenv = require('dotenv')
dotenv.config()
const http = require('http')
const cors = require('cors')
const app = require('./app')
const port = process.env.PORT || 3000

app.use(cors())

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server Is Running On Port ${port}`)
})