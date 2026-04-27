import { defineStore } from 'pinia'
import type { User } from '@/types'
import { api, apiPost } from '../services/myFetch'
import { computed, ref } from 'vue'

type ListEnvelope<T> = { data: T[]; isSuccess: boolean; total: number }
type Envelope<T> = { data: T; isSuccess: boolean; message?: string }

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const user = ref<User | null>(null)

  const loadAll = async () => {
    try {
      const response = await api<ListEnvelope<User>>('users')
      users.value = response.data
    } catch (error) {
      console.error('Failed to load users', error)
    }
  }
  loadAll()

  const admin = computed(() =>
    user.value?.role === 'admin' ? user.value : null,
  )

  const login = async (
    identifier: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const res = await apiPost<Envelope<User>>('users/login', {
        identifier,
        password,
      })
      if (res.isSuccess && res.data) {
        return res.data
      }
      return null
    } catch (err) {
      console.error('Login failed', err)
      return null
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const res = await apiPost<Envelope<User>>('users/register', {
        username,
        email,
        password,
      })
      if (res.isSuccess && res.data) {
        return res.data
      }
      return null
    } catch (err) {
      console.error('Registration failed', err)
      return null
    }
  }

  return { users, user, admin, login, register, loadAll }
})
