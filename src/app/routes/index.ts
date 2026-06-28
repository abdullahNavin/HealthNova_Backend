import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.routes";
import { authRoutes } from "../module/auth/auth.routes";
import { userRoutes } from "../module/user/user.routes";
import { doctorsRoutes } from "../module/doctor/doctor.routes";

const router: Router = Router()

router.use('/specialty', specialtyRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/doctors', doctorsRoutes)

export const indexRoutes = router