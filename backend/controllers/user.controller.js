import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


const signupUser = async (req, res) => {
    console.log(req?.body)
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const newUser = new UserModel({ name, email, password })
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save()
        res.status(201).json({ message: 'User Created Successfully', success: true })

    } catch (error) {

        res.status(500).json({ message: 'Internal server Error', success: false })

    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(409).json({ message: 'User is not exist' })
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            return res.status(500).json({ message: 'Authentication Failed', success: false })
        }
        const jwtToken = JWT.sign(
            {
                name: user.name,
                email: user.email,
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }

        )
        res.setHeader('Authorization', jwtToken)

        res.status(200).json(
            {
                message: 'Login Successfull',
                success: true,
                jwtToken,
                email,
                name: user.name
            })

    } catch (error) {

        res.status(500).json({ message: 'Internal server Error', success: false })

    }

}

export { loginUser, signupUser }