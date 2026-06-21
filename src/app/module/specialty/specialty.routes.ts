import { Router } from "express";
import { specialtyController } from "./specialty.controller";

const router: Router = Router()

router.post('/specialty', specialtyController.createSpecialty)
router.get('/specialty', specialtyController.GetAllSpecialty)
router.delete('/specialty/:id', specialtyController.deleteSpecialtyById)
router.put('/specialty/:id', specialtyController.updateSpecialty)

export const specialtyRoutes = router