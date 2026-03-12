import data from '../data/users.json'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref(data.users)

  return { users }
})
