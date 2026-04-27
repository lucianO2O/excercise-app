<script setup lang="ts">
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import type { User } from '@/types';

const userStore = useUsersStore()
const { admin } = storeToRefs(userStore)

const editingId = ref<number | null>(null)
const editedUser = ref<User | null>(null)

const startEdit = (user: User) => {
  editingId.value = user.id
  editedUser.value = { ...user }
}

const saveEdit = () => {
  if (editedUser.value) {
    const index = userStore.users.findIndex(u => u.id === editedUser.value!.id)
    if (index !== -1) {
      userStore.users[index] = editedUser.value
    }
  }
  editingId.value = null
  editedUser.value = null
}

const deleteUser = (id: number) => {
  userStore.users = userStore.users.filter(u => u.id !== id)
}

const cancelEdit = () => {
  editingId.value = null
  editedUser.value = null
}
</script>

<template>
  <div v-if="admin">
    <br>
    <table class="table container                                                        has-background-dark">
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
          <td v-if="editingId !== user.id">{{ user.lastName }}, {{ user.firstName }}</td>
          <td v-else class="is-flex is-gap-2">
            <input class="input is-small" v-model="editedUser!.firstName" type="text" style="width: 45%"/>
            <input class="input is-small" v-model="editedUser!.lastName" type="text" style="width: 45%"/>
          </td>
          <td v-if="editingId !== user.id">{{ user.username }}</td>
          <td v-else><input class="input is-small" v-model="editedUser!.username" type="text"/></td>
          <td v-if="editingId !== user.id">
            <a><u>@{{ user.email }}</u></a>
          </td>
          <td v-else><input class="input is-small" v-model="editedUser!.email" type="text"/></td>
          <td v-if="editingId !== user.id">{{ user.phone }}</td>
          <td v-else><input class="input is-small" v-model="editedUser!.phone" type="text"/></td>
          <td v-if="editingId !== user.id">{{ user.role }}</td>
          <td v-else>
            <select class="select is-small" v-model="editedUser!.role">
              <option>user</option>
              <option>admin</option>
            </select>
          </td>
          <td>
            <span v-if="editingId !== user.id" class="icon is-small is-clickable" @click="startEdit(user)">
              <i class="fas fa-edit"></i>
            </span>
            <span v-else class="icon is-small is-clickable mr-2" @click="saveEdit" style="color: green;">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="editingId !== user.id" class="icon is-small ml-3 is-clickable" @click="deleteUser(user.id)">
              <i class="fas fa-circle-minus"></i>
            </span>
            <span v-else class="icon is-small ml-3 is-clickable" @click="cancelEdit" style="color: red;">
              <i class="fas fa-times"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
  </div>
</template>

<style scoped>
.is-clickable {
  cursor: pointer;
  transition: opacity 0.2s;
}
.is-clickable:hover {
  opacity: 0.7;
}
.is-gap-2 {
  gap: 0.5rem;
}
</style>
