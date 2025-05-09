<template>
  <Header/>
  <main 
    class="px-4 md:px-16 transition-colors duration-300"
    :class="isDark ? 'bg-dark-primary' : 'bg-[#f0f7ff]'"
  >
    <div class="h-[200px]"></div>
    <div class="content flex items-center justify-center my-12 relative">
      <h2 
        class="wave-text outline-text"
        :class="isDark ? 'dark-outline' : ''"
      >PHOTOGRAPHY</h2>
      <h2 
        class="wave-text animated-text"
        :class="isDark ? 'text-white' : 'text-black'"
      >PHOTOGRAPHY</h2>
    </div>

    <div class="h-[70px]"></div>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
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
  <!-- <Footer/> -->
</template>

<script setup>
import { inject } from 'vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import PhotoCategory from '../components/PhotoCategory.vue'
import { photoCategoriesData } from '../data/photoCategoriesData.js'

// Récupérer l'état du thème
const isDark = inject('isDark', false)
const categories = photoCategoriesData

</script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.content {
  position: relative;
  min-height: 280px;
}

.wave-text {
  position: absolute;
  font-size: 10.5rem;
  font-weight: normal;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.15rem;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.outline-text {
  color: transparent;
  -webkit-text-stroke: 2.5px #000;
}

.dark-outline {
  color: transparent;
  -webkit-text-stroke: 2.5px #fff;
}

.animated-text {
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
    font-size: 6.5rem;
  }
  
  .content {
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .wave-text {
    font-size: 4rem;
  }
  
  .content {
    min-height: 150px;
  }
}
</style>