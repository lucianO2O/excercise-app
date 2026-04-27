import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUsersStore } from '@/stores/users'

export const useAuthStore = defineStore('auth', () => {
  const usersStore = useUsersStore()

  const isLoggedIn = computed(() => usersStore.user !== null)
  const isAdmin = computed(() => usersStore.user?.role === 'admin')

  const login = async (
    identifier: string,
    password: string,
  ): Promise<boolean> => {
    const found = await usersStore.login(identifier, password)
    if (found) {
      usersStore.user = found
      return true
    }
    return false
  }

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    const result = await usersStore.register(username, email, password)
    if (result) {
      usersStore.user = result
      return true
    }
    return false
  }

  const logout = () => {
    usersStore.user = null
  }

  return { isLoggedIn, isAdmin, login, register, logout }
})
