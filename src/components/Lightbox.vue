<template>
  <transition name="fade">
    <div v-if="isOpen" 
         class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md px-4 py-8 select-none"
         @click="close"
         @wheel.prevent="handleWheel">
      
      <!-- Close button -->
      <button @click="close" class="absolute top-6 right-6 text-white hover:scale-110 transition-transform z-[110]">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>

      <!-- Content Container -->
      <div 
        class="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @click.stop
      >
        <img :src="imageSrc" 
             ref="imgRef"
             class="max-w-none transition-transform duration-200 ease-out pointer-events-none shadow-2xl" 
             :style="{ 
               transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
               maxHeight: '90vh',
               maxWidth: '90vw'
             }"
             alt="Full screen view" />
        
        <!-- Zoom Controls -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-[110]">
          <button @click="zoomOut" class="text-white hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
          </button>
          <span class="text-white text-sm font-mono min-w-[3rem] text-center">{{ Math.round(zoom * 100) }}%</span>
          <button @click="zoomIn" class="text-white hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
          </button>
          <div class="w-px h-4 bg-white/20 mx-1"></div>
          <button @click="resetView" class="text-xs text-white/60 hover:text-white uppercase tracking-tighter font-bold">Reset</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  imageSrc: string
}>()

const emit = defineEmits(['close'])

const zoom = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const imgRef = ref<HTMLImageElement | null>(null)

const zoomIn = () => { zoom.value = Math.min(5, zoom.value + 0.3) }
const zoomOut = () => { 
  zoom.value = Math.max(0.5, zoom.value - 0.3)
  if (zoom.value <= 1) resetView()
}

const resetView = () => {
  zoom.value = 1
  translateX.value = 0
  translateY.value = 0
}

const handleWheel = (e: WheelEvent) => {
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

const startDrag = (e: MouseEvent) => {
  if (zoom.value <= 1) return
  isDragging.value = true
  startX.value = e.clientX - translateX.value
  startY.value = e.clientY - translateY.value
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return
  translateX.value = e.clientX - startX.value
  translateY.value = e.clientY - startY.value
}

const endDrag = () => {
  isDragging.value = false
}

const close = () => {
  resetView()
  emit('close')
}

watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    resetView()
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
