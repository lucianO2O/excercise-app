<script setup lang="ts">
import { ref } from 'vue'
import ExerciseForm from '@/components/ExerciseForm.vue'
import ExerciseComponent from '@/components/ExerciseComponent.vue';

const show = ref(false)
</script>

<template>
  <main >
    <div class="columns">
      <div class="column container is-centered has-text-centered mt-4 p-5">
        <h1 class="title is-2">Your Activity</h1>
        <p class="subtitle is-5">Find your activity here.</p>

        <hr>

        <div class="columns">
          <div class="column container is-three-quarters">
            <button class="button container has-background-link has-text-link-light is-medium is-rounded" @click="show = true">
              Add Exercise
            </button>
            <div class="columns">
              <div class="column">
                <br>
                <ExerciseComponent :show="show"/>
              </div>
            </div>
          </div>
        </div>

        <ExerciseForm :show="show" @close="show = false" />

      </div>
    </div>
  </main>
</template>

<style scoped></style>
