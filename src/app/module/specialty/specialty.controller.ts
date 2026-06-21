import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";
import { Speciality } from "../../../generated/prisma/client";

const createSpecialty = async (req: Request, res: Response) => {
    try {
        const payload = req.body as Speciality

        if (!payload.title) {
            return res.status(400).json({ message: "Title is required" })
        }

        const specialty = await specialtyService.createSpecialty(payload)

        return res.status(201).json({ message: "Specialty created successfully", data: specialty })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error })
    }
}

const GetAllSpecialty = async (req: Request, res: Response) => {
    try {
        const specialty = await specialtyService.GetAllSpecialty()
        return res.status(200).json({ message: "Specialty fetch successfully", data: specialty })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error })

    }
}

const deleteSpecialtyById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const specialty = await specialtyService.deleteSpecialtyById(id)
        return res.status(200).json({ message: "Specialty deleted successfully", data: specialty })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error })

    }
}

const updateSpecialty = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const id = req.params.id as string

        const specialty = await specialtyService.updateSpecialty(id, data)
        return res.status(200).json({ message: "Specialty updated successfully", data: specialty })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error })
    }
}

export const specialtyController = {
    createSpecialty,
    GetAllSpecialty,
    deleteSpecialtyById,
    updateSpecialty
}