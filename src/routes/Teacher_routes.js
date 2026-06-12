import { CreateTeacher, DeleteTeacher, FindAllTeacher, FindTeacherById, UpdateTeacher } from "../handlers/teacher_handler.js";
import { Router } from "express";
let router = Router()
router.get(
    "/", FindAllTeacher
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