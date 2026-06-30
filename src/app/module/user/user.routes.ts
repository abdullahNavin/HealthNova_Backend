import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { createDoctorSchema } from "./user.validation";
import { validateReq } from "../../shared/validateReq";


const router: Router = Router()

router.post('/doctor-register', validateReq(createDoctorSchema), userController.createDoctor)

export const userRoutes = router