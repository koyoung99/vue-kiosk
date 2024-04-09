import { createRouter, createWebHistory } from 'vue-router'
import SettingMenuView from '../views/chart/SettingMenuView.vue'
import CoffeeView from '../views/chart/CoffeeView.vue'
import ChartMainView from '../views/chart/ChartMainView.vue'
import ManagerLoginView from '../views/manager/ManagerLoginView.vue'
import ManagerView from '../views/manager/ManagerView.vue'

const routes = [
  {
    path: '/setting',
    name: '/setting',
    component: SettingMenuView
  }, {
    path: '/chart/coffeeview',
    name: '/chart/coffeeview',
    component: CoffeeView
  }, {
    path: '/chart/main',
    name: '/chart/main',
    component: ChartMainView
  },
  {
    path: '/manager/loginform',
    name: '/manager/loginform',
    component: ManagerLoginView
  },
  {
    path: '/manager',
    name: '/manager',
    component: ManagerView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
