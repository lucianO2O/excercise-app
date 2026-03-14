import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Exercise } from '@/types'

export const useExerciseStore = defineStore('exercise', () => {
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

  return { exercise, getExercise, addExercise, removeExercise }
})
