import dotenv from 'dotenv';

dotenv.config();

interface ImportMetaEnv {
    readonly PORT: string;
    readonly NODE_ENV: string;
    readonly BETTER_AUTH_SECRET: string;
    readonly BETTER_AUTH_URL: string;
    readonly FRONTEND_URL: string;
    readonly DATABASE_URL: string;
    readonly ACCESS_TOKEN_SECRET: string;
    readonly REFRESH_TOKEN_SECRET: string;
    readonly ACCESS_TOKEN_EXPIRATION: string;
    readonly REFRESH_TOKEN_EXPIRATION: string;
    readonly BETTER_AUTH_TOKEN_EXPIRATION: string;
    readonly BETTER_AUTH_TOKEN_UPDATE_EXPIRATION: string;
}

const envImport = (): ImportMetaEnv => {

    const requiredEnvVars = [
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL',
        'DATABASE_URL',
        'FRONTEND_URL',
        'PORT',
        'NODE_ENV',
        'ACCESS_TOKEN_SECRET',
        'REFRESH_TOKEN_SECRET',
        'ACCESS_TOKEN_EXPIRATION',
        'REFRESH_TOKEN_EXPIRATION',
        'BETTER_AUTH_TOKEN_EXPIRATION',
        'BETTER_AUTH_TOKEN_UPDATE_EXPIRATION'
    ];

    for (const varName of requiredEnvVars) {
        if (!process.env[varName]) {
            throw new Error(`Environment variable '${varName}' is not set`);
        }
    }

    return {
        PORT: process.env.PORT || '5000',
        NODE_ENV: process.env.NODE_ENV || 'development',
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || '',
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || '',
        FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
        DATABASE_URL: process.env.DATABASE_URL || '',
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
        ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '1d',
        REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
        BETTER_AUTH_TOKEN_EXPIRATION: process.env.BETTER_AUTH_TOKEN_EXPIRATION || '1d',
        BETTER_AUTH_TOKEN_UPDATE_EXPIRATION: process.env.BETTER_AUTH_TOKEN_UPDATE_EXPIRATION || '1d'
    }
}

export const env = envImport();