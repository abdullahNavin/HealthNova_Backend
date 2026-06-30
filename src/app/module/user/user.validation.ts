import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorSchema = z.object({
    password: z.string("password is required").min(6).max(20),
    doctor: z.object({
        name: z.string("name is required"),
        email: z.email("email is required"),
        profilePhoto: z.string().optional(),
        contactNumber: z.string().optional(),
        address: z.string().optional(),
        registrationNumber: z.string().optional(),
        experience: z.number().int().min(0).optional(),
        gender: z.enum(Gender).optional(),
        appointmentFee: z.number().nonnegative().optional(),
        qualification: z.string().optional(),
        currentworkplace: z.string().optional(),
        designation: z.string().optional(),
    }),
    specialties: z.array(z.string()).min(1, "specialties must contain at least one item"),
})