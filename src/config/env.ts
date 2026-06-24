import dotenv from 'dotenv';

dotenv.config();

interface ImportMetaEnv {
    readonly PORT: string;
    readonly NODE_ENV: string;
    readonly BETTER_AUTH_SECRET: string;
    readonly BETTER_AUTH_URL: string;
    readonly FRONTEND_URL: string;
    readonly DATABASE_URL: string;
}

const envImport = (): ImportMetaEnv => {

    const requiredEnvVars = [
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL',
        'DATABASE_URL',
        'FRONTEND_URL',
        'PORT',
        'NODE_ENV'
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
        DATABASE_URL: process.env.DATABASE_URL || ''
    }
}

export const env = envImport();