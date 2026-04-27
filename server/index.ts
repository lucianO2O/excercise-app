import { config } from "dotenv"
config()

import express from "express"
import usersController from "./controllers/users"
import exercisesController from "./controllers/exercises"
import { DataEnvelope } from "./types"

const PORT = process.env.PORT ?? 3000
const SERVER = process.env.SERVER ?? "localhost"
const STATIC_DIR = process.env.STATIC_DIR ?? "client/dist"

const app = express()

///////// Middleware
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
}).use(express.json())

///////// Routes
app.use(express.static(STATIC_DIR))
    .get("/", (_req, res) => {
        res.send("Exercise app server is running.")
    })
    .get("/suny", (_req, res) => {
        res.send("The best plan of my life!")
    })
    .use("/api/v1/users", usersController)
    .use("/api/v1/exercises", exercisesController)

//////// Error handling
app.use(
    (
        err: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(err)

        const response: DataEnvelope<null> = {
            data: null,
            isSuccess: false,
            message: err.message ?? "An error occurred",
        }

        res.status((err as { status?: number }).status ?? 500).send(response)
    },
)

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})

console.log("Listening for requests...")
