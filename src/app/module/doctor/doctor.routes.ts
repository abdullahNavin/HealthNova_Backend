import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router: Router = Router()

router.get('/', doctorController.getAllDoctors)
router.get('/:id', doctorController.getDoctorById)

export const doctorsRoutes = router