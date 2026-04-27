import { Router } from "express"
import { getAll, get, create, update, remove, login, seed } from "../models/users"
import { User, DataEnvelope, DataListEnvelope } from "../types"

const app = Router()

function sanitize(u: User): User {
    return { ...u, password: "" }
}

app.get("/", async (req, res, next) => {
    try {
        const { list, count } = await getAll(req.query)
        const sanitized = list.map(sanitize)
        const response: DataListEnvelope<User> = {
            data: sanitized,
            isSuccess: true,
            total: count,
        }
        res.send(response)
    } catch (err) {
        next(err)
    }
})
    .get("/count", async (req, res, next) => {
        try {
            const { count } = await getAll(req.query)
            const response: DataEnvelope<{ count: number }> = {
                data: { count },
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .post("/login", async (req, res, next) => {
        try {
            const { identifier, password } = req.body
            const user = await login(identifier, password)
            if (!user) {
                const response: DataEnvelope<null> = {
                    data: null,
                    isSuccess: false,
                    message: "Invalid username/email or password",
                }
                res.status(401).send(response)
                return
            }
            const response: DataEnvelope<User> = {
                data: sanitize(user),
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .post("/seed", async (_req, res, next) => {
        try {
            const count = await seed()
            const response: DataEnvelope<number | null> = {
                data: count,
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const { id } = req.params
            const user = await get(Number(id))
            const response: DataEnvelope<User> = {
                data: sanitize(user),
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .post("/register", async (req, res, next) => {
        try {
            const { username, email, password, firstName, lastName } = req.body
            const newUser = await create({
                username,
                email,
                password,
                firstName: firstName || "",
                lastName: lastName || "",
                phone: "",
                role: "user",
            } as User)
            const response: DataEnvelope<User> = {
                data: sanitize(newUser),
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .post("/", async (req, res, next) => {
        try {
            const newUser = await create(req.body)
            const response: DataEnvelope<User> = {
                data: sanitize(newUser),
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .patch("/:id", async (req, res, next) => {
        try {
            const { id } = req.params
            const updatedUser = await update(Number(id), req.body)
            const response: DataEnvelope<User> = {
                data: sanitize(updatedUser),
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .delete("/:id", async (req, res, next) => {
        try {
            const { id } = req.params
            const removedUser = await remove(Number(id))
            const response: DataEnvelope<User> = {
                data: sanitize(removedUser),
                isSuccess: true,
                message: `User ${removedUser.firstName} ${removedUser.lastName} has been removed.`,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })

export default app
