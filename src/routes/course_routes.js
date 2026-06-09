import { CreateCourse, DeleteCourse, FindAllCourse, FindCourseById, UpdateCourse } from "../handlers/course_handler.js";;
import router from "./routes.js";

router.get(
    "/", FindAllCourse
)

router.get(
    "/:id", FindCourseById
)

router.post(
    "/", CreateCourse
)

router.put(
    "/:id", UpdateCourse
)

router.delete(
    "/:id", DeleteCourse
)

export default router