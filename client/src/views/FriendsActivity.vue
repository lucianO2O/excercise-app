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
  <div v-if="user">
    <div class="columns">
      <div class="column container is-centered has-text-centered mt-4 p-5">
        <h1 class="title is-2">Friend's Activity</h1>
        <p class="subtitle is-5">Find your activity and friend's activity here.</p>

        <hr>

        <div class="columns">
          <div class="column container is-three-quarters">
            <ExerciseComponent v-for="exercise in exerciseStore.exercise.filter(ex => ex.userId !== user?.id)"
              :key="exercise.id" :exercise="exercise" :showDelete="false" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
