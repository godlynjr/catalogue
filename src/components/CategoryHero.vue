<template>
  <section
    ref="heroSection"
    class="relative w-full h-[100vh] overflow-hidden flex items-center justify-center"
    :class="isDark ? 'bg-dark-primary' : 'bg-[#f0f7ff]'"
  >
    <!-- Text behind images (desktop only) -->
    <div class="absolute inset-0 flex items-center justify-center overflow-hidden z-5 hidden md:flex">
      <!-- Background title -->
      <h1
        ref="bgTitle"
        class="font-black uppercase select-none pointer-events-none whitespace-nowrap absolute"
        :style="backgroundTitleStyle"
      >
        {{ title }}
      </h1>
      
      <!-- Main fading title -->
      <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
        <h1
          ref="mainTitle"
          class="font-black uppercase select-none pointer-events-none whitespace-nowrap"
          :style="mainTitleStyle"
        >
          {{ title }}
        </h1>
      </div>
    </div>

    <!-- Centered text for mobile/tablet (no images) -->
    <div class="absolute inset-0 flex items-center justify-center z-20 md:hidden">
      <h1
        class="font-black uppercase select-none pointer-events-none text-center px-4"
        :style="mobileTextStyle"
      >
        {{ title }}
      </h1>
    </div>

    <!-- Static Image stack (desktop only) -->
    <div class="relative z-10 hidden md:flex justify-center items-center h-full px-4">
      <div class="relative flex items-center justify-center">

        <!-- Image gauche -->
        <div
          v-if="images.length > 1"
          class="absolute left-[-80px] md:left-[-120px] lg:left-[-140px] top-[20px] md:top-[30px]"
        >
          <img
            :src="images[1]"
            alt=""
            class="rounded-2xl shadow-2xl object-cover transition-transform duration-300 border-4"
            :class="[
              isDark ? 'border-gray-700' : 'border-white', 
              'w-[140px] h-[180px] lg:w-[180px] lg:h-[220px] rotate-[-12deg] hover:rotate-[-8deg]'
            ]"
          />
        </div>

        <!-- Image centrale -->
        <div class="relative z-20">
          <img
            :src="images[0]"
            alt=""
            class="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300 border-4"
            :class="[
              isDark ? 'border-gray-700' : 'border-white', 
              'w-[160px] h-[200px] lg:w-[200px] lg:h-[250px]'
            ]"
          />
        </div>

        <!-- Image droite -->
        <div
          v-if="images.length > 2"
          class="absolute right-[-80px] md:right-[-120px] lg:right-[-140px] top-[40px] md:top-[50px]"
        >
          <img
            :src="images[2]"
            alt=""
            class="rounded-2xl shadow-2xl object-cover transition-transform duration-300 border-4"
            :class="[
              isDark ? 'border-gray-700' : 'border-white', 
              'w-[140px] h-[180px] lg:w-[180px] lg:h-[220px] rotate-[15deg] hover:rotate-[10deg]'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div 
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-300"
      :style="{ opacity: scrollProgress < 0.2 ? 1 : 0 }"
    >
      <div class="flex flex-col items-center">
        <span 
          class="text-sm font-medium mb-2 transition-colors duration-300"
          :class="isDark ? 'text-gray-300' : 'text-gray-600'"
        >
          Scroll to explore
        </span>
        <div 
          class="w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-300"
          :class="isDark ? 'border-gray-400' : 'border-gray-400'"
        >
          <div 
            class="w-1 h-3 rounded-full mt-2 animate-bounce transition-colors duration-300"
            :class="isDark ? 'bg-gray-300' : 'bg-gray-600'"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  images: { type: Array, required: true }
})

const isDark = inject('isDark', false)

// Refs
const heroSection = ref(null)

// Scroll progress (0 = top, 1 = scrolled past the section)
const scrollProgress = ref(0)

const calculateBaseFontSize = (text) => {
  const len = text?.length || 0
  if (len <= 4) return 28
  if (len <= 6) return 24
  if (len <= 8) return 20
  if (len <= 10) return 17
  return 15
}

// Background title that fades with scroll (desktop)
const backgroundTitleStyle = computed(() => {
  const baseFontSize = calculateBaseFontSize(props.title)
  const progress = scrollProgress.value
  
  const opacity = Math.max(0.02, 0.15 - progress * 0.12)
  const scale = 1 + progress * 0.1
  
  return {
    fontFamily: 'Bebas Neue, Arial Black, sans-serif',
    fontSize: `${baseFontSize + 1}vw`,
    letterSpacing: '0.1em',
    lineHeight: '0.8',
    color: isDark.value ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    transform: `scale(${scale})`,
    transition: 'all 0.3s ease',
    zIndex: 1
  }
})

// Main title with smooth fade animation (desktop)
const mainTitleStyle = computed(() => {
  const baseFontSize = calculateBaseFontSize(props.title)
  const progress = scrollProgress.value
  
  const opacity = Math.max(0.05, 1 - progress * 0.85)
  const scale = 1 + progress * 0.15
  const blur = progress * 3
  
  return {
    fontFamily: 'Bebas Neue, Arial Black, sans-serif',
    fontSize: `${baseFontSize}vw`,
    letterSpacing: `${0.1 + progress * 0.05}em`,
    lineHeight: '0.8',
    color: isDark.value ? '#ffffff' : '#000000',
    transform: `scale(${scale})`,
    opacity: opacity,
    filter: `blur(${blur}px)`,
    transition: 'all 0.3s ease',
    textShadow: isDark.value 
      ? `0 0 ${progress * 30}px rgba(255, 255, 255, ${opacity * 0.5})`
      : `0 0 ${progress * 30}px rgba(0, 0, 0, ${opacity * 0.3})`,
    zIndex: 2
  }
})

// Mobile centered text style
const mobileTextStyle = computed(() => {
  const progress = scrollProgress.value
  const opacity = Math.max(0.1, 1 - progress * 0.8)
  const scale = Math.max(0.8, 1 - progress * 0.2)
  
  return {
    fontFamily: 'Bebas Neue, Arial Black, sans-serif',
    fontSize: 'clamp(3rem, 12vw, 6rem)',
    letterSpacing: '0.1em',
    lineHeight: '1.1',
    color: isDark.value ? '#ffffff' : '#000000',
    transform: `scale(${scale})`,
    opacity: opacity,
    textShadow: isDark.value 
      ? '3px 3px 12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 255, 255, 0.3)'
      : '3px 3px 12px rgba(255, 255, 255, 0.8), 0 0 25px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  }
})

// Scroll handler
const handleScroll = () => {
  if (!heroSection.value) return
  
  const rect = heroSection.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const sectionHeight = rect.height
  
  let progress = 0
  
  if (rect.top <= 0 && rect.bottom >= 0) {
    progress = Math.abs(rect.top) / (sectionHeight * 0.8)
  } else if (rect.bottom < 0) {
    progress = 1
  }
  
  scrollProgress.value = Math.min(1, Math.max(0, progress))
}

// Throttled scroll handler for better performance
let ticking = false
const throttledScrollHandler = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  // Load Bebas Neue font
  if (!document.querySelector('link[href*="Bebas+Neue"]')) {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  
  // Add scroll listener
  window.addEventListener('scroll', throttledScrollHandler, { passive: true })
  
  // Initial call
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScrollHandler)
})
</script>

<style scoped>
/* Ensure consistent font loading */
h1 {
  font-family: 'Bebas Neue', 'Arial Black', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom shadows for depth */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5);
}

/* Performance optimizations */
* {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Scroll indicator animation */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-8px,0);
  }
  70% {
    transform: translate3d(0,-4px,0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* GPU acceleration */
.relative {
  transform: translateZ(0);
}

/* Ensure text has good contrast */
.font-black {
  font-weight: 900;
}
</style>