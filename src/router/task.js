const express = require('express')
const Task = require('../model/tasks')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const validInput = updates.every((update) => allowedUpdates.includes(update))

    if (!validInput) {
        res.status(400).send({ error: 'Invalid Update' })
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        task.save()
        
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id)
        if (!task) {
            return res.send(400).send({ error: 'ID Tersebut Tidak Ditemukan' })
        }

        res.send({ message: 'Sukses Menghapus Data' })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router