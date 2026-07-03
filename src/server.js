import express from "express"
import dotenv from "dotenv"
import studentRouter from "./routes/student_routes.js"
import departmentRouter from "./routes/department_routes.js"
import teacherRouter from "./routes/Teacher_routes.js"
import courseRouter from "./routes/course_routes.js"
import enrollmentRouter from "./routes/enrollment_routes.js"
import hashRouter from "./routes/auth_routes.js"
import { checkXApiKeyInHeader, checkXRoleHeaderMiddleware } from "./middlewares/header_middlerware.js"
import { addRequestTimeStampMiddleware, customErrorMiddleware, customSuccessMiddleware } from "./middlewares/add_request_timestamp_middleware.js"
import { upload } from "./middlewares/upload_middleware.js"
import { uploadFileHandler } from "./handlers/upload_handler.js"
// github.com/DipakShrestha-ADS/student_record.git
dotenv.config()
let app = express()
app.use(express.json())

app.post("/uploads", upload.single("file"), uploadFileHandler)

// roure-based middleware
app.use("/req-time", addRequestTimeStampMiddleware, (req, res)=>{
    res.status(200).json({
        message: "request time attached",
        data: req.requestTimeStamp
    })
})

// 
app.get("/cerr", (req, res, next)=>{
    try{
        throw new Error("custom error throws error")
    } catch(e){
        next(e)
    }
})

app.get("/cdata", (req, res, next)=>{
    next({
        msg: "all data fetched",
        data: ["apple", "mango"],
        trace: {
            method: "GET",
            route: "/cdata"
        }
    })
})
app.use(customSuccessMiddleware)

// custom middleware
app.use((req, res, next) => {
    console.log(`req Url ${req.url}`)
    if(req.url == "/"){
        res.json({
            errorMsg: "this url cannot be access"
        })
        return
    }
    next()
})
 
app.use(checkXRoleHeaderMiddleware)
// route level middleware
app.use("/apikey",
    checkXApiKeyInHeader, (req,res)=>{
    res.status(200).json({
        message: "api key called",
        data: req.headers["x-api-key"]
    })
})

app.use("/students", studentRouter)
app.use("/departments", departmentRouter)
app.use("/teachers", teacherRouter)
app.use("/courses", courseRouter)
app.use("/enrollments", enrollmentRouter)
app.use("/auth", hashRouter)

let PORT = process.env.PORT || 8888
app.get("/", (req,res)=>{
    res.json({
        message: " "
    })
})

app.use(customErrorMiddleware)

app.listen(PORT, ()=>{
    console.log(`server started at  ${PORT}`)
})
