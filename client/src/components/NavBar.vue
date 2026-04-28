<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../stores/users'
import { useAuthStore } from '@/stores/authStore';

const usersStore = useUsersStore()
const { user, admin } = storeToRefs(usersStore)

const auth = useAuthStore()

const isActive = ref(false);
</script>

<template>
  <nav class="navbar has-background-info-20" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item " to="/">
        <img src="./images/chud-walker-logo.png" alt="Logo">
      </RouterLink>
      <RouterLink v-if="user" class="navbar-item has-icons-left has-text-warning-light px-4" to="/activity">
        <span class="icon is-small mr-1">
          <i class="fas fa-person-running"></i>
        </span>
        My Activity
      </RouterLink>

      <RouterLink v-if="user" class="navbar-item has-icons-left has-text-warning-light px-4" to="/statistics">
        <span class="icon is-small mr-1">
          <i class="fas fa-chart-line"></i>
        </span>
        Statistics
      </RouterLink>

      <RouterLink v-if="user" class="navbar-item has-icons-left has-text-warning-light px-4" to="/friends">
        <span class="icon is-small mr-1">
          <i class="fas fa-users"></i>
        </span>
        Friends Activity
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
        <div v-if="admin" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link has-text-warning-light" style="padding-left: 1rem; padding-right: 2.5rem;">
            <span class="icon is-small mr-1"><i class="fas fa-user-shield"></i></span>
            Admin
          </a>
          <div class="navbar-dropdown">
            <RouterLink class="navbar-item has-text-warning-light" to="/users">
              Users
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <RouterLink class="navbar-item has-text-warning-light px-4" to="/login" v-show="user || admin" @click="auth.logout">
          Log Out
        </RouterLink>

        <RouterLink class="navbar-item has-text-warning-light px-4" to="/">
          Home
        </RouterLink>

        <div v-if="!user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link has-text-warning-light">
            Registration
          </a>

          <div class="navbar-dropdown">
            <RouterLink class="navbar-item has-text-warning-light" to="/login">
              Log-in
            </RouterLink>
            <RouterLink class="navbar-item has-text-warning-light" to="/register">
              Register
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand .navbar-item:first-child {
  padding: 0.4rem 0.25rem 0.4rem 0.5rem;
}
.navbar-brand .navbar-item:first-child img {
  max-height: 100%;
  height: 3.7rem;
}
</style>
