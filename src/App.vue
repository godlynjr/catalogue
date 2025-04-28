<script setup>
import { ref, provide } from 'vue'
import { useTheme } from './composables/useTheme'

// Gestion du thème
const { isDark, toggleDarkMode } = useTheme()
provide('isDark', isDark)
provide('toggleDarkMode', toggleDarkMode)
</script>

<template>
  <div 
    class="min-h-screen transition-colors duration-300"
    :class="isDark ? 'bg-[#121212] text-white' : 'bg-[#f0f7ff] text-black'"
  >
    <router-view />
  </div>
</template>