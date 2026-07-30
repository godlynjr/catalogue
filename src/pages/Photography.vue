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

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current mb-4"></div>
      <p class="text-lg font-medium opacity-60">Loading masterpieces...</p>
    </div>

    <!-- Grid of categories -->
    <section v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-8">
      <PhotoCategory
        v-for="cat in categories"
        :key="cat.title"
        :title="cat.title"
        :images="cat.images"
        :slug="cat.slug"
      />
    </section>

    <!-- Before & After Section -->
    <section class="max-w-5xl mx-auto py-20 px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4" style="font-family: 'Bebas Neue', sans-serif;">The Power of Post-Processing</h2>
        <p class="text-gray-600 dark:text-gray-300">Slide to see how we transform raw moments into visual masterpieces.</p>
      </div>
      <BeforeAfterSlider 
        before-image="https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?q=80" 
        after-image="https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?q=80&sat=-100" 
      />
    </section>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import PhotoCategory from '../components/PhotoCategory.vue'
import BeforeAfterSlider from '../components/BeforeAfterSlider.vue'
import { fetchPhotographyCategories, urlFor } from '../lib/sanity'
import { photoCategoriesData } from '../data/photoCategoriesData'
import { useHead } from '@unhead/vue'

const isDark = inject('isDark', false)

useHead({
  title: 'Photography | Yugen Portfolio',
  meta: [
    { name: 'description', content: 'Explore our curated collection of professional photography across various styles and destinations.' }
  ]
})
const categories = ref<any[]>([])
const loading = ref(true)

const text = 'PHOTOGRAPHY'
const letters = ref<string[]>([])

onMounted(async () => {
  letters.value = text.split('')
  try {
    const data = await fetchPhotographyCategories()
    if (data && data.length > 0) {
      categories.value = data.map((item: any) => {
        const coverImages: string[] = []
        if (item.mainImage) {
          coverImages.push(urlFor(item.mainImage).width(800).auto('format').url())
        }
        
        // Add images from the editorial layout if they exist and images array is empty
        let extraImages: string[] = []
        if (item.images && item.images.length > 0) {
          extraImages = item.images.map((img: any) => urlFor(img).width(800).auto('format').url())
        } else if (item.editorialLayout) {
          // Flatten images from blocks if needed
          item.editorialLayout.forEach((block: any) => {
            if (block.images) extraImages.push(...block.images.map((img: any) => urlFor(img).width(800).auto('format').url()))
            if (block.image) extraImages.push(urlFor(block.image).width(800).auto('format').url())
          })
        }

        return {
          ...item,
          images: [...coverImages, ...extraImages].slice(0, 3) // Need at least 2 for stack
        }
      })
    } else {
      // Fallback to static data if Sanity is empty
      categories.value = photoCategoriesData
    }
  } catch (error) {
    console.error('Error fetching photography:', error)
    categories.value = photoCategoriesData // Fallback on error
  } finally {
    loading.value = false
  }
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
