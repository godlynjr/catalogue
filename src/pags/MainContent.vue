<template>
    <main class="pt-[80px] sm:pt-[100px] md:pt-[120px] lg:pt-[140px] px-4 md:px-16">
      <!-- Titre principal -->
      <section class="text-center mb-12">
        <h1 class="text-5xl font-bold tracking-widest">PHOTOGRAPHY</h1>
      </section>
  
      <!-- Spacer déclencheur stylisé -->
      <SpacerTrigger title="Browse Categories" @enter="hideHeader" @leave="showHeader" />
  
      <!-- Grille -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        <PhotoCategory
          v-for="cat in categories"
          :key="cat.title"
          :title="cat.title"
          :images="cat.images"
          :link="cat.link"
        />
      </section>
    </main>
  </template>
  
  <script setup>
  import PhotoCategory from '../components/PhotoCategory.vue'
  import ScrollTrigger from '../components/SpacerTrigger.vue'
  import { inject } from 'vue'

const setHeaderVisible = inject('setHeaderVisible')

const hideHeader = () => setHeaderVisible(false)
const showHeader = () => setHeaderVisible(true)
  
  const categories = [
  {
    title: 'VIENNA',
    link: '/photography/vienna',
    images: [
      'https://images.unsplash.com/photo-1591285713698-598d587de63e?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1591285713698-598d587de63e?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1591285713698-598d587de63e?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'COMMERCIAL',
    link: '/photography/commercial',
    images: [
      'https://images.unsplash.com/photo-1744628182969-74140b2b4637?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1744628182969-74140b2b4637?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1744628182969-74140b2b4637?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'PEOPLE',
    link: '/photography/people',
    images: [
      'https://images.unsplash.com/photo-1744024865056-a2623d1dd495?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1744024865056-a2623d1dd495?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1744024865056-a2623d1dd495?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'WEDDINGS',
    link: '/photography/weddings',
    images: [
      'https://plus.unsplash.com/premium_photo-1673266633993-013acd448898?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1673266633993-013acd448898?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1673266633993-013acd448898?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'EVENTS',
    link: '/photography/events',
    images: [
      'https://images.unsplash.com/photo-1741290728245-2643255e07b5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1741290728245-2643255e07b5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1741290728245-2643255e07b5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
]
  </script>
  