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

export type Exercise = {
  id: number
  title: string
  exerciseType: ExerciseType
  date: string
  duration: number
  calories: number
  description: string
  pace?: number
  distance?: number
  userId: User['id']
  picture?: string
  location?: string
}

export type ExerciseType = 'running' | 'cycling' | 'swimming' | 'weightlifting' | 'yoga' | 'other' | 'none'

