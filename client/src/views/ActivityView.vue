<script setup lang="ts">
import ExerciseForm from '@/components/ExerciseForm.vue'
import ExerciseComponent from '@/components/ExerciseComponent.vue';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { ref, useTemplateRef, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import type { Exercise } from '@/types'

const userStore = useUsersStore()
const { user } = storeToRefs(userStore)

const exerciseStore = useExerciseStore()

const PAGE_SIZE = 10

const items = ref<Exercise[]>([])
const page = ref(0)        // last page fetched (0 = none yet)
const total = ref(0)
const loading = ref(false)
const showForm = ref(false)


const scrollEl = useTemplateRef<HTMLElement>('scrollEl')

const canLoadMore = () =>
  page.value === 0 || items.value.length < total.value

const loadMore = async () => {
  if (!user.value) return
  if (loading.value) return
  if (page.value > 0 && items.value.length >= total.value) return

  loading.value = true
  try {
    const next = page.value + 1
    const res = await exerciseStore.fetchUserPage(user.value.id, next, PAGE_SIZE)
    items.value.push(...res.list)
    total.value = res.total
    page.value = next
  } finally {
    loading.value = false
  }
}

useInfiniteScroll(
  scrollEl,
  loadMore,
  { distance: 200, canLoadMore, interval: 300 },
)

// reload from page 1 whenever the active user changes (login/logout)
watch(
  () => user.value?.id,
  (uid) => {
    items.value = []
    page.value = 0
    total.value = 0
    if (uid) loadMore()
  },
  { immediate: true },
)

// when a new exercise is added via the form, drop it at the top of the feed without re-fetching the whole list
const onExerciseAdded = (ex: Exercise) => {
  items.value.unshift(ex)
  total.value += 1
}

// remove from local list when the child component deletes it
const onExerciseRemoved = (id: number) => {
  const before = items.value.length
  items.value = items.value.filter((e) => e.id !== id)
  if (items.value.length !== before) total.value = Math.max(0, total.value - 1)
}
</script>

<template>
  <main ref="scrollEl" class="has-background-info-10 scroll-main">
    <div class="columns">
      <div class="column container is-centered has-text-centered mt-4 p-5">
        <h1 class="title is-1 has-text-warning-light">Your Activity</h1>
        <p class="subtitle is-5 has-text-warning-light">Find your activity here.</p>

        <hr class="has-background-warning-40" />

        <div class="columns">
          <div class="column container is-three-quarters">
            <button
              class="button container has-background-warning-40 has-text-warning-light is-medium is-rounded"
              @click="showForm = true"
            >
              Add Exercise
            </button>

            <div
              v-if="user"
              class="has-background-dark has-text-warning-light is-size-7 py-1 px-4"
              style="position: fixed; top: 4.5rem; left: 50%; transform: translateX(-50%); z-index: 100; border-radius: 0 0 0.5rem 0.5rem; pointer-events: none;"
            >
              Showing {{ items.length }} of {{ total }}
            </div>

            <div class="mt-3">
              <ExerciseComponent
                v-for="exercise in items"
                :key="exercise.id"
                :exercise="exercise"
                :showDelete="true"
                @removed="onExerciseRemoved"
              />

              <div v-if="loading" class="has-text-left">
                <div
                  v-for="n in 3"
                  :key="`sk-${n}`"
                  class="box has-background-info-15 is-skeleton mb-3"
                  style="height: 140px;"
                ></div>
              </div>

              <p
                v-if="!loading && page > 0 && items.length >= total && total > 0"
                class="has-text-warning-light mt-4"
              >
                You're all caught up.
              </p>

              <p
                v-if="!loading && total === 0 && page > 0"
                class="has-text-warning-light mt-4"
              >
                No workouts yet — add your first one above!
              </p>
            </div>
          </div>
        </div>

        <ExerciseForm
          :show="showForm"
          @close="showForm = false"
          @added="onExerciseAdded"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.scroll-main {
  height: calc(100vh - 4.5rem);
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
