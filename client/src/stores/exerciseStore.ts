import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Exercise } from '@/types'
import { api } from '../services/myFetch'

export const useExerciseStore = defineStore('exercise', () => {
  api<Exercise[]>('exercises').then((data) => {
    console.log('Fetched exercises:', data)
    exercise.value = data
  })
  
  const stored = localStorage.getItem('exercises')
  const exercise = ref<Exercise[]>(stored ? JSON.parse(stored) : [])

  watch(exercise, (newVal) => {
    localStorage.setItem('exercises', JSON.stringify(newVal))
  }, { deep: true })

  const getExercise = computed(() => exercise.value)

  const addExercise = (newExercise: Exercise) => {
    exercise.value.push(newExercise)
  }

  const removeExercise = (exerciseId: number) => {
    exercise.value = exercise.value.filter(ex => ex.id !== exerciseId)
  }

  const sumStats = (exercises: Exercise[]) => ({
    distance: exercises.reduce((sum, ex) => sum + Number(ex.distance ?? 0), 0),
    duration: exercises.reduce((sum, ex) => sum + Number(ex.duration), 0),
    calories: exercises.reduce((sum, ex) => sum + Number(ex.calories), 0),
    pace: exercises.reduce((sum, ex) => sum + Number(ex.pace ?? 0), 0)
    / exercises.length
  })

  const getStats = (userId: number, from?: string, to?: string) => {
    const filtered = exercise.value.filter(ex => {
      if (ex.userId !== userId) return false
      if (from && ex.date < from) return false
      if (to && ex.date > to) return false
      return true
    })
    return sumStats(filtered)
  }

  return { exercise, getExercise, addExercise, removeExercise, getStats }
})
