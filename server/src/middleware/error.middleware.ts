import { Request, Response, NextFunction } from "express"

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err)

    res.status(err.response?.status || 500).json({
        message: err.message || "Internal server error"
    })
}