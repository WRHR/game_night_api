const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('Authorization').split(' ')[1]
    if(!token) return res.status(401).json({error: 'You must be logged in to do this'})

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(400).json({error: err})
    }
}