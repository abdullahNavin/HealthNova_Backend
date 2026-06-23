import { Router } from "express";
import { authController } from "./auth.controller";

const router: Router = Router()

router.post('/register', authController.registerPatient)
router.post('/signin', authController.signInPatient)

export const authRoutes = router