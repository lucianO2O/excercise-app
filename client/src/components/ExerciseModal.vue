<script setup lang="ts">
// import { ref } from 'vue'

</script>

<template>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <h1 class="title is-5">Create New Workout</h1>
          <input type="text" class="input" placeholder="Exercise name">
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
          </div>
        </footer>
      </div>
    </div>
</template>

<style scoped>

</style>
