import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync"
import { sendResponse } from "../../shared/sendRespons"
import { StatusCodes } from "http-status-codes"
import { userService } from "./user.service"

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const doctor = await userService.createDoctor(payload)
    sendResponse(res, {
        status: StatusCodes.CREATED,
        message: "Doctor registered successfully",
        data: doctor
    })
})

export const userController = {
    createDoctor
}