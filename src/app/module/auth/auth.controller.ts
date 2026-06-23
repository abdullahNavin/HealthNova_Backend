import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendRespons";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const user = await authService.registerPatient({ name, email, password })
    sendResponse(res, {
        status: 201,
        message: "User registered successfully",
        data: user
    })
})

const signInPatient = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await authService.signInPatient(email, password)
    sendResponse(res, {
        status: 200,
        message: "User signed in successfully",
        data: user
    })
})

export const authController = {
    registerPatient,
    signInPatient
}