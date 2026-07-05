import { Router } from "express";
import { getProfileHandler, login, registerUserHandler, updateProfileHandler } from "../handlers/auth_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { upload } from "../middlewares/upload_middleware.js";
let router = Router()

router.post("/register", registerUserHandler)
router.post("/login", login)
router.get("/profile", authMiddleware,  getProfileHandler)
router.post("/update-profile", authMiddleware, upload.single("profileImage"), updateProfileHandler)

export default router