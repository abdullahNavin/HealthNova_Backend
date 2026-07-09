import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, Status } from "../generated/prisma/enums";
import { env } from "../config/env";
import ms from "ms";

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
        expiresIn: Number(ms(Number(env.BETTER_AUTH_TOKEN_EXPIRATION))),
        updateAge: Number(ms(Number(env.BETTER_AUTH_TOKEN_UPDATE_EXPIRATION))),
        cookieCache: {
            enabled: true,
            maxAge: Number(ms(Number(env.BETTER_AUTH_TOKEN_EXPIRATION))),
        }
    }

});