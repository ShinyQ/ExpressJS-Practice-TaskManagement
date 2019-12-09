require('./db/mongoose')
const express = require('express')
const app = express()
app.listen(3000)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
    next();
});
/* Router */
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')

/* Use Router */
app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

