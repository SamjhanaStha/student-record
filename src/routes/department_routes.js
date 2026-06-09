import { CreateDepartment, DeleteDepartment, FindAllDepartment, FindDepartmentById, UpdateDepartment } from "../handlers/department_handler.js";
import router from "./routes.js";

router.get(
    "/", FindAllDepartment
)

router.get(
    "/:id", FindDepartmentById
)

router.post(
    "/", CreateDepartment
)

router.put(
    "/:id", UpdateDepartment
)

router.delete(
    "/:id", DeleteDepartment
)

export default router