export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

export type UserLogin = {
  email: string
  username: string
  password: string
}

export type UserRegister = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}
