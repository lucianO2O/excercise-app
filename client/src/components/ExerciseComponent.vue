<script setup lang="ts">
import type { Exercise } from '@/types';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useUsersStore } from '@/stores/users';
import { computed } from 'vue';

const props = defineProps<{
  showDelete?: boolean
  exercise: Exercise
}>()

const exerciseStore = useExerciseStore()
const userStore = useUsersStore()

// look up user who creaetd exercise
const exerciseUser = computed(() =>
  userStore.users.find(u => u.id === props.exercise.userId)
)
</script>

<template>
  <article class="media box">
    <figure class="media-left">
      <p class="image is-128x128">
        <img src="./images/chud-walker-logo.png" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <div>
          <p>
            <strong>{{ exerciseUser?.firstName }} {{ exerciseUser?.lastName }}</strong>
            <a class="mx-5"><u>@{{ exerciseUser?.username }}</u></a>
            <small>{{ exercise.date }}</small>
          </p>

          <h4 class="title is-3">{{ exercise.title }} - {{ exercise.exerciseType }} - {{ exercise.duration }} minutes
          </h4>

          <p>{{ exercise.description }}</p>

          <h4 class="title is-3">{{ exercise.calories }}</h4>
          <h6 class="subtitle is-7">Calories Burned</h6>

          <div
            v-if="exercise.exerciseType === 'running' || exercise.exerciseType === 'swimming' || exercise.exerciseType === 'cycling'">
            <div class="columns">
              <div class="column">
                <h4 class="title is-3">{{ exercise.pace }} m/hr</h4>
                <h6 class="subtitle is-7">Pace</h6>
              </div>
              <div class="column">
                <h4 class="title is-3">{{ exercise.distance }} miles</h4>
                <h6 class="subtitle is-7">Distance</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-reply"></i>
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-retweet"></i>
            </span>
          </a>
          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-heart"></i>
            </span>
          </a>
        </div>
      </nav>

    </div>

    <div class="media-right">
      <button class="delete" v-if="props.showDelete" @click="exerciseStore.removeExercise(exercise.id)"></button>
    </div>

  </article>
</template>

<style scoped></style>
