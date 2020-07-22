const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    ISBN:{
        type: String,
        required: true,
        min: 4
    },
    author: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        max: 1024,
        min: 20
    },
    category:{
        type: Number,
        required: true,
    },
    added_by_email:{
        type: String,
        required: true,
    },
    added_at_timestamp:{
        type: Date,
        default :Date.now
    },
    is_Available:{
        type: Boolean,
        default : true
    },
    no_copies:{
        type : Number,
        required: true,
    }
});


module.exports = mongoose.model('Books', bookSchema)