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
            return res.status(400).json({errors: errors.array() })
        }

        const emailExists = await User.findOne({ email: req.body.email })
        if(emailExists) return res.status(400).send('Email already in use')

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const user = User.create({
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
            res.json({user: savedUser._id})
        } catch(err){
            res.status(400).send(err)
        }
})

// router.post('login', async (req, res)=>{

// })

module.exports = router