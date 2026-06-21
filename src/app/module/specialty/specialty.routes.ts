import { Router } from "express";
import { specialtyController } from "./specialty.controller";

const router: Router = Router()

router.post('/specialty', specialtyController.createSpecialty)

export const specialtyRoutes = router