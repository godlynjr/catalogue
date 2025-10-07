<template>
  <router-link :to="`/category/${slug}`" class="block group">
    <div class="flex flex-col space-y-2">
      <div
        class="image-stack-wrapper relative aspect-[4/5] mx-auto w-full max-w-[120px] xs:max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
      >
        <!-- Main image -->
        <img
          v-if="images.length > 0"
          :src="images[0]"
          loading="lazy"
          class="main-image object-cover rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          :class="[isDark ? 'border-2 border-gray-800' : 'border-2 border-white','w-[85%] h-[90%]']"
          alt=""
        />

        <!-- Secondary image (optional, for stack effect) -->
        <img
          v-if="images.length > 1"
          :src="images[1]"
          loading="lazy"
          class="stack-image-left object-cover rounded absolute top-1/2 -translate-y-1/2 left-0"
          :class="[isDark ? 'border-2 border-gray-800' : 'border-2 border-white','w-[65%] h-[75%]']"
          alt=""
        />
      </div>

      <!-- Category title -->
      <h2
        class="text-xs sm:text-sm md:text-base font-semibold text-center mt-1 group-hover:underline transition-colors duration-300"
        :class="isDark ? 'text-white' : 'text-black'"
      >
        {{ title }}
      </h2>
    </div>
  </router-link>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  title: String,
  images: Array,
  slug: String,
})

const isDark = inject('isDark', false)
</script>

<style scoped>
.image-stack-wrapper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  min-height: 120px;
}

/* Responsive min-height */
@media (min-width: 480px) { .image-stack-wrapper { min-height: 140px; } }
@media (min-width: 640px) { .image-stack-wrapper { min-height: 160px; } }
@media (min-width: 768px) { .image-stack-wrapper { min-height: 180px; } }

.main-image {
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.4s ease-in-out;
}

.stack-image-left {
  transform: rotate(-5deg);
  transition: transform 0.4s ease-in-out;
  opacity: 0.8;
}

/* Hover effects: GPU-friendly only */
.group:hover .main-image {
  transform: scale(1.05);
}

.group:hover .stack-image-left {
  transform: scale(0.9) rotate(-10deg);
}

/* Dark mode adjustments */
:deep(.dark) .main-image {
  border-color: #333;
}

:deep(.dark) .stack-image-left {
  border-color: #333;
}

/* Mobile adjustments for hover-disabled devices */
@media (hover: none) {
  .stack-image-left { opacity: 0.7; }
}
</style>
