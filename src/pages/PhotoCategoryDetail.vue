<template>
  <Header/>
    <main class="px-4 md:px-16 min-h-screen">
      <div class="h-[100px] md:h-[200px]"></div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current mb-4"></div>
        <p class="text-lg font-medium opacity-60">Loading gallery...</p>
      </div>

      <section v-else-if="category">
        <section>
          <CategoryHero v-if="category" :title="category.title" :images="category.images" />
        </section>
        <section>
          <CategoryContent :category="category" />
        </section>
      </section>
      <section v-else class="text-center py-20">
        <p class="text-2xl font-bold mb-4">Gallery not found.</p>
        <router-link to="/photography" class="text-blue-500 hover:underline">Back to Photography</router-link>
      </section>
    </main>
  <Footer/>
</template>
  
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { fetchCategoryBySlug, urlFor } from '../lib/sanity'
import CategoryHero from '../components/CategoryHero.vue'
import CategoryContent from '../components/CategoryContent.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { ref, onMounted, computed } from 'vue'
import { useHead } from '@unhead/vue'

const route = useRoute()
const slug = route.params.category as string
const category = ref<any>(null)
const loading = ref(true)

// Reactive SEO Meta
useHead({
  title: computed(() => category.value ? `${category.value.title} | Yugen Portfolio` : 'Loading... | Yugen'),
  meta: [
    {
      name: 'description',
      content: computed(() => category.value?.seoDescription || category.value?.description || 'Explore our portfolio gallery.')
    },
    { property: 'og:title', content: computed(() => category.value?.title || '') },
    { property: 'og:description', content: computed(() => category.value?.seoDescription || '') },
    { property: 'og:image', content: computed(() => category.value?.mainImage ? urlFor(category.value.mainImage).url() : '') }
  ]
})

onMounted(async () => {
  if (!slug) {
    loading.value = false
    return
  }
  
  try {
    const data = await fetchCategoryBySlug(slug)
    if (data) {
      const centerImageUrl = data.heroImage 
        ? urlFor(data.heroImage).width(1200).auto('format').url() 
        : (data.mainImage ? urlFor(data.mainImage).width(1200).auto('format').url() : null)
      
      const galleryUrls = data.images?.map((img: any) => urlFor(img).width(1200).auto('format').url()) || []
      const allImages = centerImageUrl ? [centerImageUrl, ...galleryUrls] : galleryUrls

      category.value = {
        ...data,
        images: allImages
      }
    }
  } catch (error) {
    console.error('Error fetching category:', error)
  } finally {
    // Ensure loading is false even on error
    setTimeout(() => {
      loading.value = false
    }, 100)
  }
})
</script>
