const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name: {
         type : String,
         required: true,
         min : 6,
         max :255
    },
    nsbm_Id:{
        type : Number,
        required: true,
    },
    faculty:{
        type: Number,
    },
    email:{
        type : String,
        required: true,
        max : 255,
        min : 2
    },
    password :{
        type : String,
        required: true,
        max : 1024,
        min : 6
    },
    created_date:{
        type: Date,
        default :Date.now
    },
    isStudentVerified: {
        type : Boolean,
        default: false
    }
});


module.exports = mongoose.model('Students' , studentsSchema)