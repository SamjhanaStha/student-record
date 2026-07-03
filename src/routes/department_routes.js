import { CreateDepartment, DeleteDepartment, FindAllDepartment, FindDepartmentById, UpdateDepartment } from "../handlers/department_handler.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
let router = Router()
router.get(
    "/",authMiddleware, FindAllDepartment
)

router.get(
    "/:id", FindDepartmentById
)

router.post(
    "/",authMiddleware, CreateDepartment
)

router.put(
    "/:id", authMiddleware, UpdateDepartment
)

router.delete(
    "/:id", DeleteDepartment
)

export default router