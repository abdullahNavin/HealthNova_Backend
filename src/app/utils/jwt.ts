import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


const createToken = (payload: JwtPayload, secret: string, options: SignOptions) => {
    const token = jwt.sign(payload, secret, options);
    return token;
}

const verifyToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return {
            success: true,
            message: "Token is valid",
            decoded: decoded
        };
    } catch (error) {
        return {
            success: false,
            message: "Invalid token",
            error: error
        }
    }
}

const decodeToken = (token: string) => {
    return jwt.decode(token, { complete: true });
}

export { createToken, verifyToken, decodeToken }