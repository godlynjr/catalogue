<template>
  <section 
    class="py-16 md:py-24"
    :class="isDark ? '' : 'bg-[#f0f7ff]'"
  >
    <Lightbox :is-open="lightboxOpen" :image-src="lightboxImage" @close="lightboxOpen = false" />
    
    <!-- Hero & Description (Always Present) -->
    <div class="px-4 md:px-16 mb-16 md:mb-24">
        <div 
        class="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
        @click="openLightbox(urlFor(category.mainImage).url())"
      >
        <img            :src="category.mainImage ? urlFor(category.mainImage).width(1600).auto('format').url() : getImage(0) ?? undefined" 
          alt="Hero introduction"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>

    <div class="px-4 md:px-16 mb-16 md:mb-24">
      <div class="max-w-4xl mx-auto">
        <h2 
          class="text-4xl md:text-6xl font-bold mb-8 text-center transition-colors duration-300"
          :class="isDark ? 'text-white' : 'text-black'"
          :style="{ fontFamily: 'Bebas Neue, Arial Black, sans-serif' }"
          ref="titleRef"
        >
          {{ category.title }}
        </h2>
        <div 
          v-if="category.description"
          class="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto transition-colors duration-300"
          :class="isDark ? 'text-gray-300' : 'text-gray-700'"
        >
          <p ref="descriptionRef" class="typing-text">
            {{ displayedDescription }}
            <span 
              class="cursor transition-colors duration-300" 
              :class="{ 
                'blinking': displayedDescription.length > 0 && displayedDescription.length < fullDescription.length,
                'bg-white': isDark,
                'bg-black': !isDark
              }"
            >|</span>
          </p>
        </div>
      </div>
    </div>

    <!-- IF MODULAR LAYOUT EXISTS -->
    <template v-if="category.editorialLayout && category.editorialLayout.length > 0">
      <div v-for="(block, bIndex) in category.editorialLayout" :key="`block-${bIndex}`">
        
        <!-- Text Block (Modular) -->
        <div v-if="block._type === 'textBlock'" class="px-4 md:px-16 mb-16 md:mb-24">
          <div class="max-w-4xl mx-auto">
            <div 
              class="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto transition-colors duration-300"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              <p class="typing-text opacity-80">
                {{ block.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- Grid Block (3 images) -->
        <div v-if="block._type === 'gridBlock'" class="px-4 md:px-16 mb-16 md:mb-24">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
            <div 
              v-for="(image, iIndex) in block.images"
              :key="`grid-${bIndex}-${iIndex}`"
              class="image-card aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300 animate-in"
              :class="[
                isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
              ]"
              @click="openLightbox(image)"
            >
              <img :src="image" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
            </div>
          </div>
        </div>

        <!-- Horizontal Block -->
        <div v-if="block._type === 'horizontalBlock'" class="px-4 md:px-16 mb-16 md:mb-24">
          <div 
            class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden group cursor-pointer feature-image slide-up transition-all duration-300"
            :class="isDark ? 'shadow-2xl shadow-black/50' : 'shadow-2xl'"
            @click="openLightbox(block.image)"
          >
            <img :src="block.image" class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
          </div>
        </div>

        <!-- Dual Block -->
        <div v-if="block._type === 'dualBlock'" class="px-4 md:px-16 mb-16 md:mb-24">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
            <div :class="block.reversed ? 'md:col-span-1 md:order-2' : 'md:col-span-2 md:order-1'">
              <div 
                class="image-card aspect-[3/2] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300 animate-in"
                :class="[isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200']"
                @click="openLightbox(block.leftImage)"
              >
                <img :src="block.leftImage" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
              </div>
            </div>
            <div :class="block.reversed ? 'md:col-span-2 md:order-1' : 'md:col-span-1 md:order-2'">
              <div 
                class="image-card aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300 animate-in"
                :class="[isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200']"
                @click="openLightbox(block.rightImage)"
              >
                <img :src="block.rightImage" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery Block -->
        <div v-if="block._type === 'galleryBlock'" class="mb-16 md:mb-24">
          <h3 class="text-3xl font-bold mb-8 px-4 md:px-16" :class="isDark ? 'text-white' : 'text-black'">{{ block.title }}</h3>
          <HorizontalGallery :images="block.images" @open-lightbox="openLightbox" />
        </div>

      </div>
    </template>

    <!-- FALLBACK TO HARDCODED LAYOUT (For legacy or quick setup) -->
    <template v-else>
      <!-- Description Section with Typing Animation (Only Title since Hero is now shared) -->
      <div class="px-4 md:px-16 mb-16 md:mb-24">
        <!-- We can keep this empty or remove it as it's now handled above -->
      </div>

      <!-- Layout Block 1: Grid of 3 Images -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="grid1Ref" v-if="getImage(1)">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
          <div 
            v-for="(image, index) in getImageRange(1, 3)"
            :key="`grid1-${index}`"
            class="image-card aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
            :class="[
              isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
            ]"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="openLightbox(image)"
          >
            <img 
              :src="image ?? undefined" 
              :alt="`Gallery image ${index + 2}`"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        </div>
      </div>

      <!-- Layout Block 2: Large Horizontal Image -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="horizontal1Ref" v-if="getImage(4)">
        <div class="w-full mx-auto">
          <div 
            class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden group cursor-pointer feature-image transition-all duration-300"
            :class="isDark ? 'shadow-2xl shadow-black/50' : 'shadow-2xl'"
          >
            <img 
              :src="getImage(4) ?? undefined" 
              alt="Horizontal showcase"
              class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <!-- Layout Block 3: Two Images Side by Side (One Larger) -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="dual1Ref" v-if="getImage(5)">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
          <div class="md:col-span-2">
            <div 
              class="image-card aspect-[3/2] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
              :class="[
                isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
              ]"
            >
              <img 
                :src="getImage(5) ?? undefined" 
                alt="Large dual image"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>
          <div class="md:col-span-1" v-if="getImage(6)">
            <div 
              class="image-card aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
              :class="[
                isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
              ]"
            >
              <img 
                :src="getImage(6) ?? undefined" 
                alt="Small dual image"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal Gallery Showcase -->
      <div class="mb-16 md:mb-24">
        <h3 class="text-3xl font-bold mb-8 px-4 md:px-16" :class="isDark ? 'text-white' : 'text-black'">Gallery Highlights</h3>
        <HorizontalGallery :images="category.images" @open-lightbox="openLightbox" />
      </div>

      <!-- Layout Block 4: Grid of 3 Images -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="grid2Ref" v-if="getImage(7)">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
          <div 
            v-for="(image, index) in getImageRange(7, 3)"
            :key="`grid2-${index}`"
            class="image-card aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
            :class="[
              isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
            ]"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="openLightbox(image)"
          >
            <img 
              :src="image ?? undefined" 
              :alt="`Gallery image ${index + 8}`"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        </div>
      </div>

      <!-- Second Description with Bidirectional Typing Animation -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" v-if="getImage(10)">
        <div class="max-w-4xl mx-auto">
          <div 
            class="text-lg md:text-xl leading-relaxed text-center transition-colors duration-300"
            :class="isDark ? 'text-gray-300' : 'text-gray-700'"
          >
            <p ref="secondDescriptionRef" class="typing-text-secondary">
              {{ displayedSecondDescription }}
              <span 
                class="cursor transition-colors duration-300" 
                :class="{ 
                  'blinking': displayedSecondDescription.length > 0 && displayedSecondDescription.length < fullSecondDescription.length,
                  'bg-white': isDark,
                  'bg-black': !isDark
                }"
              >|</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Layout Block 5: Large Horizontal Image -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="horizontal2Ref" v-if="getImage(10)">
        <div class="w-full mx-auto">
          <div 
            class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden group cursor-pointer feature-image transition-all duration-300"
            :class="isDark ? 'shadow-2xl shadow-black/50' : 'shadow-2xl'"
          >
            <img 
              :src="getImage(10) ?? undefined" 
              alt="Second horizontal showcase"
              class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <!-- Layout Block 6: Two Images Side by Side (Reversed - Small then Large) -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="dual2Ref" v-if="getImage(11)">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
          <div class="md:col-span-1 md:order-1" v-if="getImage(11)">
            <div 
              class="image-card aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
              :class="[
                isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
              ]"
            >
              <img 
                :src="getImage(11) ?? undefined" 
                alt="Small dual image 2"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>
          <div class="md:col-span-2 md:order-2" v-if="getImage(12)">
            <div 
              class="image-card aspect-[3/2] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
              :class="[
                isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
              ]"
            >
              <img 
                :src="getImage(12) ?? undefined" 
                alt="Large dual image 2"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Layout Block 7: Grid of 3 Images -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="grid3Ref" v-if="getImage(13)">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
          <div 
            v-for="(image, index) in getImageRange(13, 3)"
            :key="`grid3-${index}`"
            class="image-card aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
            :class="[
              isDark ? 'shadow-xl shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-xl border-white hover:border-gray-200'
            ]"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <img 
              :src="image ?? undefined" 
              :alt="`Gallery image ${index + 14}`"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        </div>
      </div>

      <!-- Layout Block 8: Large Horizontal Image -->
      <div class="px-4 md:px-16 mb-16 md:mb-24" ref="horizontal3Ref" v-if="getImage(16)">
        <div class="w-full mx-auto">
          <div 
            class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden group cursor-pointer feature-image transition-all duration-300"
            :class="isDark ? 'shadow-2xl shadow-black/50' : 'shadow-2xl'"
          >
            <img 
              :src="getImage(16) ?? undefined" 
              alt="Third horizontal showcase"
              class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <!-- Layout Block 9: Final Grid of Remaining Images -->
      <div class="px-4 md:px-16" ref="finalGridRef" v-if="getImage(17)">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mx-auto">
          <div 
            v-for="(image, index) in getRemainingImages(17)"
            :key="`final-${index}`"
            class="final-image aspect-square rounded-xl overflow-hidden group cursor-pointer border-4 transition-all duration-300"
            :class="[
              isDark ? 'shadow-lg shadow-black/50 border-gray-700 hover:border-gray-600' : 'shadow-lg border-white hover:border-gray-200'
            ]"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <img 
              :src="image ?? undefined" 
              :alt="`Final gallery image ${index + 18}`"
              class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
            />
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, onBeforeUnmount, inject, computed, type Ref } from 'vue'
import Lightbox from './Lightbox.vue'
import HorizontalGallery from './HorizontalGallery.vue'

const props = defineProps<{
  category: {
    title: string;
    description?: string;
    secondDescription?: string;
    images: string[];
    slug: string;
    mainImage?: any;
    editorialLayout?: any[];
  }
}>()

import { urlFor } from '../lib/sanity'

// Inject dark mode state
const isDark = inject('isDark', false)

// Lightbox state
const lightboxOpen = ref(false)
const lightboxImage = ref('')

const openLightbox = (src: string | null) => {
  if (!src) return
  lightboxImage.value = src
  lightboxOpen.value = true
}

// Refs for scroll animations
const titleRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const secondDescriptionRef = ref<HTMLElement | null>(null)
const grid1Ref = ref<HTMLElement | null>(null)
const grid2Ref = ref<HTMLElement | null>(null)
const grid3Ref = ref<HTMLElement | null>(null)
const horizontal1Ref = ref<HTMLElement | null>(null)
const horizontal2Ref = ref<HTMLElement | null>(null)
const horizontal3Ref = ref<HTMLElement | null>(null)
const dual1Ref = ref<HTMLElement | null>(null)
const dual2Ref = ref<HTMLElement | null>(null)
const finalGridRef = ref<HTMLElement | null>(null)

// Typing animation states
const displayedDescription = ref<string>('')
const displayedSecondDescription = ref<string>('')
const fullDescription = ref<string>('')
const fullSecondDescription = ref<string>('')

// Sample descriptions
const getDescription = () => {
  return props.category.description || 
    `Discover the breathtaking beauty and rich cultural heritage that makes ${props.category.title.toLowerCase()} an unforgettable destination. Through these carefully curated moments, we invite you to experience the essence of this remarkable place.`
}

const getSecondDescription = () => {
  return props.category.secondDescription || 
    `Every photograph tells a story, capturing fleeting moments that transform into lasting memories. Here, artistry meets authenticity in a visual journey that celebrates the unique character and timeless appeal of ${props.category.title.toLowerCase()}.`
}

// Smart image handling functions
const getImage = (index: number) => {
  const images: string[] = props.category.images || []
  if (images.length === 0) return null
  return images[index % images.length]
}

const getImageRange = (startIndex: number, count: number) => {
  const images: string[] = props.category.images || []
  if (images.length === 0) return []
  
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    const imageIndex = (startIndex + i) % images.length
    if (images[imageIndex]) {
      result.push(images[imageIndex])
    }
  }
  return result
}

const getRemainingImages = (startIndex: number) => {
  const images: string[] = props.category.images || []
  if (images.length === 0) return []
  
  // Get remaining images or cycle through if we have fewer than needed
  const remaining = images.slice(startIndex)
  if (remaining.length >= 4) {
    return remaining.slice(0, 4)
  } else {
    // Fill with cycling images if needed
    const result = [...remaining]
    while (result.length < 4 && images.length > 0) {
      result.push(images[result.length % images.length])
    }
    return result.slice(0, 4)
  }
}

// Simple bidirectional typing function based on scroll progress
const updateTypingProgress = (element: HTMLElement | null, progress: number, textRef: { value: string }, displayRef: { value: string }) => {
  if (!textRef.value || !element) return
  
  const totalLength = textRef.value.length
  const targetLength = Math.floor(totalLength * progress)
  displayRef.value = textRef.value.substring(0, Math.max(0, targetLength))
}

// Regular observer for image animations
const createObserver = (element: HTMLElement | null, callback: () => void, threshold = 0.1) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold }
  )
  
  if (element) {
    observer.observe(element)
    return observer
  }
}

let observers: IntersectionObserver[] = []

const handleImageHover = () => {
  // Add any hover effects here
}

// Scroll event listener for typing updates
const handleScroll = () => {
  // Update first description
  if (descriptionRef.value && fullDescription.value) {
    const rect = descriptionRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      let progress = 1 - ((rect.bottom - windowHeight * 0.5) / (windowHeight * 0.3))
      progress = Math.max(0, Math.min(1, progress))
      updateTypingProgress(descriptionRef.value, progress, fullDescription, displayedDescription)
    }
  }
  
  // Update second description
  if (secondDescriptionRef.value && fullSecondDescription.value) {
    const rect = secondDescriptionRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      let progress = 1 - ((rect.bottom - windowHeight * 0.5) / (windowHeight * 0.3))
      progress = Math.max(0, Math.min(1, progress))
      updateTypingProgress(secondDescriptionRef.value, progress, fullSecondDescription, displayedSecondDescription)
    }
  }
}

onMounted(() => {
  // Initialize full text content
  fullDescription.value = props.category.description || getDescription()
  fullSecondDescription.value = props.category.secondDescription || getSecondDescription()
  
  // Reset displayed text to allow animation to start from scroll
  displayedDescription.value = ''
  displayedSecondDescription.value = ''

  // Add scroll listener for typing updates
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Set up scroll-triggered animations
  setTimeout(() => {
    // Grid animations
    const setupGridAnimation = (gridRef: { value: HTMLElement | null }, className: string) => {
      if (!gridRef.value) return
      const observer = createObserver(gridRef.value, () => {
        const cards = gridRef.value!.querySelectorAll(className)
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-in')
          }, index * 150)
        })
      })
      if (observer) observers.push(observer)
    }
    
    setupGridAnimation(grid1Ref, '.image-card')
    setupGridAnimation(grid2Ref, '.image-card')
    setupGridAnimation(grid3Ref, '.image-card')
    setupGridAnimation(dual1Ref, '.image-card')
    setupGridAnimation(dual2Ref, '.image-card')
    
    // Feature images animation
    const setupFeatureAnimation = (featureRef: { value: HTMLElement | null }) => {
      if (!featureRef.value) return
      const observer = createObserver(featureRef.value, () => {
        featureRef.value!.querySelector('.feature-image')?.classList.add('slide-up')
      })
      if (observer) observers.push(observer)
    }
    
    setupFeatureAnimation(horizontal1Ref)
    setupFeatureAnimation(horizontal2Ref)
    setupFeatureAnimation(horizontal3Ref)
    
    // Final grid animation
    if (finalGridRef.value) {
      const finalObserver = createObserver(finalGridRef.value, () => {
        const images = finalGridRef.value!.querySelectorAll('.final-image')
        images.forEach((img) => {
          img.classList.add('fade-in-up')
        })
      })
      if (finalObserver) observers.push(finalObserver)
    }
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observers.forEach(observer => observer.disconnect())
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

/* Typing animation styles */
.cursor {
  display: inline-block;
  width: 2px;
  margin-left: 2px;
}

.cursor.blinking {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Scroll animation styles */
.image-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.image-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-image {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

.feature-image.slide-up {
  opacity: 1;
  transform: translateY(0);
}

.final-image {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.final-image.fade-in-up {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.image-card:hover {
  transform: translateY(-5px);
}

.final-image:hover {
  transform: translateY(-3px);
}

/* Custom dark mode shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .typing-text, .typing-text-secondary {
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>