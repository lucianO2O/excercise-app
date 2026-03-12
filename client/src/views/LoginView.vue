<script setup lang="ts">
// import { ref } from 'vue'
// import { useUsersStore } from '@/stores/users';

// const users = useUsersStore()
</script>

<template>
  <main>
    <div class="columns is-centered">
      <div class="column container box is-three-quarters mt-6 p-5">
        <div>
          <h1 class="title is-2">Log In</h1>
        </div>
        <br>
        <div class="field pb-3">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email/Username" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field pb-3">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="button is-link is-inverted">
          Enter
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
