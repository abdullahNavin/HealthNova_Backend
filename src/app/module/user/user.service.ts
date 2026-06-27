import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { ICreateDoctor } from "./user.interface";

const createDoctor = async (payload: ICreateDoctor) => {

    const specialties: Specialty[] = []

    for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId,
            },
        });
        if (!specialty) {
            throw new Error(`Specialty with ID ${specialtyId} does not exist.`);
        }
        specialties.push(specialty);
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor.email,
        },
    });
    if (userExists) {
        throw new Error(`User with email ${payload.doctor.email} already exists.`);
    }

    const Doctordata = await auth.api.signUpEmail({
        body: {
            name: payload.doctor.name,
            email: payload.doctor.email,
            password: payload.password,
            role: Role.DOCTOR,
            needPasswordReset: true,
        },
    });

    if (!Doctordata.user) throw new Error("User not created");

    try {
        const doctor = await prisma.$transaction(async (tx) => {
            const createDoctor = await tx.doctor.create({
                data: {
                    userId: Doctordata.user.id,
                    ...payload.doctor,
                }
            });
            const DoctorSpecialtyData = specialties.map(specialty => {
                return {
                    doctorId: createDoctor.id,
                    specialtyId: specialty.id,
                };
            })

            await tx.doctorSpecialty.createMany({
                data: DoctorSpecialtyData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: createDoctor.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    userId: true,
                    profilePhoto: true,
                    experience: true,
                    address: true,
                    appointmentFee: true,
                    averageRating: true,
                    createdAt: true,
                    updatedAt: true,
                    isDeleted: true,
                    deletedAt: true,
                    contactNumber: true,
                    designation: true,
                    currentworkplace: true,
                    gender: true,
                    qualification: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            role: true,
                            needPasswordReset: true,
                            status: true,
                            email: true,
                            emailVerified: true,
                            image: true
                        }
                    },
                    specialties: {
                        select: {
                            specialty: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            }

                        }
                    }
                }
            })

            return doctor;
        });

        return doctor;

    } catch (error) {
        await prisma.user.delete({
            where: {
                id: Doctordata.user.id,
            },
        });
        throw new Error("Error creating doctor");
    }
};

export const userService = {
    createDoctor,
};