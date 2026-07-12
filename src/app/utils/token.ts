import { JwtPayload, SignOptions } from "jsonwebtoken";
import { createToken } from "./jwt";
import { env } from "../../config/env";
import { Response } from "express";
import { setCookie } from "./cookies";

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
        // 1 day
        maxAge: 60 * 60 * 24
    })
}

const setRefreshToken = (res: Response, token: string) => {
    setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        // 7 days
        maxAge: 7 * 24 * 60 * 60
    })
}

const setBetterAuthToken = (res: Response, token: string) => {
    setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        // 1 day
        maxAge: 60 * 60 * 24
    })
}

export { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setBetterAuthToken }