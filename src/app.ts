import express, { Application } from "express"
import cors from "cors"
import { prisma } from "./lib/prisma"
import { indexRoutes } from "./app/routes"

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', indexRoutes)

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Welcome to HealthNova API")
})

export default app;