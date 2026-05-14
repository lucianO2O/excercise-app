import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Exercise } from '@/types'
import { api, apiPost, apiDelete } from '../services/myFetch'

type ListEnvelope<T> = { data: T[]; isSuccess: boolean; total: number }
type Envelope<T> = { data: T; isSuccess: boolean; message?: string }

export type Stats = {
  distance: number
  duration: number
  calories: number
  pace: number
  count: number
}

export type Page = { list: Exercise[]; total: number }

export const useExerciseStore = defineStore('exercise', () => {

  const exercise = ref<Exercise[]>([])

  const fetchUserPage = async (
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Page> => {
    const res = await api<ListEnvelope<Exercise>>(
      `exercises/user/${userId}?page=${page}&pageSize=${pageSize}`,
    )
    return { list: res.data, total: res.total }
  }

  const fetchFriendsPage = async (
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Page> => {
    const res = await api<ListEnvelope<Exercise>>(
      `exercises/friends/${userId}?page=${page}&pageSize=${pageSize}`,
    )
    return { list: res.data, total: res.total }
  }

  const addExercise = async (newExercise: Omit<Exercise, 'id'>) => {
    try {
      const res = await apiPost<Envelope<Exercise>>('exercises', newExercise)
      if (res.isSuccess) {
        exercise.value.unshift(res.data)
      }
      return res.data
    } catch (err) {
      console.error('Failed to add exercise', err)
      throw err
    }
  }

  const removeExercise = async (exerciseId: number) => {
    try {
      await apiDelete<Envelope<Exercise>>(`exercises/${exerciseId}`)
      exercise.value = exercise.value.filter((ex) => ex.id !== exerciseId)
    } catch (err) {
      console.error('Failed to remove exercise', err)
      throw err
    }
  }

  // stats now come from the server
  const fetchStats = async (
    userId: number,
    from?: string,
    to?: string,
  ): Promise<Stats> => {
    const qs = new URLSearchParams()
    if (from) qs.set('from', from)
    if (to) qs.set('to', to)
    const suffix = qs.toString() ? `?${qs.toString()}` : ''
    const res = await api<Envelope<Stats>>(`exercises/stats/${userId}${suffix}`)
    return res.data
  }

  return {
    exercise,
    addExercise,
    removeExercise,
    fetchUserPage,
    fetchFriendsPage,
    fetchStats,
  }
})
