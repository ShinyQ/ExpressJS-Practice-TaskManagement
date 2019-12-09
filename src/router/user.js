const express = require('express')
const User = require('../model/users')
const router = new express.Router()

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req, res) => {
    const user = await new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age', 'class', 'password']
    const validInput = updates.every((update) => allowedUpdates.includes(update))

    if (!validInput) {
        res.status(400).send({ error: 'Invalid Update' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/users/:id', async (req, res) => {
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

module.exports = router