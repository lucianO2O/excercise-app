<script setup lang="ts">
import { useExerciseStore } from '@/stores/exerciseStore';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';

const exercises = useExerciseStore()
const users = useUsersStore()
const { user } = storeToRefs(users)

</script>

<template>
  <div v-if="user">
    <article class="media box" v-for="exercise in exercises.exercise.filter(ex => ex.userId === user?.id)"
      :key="exercise.id">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content" >
        <div class="content">
          <div>
            <p>
              <strong>{{ user.firstName }} {{ user.lastName }}</strong>
              <a class="mx-5"><u>@{{ user.username }}</u></a>
              <small>{{ exercise.date }}</small>
            </p>

            <h4 class="title is-3">{{ exercise.title }} - {{ exercise.duration }} minutes</h4>

            <p>{{ exercise.description }}</p>

            <h4 class="title is-3">{{ exercise.calories }}</h4>
            <h6 class="subtitle is-7">Calories Burned</h6>

            <div v-if="exercise.exerciseType === 'running' || exercise.exerciseType === 'swimming' || exercise.exerciseType === 'cycling'">
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
        <button class="delete" @click="exercises.removeExercise(exercise.id)"></button>
      </div>

    </article>
  </div>
</template>

<style scoped></style>
