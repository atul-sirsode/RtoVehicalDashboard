import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes"
import rcRoutes from "./routes/rc.routes"
import { errorMiddleware } from "./middleware/error.middleware"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes)
app.use("/api/rc", rcRoutes)

app.use(errorMiddleware)