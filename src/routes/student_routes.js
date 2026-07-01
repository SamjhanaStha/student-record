import { CreateStudent, CreateStudentWithDepartment, DeleteStudent, FindAllStudents, FindStudentById, getALlStudentsWithselect, sortStudents, UpdateStudent } from "../handlers/handler.js"
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
let router = Router()
router.get(
    "/", authMiddleware, FindAllStudents
)
router.get("/with-select", getALlStudentsWithselect)
router.get("/single/:id", FindStudentById)
router.get("/sort", sortStudents)
router.post("/",CreateStudent)
router.post("/with-depart", CreateStudentWithDepartment)
router.put("/:id", UpdateStudent)
router.delete("/:id", DeleteStudent)

export default router