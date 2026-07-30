<template>
  <div class="relative w-full aspect-video overflow-hidden rounded-xl cursor-col-resize select-none"
       @mousemove="handleMove"
       @touchmove="handleMove"
       @mousedown="isDragging = true"
       @mouseup="isDragging = false"
       @mouseleave="isDragging = false">
    
    <!-- Original / Before -->
    <img :src="beforeImage" class="absolute inset-0 w-full h-full object-cover" alt="Before" />

    <!-- Edited / After (Clipped) -->
    <div class="absolute inset-0 w-full h-full" :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }">
      <img :src="afterImage" class="absolute inset-0 w-full h-full object-cover" alt="After" />
    </div>

    <!-- Handle -->
    <div class="absolute inset-y-0 w-1 bg-white shadow-xl flex items-center justify-center -translate-x-1/2"
         :style="{ left: `${position}%` }">
      <div class="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 8 4 4-4 4M6 8l-4 4 4 4" />
        </svg>
      </div>
    </div>

    <!-- Labels -->
    <div class="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-widest">
      Before
    </div>
    <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-widest">
      After
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  beforeImage: string
  afterImage: string
}>()

const position = ref(50)
const isDragging = ref(false)

const handleMove = (e: MouseEvent | TouchEvent) => {
  if (e.type === 'mousemove' && !isDragging.value) return
  
  const container = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = 'touches' in e ? e.touches[0].clientX : e.clientX
  const relativeX = x - container.left
  const percentage = (relativeX / container.width) * 100
  
  position.value = Math.max(0, Math.min(100, percentage))
}
</script>
