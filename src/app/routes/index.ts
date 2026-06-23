import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.routes";
import { authRoutes } from "../module/auth/auth.routes";

const router: Router = Router()

router.use('/specialty', specialtyRoutes)
router.use('/auth', authRoutes)

export const indexRoutes = router