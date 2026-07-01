import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateReq = (zodSchema: z.ZodObject) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const parseData = zodSchema.safeParse(req.body)

        if (!parseData.success) {
            next(parseData.error)
        }
        // senitization
        req.body = parseData.data
        next()

    }
}