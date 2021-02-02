import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { userProtect } from '../middleware/authMiddleware.js'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User