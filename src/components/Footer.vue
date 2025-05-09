<template>
  <footer class="bg-neutral-900 text-white mt-20">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-10">
      <!-- Sitemap -->
      <div>
        <h3 class="font-bold mb-2 text-lg opacity-50 border-b-2">SITEMAP</h3>
        <ul class="space-y-1 text-lg">
          <li v-for="(item) in siteMapItems" :key="item.text" class="">
            <FancyLink :to="item.to" :text="item.text" />
          </li>

        </ul>
      </div>

      <!-- Social -->
      <div>
        <h3 class="font-bold mb-2 text-lg opacity-50  border-b-2">SOCIAL</h3>
        <ul class="space-y-1 text-lg">
          
          <li v-for="(item) in socialItems" :key="item.text" class="">
            <FancyLink :to="item.to" :text="item.text" />
          </li>

        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="font-bold mb-2 text-lg opacity-50  border-b-2">CONTACT</h3>
        <ul class="space-y-1 text-lg">
          
          <li v-for="(item) in contactItems" :key="item.text" class="">
            <FancyLink :to="item.to" :text="item.text" />
          </li>

        </ul>

        <h3 class="font-bold mb-2 text-lg mt-10 opacity-50  border-b-2">LEGAL DETAILS</h3>
        <ul class="space-y-1 text-lg">
          <li><a href="mailto:hello@christiankremser.com" class="hover:underline">hello@christiankremser.com</a></li>
          <li><a href="tel:+4367767705016" class="hover:underline">+43 (677) 677 050 16</a></li>
          <li class="mt-2">©2024 Christian Kremser</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>

import FancyLink from './FancyLink.vue'

defineProps({
  visible: { type: Boolean, default: true }
})


const siteMapItems = [
  { text: 'Home', to: '/' },
  { text: 'Travel', to: '/travel' },
  { text: 'Photography', to: '/photography' },
  { text: 'Video', to: '/video' },
  { text: 'Design', to: '/design' },
  { text: 'About', to: '/about' },
]

const socialItems = [
  { text: 'INSTAGRAM', to: '/travel' },
  { text: 'LINKEDIN', to: '/photography' },
  { text: 'YOUTUBE', to: '/video' },
]

const contactItems = [
  { text: 'hello@christiankremser.com', to: '/contact' },
  { text: '+229 01 51 92 70 67', to: '/contact' },
]

const DetailsItems = [
  { text: 'PRIVACY POLICY', to: '/privacy' },
  { text: 'IMPRINT', to: '/imprint' },
]

</script>
  