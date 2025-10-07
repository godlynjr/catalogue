import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../pages/Photography.vue'
import PhotoCategoryDetail from '../pages/PhotoCategoryDetail.vue'
import NotFound from '../pages/NotFound.vue'
import About from '../pages/About.vue'
import HomePage from '../pages/HomePage.vue'
import Photography from '../pages/Photography.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/photography',
    name: 'Photography',
    component: Photography
  },
  {
    path: '/category/:category',
    name: 'PhotoCategoryDetail',
    component: PhotoCategoryDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
