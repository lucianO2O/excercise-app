<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useExerciseStore } from '@/stores/exerciseStore'
import type { Exercise, ExerciseType } from '@/types'

const usersStore = useUsersStore()
const exerciseStore = useExerciseStore()

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: [] }>()

const form = ref<Omit<Exercise, 'id'>>({
  title: '',
  exerciseType: '' as ExerciseType,
  date: '',
  duration: '',
  calories: '',
  pace: '',
  distance: '',
  picture: '',
  location: '',
  userId: usersStore.user!.id
})

const addExercise = () => {
  if (!usersStore.user) return
  if (!form.value.exerciseType) return

  exerciseStore.addExercise({
    ...form.value,
    id: Date.now()
  })
  emit('close')
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': props.show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Workout</p>
        <button class="delete" aria-label="close" @click="emit('close')"></button>
      </header>

      <section class="modal-card-body">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Title" v-model="form.title" />
          <span class="icon is-small is-left">
            <i class="fas fa-edit"></i>
          </span>
        </p>

        <hr>

        <div class="control has-icons-left">
          <select class="button container has-text-left pl-6" v-model="form.exerciseType">
            <option value="" disabled selected hidden>Exercise Type</option>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
            <option value="swimming">Swimming</option>
            <option value="weightlifting">Weightlifting</option>
            <option value="yoga">Yoga</option>
            <option value="other">Other</option>
            <option value="none">None</option>
          </select>
          <span class="icon is-small is-left">
            <i class="fas fa-edit"></i>
          </span>
        </div>

        <div
          v-if="form.exerciseType === 'running' || form.exerciseType === 'cycling' || form.exerciseType === 'swimming'">
          <br>
          <p class="control has-icons-left">
            <input class="input" type="text " placeholder="Pace (m/hr)" v-model="form.pace" />
            <span class="icon is-small is-left">
              <i class="fas fa-tachometer"></i>
            </span>
          </p>
          <br>

          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Distance (m)" v-model="form.distance" />
            <span class="icon is-small is-left">
              <i class="fas fa-route"></i>
            </span>
          </p>
        </div>
        <br>

        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Date" v-model="form.date" />
          <span class="icon is-small is-left">
            <i class="fas fa-calendar"></i>
          </span>
        </p>
        <br>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Duration (minutes)" v-model="form.duration" />
          <span class="icon is-small is-left">
            <i class="fas fa-clock"></i>
          </span>
        </p>
        <br>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Calories burned" v-model="form.calories" />
          <span class="icon is-small is-left">
            <i class="fas fa-fire"></i>
          </span>
        </p>

      </section>

      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success" @click="addExercise">
            Save changes
          </button>
          <button class="button" @click="emit('close')">
            Cancel
          </button>

        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
</style>
