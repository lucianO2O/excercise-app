<script setup lang="ts">
import ExerciseComponent from '@/components/ExerciseComponent.vue';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';

const exerciseStore = useExerciseStore()

const userStore = useUsersStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <main class="has-background-link-dark">
  <div v-if="user">
    <div class="columns">
      <div class="column container is-centered has-text-centered mt-4 p-5">
        <h1 class="title is-1 has-text-warning-light">Friend's Activity</h1>
        <p class="subtitle is-5 has-text-warning-light">Find your activity and friend's activity here.</p>

        <hr class="has-background-warning-40" />

        <div class="columns">
          <div class="column container is-three-quarters">
            <ExerciseComponent v-for="exercise in exerciseStore.exercise.filter(ex => ex.userId !== user?.id)"
              :key="exercise.id" :exercise="exercise" :showDelete="false" />
          </div>
        </div>

      </div>
    </div>
  </div>
  </main>
</template>

<style scoped>
</style>
