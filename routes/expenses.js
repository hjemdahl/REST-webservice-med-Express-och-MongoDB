const express = require('express')
const router = express.Router()
const Expense = require('../models/expense')

/* Get all */
router.get('/', async (req, res) => {
    try { // Get all expenses to variable and send as response
        const expenses = await Expense.find()
        res.json(expenses)
    } catch (err) { //Respond with status(server-side error)
        res.status(500).json({ message: err.message })
    }
})

/* Get one */
router.get('/:id', getExpense, (req, res) => { //Call function and send respons to user
    res.json(res.expense)
})

/* Create one */
router.post('/', async (req, res) => {
    const expense = new Expense({
        date: req.body.date,
        title: req.body.title,
        price: req.body.price,
        category: req.body.category
    })
    try { //Save new expense and send as response, respond with status(created)
        const newExpense = await expense.save()
        res.status(201).json(newExpense)
    } catch (err) { //Respond with status(client-side error)
        res.status(400).json({ message: err.message })
    }
})

/* Update one */
router.put('/:id', getExpense, async (req, res) => { //Call function and check that values are not null
    if(req.body.date != null) {
        res.expense.date = req.body.date
    }
    if(req.body.title != null) {
        res.expense.title = req.body.title
    }
    if(req.body.price != null) {
        res.expense.price = req.body.price
    }
    if(req.body.category != null) {
        res.expense.category = req.body.category
    }
    try { //Save updated expense and send as respons
        const updatedExpense = await res.expense.save()
        res.json(updatedExpense)
    } catch (err) { //Respond with status(client-side error)
        res.status(400).json({ message: err.message })
    }
})

/* Delete one */
router.delete('/:id', getExpense, async (req, res) => {
    try { //Function called, remove expense and respond with message
        await res.expense.remove()
        res.json({ message: 'Expense deleted'})
    } catch (err) { //Respond with status(server-side error)
        return res.status(500).json({ message: err.message })
    }
})

//Function to get expense by id for reuse in get one, update and delete
async function getExpense(req, res, next) {
    let expense
    try {
        expense = await Expense.findById(req.params.id)
        if(expense == null) { //If null respons with status(not found)
            return res.status(404).json({ message: 'Expense not found' })
        }
    } catch (err) { //Respond with status(server-side error)
        return res.status(500).json({ message: err.message })
    }

    res.expense = expense //Variable to store expense
    next() //Move on to next section code
}

module.exports = router