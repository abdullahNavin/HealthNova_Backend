import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";
import { Specialty } from "../../../generated/prisma/client";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendRespons";

const createSpecialty = async (req: Request, res: Response) => {
    const payload = req.body as Specialty

    if (!payload.title) {
        return sendResponse(res, {
            status: 400,
            message: "Title is required"
        })
    }

    const specialty = await specialtyService.createSpecialty(payload)

    sendResponse(res, {
        status: 201,
        message: "Specialty created successfully",
        data: specialty
    })
}

const GetAllSpecialty = async (req: Request, res: Response) => {
    const specialty = await specialtyService.GetAllSpecialty()
    sendResponse(res, {
        status: 200,
        message: "Specialty fetched successfully",
        data: specialty
    })
}

const deleteSpecialtyById = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const specialty = await specialtyService.deleteSpecialtyById(id)
    sendResponse(res, {
        status: 200,
        message: "Specialty deleted successfully",
        data: specialty
    })
}


const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const id = req.params.id as string

    const specialty = await specialtyService.updateSpecialty(id, data)
    sendResponse(res, {
        status: 200,
        message: "Specialty updated successfully",
        data: specialty
    })
})

export const specialtyController = {
    createSpecialty,
    GetAllSpecialty,
    deleteSpecialtyById,
    updateSpecialty
}