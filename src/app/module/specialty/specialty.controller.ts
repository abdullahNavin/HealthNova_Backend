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

export const specialtyController = {
    createSpecialty
}