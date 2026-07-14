import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })
    return doctors;
}

const getDoctorById = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            },
            schedules: {
                include: {
                    schedule: true
                }
            },
            appointments: {
                include: {
                    patient: true,
                    schedule: true,
                    prescription: true
                }
            },
            reviews: true

        }
    })
    return doctor;
}

export const doctorsService = {
    getAllDoctors,
    getDoctorById
}