<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore()
const router = useRouter()

const identifier = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (auth.login(identifier.value, password.value)) {
    router.push('/activity')
  } else {
    error.value = 'Invalid email/username or password'
  }
}
</script>

<template>
  <main>
    <div class="columns is-centered">
      <div class="column container box is-three-quarters mt-6 p-5">

        <h1 class="title is-2">Log In</h1>

        <br>

        <p v-if="error" class="help is-danger mb-4">{{ error }}</p>
        <div class="field pb-3">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Email/Username" v-model="identifier"/>
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
            <input class="input" type="password" placeholder="Password" v-model="password"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>

        <div class="button is-link is-inverted" @click="handleLogin">
          Enter
        </div>

        <div class="subtitle is-7 mt-5">hint, try "admin" and "adminpass"</div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
