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

// Récupérer l'état du thème
const isDark = inject('isDark', false)

const categories = [
  {
    title: 'VIENNA',
    link: '/photography/vienna',
    images: [
      'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3', // Image centrale
      'https://images.unsplash.com/photo-1610311979714-9be2cb5b0c64?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3', // Image gauche
      'https://images.unsplash.com/photo-1688410053776-73e1e8643ec9?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3'  // Image droite
    ]
  },
  {
    title: 'COMMERCIAL',
    link: '/photography/commercial',
    images: [
      'https://images.unsplash.com/photo-1744628182969-74140b2b4637?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3', // Image centrale
      'https://images.unsplash.com/photo-1664575600850-e12556639fd5?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3', // Image gauche
      'https://images.unsplash.com/photo-1664575600397-88e8b976d7de?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3'  // Image droite
    ]
  },
  {
    title: 'PEOPLE',
    link: '/photography/people',
    images: [
      'https://images.unsplash.com/photo-1744024865056-a2623d1dd495?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.0.3', // Image centrale
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2376&auto=format&fit=crop&ixlib=rb-4.0.3', // Image gauche
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.0.3'  // Image droite
    ]
  },
  {
    title: 'WEDDINGS',
    link: '/photography/weddings',
    images: [
      'https://plus.unsplash.com/premium_photo-1673266633993-013acd448898?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3', // Image centrale
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3', // Image gauche
      'https://images.unsplash.com/photo-1528429006631-8c9f3e268afd?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3'  // Image droite
    ]
  },
  {
    title: 'EVENTS',
    link: '/photography/events',
    images: [
      'https://images.unsplash.com/photo-1741290728245-2643255e07b5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3', // Image centrale
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3', // Image gauche
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3'  // Image droite
    ]
  },
]
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