<template>
  <router-link 
    :to="to" 
    class="relative inline-block overflow-hidden h-[1.2em] group"
    :class="{ 'router-link-active': isActive }"
    custom
    v-slot="{ navigate, isActive: routerIsActive }"
  >
    <a 
      href="#" 
      @click.prevent="navigate(); $emit('click')"
      class="relative inline-block overflow-hidden h-[1.2em] group"
    >
      <span
        class="block transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:-translate-y-full"
        :class="[
          isActive || routerIsActive ? 'text-[#38bdf8]' : '',
          isDark ? 'group-hover:text-[#38bdf8]' : 'group-hover:text-[#38bdf8]'
        ]"
      >
        {{ text }}
      </span>
      <span
        class="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:translate-y-[-100%]"
        :class="[
          isActive || routerIsActive ? 'text-[#38bdf8]' : '',
          isDark ? 'text-[#38bdf8]' : 'text-[#38bdf8]'
        ]"
      >
        {{ text }}
      </span>
    </a>
  </router-link>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
})

// Émettre un événement click pour permettre aux parents de réagir
defineEmits(['click'])

// Récupérer l'état du thème
const isDark = inject('isDark', false)

// Détecter si le lien est actif
const route = useRoute()
const isActive = computed(() => {
  return route.path === props.to
})
</script>