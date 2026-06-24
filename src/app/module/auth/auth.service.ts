import { auth } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"

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

    return {...data, patient}
}

const signInPatient = async (email: string, password: string) => {
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if (!data.user) throw new Error("Invalid credentials")

    return data
}

export const authService = {
    registerPatient,
    signInPatient
}