<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUsersStore()
const { admin } = storeToRefs(userStore)
</script>

<template>
  <div v-if="admin">
    <table class="table container">
      <thead>
        <tr>
          <th><abbr title="User ID">UID</abbr></th>
          <th>User</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody v-for="user in userStore.users" :key="user.id">
        <tr>
          <th>{{ user.id }}</th>
          <td>{{ user.lastName }}, {{ user.firstName }}</td>
          <td>{{ user.username }}</td>
          <td>
            <a><u>@{{ user.email }}</u></a>
          </td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span class="icon is-small">
              <i class="fas fa-edit"></i>
            </span>
            <span class="icon is-small ml-3">
              <i class="fas fa-circle-minus"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
