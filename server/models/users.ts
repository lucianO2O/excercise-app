import { userKeys, type User } from "../types"
import data1 from "../data/users.json"
import { PagingRequest } from "../types/dataEnvelopes"
import { connect, filterKeys, toCamelCase, toSnakeCase } from "./supabase"

const TABLE_NAME = "users"

type ItemType = User
const data = {
    ...data1,
    items: data1.users,
}

export async function getAll(params: PagingRequest) {
    const db = connect()
    let query = db.from(TABLE_NAME).select("*", { count: "estimated" })

    if (params?.search) {
        const search = params.search.toLowerCase()
        query = query.or(
            `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,username.ilike.%${search}%`,
        )
    }
    if (params?.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 50
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
        const error = { status: 404, message: "User not found" }
        throw error
    }
    return toCamelCase(result.data) as ItemType
}

export async function create(user: ItemType): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .insert(toSnakeCase(filterKeys(user, userKeys)))
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function update(
    id: number,
    user: Partial<ItemType>,
): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .update(toSnakeCase(filterKeys(user as ItemType, userKeys)))
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

export async function login(
    identifier: string,
    password: string,
): Promise<ItemType | null> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .select("*")
        .or(`username.eq.${identifier},email.eq.${identifier}`)
        .eq("password", password)
        .maybeSingle()
    if (result.error) {
        throw result.error
    }
    if (!result.data) {
        return null
    }
    return toCamelCase(result.data) as ItemType
}

export async function seed() {
    const db = connect()
    const items = data.items.map((item) =>
        toSnakeCase({
            username: item.username,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            password: item.password,
            phone: item.phone,
            role: item.role,
        }),
    )
    const result = await db.from(TABLE_NAME).insert(items)
    if (result.error) {
        throw result.error
    }
    return result.count
}
