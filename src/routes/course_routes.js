import { CreateCourse, DeleteCourse, FindAllCourse, FindCourseById, UpdateCourse } from "../handlers/course_handler.js";;
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
let router = Router()

router.get(
    "/",authMiddleware, FindAllCourse
)

router.get(
    "/:id", FindCourseById
)

router.post(
    "/",authMiddleware, CreateCourse
)

router.put(
    "/:id", authMiddleware, UpdateCourse
)

router.delete(
    "/:id", DeleteCourse
)

export default router