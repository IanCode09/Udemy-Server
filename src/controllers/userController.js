import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /user
const getUsers = async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users)
}


// @desc    Register a new user
// @route   POST /user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body

    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(400)
        throw new Error('Email already exist')
    }

    const user = await User.create({
        name, 
        email, 
        password,
        isAdmin
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


// @desc    Login
// @route   POST /user/login
const userLogin = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Email or Password Wrong')
    }
})


// @desc    User Profile
// @route   POST /user/profile
const userProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


export {
    registerUser,
    getUsers,
    userLogin,
    userProfile,
}