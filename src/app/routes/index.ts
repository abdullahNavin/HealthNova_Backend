import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.routes";
import { authRoutes } from "../module/auth/auth.routes";
import { userRoutes } from "../module/user/user.routes";

const router: Router = Router()

router.use('/specialty', specialtyRoutes)
router.use('/auth', authRoutes)
router.use('/doctor', userRoutes)

export const indexRoutes = router