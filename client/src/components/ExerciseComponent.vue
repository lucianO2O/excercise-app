<script setup lang="ts">
import { useExerciseStore } from '@/stores/exerciseStore';
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';

const exercises = useExerciseStore()
const users = useUsersStore()

// const isActive = ref(false)
</script>

<template>
  <div v-for="user in users.users" :key="user.id">
    <article class="media box" v-if="exercises.exercise.some(ex => ex.userId === user.id)">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content" v-for="exercise in exercises.exercise.filter(ex => ex.userId === user.id)" :key="exercise.id">
        <div class="content">
          <div>
            <p>
              <strong class="mx-5">{{ user.firstName }} {{ user.lastName }}</strong>
              <a><u>@{{ user.username }}</u></a>
              <small>{{ exercise.date }}</small>
            </p>
            <br/>

            <h4 class="title is-3">{{ exercise.title }}</h4>

            <p>{{ exercise.description }} - {{ exercise.location }}</p>
            <br>

            <h4 class="title is-3">{{ exercise.calories }}</h4>
            <h6 class="subtitle is-6">Calories Burned</h6>

            <div v-if="exercise.exerciseType === 'running' || exercise.exerciseType === 'swimming' || exercise.exerciseType === 'cycling'">
              <br>
              <h4 class="title is-3">{{ exercise.pace }} m/hr</h4>
              <h6 class="subtitle is-6">Pace</h6>

              <h4 class="title is-3">{{ exercise.distance }} m</h4>
              <h6 class="subtitle is-6">Distance</h6>
            </div>
            <br>

            <p>{{ exercise.duration }} minutes</p>

          </div>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <button class="delete"></button>
      </div>
    </article>
  </div>
</template>

<style scoped></style>
