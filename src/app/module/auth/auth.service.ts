import { Status } from "../../../generated/prisma/enums"
import { auth } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"
import { getAccessToken, getRefreshToken } from "../../utils/token"

interface RegisterPatientPayload {
    name: string,
    email: string,
    password: string
}

const registerPatient = async (payload: RegisterPatientPayload) => {
    const { name, email, password } = payload
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })

    if (!data.user) throw new Error("User not created")

    try {
        const patient = await prisma.$transaction(async (tx) => {
            const patient = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: name,
                    email: email
                }
            })
            return patient
        })

        const accessToken = getAccessToken({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })

        const refreshToken = getRefreshToken({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })

        return { ...data, patient, accessToken, refreshToken }

    } catch (error) {
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })
        throw new Error(error as string)
    }
}

const signInPatient = async (email: string, password: string) => {
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if (!data.user) throw new Error("Invalid credentials")
    if (data.user.status !== Status.ACTIVE) throw new Error("User is not active")
    if (data.user.isDeleted) throw new Error("User is deleted")

    const accessToken = getAccessToken({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    })

    const refreshToken = getRefreshToken({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    })

    return { ...data, accessToken, refreshToken }
}

export const authService = {
    registerPatient,
    signInPatient
}