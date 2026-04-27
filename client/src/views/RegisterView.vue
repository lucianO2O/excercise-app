<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (await auth.register(username.value, email.value, password.value)) {
    router.push('/activity')
  } else {
    error.value = 'Registration failed'
  }
}
</script>

<template>
  <main>
    <div class="columns is-centered">
      <div class="column container box is-three-quarters mt-6 p-5">

        <h1 class="title is-2">Register</h1>
        <br>
        <p v-if="error" class="help is-danger mb-4">{{ error }}</p>

        <div class="field pb-3">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Username" v-model="username"/>
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>

        <div class="field pb-3">
          <p class="control has-icons-left">
            <input class="input" type="email" placeholder="Email" v-model="email"/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>

        <div class="field pb-3">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" v-model="password"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div class="field pb-3">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Confirm Password" v-model="confirmPassword"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div class="button is-link is-inverted" @click="handleRegister">
          Register
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
