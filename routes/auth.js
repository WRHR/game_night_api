const router = require('express').Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', 
    [
        body('name').exists(),
        body('email').isEmail(),
        body('password').isLength({min:6})
    ], 
    
    async (req,res) => {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const emailExists = await User.findOne({ email: req.body.email })
        if(emailExists) return res.status(400).json({ error: 'Email already in use' })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name:{
                first: req.body.name.first,
                last: req.body.name.last
            },
            email: req.body.email,
            password: hashPassword,
            gameLibrary:[],
            events:[],
            friends:[],
        })
        try{
            const savedUser = await user.save()
            const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET)
            res.status(200).json({ user: savedUser, token })
        }catch(err){
            res.status(400).json({ errors: err })
        }
    }
)

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min:6})
    ], 
    async (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(400).json({errors: 'Incorrect Email or Password'})

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).json({errors: 'Incorrect Email or Password'})

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.status(200).json({ user, token })
    }
)

router.get('/profile', async (req, res)=> {
    const token = req.header('Authorization').split(' ')[1]
    if(!token) return res.status(401).json({error: 'You must be logged in to do this'})

    try{
        const decodedToken = jwt.decode(token, process.env.TOKEN_SECRET)
        let user = await User.findOne({ _id: decodedToken._id})
        res.status(200).json({ user })
    }catch(err){
        res.status(400).json({error: err})
    }
})

module.exports = router