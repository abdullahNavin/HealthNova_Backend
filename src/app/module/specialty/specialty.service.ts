import { Speciality } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"


const createSpecialty = async (payload: Speciality): Promise<Speciality> => {
    const specialty = await prisma.speciality.create({
        data: {
            title: payload.title
        }
    })
    return specialty
}

export const specialtyService = {
    createSpecialty
}