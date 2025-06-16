<template>
  <section class="relative w-full h-[70vh] md:h-[80vh] bg-[#f0f7ff] overflow-hidden flex items-center justify-center">
    <!-- Big title background -->
    <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
      <h1
        class="font-black text-black/8 uppercase select-none pointer-events-none whitespace-nowrap"
        :style="{ 
          fontFamily: 'Bebas Neue, Arial Black, sans-serif',
          fontSize: calculateFontSize(title),
          letterSpacing: '0.1em',
          lineHeight: '0.8'
        }"
      >
        {{ title }}
      </h1>
    </div>

    <!-- Image stack positioned over the text -->
    <div class="relative z-10 flex justify-center items-center h-full px-4">
      <div class="relative flex items-center justify-center">
        <!-- Image gauche -->
        <div
          v-if="images.length > 1"
          class="absolute left-[-80px] md:left-[-120px] lg:left-[-140px] top-[20px] md:top-[30px]"
        >
          <img
            :src="images[1]"
            alt=""
            class="w-[120px] h-[160px] md:w-[140px] md:h-[180px] lg:w-[180px] lg:h-[220px] rounded-2xl shadow-2xl transform rotate-[-12deg] hover:rotate-[-8deg] transition-transform duration-300 object-cover border-4 border-white"
          />
        </div>

        <!-- Image centrale (principale) -->
        <div class="relative z-20">
          <img
            :src="images[0]"
            alt=""
            class="w-[140px] h-[180px] md:w-[160px] md:h-[200px] lg:w-[200px] lg:h-[250px] rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 object-cover border-4 border-white"
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
            class="w-[120px] h-[160px] md:w-[140px] md:h-[180px] lg:w-[180px] lg:h-[220px] rounded-2xl shadow-2xl transform rotate-[15deg] hover:rotate-[10deg] transition-transform duration-300 object-cover border-4 border-white"
          />
        </div>

        <!-- Image supplémentaire (4ème) si disponible -->
        <div
          v-if="images.length > 3"
          class="absolute right-[-40px] md:right-[-60px] lg:right-[-80px] bottom-[-20px] md:bottom-[-30px]"
        >
          <img
            :src="images[3]"
            alt=""
            class="w-[100px] h-[130px] md:w-[120px] md:h-[150px] lg:w-[140px] lg:h-[180px] rounded-2xl shadow-xl transform rotate-[8deg] hover:rotate-[5deg] transition-transform duration-300 object-cover border-3 border-white opacity-90"
          />
        </div>

        <!-- Image supplémentaire (5ème) si disponible -->
        <div
          v-if="images.length > 4"
          class="absolute left-[-40px] md:left-[-60px] lg:left-[-80px] bottom-[-10px] md:bottom-[-20px]"
        >
          <img
            :src="images[4]"
            alt=""
            class="w-[100px] h-[130px] md:w-[120px] md:h-[150px] lg:w-[140px] lg:h-[180px] rounded-2xl shadow-xl transform rotate-[-8deg] hover:rotate-[-5deg] transition-transform duration-300 object-cover border-3 border-white opacity-90"
          />
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-10 left-10 w-2 h-2 bg-black/20 rounded-full animate-pulse"></div>
    <div class="absolute bottom-16 right-16 w-3 h-3 bg-black/15 rounded-full animate-pulse delay-1000"></div>
    <div class="absolute top-1/3 right-10 w-1 h-1 bg-black/25 rounded-full animate-pulse delay-500"></div>
  </section>
</template>

<script setup>
// Import Google Font for better typography
import { onMounted, computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  images: { type: Array, required: true }
})

// Calculate font size to fit the screen width
const calculateFontSize = (text) => {
  if (!text) return '10vw'
  
  // Base calculation: try to fit the text to roughly 90% of viewport width
  // Adjust multiplier based on text length
  const textLength = text.length
  let multiplier
  
  if (textLength <= 4) {
    multiplier = 22 // Very short text (like "ART")
  } else if (textLength <= 6) {
    multiplier = 18 // Short text (like "VIENNA")
  } else if (textLength <= 8) {
    multiplier = 15 // Medium text
  } else if (textLength <= 10) {
    multiplier = 12 // Longer text
  } else {
    multiplier = 10 // Very long text
  }
  
  return `${multiplier}vw`
}

onMounted(() => {
  // Load Bebas Neue font if not already loaded
  if (!document.querySelector('link[href*="Bebas+Neue"]')) {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
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

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .absolute.left-\[-80px\] {
    left: -60px;
  }
  .absolute.right-\[-80px\] {
    right: -60px;
  }
  .absolute.left-\[-40px\] {
    left: -30px;
  }
  .absolute.right-\[-40px\] {
    right: -30px;
  }
}
</style>