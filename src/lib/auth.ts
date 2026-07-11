import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, Status } from "../generated/prisma/enums";
import { env } from "../config/env";
import ms, { StringValue } from "ms";

export const auth = betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.FRONTEND_URL],
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
    },

    session: {
        expiresIn: 24 * 60 * 60, // 1 day
        updateAge: 24 * 60 * 60, // 1 day
        cookieCache: {
            enabled: true,
            maxAge: 24 * 60 * 60, // 1 day
        }
    }

});