import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Exercise } from '@/types'
import { api, apiPost, apiDelete } from '../services/myFetch'

type ListEnvelope<T> = { data: T[]; isSuccess: boolean; total: number }
type Envelope<T> = { data: T; isSuccess: boolean; message?: string }

export const useExerciseStore = defineStore('exercise', () => {
  const exercise = ref<Exercise[]>([])

  const loadAll = async () => {
    try {
      const res = await api<ListEnvelope<Exercise>>('exercises')
      exercise.value = res.data
    } catch (err) {
      console.error('Failed to load exercises', err)
    }
  }

  // Kick off the initial fetch when the store is first used.
  loadAll()

  const getExercise = computed(() => exercise.value)

  const addExercise = async (newExercise: Omit<Exercise, 'id'>) => {
    try {
      const res = await apiPost<Envelope<Exercise>>('exercises', newExercise)
      if (res.isSuccess) {
        exercise.value.push(res.data)
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

  const sumStats = (exercises: Exercise[]) => ({
    distance: exercises.reduce((sum, ex) => sum + Number(ex.distance ?? 0), 0),
    duration: exercises.reduce((sum, ex) => sum + Number(ex.duration), 0),
    calories: exercises.reduce((sum, ex) => sum + Number(ex.calories), 0),
    pace:
      exercises.length === 0
        ? 0
        : exercises.reduce((sum, ex) => sum + Number(ex.pace ?? 0), 0) /
          exercises.length,
  })

  const getStats = (userId: number, from?: string, to?: string) => {
    const filtered = exercise.value.filter((ex) => {
      if (ex.userId !== userId) return false
      if (from && ex.date < from) return false
      if (to && ex.date > to) return false
      return true
    })
    return sumStats(filtered)
  }

  return {
    exercise,
    getExercise,
    addExercise,
    removeExercise,
    getStats,
    loadAll,
  }
})
