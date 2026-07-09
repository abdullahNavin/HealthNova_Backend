import { JwtPayload, SignOptions } from "jsonwebtoken";
import { createToken } from "./jwt";
import { env } from "../../config/env";
import { Response } from "express";
import { setCookie } from "./cookies";
import ms from "ms";

const getAccessToken = (payload: JwtPayload) => {
    const accessToken = createToken(payload, env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_EXPIRATION } as SignOptions
    );
    return accessToken;
}

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = createToken(payload, env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TOKEN_EXPIRATION } as SignOptions
    );
    return refreshToken;
}

const setAccessToken = (res: Response, token: string) => {
    setCookie(res, "accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: Number(ms(Number(env.ACCESS_TOKEN_EXPIRATION)))
    })
}

const setRefreshToken = (res: Response, token: string) => {
    setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: Number(ms(Number(env.REFRESH_TOKEN_EXPIRATION)))
    })
}

const setBetterAuthToken = (res: Response, token: string) => {
    setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: Number(ms(Number(env.BETTER_AUTH_TOKEN_EXPIRATION)))
    })
}

export { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setBetterAuthToken }