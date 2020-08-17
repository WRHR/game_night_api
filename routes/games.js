const router = require('express').Router()
const User = require('../models/User')
const authorize = require('./privateRoutes')


router.post('/', authorize, async (req, res)=>{
    const authUser = await User.findOne({_id: req.user._id})
    try{
        authUser.gameLibrary = [...authUser.gameLibrary, req.body]
        authUser.save()
        res.status(200).json({message: 'Game has been added to your library!'})
    }catch(err){
        res.status(401).json({error: err})
    }
})

module.exports = router