import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router()

router.post('/doctor-register', userController.createDoctor)

export const userRoutes = router