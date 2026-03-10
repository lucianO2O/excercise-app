<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isActive = ref(false);
</script>

<template>
  <nav class="navbar has-background-link-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item " to="/">
        <img src="./images/chud-walker-logo.png" alt="Logo">
      </RouterLink>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="isActive = !isActive"
        :class="{ 'is-active': isActive }" data-target="navbar-menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <RouterLink class="navbar-item has-icons-left is-active" to="/activity">
          <span class="icon is-small">
            <i class="fas fa-person-running"></i>
          </span>
          Activity
        </RouterLink>
      </div>

      <div class="navbar-end">
        <RouterLink class="navbar-item" to="/">
          Home
        </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Registration
          </a>

          <div class="navbar-dropdown">
            <RouterLink class="navbar-item" to="/login">
              Log-in
            </RouterLink>
            <RouterLink class="navbar-item" to="/register">
              Register
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand .navbar-item img {
  height: 3.25rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}
</style>
