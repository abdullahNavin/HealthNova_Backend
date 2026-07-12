import { NextFunction, Request, Response, Router } from "express";
import { specialtyController } from "./specialty.controller";
import { getCookie } from "../../utils/cookies";
import { verifyToken } from "../../utils/jwt";
import { env } from "../../../config/env";
import { Role } from "../../../generated/prisma/enums";

const router: Router = Router()

router.post('/', specialtyController.createSpecialty)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = getCookie(req, "accessToken")
        if (!accessToken) {
            throw new Error("Access token not found")
        }
        const validateToken = verifyToken(accessToken, env.ACCESS_TOKEN_SECRET)
        if (!validateToken.success) {
            throw new Error("Invalid access token")
        }

        console.log(validateToken.decoded);

        if (validateToken.decoded?.role !== Role.ADMIN) {
            throw new Error("Unauthorized access")
        }

        next()
    } catch (error) {
        next(error)
    }
}, specialtyController.GetAllSpecialty)
router.delete('/:id', specialtyController.deleteSpecialtyById)
router.put('/:id', specialtyController.updateSpecialty)

export const specialtyRoutes = router