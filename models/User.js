const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        first:{
            type: String,
            required: true,
            min:2
        },
        last:{
            type: String,
            required: true,
            min:2
        }
    },
    email:{
        type:String,
        required: true,

    },
    password: {
        type:String,
        required:true,
        min:6,
        max: 1024
    },
    gameLibrary:{
        type:Array,
        required: true,
    },
    events:{
        type:Array,
        required:true
    },
    friends:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema)