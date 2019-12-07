require('./db/mongoose')
const express = require('express')
const app = express()
app.listen(3000)

/* Router */
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')

/* Use Router */
app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

