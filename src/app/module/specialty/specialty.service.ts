import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"


const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    const specialty = await prisma.specialty.create({
        data: {
            title: payload.title
        }
    })
    return specialty
}

const GetAllSpecialty = async () => {
    const specialty = await prisma.specialty.findMany()
    return specialty;
}

const deleteSpecialtyById = async (id: string) => {
    const specialty = await prisma.specialty.delete({
        where: {
            id: id
        }
    })
    return specialty;
}

const updateSpecialty = async (id: string, data: Specialty) => {
    const specialty = await prisma.specialty.update({
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