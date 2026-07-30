import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Photography from '../pages/Photography.vue'
import PhotoCategoryDetail from '../pages/PhotoCategoryDetail.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/NotFound.vue'
// Placeholder components for Video and Design (to be created)
const Video = () => import('../pages/Video.vue')
const Design = () => import('../pages/Design.vue')

const routes: Array<RouteRecordRaw> = [
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
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/design',
    name: 'Design',
    component: Design
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
