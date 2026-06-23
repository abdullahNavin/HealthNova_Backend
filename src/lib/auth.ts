import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, Status } from "../generated/prisma/enums";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            needPasswordReset: {
                type: "boolean",
                defaultValue: false,
                required: true
            },
            isDeleted: {
                type: "boolean",
                defaultValue: false,
                required: true
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null
            },
            role: {
                type: 'string',
                defaultValue: Role.PATIENT,
                required: true
            },
            status: {
                type: 'string',
                defaultValue: Status.ACTIVE,
                required: true
            }
        }
    }

});