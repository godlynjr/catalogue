<template>
    <div ref="triggerRef" class="flex items-center justify-center my-10">
      <div class="flex-1 border-t border-gray-400"></div>
      <h2 class="px-6 text-lg font-medium text-gray-600 uppercase whitespace-nowrap">
        {{ title }}
      </h2>
      <div class="flex-1 border-t border-gray-400"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  const props = defineProps({
    title: { type: String, default: 'Section' }
  })
  const emit = defineEmits(['enter', 'leave'])
  
  const triggerRef = ref(null)
  
  onMounted(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) emit('enter')
      else emit('leave')
    }, { threshold: 0.3 })
  
    if (triggerRef.value) observer.observe(triggerRef.value)
  
    onBeforeUnmount(() => {
      if (triggerRef.value) observer.unobserve(triggerRef.value)
    })
  })
  </script>
  