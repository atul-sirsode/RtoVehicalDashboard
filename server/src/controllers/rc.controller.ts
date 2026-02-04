import { Request, Response, NextFunction } from "express"
import { proxyRequest } from "../services/proxy.service"
import { env } from "../config/env"
import {
    RcDetails,
    RCApiResponse
} from "../types/auth.types"


export async function fetchRC(
    req: Request<{}, {}, RcDetails>,
    res: Response<RCApiResponse>,
    next: NextFunction
) {
    try {
        console.log("requestBody", req.body)
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Missing Authorization header",
                statuscode: 401
            } as any)
        }

        const requestHeaders = {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            Authorization: authHeader
        }

        const data = await proxyRequest<RCApiResponse>({
            url: `${env.API_BASE}/${env.RC_DETAILS_URL}`,
            method: "POST",
            data: req.body,
            headers: requestHeaders
        })
        console.log("Response Data",data);
        res.json(data)
    } catch (err) {
        next(err)
    }
}
