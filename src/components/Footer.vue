<template>
  <footer 
    class="relative bg-neutral-900 text-gray-300 mt-20 border-t border-neutral-800 overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      
      <!-- Column 1: Logo + Brand -->
      <div class="flex flex-col items-start space-y-4">
        <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
          <span class="text-lg font-semibold text-white tracking-wide">Nami</span>
        </router-link>
        <p class="text-sm text-gray-400 max-w-xs leading-relaxed">
          Crafting timeless visuals through travel, photography, and design.
        </p>
      </div>

      <!-- Column 2: Sitemap -->
      <div>
        <h3 class="font-semibold text-sm text-gray-400 mb-3">SITEMAP</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="link in links" :key="link.text">
            <router-link 
              :to="link.to"
              class="hover:text-white transition duration-300 inline-block hover:translate-x-1"
            >
              {{ link.text }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Column 3: Social -->
      <div>
        <h3 class="font-semibold text-sm text-gray-400 mb-3">SOCIAL</h3>
        <div class="flex items-center gap-5 mt-2">
          <a v-for="(icon, name) in socialIcons" 
             :key="name" 
             :href="icon.link" 
             target="_blank" 
             rel="noopener" 
             class="group"
          >
            <component 
              :is="icon.icon" 
              class="w-5 h-5 text-gray-400 group-hover:text-white transition-transform group-hover:-translate-y-1 duration-300"
            />
          </a>
        </div>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="border-t border-neutral-800 mt-8">
      <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {{ new Date().getFullYear() }} Nami. All rights reserved.</p>
        <p class="mt-2 sm:mt-0">Made with ❤️ by Godlyn KIKISSAGBE</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Instagram, Linkedin, Youtube } from 'lucide-vue-next'

const links = [
  { text: 'Home', to: '/' },
  { text: 'Travel', to: '/travel' },
  { text: 'Photography', to: '/photography' },
  { text: 'Video', to: '/video' },
  { text: 'Design', to: '/design' },
  { text: 'About', to: '/about' }
]

const socialIcons = {
  Instagram: { icon: Instagram, link: 'https://instagram.com/' },
  Linkedin: { icon: Linkedin, link: 'https://linkedin.com/' },
  Youtube: { icon: Youtube, link: 'https://youtube.com/' }
}
</script>

<style scoped>
footer {
  background: linear-gradient(180deg, #111 0%, #0b0b0b 100%);
}
</style>
