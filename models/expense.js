const mogoose = require('mongoose')

const expenseSchema = new mogoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 35
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 1000000
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mogoose.model('Expense', expenseSchema)