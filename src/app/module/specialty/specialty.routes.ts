import { NextFunction, Request, Response, Router } from "express";
import { specialtyController } from "./specialty.controller";
import { getCookie } from "../../utils/cookies";
import { verifyToken } from "../../utils/jwt";
import { env } from "../../../config/env";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";

const router: Router = Router()

router.post('/', checkAuth(Role.ADMIN), specialtyController.createSpecialty)
router.get('/', checkAuth(Role.ADMIN,Role.PATIENT), specialtyController.GetAllSpecialty)
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.deleteSpecialtyById)
router.put('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.updateSpecialty)

export const specialtyRoutes = router