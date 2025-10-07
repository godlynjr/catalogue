<template>
  <Header/>
    <main class="px-4 md:px-16">
      <div class="h-[200px]"></div>
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
  <Footer/>
</template>
  
<script setup>
import { useRoute } from 'vue-router'
import { photoCategoriesData } from '../data/photoCategoriesData.js'
import CategoryHero from '../components/CategoryHero.vue'
import CategoryContent from '../components/CategoryContent.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
  
const route = useRoute()
const slug = route.params.category

console.log('Slug trouvé :', slug)
const category = photoCategoriesData.find(c => c.slug.toLowerCase() === slug?.toLowerCase())

console.log('Catégorie :', category)
</script>
