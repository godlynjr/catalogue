<template>
  <Header/>
    <main class="px-4 md:px-16">
      <div class="h-[200px]"></div>
      <!-- <section v-if="category">
        <h1 class="text-5xl font-bold mb-4">{{ category.title }}</h1>
        <p class="mb-6">{{ category.description }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <img 
            v-for="(img, index) in category.images" 
            :src="img" 
            :key="index"
            class="rounded shadow w-full object-cover"
          />
        </div>
      </section> -->
      <section v-if="category">
        <section>
          <CategoryHero v-if="category" :title="category.title" :images="category.images" />
        </section>
        <section>
          <CategoryContent :category="category" />
        </section>

      </section>
      <section v-else>
        <p>Catégorie non trouvée.</p>
      </section>
    </main>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { photoCategoriesData } from '../data/photoCategoriesData.js'
import CategoryHero from '../components/CategoryHero.vue'
import CategoryContent from '../components/CategoryContent.vue'
import Header from '../components/Header.vue'
  
  const route = useRoute()
  const slug = route.params.category
  
  console.log('Slug trouvé :', slug)
  // IMPORTANT : slug peut être en majuscules/minuscules différentes
  const category = photoCategoriesData.find(c => c.slug.toLowerCase() === slug?.toLowerCase())
  
  console.log('Catégorie :', category)
  </script>
  