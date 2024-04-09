import { createRouter, createWebHistory } from 'vue-router'
import PaymentView from '../views/pointpay/PaymentView.vue'
import PointSaveView from '../views/pointpay/PointSaveView.vue'
import MainSilde from '../views/main/MainSilde.vue'
import PayCard from '@/views/payment/PayCard.vue'
import PayMobile from '@/views/payment/PayMobile.vue'
import PayOthers from '@/views/payment/PayOthers.vue'
import PayResult from '@/views/payment/PayResult.vue'
import MainMenu from '@/views/menu/MainMenu.vue'


const routes = [
  {
    path: '/',
    name: '/',
    component:MainSilde
  },
  {
    path: '/payment',
    name: 'paymentview',
    component: PaymentView
  },
  {
    path: '/pointsave',
    name: 'pointsave',
    component: PointSaveView
  },
  {
    path: '/pays/card',
    name: '/pays/card',
    component: PayCard
  },
  {
    path : '/pays/mobile',
    name : '/pays/mobile',
    component : PayMobile
  },
  {
    path : '/pays/others',
    name : '/pays/others',
    component : PayOthers
  },
  {
    path : '/pays/result',
    name : '/pays/result',
    component : PayResult
  },
  {
    path : '/menu',
    name : '/menu',
    component : MainMenu
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
