import { Router } from "express";
import { CreateEnrollment, DeleteEnrollment, EnrollmentStudentInCourse, FindAllEnrollment, FindEnrollmentById, UpdateEnrollment } from "../handlers/enrollment_handler.js";
let router = Router()
router.get("/", FindAllEnrollment)
router.get("/:id", FindEnrollmentById)
router.post("/", CreateEnrollment)
router.post("/enroll", EnrollmentStudentInCourse)
router.put("/:id", UpdateEnrollment)
router.delete("/:id", DeleteEnrollment)
export default router