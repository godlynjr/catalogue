<template>
  <Header />

  <main class="relative overflow-x-hidden">
      <!-- Hero Section -->
    <section class="relative w-full h-screen overflow-hidden">
      <video autoplay muted loop playsinline class="absolute w-full h-full object-cover">
        <source src="/videos.mp4" type="video/mp4" />
        <img src="/images/hero_bg.png" alt="Hero background fallback" class="absolute w-full h-full object-cover" />
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
    <section v-if="!loadingCategories" class="py-20 px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
      <router-link 
        v-for="cat in categories" 
        :key="cat.title" 
        :to="`/category/${cat.slug}`"
        class="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-500 gsap-fade-scale"
      >
        <video v-if="cat.video" :src="cat.video" autoplay muted loop class="absolute w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-opacity duration-500"></video>
        <img :src="cat.image" alt="" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"/>
        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 class="text-white font-bold text-2xl uppercase tracking-widest">{{ cat.title }}</h3>
        </div>
      </router-link>
    </section>
    <div v-else class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current mb-4"></div>
    </div>

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
  </main>

  <Footer />
  <CustomCursor v-if="isLargeScreen" />
</template>

<script setup lang="ts">
import { ref, onMounted,onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CustomCursor from '../components/CustomCursor.vue'
import { fetchPhotographyCategories, urlFor } from '../lib/sanity'
import { photoCategoriesData } from '../data/photoCategoriesData'

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
const heroLetters = ref<string[]>([])
const loadingCategories = ref(true)

onMounted(async () => {
  heroLetters.value = heroText.split('')
  
  try {
    const data = await fetchPhotographyCategories()
    if (data && data.length > 0) {
      // Map Sanity photography to our internal Home category format
      categories.value = data.map((item: any) => ({
        title: item.title,
        slug: item.slug,
        image: item.mainImage 
          ? urlFor(item.mainImage).width(800).auto('format').url()
          : item.images?.[0] 
            ? urlFor(item.images[0]).width(800).auto('format').url()
            : '/images/photo-category.jpg',
        video: undefined
      }))
    } else {
      // Fallback to static data if Sanity is empty
      categories.value = photoCategoriesData.map(item => ({
        ...item,
        image: item.images[0],
        video: undefined
      }))
    }
  } catch (err) {
    console.error('Error fetching home categories:', err)
    // Fallback on error
    categories.value = photoCategoriesData.map(item => ({
      ...item,
      image: item.images[0],
      video: undefined
    }))
  } finally {
    loadingCategories.value = false
  }

  // Animate hero letters
  gsap.to('.gsap-reveal', {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Animate scroll elements
  gsap.utils.toArray<HTMLElement>('.gsap-fade').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    })
  })

  gsap.utils.toArray<HTMLElement>('.gsap-fade-scale').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
  })

  gsap.utils.toArray<HTMLElement>('.gsap-fade-left').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out'
    })
  })

  gsap.utils.toArray<HTMLElement>('.gsap-fade-right').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power2.out'
    })
  })
})

interface Category {
  title: string;
  image: string;
  video?: string;
}

const categories = ref<Category[]>([])

const portfolio: Category[] = [
  { title: 'Project 1', image: '/images/portfolio1.jpg', video: '/videos/project1.mp4' },
  { title: 'Project 2', image: '/images/portfolio2.jpg', video: '/videos/project2.mp4' },
  { title: 'Project 3', image: '/images/portfolio3.jpg' },
  { title: 'Project 4', image: '/images/portfolio4.jpg' },
]
</script>

<style scoped>
.hero-text span { transform: translateY(20px); display: inline-block; }
</style>
