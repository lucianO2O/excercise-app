import { defineStore } from 'pinia'
import type { User } from '@/types'
import { api } from '../services/myFetch'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const user = ref<User | null>(null)

  api<{ data: User[] }>('users').then((response) => {
    users.value = response.data
  }).catch((error) => {
    console.error('Failed to load users', error)
  })

  const admin = computed(() => user.value?.role === 'admin' ? user.value : null)

  const authUser = (identifier: string, password: string): User | null => {
    const found = users.value.find(
      (user) => (user.username === identifier || user.email === identifier) && user.password === password
    )
    return found || null // return user or null if not found
  }

  return { users, user, admin, authUser }
})
