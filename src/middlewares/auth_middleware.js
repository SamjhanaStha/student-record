// step for Authorization : 
// 1. check if header include authorization
// 2. check if authorization value has Bearer or not
// 3. authorization[i] is not empty: token
// 4. verify token is valid or not using JWT: Decoded data
// 5. check expiresIn data actually expired or not

// import { success } from "zod"
import jwt from "jsonwebtoken"

export let authMiddleware = async (req, res, next)=>{
    let authHeader = req.headers.authorization
    // check if Authorization header is available or not
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: "Authorization header is required"
        })
    }
    // check if authHeader starts with Bearer
    if(!authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success: false,
            message: "Authorization header is not valid"
        })
    }
    // check if token is empty or not
    let token = authHeader.split(" ")[1]
    if(token === ""){
        return res.status(401).json({
            success: false,
            message: "token is not valid"
        })
    }
    try{
        // verify the token or validate the token
        let decodedDataFromToken = await jwt.verify(token, process.env.SECRET_KEY)
        // let exp = decodedDataFromToken.exp
        
        // attach user data or payload in req for further use
        req.payload =decodedDataFromToken.payload
        next()
    }catch(e){
        console.log("error: ", e.name)
        if(e.name === "TokenExpiredError"){
            res.status(401).json({
                success: false,
                message: `Token expired at: ${e.expiredAt} `
            })
        }
        res.status(401).json({
            success: false,
            message: "token invalid",
            stack: e?.message
        })
    }
}