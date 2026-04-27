export { DataEnvelope, DataListEnvelope, PagingRequest } from "./dataEnvelopes"

export type UserRole = "admin" | "moderator" | "user"

export type User = {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    role: UserRole
}

// written to user table except id and timestamps
export const userKeys: (keyof User)[] = [
    "username",
    "firstName",
    "lastName",
    "email",
    "password",
    "phone",
    "role",
]

export type ExerciseType =
    | "running"
    | "cycling"
    | "swimming"
    | "weightlifting"
    | "yoga"
    | "other"
    | "none"

export type Exercise = {
    id: number
    userId: number
    title: string
    exerciseType: ExerciseType
    date: string
    duration: number
    calories: number
    description: string
    pace?: number
    distance?: number
    picture?: string
    location?: string
}

// written to exervise table
export const exerciseKeys: (keyof Exercise)[] = [
    "userId",
    "title",
    "exerciseType",
    "date",
    "duration",
    "calories",
    "description",
    "pace",
    "distance",
    "picture",
    "location",
]
