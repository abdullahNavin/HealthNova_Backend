import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { doctorsService } from "./doctor.service";
import { sendResponse } from "../../shared/sendRespons";
import { StatusCodes } from "http-status-codes";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const doctors = await doctorsService.getAllDoctors()
    sendResponse(res, {
        status: StatusCodes.OK,
        message: "Fetch doctors data successfully",
        data: doctors
    })
})

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const doctor = await doctorsService.getDoctorById(id)
    sendResponse(res, {
        status: StatusCodes.OK,
        message: "Fetch doctor data successfully",
        data: doctor
    })
})

export const doctorController = {
    getAllDoctors,
    getDoctorById
}