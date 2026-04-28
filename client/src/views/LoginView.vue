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
  <main class="has-background-link-dark">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">

            <h1 class="title accent-text">Log In</h1>
            <p v-if="error" class="help is-danger mb-4">{{ error }}</p>
            <hr class="accent-hr" />

            <div class="field pb-3">
              <p class="control has-icons-left has-icons-right">
                <input class="input styled-input" type="text" placeholder="Email/Username" v-model="identifier" />
                <span class="icon is-small is-left accent-text"><i class="fas fa-envelope"></i></span>
                <span class="icon is-small is-right accent-text"><i class="fas fa-check"></i></span>
              </p>
            </div>

            <div class="field pb-3">
              <p class="control has-icons-left has-icons-right">
                <input class="input styled-input" type="password" placeholder="Password" v-model="password" />
                <span class="icon is-small is-left accent-text"><i class="fas fa-lock"></i></span>
                <span class="icon is-small is-right accent-text"><i class="fas fa-check"></i></span>
              </p>
            </div>

            <button class="button accent-btn" @click="handleLogin">Enter</button>

            <p class="is-size-7 mt-5 muted-text">hint, try "admin" and "adminpass"</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.accent-text { color: #ffe08a; }
.muted-text  { color: #9aabb8; }

.accent-hr {
  background-color: #ffe08a;
  height: 2px;
  border: none;
  margin: 0.75rem 0 1.5rem;
}

.styled-input {
  background-color: #0d1f38;
  border-color: #1a3a5c;
  color: #e8e8e8;
}
.styled-input::placeholder { color: #9aabb8; }
.styled-input:focus {
  border-color: #ffe08a !important;
  box-shadow: 0 0 0 0.125em rgba(255, 224, 138, 0.25) !important;
}

.accent-btn {
  background-color: #ffe08a;
  border-color: transparent;
  color: #0d1f38;
  font-weight: bold;
}
.accent-btn:hover {
  background-color: #ffd257;
  color: #0d1f38;
}
</style>
