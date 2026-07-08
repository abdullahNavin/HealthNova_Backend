import { JwtPayload, SignOptions } from "jsonwebtoken";
import { createToken } from "./jwt";
import { env } from "../../config/env";

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

export { getAccessToken, getRefreshToken }