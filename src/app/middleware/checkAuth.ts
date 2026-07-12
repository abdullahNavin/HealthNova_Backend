import { NextFunction, Request, Response } from "express";
import { Role, Status } from "../../generated/prisma/enums";
import { getCookie } from "../utils/cookies";
import { prisma } from "../../lib/prisma";
import { env } from "../../config/env";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...authRoles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = getCookie(req, "better-auth.session_token")
        if (!sessionToken) {
            throw new Error("Session token not found")
        }
        if (sessionToken) {
            const sessionExist = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date()
                    }
                },
                include: {
                    user: true
                }
            })
            if (!sessionExist) {
                throw new Error("Session token is invalid or expired")
            }
            if (sessionExist && sessionExist.user) {
                const user = sessionExist.user

                const now = new Date()
                const expiresAt = new Date(sessionExist.expiresAt)
                const createdAt = new Date(sessionExist.createdAt)

                const sessionDuration = expiresAt.getTime() - createdAt.getTime()
                const timeRemaining = expiresAt.getTime() - now.getTime()
                const percentageRemaining = (timeRemaining / sessionDuration) * 100

                if (percentageRemaining < 20) {
                    res.setHeader("X-Session-Refresh", "true")
                    res.setHeader("X-Session-Expires-At", expiresAt.toISOString())
                    res.setHeader("X-Time-Remaining", timeRemaining.toString())
                }
                if (user.status !== Status.ACTIVE || user.isDeleted) {
                    throw new Error("Unauthorized access - User is inactive or deleted")
                }
                if (authRoles.length === 0 || !authRoles.includes(user.role)) {
                    throw new Error("Unauthorized access - User does not have the required role")
                }
            }

            const accessToken = getCookie(req, "accessToken")
            if (!accessToken) {
                throw new Error("Access token not found")
            }
            const validateToken = verifyToken(accessToken, env.ACCESS_TOKEN_SECRET)
            if (!validateToken.success) {
                throw new Error("Invalid access token")
            }

            if (authRoles.length > 0 && !authRoles.includes(validateToken.decoded?.role as Role)) {
                throw new Error("Unauthorized access")
            }

            next()
        }
    } catch (error) {
        next(error)
    }
}