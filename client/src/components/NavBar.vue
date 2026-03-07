<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar has-background-link-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="" alt="Logo">
      </RouterLink>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
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

<style scoped></style>