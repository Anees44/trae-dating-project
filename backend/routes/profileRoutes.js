import express from "express"
import auth from "../middleware/authMiddleware.js"
import { createProfile, getProfiles } from "../controllers/profileController.js"

const router = express.Router()

router.post("/", auth, createProfile)
router.get("/", getProfiles)

export default router
