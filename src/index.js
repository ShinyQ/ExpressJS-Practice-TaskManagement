const express = require('express')
require('./db/mongoose')
const User = require('./model/users')
const Task = require('./model/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

/* USER SECTION */

app.get('/users', async (req, res) => {
    try {
        const user = await User.find({}) 
        res.send(user)      
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id) 
        res.send(user)    
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/users', async (req,res) => {
    const user = await new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age', 'class', 'password']
    const validInput = updates.every((update) => allowedUpdates.includes(update))

    if (!validInput) {
        res.status(400).send({ error: 'Invalid Update'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)  
    }
})


app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        if (!user) {
            return res.send(400).send({ error: 'ID Tersebut Tidak Ditemukan' })
        }

        res.send({ message: 'Sukses Menghapus Data' })
    } catch (error) {
        res.status(500).send(error)
    }
})

/* TASK SECTION */

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req,res) =>{

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const validInput = updates.every((update) => allowedUpdates.includes(update))

    if (!validInput) {
        res.status(400).send({ error: 'Invalid Update' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id)
        if (!task) {
            return res.send(400).send({ error: 'ID Tersebut Tidak Ditemukan'})
        }

        res.send({message: 'Sukses Menghapus Data'})
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port)