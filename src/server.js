import express from "express"
import dotenv from "dotenv"
import studentRouter from "./routes/student_routes.js"
import departmentRouter from "./routes/department_routes.js"
import teacherRouter from "./routes/Teacher_routes.js"
import courseRouter from "./routes/course_routes.js"
import enrollmentRouter from "./routes/enrollment_routes.js"
import { checkXApiKeyInHeader, checkXRoleHeaderMiddleware } from "./middlewares/header_middlerware.js"
// github.com/DipakShrestha-ADS/student_record.git
dotenv.config()
let app = express()
app.use(express.json())

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

let PORT = process.env.PORT || 8888
app.get("/", (req,res)=>{
    res.json({
        message: " "
    })
})
app.listen(PORT, ()=>{
    console.log(`server started at  ${PORT}`)
})
