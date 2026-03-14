export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  role: string
  exercises?: Exercise[]
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

export type Exercise = {
  id: number
  title: string
  date: string
  duration: number
  userId: User['id']
  picture: string
  location: string
  exerciseType: string
}
