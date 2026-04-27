<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'

const router = useRouter()
const usersStore = useUsersStore()

if (usersStore.user) {
  router.replace('/activity')
}
</script>

<template>
  <main>
    <h1 class="title is-4 mt-4">Welcome to the Home Page!</h1>
  </main>
</template>
