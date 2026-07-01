import { logginUserValidationSchema, registerUserValidationSchema } from "../validators/auth_validator.js"
import bcrypt from "bcrypt"
import prisma from "../db/prisma.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

// let SECRET_KEY = process.env.SECRET_KEY

export let registerUserHandler = async (req, res) => {
    // step1: validate the incoming data or request data
    let result = registerUserValidationSchema.safeParse(req.body)
    if (!result.success) {
        let error = result.error.issues.map((ele) => {
            return {
                field: ele.path[0],
                message: ele.message,
            }
        })
        return res.status(400).json({
            success: false,
            message: "validation error",
            error: error,
        })
    }
    let { email, password, username } = result.data
    try {
        // step2: hashed the incoming password using bcrypt.hsah(data, salt/round)
        let hashedPassword = await bcrypt.hash(password, 10)
        // step 3: store the user data 
        let user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                role: true
            }
        })
        // todo exclude or remove password from user
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "something went wrong on creating user",
            stack: e?.message
        })
    }
}

// login step
// 0. validate the incoming data or request data
// 1. find the user with email
// 2. compare the request password and the matched user hashed password   using bcrypt
// 3. generate token with user data payload and expiry time
// 4. send the token to the client as response

export let login = async (req, res) => {
    try {
        // validation incoming request data
        let vResult = logginUserValidationSchema.safeParse(req.body)
        if (!vResult.success) {
            let errors = vResult.error.issues.map((ele) => {
                return {
                    field: ele.path[0],
                    message: ele.message
                }
            })
            return res.status(400).json({
                success: false,
                message: "validation Error",
                errors: errors
            })
        }

        let { email, password } = vResult.data
        // find the user with email
        let founderUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!founderUser) {
            return res.status(404).json({
                success: false,
                message: "user email or password invalid"
            })
        }
        // compare the password using bcrypt
        let isMatched = await bcrypt.compare(password, founderUser.password)
        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: "user password invalid"
            })
        }
        // generating token using jwt
        let token = jwt.sign(
            {
                id: founderUser.id,
                email: founderUser.email
            }, // user data payload
            process.env.SECRET_KEY, // signing secret key from env
            {
                expiresIn: '2d'
            }, // config
        )
        res.status(200).json({
            success: true,
            message: "user logged in successfully",
            token: token
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: "something went wrong on login",
            stack: e?.message
        })
    }
}