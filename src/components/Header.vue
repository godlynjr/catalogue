<template>
  <header class="fixed pt-7 w-full z-50">
    <div class="flex items-center justify-between w-full py-4 max-w-[1800px] mx-auto">
      
      <!-- Logo -->
      <a href="/" class="flex items-center transition hover:opacity-80">
        <img
          src="https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=2235"
          alt="CK Logo"
          class="h-10 w-auto"
        />
      </a>

      <!-- Center nav (desktop) -->
      <ul
        :class="[
          'hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-7 text-2xl font-normal text-gray-900 transition-all duration-500 ease-in-out',
          (showNav && !menuOpen && !isClosingPanel) ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        ]"
      >
        <li v-for="(item, index) in navItems" :key="item.text" class="flex items-center gap-2 group">
          <!-- <span class="text-xs font-mono opacity-50 group-hover:opacity-100 transition-transform duration-300 ease-in-out">{{ index + 1 }}</span> -->
          <FancyLink :href="item.href" :text="item.text" />
        </li>
      </ul>

      <!-- Hamburger button -->
      <button v-if="!menuOpen" @click="toggleMenu" class="z-50 hover:scale-110 transition duration-300">
        <svg class="w-10 h-10 text-black" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Overlay + Panel -->
    <transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 z-[999] flex">
        
        <!-- Dark transparent overlay -->
        <div v-if="!isSmallScreen" class="lg:w-1/3 bg-black/60 backdrop-blur-sm min-h-screen transition-opacity duration-300 delay-75" @click="toggleMenu"></div>

        <!-- Slide-in panel -->
        <transition name="slide-scale">
          <div class="absolute right-0 top-0 h-screen md:w-full lg:w-2/3 bg-[#edf2f9] px-6 py-10 overflow-y-auto flex flex-col">

            <!-- Close button -->
            <button v-if="menuOpen" @click="toggleMenu" class="absolute top-7 right-6 z-[1000] hover:scale-110 transition duration-300">
              <svg class="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Content inside panel -->
            <transition name="panel-content">
              <div class="flex flex-col justify-between h-full">
                <div class="flex flex-col md:flex-row gap-10 h-2/3 justify-center items-center">

                  <!-- Left: Social/Color/Contact -->
                  <div class="space-y-8 text-sm text-gray-800 w-full md:w-1/2 pl-10 md:pl-36">
                    <div :class="['panel-item', 'delay-100', { 'entered': panelContentVisible }]">
                      <h4 class="font-semibold text-xs mb-2 text-gray-500 border-b pb-1 w-[50%]">SOCIAL</h4>
                      <ul class="space-y-1 font-medium">
                        <li><a href="#" class="hover:underline transition-transform duration-300 ease-in-out">INSTAGRAM</a></li>
                        <li><a href="#" class="hover:underline transition-transform duration-300 ease-in-out">LINKEDIN</a></li>
                        <li><a href="#" class="hover:underline transition-transform duration-300 ease-in-out">YOUTUBE</a></li>
                      </ul>
                    </div>
                    <div :class="['panel-item', 'delay-200', { 'entered': panelContentVisible }]">
                      <h4 class="font-semibold text-xs mb-2 text-gray-500 border-b pb-1 w-[50%]">COLOR</h4>
                      <p class="hover:underline cursor-pointer font-medium transition-transform duration-300 ease-in-out">Switch to Dark Mode</p>
                    </div>
                    <div :class="['panel-item', 'delay-300', { 'entered': panelContentVisible }]">
                      <h4 class="font-semibold text-xs mb-2 text-gray-500 border-b pb-1 w-[50%]">CONTACT</h4>
                      <p class="hover:underline font-medium transition-transform duration-300 ease-in-out">+00 0000000000</p>
                      <p class="hover:underline font-medium transition-transform duration-300 ease-in-out">hello@qsdghjklm.com</p>
                    </div>
                  </div>

                  <!-- Right: Navigation -->
                  <div :class="['panel-item', 'delay-400', { 'entered': panelContentVisible }]" class="w-full md:w-1/2">
                    <ul class="space-y-5 text-4xl font-medium text-gray-900 w-2/3">
                      <li
                        v-for="(item, index) in navItems"
                        :key="item.text"
                        class="flex items-center gap-3 group"
                      >
                        <span class="text-xs font-mono opacity-50 group-hover:opacity-100 transition-transform duration-300 ease-in-out">
                          {{ index + 1 }}
                        </span>
                        <FancyLink :href="item.href" :text="item.text" />
                      </li>
                    </ul>
                  </div>

                </div>

                <!-- Bottom Image -->
                <div :class="['panel-item', 'delay-500', { 'entered': panelContentVisible }]" class="mt-6 h-1/3">
                  <img
                    src="https://pbs.twimg.com/media/GpdXqUCXcAA2f8d?format=jpg&name=large"
                    alt="Photographer"
                    class="rounded-lg shadow-md object-cover"
                  />
                </div>
              </div>
            </transition>
            </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import FancyLink from './FancyLink.vue'

defineProps({
  visible: { type: Boolean, default: true }
})

const menuOpen = ref(false)
const isClosingPanel = ref(false)

const toggleMenu = () => {
  if (menuOpen.value) {
    // Fermeture → on inverse d'abord l'animation du contenu
    panelContentVisible.value = false

    setTimeout(() => {
      menuOpen.value = false
      isClosingPanel.value = false
      showNav.value = true
    }, 500) // attendre la fin de l'animation de sortie
  } else {
    menuOpen.value = true
    showNav.value = false

    // Petit délai pour rendre plus doux
    setTimeout(() => {
      panelContentVisible.value = true
    }, 100)
  }
}

watch(menuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

const showNav = ref(true)
let lastScrollY = 0
const THRESHOLD = 300

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
  { text: 'Travel', href: '/travel' },
  { text: 'Photography', href: '/photography' },
  { text: 'Video', href: '/video' },
  { text: 'Design', href: '/design' },
  { text: 'About', href: '/about' },
]

const isSmallScreen = ref(false)

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1024 // lg breakpoint
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
    }, 100) // petite latence pour être fluide
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

/* Slide + Scale + Ease-in/out for the Panel */
.slide-scale-enter-active {
  transition: all 0.5s cubic-bezier(0.65, 0, 0.35, 1); /* ease-in-out */
}
.slide-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.75, 0, 0.25, 1); /* ease-out */
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

/* Délais différents */
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
