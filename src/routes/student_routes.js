import { CreateStudent, CreateStudentWithDepartment, DeleteStudent, FindAllStudents, FindStudentById, getALlStudentsWithselect, sortStudents, UpdateStudent } from "../handlers/handler.js"
import { Router } from "express";
let router = Router()
router.get(
    "/", FindAllStudents
)
router.get("/with-select", getALlStudentsWithselect)
router.get("/:id", FindStudentById)
router.get("/sort", sortStudents)
router.post("/",CreateStudent)
router.post("/with-depart", CreateStudentWithDepartment)
router.put("/:id", UpdateStudent)
router.delete("/:id", DeleteStudent)

export default router