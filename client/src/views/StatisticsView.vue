<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useExerciseStore } from '@/stores/exerciseStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const userStore = useUsersStore()
const { user } = storeToRefs(userStore)
const exerciseStore = useExerciseStore()


const today = new Date().toISOString().split('T')[0]
const weekStart = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

const todayStats = computed(() => exerciseStore.getStats(user.value!.id, today, today))
const thisWeekStats = computed(() => exerciseStore.getStats(user.value!.id, weekStart))
const allTimeStats = computed(() => exerciseStore.getStats(user.value!.id))
</script>

<template>
  <div class="container mt-4 p-5" v-if="user">
    <h1 class="title is-2 has-text-centered">Statistics</h1>
    <p class="subtitle has-text-centered">Welcome, {{ user.firstName }}</p>
    <hr>

    <div class="columns">
      <div class="column box has-text-centered m-3">
        <h1 class="title is-5">Today</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <p class="heading">Distance</p>
            <p class="title is-4">{{ todayStats.distance }} mi</p>
          </div>
          <div class="column is-half">
            <p class="heading">Duration</p>
            <p class="title is-4">{{ todayStats.duration }} min</p>
          </div>
          <div class="column is-half">
            <p class="heading">Avg Pace</p>
            <p class="title is-4">{{ todayStats.pace.toFixed(1) }} m/hr</p>
          </div>
          <div class="column is-half">
            <p class="heading">Calories</p>
            <p class="title is-4">{{ todayStats.calories }}</p>
          </div>
        </div>
      </div>

      <div class="column box has-text-centered m-3">
        <h1 class="title is-5">Last 7 Days</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <p class="heading">Distance</p>
            <p class="title is-4">{{ thisWeekStats.distance }} mi</p>
          </div>
          <div class="column is-half">
            <p class="heading">Duration</p>
            <p class="title is-4">{{ thisWeekStats.duration }} min</p>
          </div>
          <div class="column is-half">
            <p class="heading">Avg Pace</p>
            <p class="title is-4">{{ thisWeekStats.pace.toFixed(1) }} m/hr</p>
          </div>
          <div class="column is-half">
            <p class="heading">Calories</p>
            <p class="title is-4">{{ thisWeekStats.calories }}</p>
          </div>
        </div>
      </div>

      <div class="column box has-text-centered m-3">
        <h1 class="title is-5">All Time</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <p class="heading">Distance</p>
            <p class="title is-4">{{ allTimeStats.distance }} mi</p>
          </div>
          <div class="column is-half">
            <p class="heading">Duration</p>
            <p class="title is-4">{{ allTimeStats.duration }} min</p>
          </div>
          <div class="column is-half">
            <p class="heading">Avg Pace</p>
            <p class="title is-4">{{ allTimeStats.pace.toFixed(1) }} m/hr</p>
          </div>
          <div class="column is-half">
            <p class="heading">Calories</p>
            <p class="title is-4">{{ allTimeStats.calories }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="has-text-centered mt-6">
    <p>Please log in to view your statistics.</p>
  </div>
</template>
