const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB).then(()=> {
    console.log('Connected to mongodb server');
}).catch((err)=>{
    console.log(err);
    console.log('Failed to connect to mongodb server');
});