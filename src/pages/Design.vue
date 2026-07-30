<template>
  <Header />
  <main class="px-4 md:px-16 min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current mb-4"></div>
      <p class="text-lg font-medium opacity-60">Loading mood board...</p>
    </div>

    <section v-else-if="designDoc">
      <div class="h-[100px] md:h-[150px]"></div>
      <CategoryContent :category="designDoc" />
    </section>

    <section v-else class="text-center py-20">
      <div class="h-[100px] md:h-[200px]"></div>
      <p class="text-2xl font-bold mb-4">Design section coming soon.</p>
      <router-link to="/" class="text-blue-500 hover:underline text-lg">Back Home</router-link>
    </section>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CategoryContent from '../components/CategoryContent.vue'
import { fetchDesignProjects } from '../lib/sanity'
import { useHead } from '@unhead/vue'

const designDoc = ref<any>(null)
const loading = ref(true)

useHead({
  title: 'Design | Yugen Portfolio',
  meta: [
    { name: 'description', content: 'Explore our mood board, sketches, and creative design work.' }
  ]
})

onMounted(async () => {
  try {
    const data = await fetchDesignProjects()
    if (data && data.length > 0) {
      // For now, we just show the first design document as "the" mood board
      designDoc.value = data[0]
    }
  } catch (error) {
    console.error('Error fetching design:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
h1 {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
