<template>
  <Header />

  <main class="relative overflow-x-hidden">
      <!-- Hero Section -->
    <template v-if="isLargeScreen">
        <ParticlesCanvas class="absolute inset-0 z-10 pointer-events-none" />
    </template>
    <section class="relative w-full h-screen overflow-hidden">
      <video autoplay muted loop class="absolute w-full h-full object-cover">
        <source src="/videos.mp4" type="video/mp4" />
      </video>

      <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 class="text-white font-bold uppercase tracking-widest text-5xl md:text-7xl lg:text-9xl hero-text">
          <span v-for="(letter, index) in heroLetters" :key="index" class="inline-block gsap-reveal" :style="{ opacity: 0 }">{{ letter }}</span>
        </h1>
        <p class="text-white/70 mt-4 text-lg md:text-2xl lg:text-3xl gsap-fade">See the world through our lens</p>
        <div class="mt-8 animate-bounce cursor-pointer gsap-fade">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Services / Categories -->
    <section class="py-20 px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
      <div v-for="cat in categories" :key="cat.title" class="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-500 gsap-fade-scale">
        <video v-if="cat.video" :src="cat.video" autoplay muted loop class="absolute w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-opacity duration-500"></video>
        <img :src="cat.image" alt="" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"/>
        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 class="text-white font-bold text-2xl">{{ cat.title }}</h3>
        </div>
      </div>
    </section>

    <!-- Portfolio / Reel -->
    <section class="py-20 px-6 md:px-16 relative">
      <h2 class="text-3xl md:text-5xl font-bold mb-12 text-center gsap-fade">Our Work</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in portfolio" :key="item.title" class="relative overflow-hidden rounded-lg cursor-pointer group gsap-fade-scale">
          <video v-if="item.video" :src="item.video" autoplay muted loop class="absolute w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"></video>
          <img :src="item.image" alt="" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"/>
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
            <p class="text-white font-semibold">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team & Vision -->
    <section class="bg-gray-100 dark:bg-gray-900 py-20 px-6 md:px-16 relative">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="gsap-fade-left">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">Our Vision</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            Since early 2025, Yannick and Godlyn bring their passion to life. Yannick leads photography, Godlyn leads design and video, creating immersive experiences.
          </p>
          <p class="text-gray-700 dark:text-gray-300">Services: 360° videos, web, apps, hyperlapse, photography.</p>
        </div>
        <div class="flex flex-col gap-6 gsap-fade-right">
          <img src="" alt="Yannick" class="rounded-xl shadow-lg"/>
          <img src="" alt="Godlyn" class="rounded-xl shadow-lg"/>
        </div>
      </div>
    </section>
  </main>

  <Footer />
  <CustomCursor />
</template>

<script setup>
import { ref, onMounted,onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ParticlesCanvas from '../components/ParticlesCanvas.vue'
import CustomCursor from '../components/CustomCursor.vue'

const isLargeScreen = ref(false)

const checkScreen = () => {
  isLargeScreen.value = window.innerWidth >= 1024 // lg breakpoint
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

gsap.registerPlugin(ScrollTrigger)

const heroText = 'PHOTOGRAPHY'
const heroLetters = ref([])

onMounted(() => {
  heroLetters.value = heroText.split('')

  // Animate hero letters
  gsap.to('.gsap-reveal', {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Animate scroll elements
  gsap.utils.toArray('.gsap-fade').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    })
  })

  gsap.utils.toArray('.gsap-fade-scale').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
  })

  gsap.utils.toArray('.gsap-fade-left').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out'
    })
  })

  gsap.utils.toArray('.gsap-fade-right').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power2.out'
    })
  })
})

const categories = [
  { title: 'Photography', image: '/images/photo-category.jpg', video: '/videos/photo-preview.mp4' },
  { title: '360° Video', image: '/images/360-video.jpg', video: '/videos/360-preview.mp4' },
  { title: 'Web', image: '/images/web.jpg' },
  { title: 'Dev', image: '/images/dev.jpg' },
  { title: 'Hyperlapse', image: '/images/hyperlapse.jpg' },
]

const portfolio = [
  { title: 'Project 1', image: '/images/portfolio1.jpg', video: '/videos/project1.mp4' },
  { title: 'Project 2', image: '/images/portfolio2.jpg', video: '/videos/project2.mp4' },
  { title: 'Project 3', image: '/images/portfolio3.jpg' },
  { title: 'Project 4', image: '/images/portfolio4.jpg' },
]
</script>

<style scoped>
.hero-text span { transform: translateY(20px); display: inline-block; }
</style>
