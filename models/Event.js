const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    start:{
        type:String,
        required:true
    },
    game:{
        type:Object
    },
    creator:{
        type:String,
        required:true
    },
    attendees:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('Event', eventSchema)