import express from 'express'
const router = express.Router()

import { 
    registerUser, 
    getUsers, 
    userLogin, 
    userProfile,
} from '../controllers/userController.js'

import { userProtect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getUsers)
router.post('/login', userLogin)
router.route('/profile').get(userProtect, userProfile)

export default router