import express, { Application } from "express"
import cors from "cors"
import { indexRoutes } from "./app/routes"
import { notFound } from "./app/middleware/notFound"
import { globalErrorHandler } from "./app/middleware/globalError"

const app: Application = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))
app.use('/api/v1', indexRoutes)
app.use(notFound)
app.use(globalErrorHandler)

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Welcome to HealthNova API")
})

export default app;