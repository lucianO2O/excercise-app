<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (await auth.register(username.value, email.value, password.value, firstName.value, lastName.value)) {
    router.push('/activity')
  } else {
    error.value = 'Registration failed'
  }
}
</script>

<template>
  <main class="has-background-link-10">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">

            <h1 class="title has-text-warning-light">Create Account</h1>
            <p v-if="error" class="help is-danger mb-4">{{ error }}</p>
            <hr class="has-background-warning-light" />

            <div class="field pb-3">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Username" v-model="username" />
                <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-user"></i></span>
              </p>
            </div>

            <div class="columns is-mobile pb-1">
              <div class="column pr-1">
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="First Name" v-model="firstName" />
                    <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-id-card"></i></span>
                  </p>
                </div>
              </div>
              <div class="column pl-1">
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Last Name" v-model="lastName" />
                    <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-id-card"></i></span>
                  </p>
                </div>
              </div>
            </div>

            <div class="field pb-3">
              <p class="control has-icons-left">
                <input class="input" type="email" placeholder="Email" v-model="email" />
                <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-envelope"></i></span>
              </p>
            </div>

            <div class="field pb-3">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="password" />
                <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-lock"></i></span>
              </p>
            </div>

            <div class="field pb-3">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Confirm Password" v-model="confirmPassword" />
                <span class="icon is-small is-left has-text-warning-light"><i class="fas fa-lock"></i></span>
              </p>
            </div>

            <button class="button is-warning" @click="handleRegister">Register</button>

          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>
