import data from '../data/users.json'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref(data.users)
  const user = ref<User | null>(null)

  const admin = computed(() => user.value?.username === 'admin' ? user.value : null)

  const authUser = (identifier: string, password: string): User | null => {
    const found = users.value.find(
      (user) => (user.username === identifier || user.email === identifier) && user.password === password
    )
    return found || null // return found user or null if not found
  }

  return { users, user, admin, authUser }
})
