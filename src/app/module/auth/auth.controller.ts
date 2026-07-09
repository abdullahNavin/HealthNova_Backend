import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendRespons";
import { StatusCodes } from "http-status-codes";
import { setAccessToken, setBetterAuthToken, setRefreshToken } from "../../utils/token";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const user = await authService.registerPatient({ name, email, password })

    setAccessToken(res, user.accessToken)
    setRefreshToken(res, user.refreshToken)
    setBetterAuthToken(res, user.token as string)

    sendResponse(res, {
        status: StatusCodes.CREATED,
        message: "User registered successfully",
        data: user
    })
})

const signInPatient = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.signInPatient(
        email,
        password,
    );

    setAccessToken(res, result.accessToken)
    setRefreshToken(res, result.refreshToken)
    setBetterAuthToken(res, result.token)

    sendResponse(res, {
        status: StatusCodes.OK,
        message: "User signed in successfully",
        data: result,
    });
});

export const authController = {
    registerPatient,
    signInPatient
}