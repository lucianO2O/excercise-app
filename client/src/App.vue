<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
    <div class="container">
      <RouterView />
    </div>
  </header>

</template>

<style scoped></style>
