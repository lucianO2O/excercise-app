<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore()
const router = useRouter()

const identifier = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  if (await auth.login(identifier.value, password.value)) {
    router.push('/activity')
  } else {
    error.value = 'Invalid email/username or password'
  }
}
</script>

<template>
  <main class="has-background-link-10">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">

            <h1 class="title has-text-warning-light">Log In</h1>
            <p v-if="error" class="help is-danger mb-4">{{ error }}</p>
            <hr class="has-background-warning-light" />

            <div class="field pb-3">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Email/Username" v-model="identifier" />
                <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-envelope"></i></span>
                <span class="icon is-small is-right has-text-warning-light"><i class="fas fa-check"></i></span>
              </p>
            </div>

            <div class="field pb-3">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Password" v-model="password" />
                <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-lock"></i></span>
                <span class="icon is-small is-right has-text-warning-light"><i class="fas fa-check"></i></span>
              </p>
            </div>

            <button class="button is-warning" @click="handleLogin">Enter</button>

            <p class="is-size-7 mt-5 has-text-grey-light">hint, try "admin" and "adminpass"</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>
