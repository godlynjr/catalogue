import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../pages/MainContent.vue'
import PhotoCategoryDetail from '../pages/PhotoCategoryDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainContent
  },
  {
    path: '/category/:category',
    name: 'PhotoCategoryDetail',
    component: PhotoCategoryDetail
  },
  // Optionnel : une page "404 Not Found"
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: {
      template: '<div class="p-10 text-center">Page non trouvée.</div>'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
