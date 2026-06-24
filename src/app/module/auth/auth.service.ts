import { auth } from "../../../lib/auth"

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

    return data
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