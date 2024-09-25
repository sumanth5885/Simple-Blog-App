import express from 'express'
import { loginUser, signupUser } from '../controllers/user.controller.js'
import { loginValidation, signupValidation } from '../middlewares/userValidations.js'

const router = express.Router()


router.post('/login',loginValidation, loginUser)
router.post('/signup', signupValidation, signupUser)

export const userRoutes = router
