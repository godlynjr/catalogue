<template>
  <router-link :to="link" class="block group">
    <div class="flex flex-col space-y-2">
      <!-- Container pour l'effet d'empilement -->
      <div class="image-stack-wrapper relative aspect-[4/5] mx-auto w-full max-w-[120px] xs:max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]">
        <!-- Image principale visible (première image du tableau) -->
        <img
          v-if="images.length > 0"
          :src="images[0]"
          class="main-image object-cover rounded shadow transition-all duration-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          :class="[
            isDark ? 'border-2 border-gray-800' : 'border-2 border-white',
            'w-[85%] h-[90%]'
          ]"
          alt=""
        />
        
        <!-- Images latérales pour l'effet d'empilement -->
        <div class="stack-background">
          <!-- Image de gauche (deuxième image du tableau) -->
          <img 
            v-if="images.length > 1"
            :src="images[1]" 
            class="stack-image stack-image-left left-0 top-1/2 -translate-y-1/2"
            :class="[
              isDark ? 'border-2 border-gray-800' : 'border-2 border-white',
              'w-[65%] h-[75%]'
            ]"
            alt=""
          />
          
          <!-- Image de droite (troisième image du tableau) -->
          <img 
            v-if="images.length > 2"
            :src="images[2]" 
            class="stack-image stack-image-right right-0 top-1/2 -translate-y-1/2 left-auto"
            :class="[
              isDark ? 'border-2 border-gray-800' : 'border-2 border-white',
              'w-[65%] h-[75%]'
            ]"
            alt=""
          />
        </div>
      </div>
      
      <h2 
        class="text-xs sm:text-sm md:text-base font-semibold text-center mt-1 group-hover:underline transition-colors duration-300"
        :class="isDark ? 'text-white' : 'text-black'"
      >{{ title }}</h2>
    </div>
  </router-link>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0
  },
  link: {
    type: String,
    required: true
  }
})

// Récupérer l'état du thème
const isDark = inject('isDark', false)
</script>

<style scoped>
.image-stack-wrapper {
  position: relative;
  z-index: 1;
  overflow: visible;
  min-height: 120px;
}

@media (min-width: 480px) {
  .image-stack-wrapper {
    min-height: 140px;
  }
}

@media (min-width: 640px) {
  .image-stack-wrapper {
    min-height: 160px;
  }
}

@media (min-width: 768px) {
  .image-stack-wrapper {
    min-height: 180px;
  }
}

.main-image {
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.8s ease-in-out, box-shadow 0.5s ease-in-out, border-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stack-image {
  position: absolute;
  border-radius: 0.25rem;
  object-fit: cover;
  opacity: 0.4;
  transition: all 0.8s ease-in-out, border-color 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Styles pour l'image de gauche */
.stack-image-left {
  transform: rotate(-5deg) translateX(-10%);
  z-index: 3;
}

/* Styles pour l'image de droite */
.stack-image-right {
  transform: rotate(5deg) translateX(10%);
  z-index: 2;
}

/* Animations au survol */
.group:hover .main-image {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.group:hover .stack-image-left {
  opacity: 0.9;
  transform: rotate(-10deg) translateX(-30%) scale(0.9);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.group:hover .stack-image-right {
  opacity: 0.9;
  transform: rotate(10deg) translateX(30%) scale(0.9);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

/* Ajustements pour le dark mode */
:deep(.dark) .main-image {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:deep(.dark) .stack-image {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

:deep(.dark) .group:hover .main-image {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

:deep(.dark) .group:hover .stack-image {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
}

/* Optimisations pour tactile */
@media (hover: none) {
  .stack-image {
    opacity: 0.7;
  }
}
</style>