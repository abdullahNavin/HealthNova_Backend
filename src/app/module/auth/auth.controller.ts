import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendRespons";
import { fromNodeHeaders } from "better-auth/node";

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
    const { email, password } = req.body;

    const result = await authService.signInPatient(
        email,
        password,
        // fromNodeHeaders(req.headers)
    );

    // result.headers.forEach((value, key) => {
    //     if (key.toLowerCase() === "set-cookie") {
    //         res.append("Set-Cookie", value);
    //     } else {
    //         res.setHeader(key, value);
    //     }
    // });

    sendResponse(res, {
        status: 200,
        message: "User signed in successfully",
        data: result,
    });
});

export const authController = {
    registerPatient,
    signInPatient
}