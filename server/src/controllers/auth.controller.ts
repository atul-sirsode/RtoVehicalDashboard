import { Request, Response, NextFunction } from "express"
import { proxyRequest } from "../services/proxy.service"
import { env } from "../config/env"

import {
    LoginDetails,
    LoginOTPResponse, VerifyOtp, VerifyOTPResponse
} from "../types/auth.types"

export async function login(
    req: Request<{}, {}, LoginDetails>,
    res: Response<LoginOTPResponse>,
    next: NextFunction
) {
    try {
        console.log("requestBody", req.body)

        const requestHeaders = {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        }

        const data = await proxyRequest<LoginOTPResponse>({
            url: `${env.API_BASE}/${env.LOGIN_OTP_URL}`,
            method: "POST",
            data: req.body,
            headers: requestHeaders
        })

        res.json(data)
    } catch (err) {
        next(err)
    }
}



export async function VerifyLogin(
    req: Request<{}, {}, VerifyOtp>,
    res: Response<VerifyOTPResponse>,
    next: NextFunction
) {
    try {
        console.log("requestBody", req.body)

        const requestHeaders = {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        }

        const data = await proxyRequest<VerifyOTPResponse>({
            url: `${env.API_BASE}/${env.VERIFY_OTP_URL}`,
            method: "POST",
            data: req.body,
            headers: requestHeaders
        })

        res.json(data)
    } catch (err) {
        next(err)
    }
}