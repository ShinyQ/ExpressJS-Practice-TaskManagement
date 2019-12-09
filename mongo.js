const {MongoClient} = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'

MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.error("Tidak Dapat Melakukan Koneksi Ke Databse");   
    }

    // const db = client.db(database)

    // db.collection('tasks').deleteMany({
    //     completed: true
    // }).then((result) => {
    //    console.log(result);  
    // }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set:{
    //         completed:true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectId("5de57c7af66d601f906d5a4e")
    // }, {
    //     // $set: {
    //     //     name: "Adrian Hafizh Aryaputra"
    //     // }
    //     $inc:{
    //         age: 1
    //     }
    // }).then((result)=> {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').findOne({ _id: new ObjectId("5de57deed6faac3beca7586f") },
    //     (error, tasks)=> {

    //         if (error) {
    //             return console.log("Data Tidak Ditemukan");
                
    //         }
    //         return console.log(tasks);        
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     return console.log(tasks)
    // })

    // db.collection('users').find({ age: 20 }).toArray((error, users) => {
    //     if(error) {
    //         return console.log("Data Tidak Ditemukan");
    //     }
    //     return console.log(users);
        
    // })

    //  db.collection('users').find({ age: 20 }).count((error,result) => {
    //      return console.log(result);
    // })
    

    // db.collection('users').insertOne({
    //         // _id: Id,
    //         name: 'Kurniadi Ahmad Wijaya',
    //         age: 17
    //     },(error, result)=>{
    //         if(error) {
    //             return console.log('Data Gagal Disimpan')
    //         }

    //         console.log(result.ops)
    // }) 

    // db.collection('users').insertMany([
    //     {
    //         name: "Kurniadi Ahmad Wijaya",
    //         age : 20
    //     },
    //     {
    //         name: "Muhilmu",
    //         age: 20
    //     }
    // ], (error, result) =>{
    //     if(error) {
    //         return console.log(error)
    //     }

    //     return console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Task 1",
    //         completed: true
    //     },
    //     {
    //         description: "Task 2",
    //         completed: false
    //     },
    //     {
    //         description: "Task 3",
    //         completed: true
    //     },
    //     {
    //         description: "Task 4",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log("Tidak Dapat Menginpuntkan Task")
    //     }
    //     return console.log(result.ops);
    // })
})
