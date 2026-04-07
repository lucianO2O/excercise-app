import express from "express"
import usersController from "./controllers/users"
import { DataEnvelope } from "./types"

const PORT = 3000
const SERVER = "localhost"

const app = express()

///////// Middleware
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE") // Allow specific HTTP methods
    res.setHeader("Access-Control-Allow-Headers", "*") // Allow specific headers
    next()
}).use(express.json()) // Middleware to parse JSON request bodies

///////// Routes
app.get("/", (_req, res) => {
    res.send("Hello World!")
})
    .get("/suny", (_req, res) => {
        res.send("The best plan of my life!")
    })
    .use("/api/v1/users", usersController)

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

        res.status((err as any).status ?? 500).send(response)
    },
)

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})

console.log("Listening for requests...")