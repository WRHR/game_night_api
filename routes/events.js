const router = require('express').Router()
const Event = require('../models/Event')
const User = require('../models/User')
const authorize = require('./privateRoutes')
const { response } = require('express')

router.get('/', async (req, res)=>{
    const events = await Event.find()
    res.json({events})
})

router.post('/', authorize, async (req, res)=> {
    const authUser = await User.findOne({_id: req.user._id})
    console.log(authUser._id)
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        game: req.body.game,
        creator: authUser._id,
        attendees:[{_id:authUser._id, name:authUser.name}, ...req.body.attendees]
    })

    try{
        const savedEvent = await event.save()
        authUser.events = [...authUser.events, savedEvent._id]
        authUser.save()
        res.status(200).json({event})
    }catch(err){
        res.status(400).json({error: err})
    }
})





module.exports= router 