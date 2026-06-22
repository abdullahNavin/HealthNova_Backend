import { Response } from "express";

interface IResponseData<T> {
    status: number;
    message: string;
    data?: T;
}
export const sendResponse = <T>(res: Response, responseData: IResponseData<T>) => {
    const { status, message, data } = responseData;
    return res.status(status).json({ message, data });
}