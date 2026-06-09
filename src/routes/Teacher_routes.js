import {  CreateTeacher, DeleteTeacher, FindAllTeachers, FindTeacherById, UpdateTeacher} from "../handlers/teacher_handler.js";
import router from "./routes.js";

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