import { Router } from "express"
import {
    getAll,
    get,
    create,
    update,
    remove,
    stats,
} from "../models/exercises"
import { Exercise, DataEnvelope, DataListEnvelope } from "../types"

const app = Router()

app.get("/", async (req, res, next) => {
    try {
        const { list, count } = await getAll(req.query)
        const response: DataListEnvelope<Exercise> = {
            data: list,
            isSuccess: true,
            total: count,
        }
        res.send(response)
    } catch (err) {
        next(err)
    }
})
    .get("/stats/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params
            const { from, to } = req.query as { from?: string; to?: string }
            const result = await stats(Number(userId), from, to)
            const response: DataEnvelope<typeof result> = {
                data: result,
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .get("/user/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params
            const { list, count } = await getAll({
                ...req.query,
                userId: Number(userId),
            })
            const response: DataListEnvelope<Exercise> = {
                data: list,
                isSuccess: true,
                total: count,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .get("/friends/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params
            const { list, count } = await getAll({
                ...req.query,
                notUserId: Number(userId),
            })
            const response: DataListEnvelope<Exercise> = {
                data: list,
                isSuccess: true,
                total: count,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const { id } = req.params
            const response: DataEnvelope<Exercise> = {
                data: await get(Number(id)),
                isSuccess: true,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })
    .post("/", async (req, res, next) => {
        try {
            const newExercise = await create(req.body)
            const response: DataEnvelope<Exercise> = {
                data: newExercise,
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
            const updated = await update(Number(id), req.body)
            const response: DataEnvelope<Exercise> = {
                data: updated,
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
            const removed = await remove(Number(id))
            const response: DataEnvelope<Exercise> = {
                data: removed,
                isSuccess: true,
                message: `Exercise "${removed.title}" has been removed.`,
            }
            res.send(response)
        } catch (err) {
            next(err)
        }
    })

export default app
