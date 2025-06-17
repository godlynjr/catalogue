<template>
  <header 
    class="fixed pt-7 w-full z-50 transition-colors duration-300"
    :class="isDark ? 'bg-[#121212]/80 backdrop-blur-sm' : ''"
  >
    <div class="flex items-center justify-between w-full px-4 md:px-6 py-4 max-w-[1800px] mx-auto">
      
      <!-- Logo -->
      <router-link to="/" class="flex items-center transition hover:opacity-80">
        <img
          :src="isDark ? '/logo-dark.png' : '/logo.png'"
          alt="CK Logo"
          class="h-8 sm:h-10 w-auto"
        />
      </router-link>

      <!-- Center nav (desktop) -->
      <ul
        :class="[
          'hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-4 lg:space-x-7 text-xl lg:text-2xl font-normal transition-all duration-500 ease-in-out',
          isDark ? 'text-white' : 'text-gray-900',
          (showNav && !menuOpen && !isClosingPanel) ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        ]"
      >
        <li v-for="(item) in navItems" :key="item.text" class="flex items-center gap-2 group">
          <FancyLink :to="item.to" :text="item.text" />
        </li>
      </ul>

      <!-- Hamburger button -->
      <button v-if="!menuOpen" @click="toggleMenu" class="z-50 hover:scale-110 transition duration-300">
        <svg class="w-8 h-8 sm:w-10 sm:h-10" :class="isDark ? 'text-white' : 'text-black'" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Overlay + Panel -->
    <transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 z-[999] flex">
        
        <!-- Dark transparent overlay -->
        <div 
          v-if="!isSmallScreen" 
          class="lg:w-1/3 backdrop-blur-sm min-h-screen transition-opacity duration-300 delay-75" 
          :class="isDark ? 'bg-black/80' : 'bg-black/60'"
          @click="toggleMenu"
        ></div>

        <!-- Slide-in panel -->
        <transition name="slide-scale">
          <div 
            class="absolute right-0 top-0 h-screen w-full sm:w-[85%] md:w-[70%] lg:w-2/3 transition-colors duration-300 overflow-y-auto flex flex-col"
            :class="isDark ? 'bg-[#1e1e1e]' : 'bg-[#edf2f9]'"
          >
            <div class="relative h-full px-6 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-10">
              <!-- Close button -->
              <button @click="toggleMenu" class="absolute top-7 right-6 sm:right-8 lg:right-16 xl:right-24 z-[1000] hover:scale-110 transition duration-300">
                <svg class="w-8 h-8" :class="isDark ? 'text-white' : 'text-black'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Content inside panel -->
              <transition name="panel-content">
                <div class="flex flex-col h-full pt-12 sm:pt-10">
                  
                  <!-- Mobile: Stack vertically, Desktop: Side by side -->
                  <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 flex-1 lg:justify-center lg:items-start lg:max-w-6xl lg:mx-auto lg:w-full">

                    <!-- Left: Social/Color/Contact (More breathing room) -->
                    <div 
                      class="space-y-10 lg:space-y-12 text-sm w-full lg:w-2/5 order-2 lg:order-1" 
                      :class="isDark ? 'text-gray-300' : 'text-gray-800'"
                    >
                      <div :class="['panel-item', 'delay-100', { 'entered': panelContentVisible }]">
                        <h4 
                          class="font-semibold text-xs mb-4 border-b pb-2 w-[60%]" 
                          :class="isDark ? 'text-gray-400 border-gray-600' : 'text-gray-500 border-gray-300'"
                        >SOCIAL</h4>
                        <ul class="space-y-3 font-medium">
                          <li>
                            <a href="#" class="hover:underline transition-all duration-300 ease-in-out hover:translate-x-1 inline-block">
                              INSTAGRAM
                            </a>
                          </li>
                          <li>
                            <a href="#" class="hover:underline transition-all duration-300 ease-in-out hover:translate-x-1 inline-block">
                              LINKEDIN
                            </a>
                          </li>
                          <li>
                            <a href="#" class="hover:underline transition-all duration-300 ease-in-out hover:translate-x-1 inline-block">
                              YOUTUBE
                            </a>
                          </li>
                        </ul>
                      </div>
                      
                      <div :class="['panel-item', 'delay-200', { 'entered': panelContentVisible }]">
                        <h4 
                          class="font-semibold text-xs mb-4 border-b pb-2 w-[60%]" 
                          :class="isDark ? 'text-gray-400 border-gray-600' : 'text-gray-500 border-gray-300'"
                        >COLOR</h4>
                        <p 
                          class="hover:underline cursor-pointer font-medium transition-all duration-300 ease-in-out flex items-center gap-3 hover:translate-x-1" 
                          @click="toggleDarkMode"
                        >
                          <span v-if="isDark">Switch to Light Mode</span>
                          <span v-else>Switch to Dark Mode</span>
                          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        </p>
                      </div>
                      
                      <div :class="['panel-item', 'delay-300', { 'entered': panelContentVisible }]">
                        <h4 
                          class="font-semibold text-xs mb-4 border-b pb-2 w-[60%]" 
                          :class="isDark ? 'text-gray-400 border-gray-600' : 'text-gray-500 border-gray-300'"
                        >CONTACT</h4>
                        <div class="space-y-2">
                          <p class="hover:underline font-medium transition-all duration-300 ease-in-out hover:translate-x-1 cursor-pointer">
                            +00 0000000000
                          </p>
                          <p class="hover:underline font-medium transition-all duration-300 ease-in-out hover:translate-x-1 cursor-pointer">
                            hello@qsdghjklm.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Right: Navigation with active indicator -->
                    <div :class="['panel-item', 'delay-400', { 'entered': panelContentVisible }]" class="w-full lg:w-3/5 order-1 lg:order-2">
                      <ul 
                        class="space-y-6 sm:space-y-8 text-3xl sm:text-4xl lg:text-5xl font-medium"
                        :class="isDark ? 'text-white' : 'text-gray-900'"
                      >
                        <li
                          v-for="(item, index) in navItems"
                          :key="item.text"
                          class="group relative"
                        >
                          <div class="flex items-center gap-4 lg:gap-6">
                            <!-- Progress indicator -->
                            <div class="flex flex-col items-center">
                              <span 
                                class="text-xs font-mono transition-all duration-300 ease-in-out mb-2"
                                :class="isCurrentRoute(item.to) 
                                  ? (isDark ? 'text-white opacity-100' : 'text-gray-900 opacity-100')
                                  : 'opacity-40 group-hover:opacity-70'"
                              >
                                {{ String(index + 1).padStart(2, '0') }}
                              </span>
                              <div 
                                class="w-px transition-all duration-500 ease-out"
                                :class="[
                                  isCurrentRoute(item.to) 
                                    ? 'h-8 bg-current opacity-100' 
                                    : 'h-4 bg-current opacity-20 group-hover:h-6 group-hover:opacity-50'
                                ]"
                              ></div>
                            </div>
                            
                            <!-- Navigation link -->
                            <div class="relative overflow-hidden">
                              <FancyLink 
                                :to="item.to" 
                                :text="item.text" 
                                @click="closeMenuIfMobile"
                                class="relative transition-all duration-300 ease-out"
                                :class="isCurrentRoute(item.to) ? 'text-current' : ''"
                              />
                              
                              <!-- Active indicator background -->
                              <div 
                                v-if="isCurrentRoute(item.to)"
                                class="absolute -left-2 top-0 w-1 h-full transition-all duration-300"
                                :class="isDark ? 'bg-white/20' : 'bg-gray-900/20'"
                              ></div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>

                  <!-- Bottom Image -->
                  <div :class="['panel-item', 'delay-500', { 'entered': panelContentVisible }]" class="mt-8 lg:mt-12 h-48 sm:h-56 lg:h-64 lg:max-w-6xl lg:mx-auto lg:w-full">
                    <img
                      src="https://pbs.twimg.com/media/GpdXqUCXcAA2f8d?format=jpg&name=large"
                      alt="Photographer"
                      class="rounded-lg shadow-md object-cover w-full h-full"
                    />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, inject, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FancyLink from './FancyLink.vue'

defineProps({
  visible: { type: Boolean, default: true }
})

// Get theme functions
const isDark = inject('isDark')
const toggleDarkMode = inject('toggleDarkMode')

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const isClosingPanel = ref(false)

// Check if current route matches navigation item
const isCurrentRoute = (to) => {
  return route.path === to || (to !== '/' && route.path.startsWith(to))
}

const toggleMenu = () => {
  if (menuOpen.value) {
    panelContentVisible.value = false
    setTimeout(() => {
      menuOpen.value = false
      isClosingPanel.value = false
      showNav.value = true
    }, 500)
  } else {
    menuOpen.value = true
    showNav.value = false
    setTimeout(() => {
      panelContentVisible.value = true
    }, 100)
  }
}

const closeMenuIfMobile = () => {
  if (isSmallScreen.value) {
    toggleMenu()
  }
}

onMounted(() => {
  router.afterEach(() => {
    if (menuOpen.value) {
      toggleMenu()
    }
  })
})

watch(menuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

const showNav = ref(true)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  showNav.value = currentScrollY < 100
  lastScrollY = currentScrollY
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = [
  { text: 'Travel', to: '/travel' },
  { text: 'Photography', to: '/photography' },
  { text: 'Video', to: '/video' },
  { text: 'Design', to: '/design' },
  { text: 'About', to: '/about' },
]

const isSmallScreen = ref(false)

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1024
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const panelContentVisible = ref(false)

watch(menuOpen, (isOpen) => {
  if (isOpen) {
    setTimeout(() => {
      panelContentVisible.value = true
    }, 100)
  } else {
    panelContentVisible.value = false
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-scale-enter-active {
  transition: all 0.5s cubic-bezier(0.65, 0, 0.35, 1);
}
.slide-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.75, 0, 0.25, 1);
}

.slide-scale-enter-from {
  transform: translateX(100%) scale(0.95);
  opacity: 0.8;
}
.slide-scale-enter-to {
  transform: translateX(0) scale(1);
  opacity: 1;
}

.slide-scale-leave-from {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.slide-scale-leave-to {
  transform: translateX(100%) scale(0.95);
  opacity: 0.8;
}

.panel-content-enter-active, .panel-content-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.panel-content-enter-from, .panel-content-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.panel-content-enter-to, .panel-content-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.panel-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.panel-item.entered {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 {
  transition-delay: 0.1s;
}
.delay-200 {
  transition-delay: 0.2s;
}
.delay-300 {
  transition-delay: 0.3s;
}
.delay-400 {
  transition-delay: 0.4s;
}
.delay-500 {
  transition-delay: 0.5s;
}
</style>