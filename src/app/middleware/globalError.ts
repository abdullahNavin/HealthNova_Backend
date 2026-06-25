import { NextFunction, Request, Response } from "express";
import { env } from "../../config/env";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (env.NODE_ENV === "development") {
        console.error(err.stack);
    }

    let statusCode = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        message: message,
    });
}