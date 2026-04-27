import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivityView from '../views/ActivityView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import UsersTab from '@/views/UsersTab.vue'
import FriendsActivity from '@/views/FriendsActivity.vue'
import { useUsersStore } from '@/stores/users'

const guestOnly = ['/', '/login', '/register']
const authRequired = ['/activity', '/statistics', '/users', '/friends']

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
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersTab
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsActivity
    }
  ]
})

router.beforeEach((to) => {
  const usersStore = useUsersStore()
  const loggedIn = usersStore.user !== null

  if (loggedIn && guestOnly.includes(to.path)) {
    return { name: 'activity' }
  }
  if (!loggedIn && authRequired.includes(to.path)) {
    return { name: 'login' }
  }
})

export default router
