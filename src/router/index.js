import { createRouter, createWebHistory } from 'vue-router'

import MainContent from '../pages/MainContent.vue'
// import Travel from '../pages/Travel.vue'
// import Photography from '../pages/Photography.vue'
// import Video from '../pages/Video.vue'
// import Design from '../pages/Design.vue'
// import About from '../pages/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainContent
  },
//   {
//     path: '/travel',
//     name: 'Travel',
//     component: Travel
//   },
//   {
//     path: '/photography',
//     name: 'Photography',
//     component: Photography
//   },
//   {
//     path: '/video',
//     name: 'Video',
//     component: Video
//   },
//   {
//     path: '/design',
//     name: 'Design',
//     component: Design
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: About
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router