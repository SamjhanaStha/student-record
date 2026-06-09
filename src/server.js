import express from "express"
import dotenv from "dotenv"
import studentRouter from "./routes/student_routes.js"
import departmentRouter from "./routes/department_routes.js"
import teacherRouter from "./routes/Teacher_routes.js"
import courseRouter from "./routes/course_routes.js"
// github.com/DipakShrestha-ADS/student_record.git
dotenv.config()
let app = express()
app.use(express.json())
 
app.use("/student", studentRouter)
app.use("/department", departmentRouter)
app.use("/teacher", teacherRouter)
app.use("/course", courseRouter)

let PORT = process.env.PORT || 8888
app.get("/", (req,res)=>{
    res.json({
        message: " "
    })
})
app.listen(PORT, ()=>{
    console.log(`server started at  ${PORT}`)
})
