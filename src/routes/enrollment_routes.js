import { Router } from "express";
import { CreateEnrollment, DeleteEnrollment, FindAllEnrollment, FindEnrollmentById, UpdateEnrollment } from "../handlers/enrollment_handler";
let router = Router()
router.get(
    "/", FindAllEnrollment
)
router.get(
    "/:id",
    FindEnrollmentById
)
router.post(
    "/",
    CreateEnrollment
)
router.put(
    "/:id",
    UpdateEnrollment
)
router.delete(
    "/:id",
    DeleteEnrollment
)
export default router