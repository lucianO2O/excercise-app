<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useExerciseStore, type Stats } from '@/stores/exerciseStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const userStore = useUsersStore()
const { user } = storeToRefs(userStore)
const exerciseStore = useExerciseStore()

const today = new Date().toISOString().split('T')[0]
const weekStart = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

const emptyStats: Stats = { distance: 0, duration: 0, calories: 0, pace: 0, count: 0 }
const todayStats = ref<Stats>(emptyStats)
const thisWeekStats = ref<Stats>(emptyStats)
const allTimeStats = ref<Stats>(emptyStats)

const loadStats = async (uid: number) => {
  const [today_, week_, all_] = await Promise.all([
    exerciseStore.fetchStats(uid, today, today),
    exerciseStore.fetchStats(uid, weekStart),
    exerciseStore.fetchStats(uid),
  ])
  todayStats.value = today_
  thisWeekStats.value = week_
  allTimeStats.value = all_
}

watch(
  () => user.value?.id,
  (uid) => {
    if (uid) loadStats(uid)
  },
  { immediate: true },
)
</script>

<template>
  <main class="has-background-info-10">
    <div class="container p-5" v-if="user">
      <h1 class="title is-1 has-text-centered has-text-warning-light">Statistics</h1>
      <p class="subtitle has-text-centered has-text-warning-light">Welcome, {{ user.firstName }}</p>
      <hr class="has-background-warning-40" />

      <div class="columns">
        <div class="column box has-text-centered m-3 has-background-info-15">
          <h1 class="title is-5">Today</h1>
          <div class="columns is-multiline">
            <div class="column is-half">
              <p class="heading">Distance</p>
              <p class="title is-4 has-text-success">{{ todayStats.distance }} mi</p>
            </div>
            <div class="column is-half">
              <p class="heading">Duration</p>
              <p class="title is-4 has-text-success">{{ todayStats.duration }} min</p>
            </div>
            <div class="column is-half">
              <p class="heading">Avg Pace</p>
              <p class="title is-4 has-text-success">{{ todayStats.pace.toFixed(1) }} m/hr</p>
            </div>
            <div class="column is-half">
              <p class="heading">Calories</p>
              <p class="title is-4 has-text-success">{{ todayStats.calories }}</p>
            </div>
          </div>
        </div>

        <div class="column box has-text-centered m-3 has-background-info-15">
          <h1 class="title is-5">Last 7 Days</h1>
          <div class="columns is-multiline">
            <div class="column is-half">
              <p class="heading">Distance</p>
              <p class="title is-4 has-text-success">{{ thisWeekStats.distance }} mi</p>
            </div>
            <div class="column is-half">
              <p class="heading">Duration</p>
              <p class="title is-4 has-text-success">{{ thisWeekStats.duration }} min</p>
            </div>
            <div class="column is-half">
              <p class="heading">Avg Pace</p>
              <p class="title is-4 has-text-success">{{ thisWeekStats.pace.toFixed(1) }} m/hr</p>
            </div>
            <div class="column is-half">
              <p class="heading">Calories</p>
              <p class="title is-4 has-text-success">{{ thisWeekStats.calories }}</p>
            </div>
          </div>
        </div>

        <div class="column box has-text-centered m-3 has-background-info-15">
          <h1 class="title is-5">All Time</h1>
          <div class="columns is-multiline">
            <div class="column is-half">
              <p class="heading">Distance</p>
              <p class="title is-4 has-text-success">{{ allTimeStats.distance }} mi</p>
            </div>
            <div class="column is-half">
              <p class="heading">Duration</p>
              <p class="title is-4 has-text-success">{{ allTimeStats.duration }} min</p>
            </div>
            <div class="column is-half">
              <p class="heading">Avg Pace</p>
              <p class="title is-4 has-text-success">{{ allTimeStats.pace.toFixed(1) }} m/hr</p>
            </div>
            <div class="column is-half">
              <p class="heading">Calories</p>
              <p class="title is-4 has-text-success">{{ allTimeStats.calories }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="has-text-centered mt-6">
      <p>Please log in to view your statistics.</p>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
}
</style>
