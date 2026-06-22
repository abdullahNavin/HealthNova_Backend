import { Router } from "express";
import { specialtyController } from "./specialty.controller";

const router: Router = Router()

router.post('/', specialtyController.createSpecialty)
router.get('/', specialtyController.GetAllSpecialty)
router.delete('/:id', specialtyController.deleteSpecialtyById)
router.put('/:id', specialtyController.updateSpecialty)

export const specialtyRoutes = router