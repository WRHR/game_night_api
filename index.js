const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

dotenv.config()
app.use(cors())
app.use(bodyParser.json())

const authRoute = require('./routes/auth')
const eventRoute = require('./routes/events')
const gamesRoute = require('./routes/games')

app.use('/users', authRoute)
app.use('/events', eventRoute)
app.use('/games', gamesRoute)

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    ()=> console.log('Connected to database')
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))