<template>
  <div 
    class="horizontal-scroll-container overflow-x-auto md:overflow-hidden py-10 md:py-20 no-scrollbar" 
    :class="{'snap-x snap-mandatory': isMobile}"
    ref="containerRef"
  >
    <div 
      class="flex gap-4 md:gap-8 px-6 md:px-[10vw] flex-nowrap" 
      ref="galleryRef"
    >
      <div v-for="(image, index) in images" 
           :key="index"
           class="gallery-item flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer snap-center"
           @click="$emit('open-lightbox', image)">
        <img :src="image" 
             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
             :alt="`Gallery image ${index + 1}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{
  images: string[]
}>()

defineEmits(['open-lightbox'])

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref<HTMLElement | null>(null)
const galleryRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)

let ctx: gsap.Context

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  if (!containerRef.value || !galleryRef.value) return

  // Only apply GSAP pinning on desktop
  if (!isMobile.value) {
    ctx = gsap.context(() => {
      const totalWidth = galleryRef.value!.scrollWidth
      const viewportWidth = window.innerWidth
      const xDist = totalWidth - viewportWidth + (viewportWidth * 0.2)

      gsap.to(galleryRef.value, {
        x: () => -xDist,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      })
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.horizontal-scroll-container {
  width: 100%;
  display: flex;
  align-items: center;
  -webkit-overflow-scrolling: touch;
}

/* Desktop specific height */
@media (min-width: 768px) {
  .horizontal-scroll-container {
    height: 100vh;
  }
}

/* Hide scrollbar but keep functionality */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.gallery-item {
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
</style>
