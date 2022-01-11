const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

/* Server settings */
const app = express()
app.listen(3000, () => console.log('Server Started at port 3000'))
app.use(express.json())
app.use(cors())

/* Database connection with error/sucsess logging */
mongoose.connect('mongodb://localhost/expenses')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conntected to db'))

/* Expenses route */
const expensesRouter = require('./routes/expenses')
app.use('/expenses', expensesRouter)
