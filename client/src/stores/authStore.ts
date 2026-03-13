import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUsersStore } from '@/stores/users'

export const useAuthStore = defineStore('auth', () => {
  const usersStore = useUsersStore()

  const isLoggedIn = computed(() => usersStore.user !== null)
  const isAdmin = computed(() => usersStore.user?.username === 'admin')

  const login = (identifier: string, password: string): boolean => {
    const found = usersStore.authUser(identifier, password)
    if (found) {
      usersStore.user = found
      return true
    }
    return false
  }

  const logout = () => {
    usersStore.user = null
  }

  return { isLoggedIn, isAdmin, login, logout }
})