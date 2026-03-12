import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivityView from '../views/ActivityView.vue'
import LoginView from '../views/LoginView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView
    }
  ]
})

export default router
