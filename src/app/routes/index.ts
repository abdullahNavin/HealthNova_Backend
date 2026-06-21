import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.routes";

const router: Router = Router()

router.use('/specialty', specialtyRoutes)

export const indexRoutes = router