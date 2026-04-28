<script setup lang="ts">
import ExerciseForm from '@/components/ExerciseForm.vue'
import ExerciseComponent from '@/components/ExerciseComponent.vue';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const userStore = useUsersStore()
const { user } = storeToRefs(userStore)

const exerciseStore = useExerciseStore()

const show = ref(false)
</script>

<template>
  <main class="has-background-link-dark">
    <div class="columns">
      <div class="column container is-centered has-text-centered  mt-4 p-5">
        <h1 class="title is-1 has-text-warning-light">Your Activity</h1>
        <p class="subtitle is-5 has-text-warning-light">Find your activity here.</p>

        <hr class="has-background-warning-40"/>

        <div class="columns">
          <div class="column container is-three-quarters">
            <button class="button container has-background-warning-40 has-text-warning-light is-medium is-rounded" @click="show = true">
              Add Exercise
            </button>
            <div class="columns">
              <div class="column">
                <br>
                <ExerciseComponent v-for="exercise in exerciseStore.exercise.filter(ex => ex.userId === user?.id)"
                  :key="exercise.id" :exercise="exercise" :showDelete="true"/>
              </div>
            </div>
          </div>
        </div>

        <ExerciseForm :show="show" @close="show = false" />

      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
