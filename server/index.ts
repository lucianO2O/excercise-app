import express from 'express'
import usersController from "./controllers/users"

const PORT = 3000
const SERVER = "localhost"

const app = express()



app.get('/', (req, res) => {
    res.send('Hello World')
}).get("/suny", (req, res) => {
    res.send("Hello Suny")
}).use("/users", usersController)

app.listen(PORT, () => {
    console.log(`Server is running on http:://${SERVER}:${PORT}`)
})

console.log("Listening for requests ...")