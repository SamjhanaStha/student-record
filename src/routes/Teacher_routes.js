import {  CreateTeacher, DeleteTeacher, FindAllTeachers, FindTeacherById, UpdateTeacher} from "../handlers/teacher_handler.js";
import { Router } from "express";
let router = Router()
router.get(
    "/", FindAllTeachers
)

router.get(
    "/:id", FindTeacherById
)

router.post(
    "/", CreateTeacher
)

router.put(
    "/:id", UpdateTeacher
)

router.delete(
    "/:id", DeleteTeacher
)

export default router