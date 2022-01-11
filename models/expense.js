const mogoose = require('mongoose')

const expenseSchema = new mogoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'Annat'
    }
})

module.exports = mogoose.model('Expense', expenseSchema)