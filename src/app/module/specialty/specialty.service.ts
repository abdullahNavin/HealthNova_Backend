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

const GetAllSpecialty = async () => {
    const specialty = await prisma.speciality.findMany()
    return specialty;
}

const deleteSpecialtyById = async (id: string) => {
    const specialty = await prisma.speciality.delete({
        where: {
            id: id
        }
    })
    return specialty;
}

const updateSpecialty = async (id: string, data: Speciality) => {
    const specialty = await prisma.speciality.update({
        where: { id },
        data
    })

    return specialty;
}

export const specialtyService = {
    createSpecialty,
    GetAllSpecialty,
    deleteSpecialtyById,
    updateSpecialty
}