<template>
  <Header />
  <main 
    class="px-4 sm:px-8 md:px-16 transition-colors duration-300"
  >
    <!-- Spacer under header -->
    <div class="h-[100px] sm:h-[150px] md:h-[200px]"></div>

    <!-- Animated title -->
    <div class="content flex items-center justify-center my-12 relative text-center">
      <h2 class="text-reveal">
        <span 
          v-for="(letter, index) in letters" 
          :key="index" 
          class="letter"
          :style="{ animationDelay: (index * 0.08) + 's' }"
        >
          {{ letter }}
        </span>
      </h2>
    </div>

    <!-- Grid of categories -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-8">
      <PhotoCategory
        v-for="cat in categories"
        :key="cat.title"
        :title="cat.title"
        :images="cat.images"
        :link="cat.link"
        :slug="cat.slug"
      />
    </section>
  </main>
  <Footer />
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import PhotoCategory from '../components/PhotoCategory.vue'
import { photoCategoriesData } from '../data/photoCategoriesData.js'

const isDark = inject('isDark', false)
const categories = photoCategoriesData

const text = 'PHOTOGRAPHY'
const letters = ref([])

onMounted(() => {
  letters.value = text.split('')
})
</script>

<style scoped>
.content {
  position: relative;
  min-height: 200px;
}

/* Responsive font scaling for the title */
.text-reveal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.1;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 8vw, 8rem);
  letter-spacing: 0.05em;
}

/* Letter animation */
.letter {
  opacity: 0;
  transform: translateY(20px);
  display: inline-block;
  animation: reveal 0.5s forwards;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
