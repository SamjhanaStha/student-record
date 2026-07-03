import { CreateTeacher, DeleteTeacher, FindAllTeacher, FindTeacherById, UpdateTeacher } from "../handlers/teacher_handler.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
let router = Router()
router.get(
    "/", authMiddleware, FindAllTeacher
)

router.get(
    "/:id", FindTeacherById
)

router.post(
    "/",authMiddleware, CreateTeacher
)

router.put(
    "/:id",authMiddleware, UpdateTeacher
)

router.delete(
    "/:id", DeleteTeacher
)

export default router