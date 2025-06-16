<template>
  <section class="bg-[#f0f7ff] py-16 md:py-24">
    <!-- Hero Introduction Image -->
    <div class="px-4 md:px-16 mb-16 md:mb-24">
      <div 
        class="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
        @mouseenter="handleImageHover"
      >
        <img 
          :src="getImage(0)" 
          alt="Hero introduction"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>

    <!-- Description Section with Typing Animation -->
    <div class="px-4 md:px-16 mb-16 md:mb-24">
      <div class="max-w-4xl mx-auto">
        <h2 
          class="text-4xl md:text-6xl font-bold mb-8 text-center"
          :style="{ fontFamily: 'Bebas Neue, Arial Black, sans-serif' }"
          ref="titleRef"
        >
          {{ category.title }}
        </h2>
        <div class="text-lg md:text-xl leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
          <p ref="descriptionRef" class="typing-text">
            {{ displayedDescription }}
            <span class="cursor" :class="{ 'blinking': displayedDescription.length > 0 && displayedDescription.length < fullDescription.length }">|</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Layout Block 1: Grid of 3 Images -->
    <div class="px-4 md:px-16 mb-16 md:mb-24" ref="grid1Ref" v-if="getImage(1)">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
        <div 
          v-for="(image, index) in getImageRange(1, 3)"
          :key="`grid1-${index}`"
          class="image-card aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <img 
            :src="image" 
            :alt="`Gallery image ${index + 2}`"
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
        </div>
      </div>
    </div>

    <!-- Layout Block 2: Large Horizontal Image -->
    <div class="px-4 md:px-16 mb-16 md:mb-24" ref="horizontal1Ref" v-if="getImage(4)">
      <div class="w-full mx-auto">
        <div class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer feature-image">
          <img 
            :src="getImage(4)" 
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
          <div class="image-card aspect-[3/2] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
            <img 
              :src="getImage(5)" 
              alt="Large dual image"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        </div>
        <div class="md:col-span-1" v-if="getImage(6)">
          <div class="image-card aspect-[3/4] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
            <img 
              :src="getImage(6)" 
              alt="Small dual image"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Layout Block 4: Grid of 3 Images -->
    <div class="px-4 md:px-16 mb-16 md:mb-24" ref="grid2Ref" v-if="getImage(7)">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mx-auto">
        <div 
          v-for="(image, index) in getImageRange(7, 3)"
          :key="`grid2-${index}`"
          class="image-card aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <img 
            :src="image" 
            :alt="`Gallery image ${index + 8}`"
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
        </div>
      </div>
    </div>

    <!-- Second Description with Bidirectional Typing Animation -->
    <div class="px-4 md:px-16 mb-16 md:mb-24" v-if="getImage(10)">
      <div class="max-w-4xl mx-auto">
        <div class="text-lg md:text-xl leading-relaxed text-gray-700 text-center">
          <p ref="secondDescriptionRef" class="typing-text-secondary">
            {{ displayedSecondDescription }}
            <span class="cursor" :class="{ 'blinking': displayedSecondDescription.length > 0 && displayedSecondDescription.length < fullSecondDescription.length }">|</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Layout Block 5: Large Horizontal Image -->
    <div class="px-4 md:px-16 mb-16 md:mb-24" ref="horizontal2Ref" v-if="getImage(10)">
      <div class="w-full mx-auto">
        <div class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer feature-image">
          <img 
            :src="getImage(10)" 
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
          <div class="image-card aspect-[3/4] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
            <img 
              :src="getImage(11)" 
              alt="Small dual image 2"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        </div>
        <div class="md:col-span-2 md:order-2" v-if="getImage(12)">
          <div class="image-card aspect-[3/2] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
            <img 
              :src="getImage(12)" 
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
          class="image-card aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <img 
            :src="image" 
            :alt="`Gallery image ${index + 14}`"
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
        </div>
      </div>
    </div>

    <!-- Layout Block 8: Large Horizontal Image -->
    <div class="px-4 md:px-16 mb-16 md:mb-24" ref="horizontal3Ref" v-if="getImage(16)">
      <div class="w-full mx-auto">
        <div class="w-full h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer feature-image">
          <img 
            :src="getImage(16)" 
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
          class="final-image aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <img 
            :src="image" 
            :alt="`Final gallery image ${index + 18}`"
            class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  category: { type: Object, required: true }
})

// Refs for scroll animations
const titleRef = ref(null)
const descriptionRef = ref(null)
const secondDescriptionRef = ref(null)
const grid1Ref = ref(null)
const grid2Ref = ref(null)
const grid3Ref = ref(null)
const horizontal1Ref = ref(null)
const horizontal2Ref = ref(null)
const horizontal3Ref = ref(null)
const dual1Ref = ref(null)
const dual2Ref = ref(null)
const finalGridRef = ref(null)

// Typing animation states
const displayedDescription = ref('')
const displayedSecondDescription = ref('')
const fullDescription = ref('')
const fullSecondDescription = ref('')

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
const getImage = (index) => {
  const images = props.category.images || []
  if (images.length === 0) return null
  return images[index % images.length]
}

const getImageRange = (startIndex, count) => {
  const images = props.category.images || []
  if (images.length === 0) return []
  
  const result = []
  for (let i = 0; i < count; i++) {
    const imageIndex = (startIndex + i) % images.length
    if (images[imageIndex]) {
      result.push(images[imageIndex])
    }
  }
  return result
}

const getRemainingImages = (startIndex) => {
  const images = props.category.images || []
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
const updateTypingProgress = (element, progress, textRef, displayRef) => {
  if (!textRef.value) return
  
  const totalLength = textRef.value.length
  const targetLength = Math.floor(totalLength * progress)
  displayRef.value = textRef.value.substring(0, Math.max(0, targetLength))
}

// Regular observer for image animations
const createObserver = (element, callback, threshold = 0.1) => {
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

let observers = []

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
  fullDescription.value = getDescription()
  fullSecondDescription.value = getSecondDescription()
  
  // Add scroll listener for typing updates
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Set up scroll-triggered animations
  setTimeout(() => {
    // Grid animations
    const setupGridAnimation = (gridRef, className) => {
      if (!gridRef.value) return
      const observer = createObserver(gridRef.value, () => {
        const cards = gridRef.value.querySelectorAll(className)
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
    const setupFeatureAnimation = (featureRef) => {
      if (!featureRef.value) return
      const observer = createObserver(featureRef.value, () => {
        featureRef.value.querySelector('.feature-image').classList.add('slide-up')
      })
      if (observer) observers.push(observer)
    }
    
    setupFeatureAnimation(horizontal1Ref)
    setupFeatureAnimation(horizontal2Ref)
    setupFeatureAnimation(horizontal3Ref)
    
    // Final grid animation
    if (finalGridRef.value) {
      const finalObserver = createObserver(finalGridRef.value, () => {
        const images = finalGridRef.value.querySelectorAll('.final-image')
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
  background-color: #000;
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.final-image:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .typing-text, .typing-text-secondary {
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>