const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const TaskData = new Task({
//     description: "Task 2",
//     completed: false
// })

// TaskData.save().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err);
// });

// const Mydata = new User({
//     email: "kurniadiahmadwijaya@gmail.com",
//     password: "password",
//     name: "Kurniadi",
//     age: 10,
//     class: "IF-09"
// })

// Mydata.save().then(() => {
//     console.log(Mydata);
// }).catch((err) => {
//     console.log("Error", err);
// });