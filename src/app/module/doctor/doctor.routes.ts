import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router: Router = Router()

router.get('/', doctorController.getAllDoctors)

export const doctorsRoutes = router