<template>
  <main class="px-4 md:px-16">
    <div class="h-[300px]"></div>
    <div class="content flex items-center justify-center my-12 relative">
      <h2 class="wave-text outline-text">PHOTOGRAPHY</h2>
      <h2 class="wave-text animated-text">PHOTOGRAPHY</h2>
    </div>

    <div class="h-[200px]"></div>
    <!-- <SpacerTrigger title="Browse Categories" @enter="hideHeader" @leave="showHeader" /> -->

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
import { inject } from 'vue'
import SpacerTrigger from '../components/SpacerTrigger.vue'
import PhotoCategory from '../components/PhotoCategory.vue'

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
  
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

.content {
  position: relative;
}

.wave-text {
  position: absolute;
  font-size: 5rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.outline-text {
  color: transparent;
  -webkit-text-stroke: 2px #000;
}

.animated-text {
  color: #38bdf8;
  animation: wave-animate 4s ease-in-out infinite;
}

@keyframes wave-animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}

@media (max-width: 768px) {
  .wave-text {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .wave-text {
    font-size: 2rem;
  }
}
</style>