import { exerciseKeys, type Exercise } from "../types"
import { PagingRequest } from "../types/dataEnvelopes"
import { connect, filterKeys, toCamelCase, toSnakeCase } from "./supabase"

const TABLE_NAME = "exercises"

type ItemType = Exercise

export type ExerciseQuery = PagingRequest & {
    userId?: number
    notUserId?: number
    from?: string
    to?: string
}

export async function getAll(params: ExerciseQuery) {
    const db = connect()
    let query = db.from(TABLE_NAME).select("*", { count: "estimated" })

    if (params?.userId !== undefined) {
        query = query.eq("user_id", Number(params.userId))
    }
    if (params?.notUserId !== undefined) {
        query = query.neq("user_id", Number(params.notUserId))
    }
    if (params?.from) {
        query = query.gte("date", params.from)
    }
    if (params?.to) {
        query = query.lte("date", params.to)
    }
    if (params?.search) {
        const search = params.search.toLowerCase()
        query = query.or(
            `title.ilike.%${search}%,description.ilike.%${search}%`,
        )
    }
    if (params?.sortBy) {
        // accept camelCase from the client, convert to snake_case for postgres
        const column = params.sortBy.replace(
            /([A-Z])/g,
            (m) => `_${m.toLowerCase()}`,
        )
        query = query.order(column, { ascending: !params.descending })
    } else {
        query = query.order("date", { ascending: false })
    }

    const page = params?.page || 1
    const pageSize = params?.pageSize || 100
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const result = await query
    if (result.error) {
        throw result.error
    }
    const list = result.data.map(toCamelCase) as ItemType[]
    const count = result.count || 0
    return { list, count }
}

export async function get(id: number): Promise<ItemType> {
    const db = connect()
    const result = await db.from(TABLE_NAME).select("*").eq("id", id).single()
    if (result.error) {
        const error = { status: 404, message: "Exercise not found" }
        throw error
    }
    return toCamelCase(result.data) as ItemType
}

export async function create(exercise: ItemType): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .insert(toSnakeCase(filterKeys(exercise, exerciseKeys)))
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function update(
    id: number,
    exercise: Partial<ItemType>,
): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .update(toSnakeCase(filterKeys(exercise as ItemType, exerciseKeys)))
        .eq("id", id)
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function remove(id: number): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .delete()
        .eq("id", id)
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function stats(userId: number, from?: string, to?: string) {
    const { list } = await getAll({ userId, from, to, pageSize: 10000 })

    const distance = list.reduce((s, ex) => s + Number(ex.distance ?? 0), 0)
    const duration = list.reduce((s, ex) => s + Number(ex.duration ?? 0), 0)
    const calories = list.reduce((s, ex) => s + Number(ex.calories ?? 0), 0)
    const paceList = list.filter((ex) => ex.pace !== null && ex.pace !== undefined)
    const pace =
        paceList.length === 0
            ? 0
            : paceList.reduce((s, ex) => s + Number(ex.pace ?? 0), 0) /
              paceList.length

    return { distance, duration, calories, pace, count: list.length }
}
