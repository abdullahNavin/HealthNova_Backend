import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include: {
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })
    return doctors;
}

export const doctorsService = {
    getAllDoctors
}