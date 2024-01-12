require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const itemsRoute = require('./route/itemsRoute')

app.use('/json', itemsRoute)

app.listen(port, () => console.log(`App running on port: ${port}`))