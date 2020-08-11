const router = require('express').Router()
const authorize = require('./privateRoutes')


router.post('/', authorize, async (req, res)=>{
    const authUser = await User.findOne({_id: req.user._id})
    authUser.games = [...authUser.games, req.body]

    try{
        authUser.save()
        res.status(200).json({message: 'Game has been added to your library!'})
    }catch(err){
        res.status(401).json({error: err})
    }
})