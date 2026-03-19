import express from 'express'

const PORT = 3000
const SERVER = "localhost"

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})
    .get("/suny", (req, res) => {
        res.send("Hello Suny")
    })

app.listen(PORT, () => {
    console.log(`Server is running on http:://${SERVER}:${PORT}`)
})