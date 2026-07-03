import { Router } from "express";
import { CreateEnrollment, DeleteEnrollment, EnrollmentStudentInCourse, FindAllEnrollment, FindEnrollmentById, UpdateEnrollment } from "../handlers/enrollment_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
let router = Router()
router.get("/",authMiddleware, FindAllEnrollment)
router.get("/:id",  FindEnrollmentById)
router.post("/",authMiddleware, CreateEnrollment)
router.post("/enroll",authMiddleware, EnrollmentStudentInCourse)
router.put("/:id",authMiddleware, UpdateEnrollment)
router.delete("/:id", DeleteEnrollment)
export default router