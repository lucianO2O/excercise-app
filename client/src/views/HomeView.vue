<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <main>
    <section class="hero is-fullheight-with-navbar has-background-info-10">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title is-1 mb-2 has-text-warning-light">
            ChudWalker
          </p>
          <p class="subtitle is-4 mb-6 has-text-warning-light">Track your workouts. Stay consistent. Crush your goals.</p>

          <div class="columns is-centered mb-6">
            <div class="column is-2 has-text-centered has-text-warning-light">
              <span class="icon is-large mb-2"><i class="fas fa-chart-line fa-2x"></i></span>
              <p class="is-size-6">Track Progress</p>
            </div>
            <div class="column is-2 has-text-centered has-text-warning-light">
              <span class="icon is-large mb-2"><i class="fas fa-users fa-2x"></i></span>
              <p class="is-size-6">See Friends' Activity</p>
            </div>
            <div class="column is-2 has-text-centered has-text-warning-light">
              <span class="icon is-large mb-2"><i class="fas fa-fire fa-2x"></i></span>
              <p class="is-size-6">Log Calories & Stats</p>
            </div>
          </div>

          <div class="buttons is-centered">
            <RouterLink to="/register" class="button has-background-info-30 is-medium">
              Get Started
            </RouterLink>
            <RouterLink to="/login" class="button is-info is-outlined is-medium">
              Log In
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>
