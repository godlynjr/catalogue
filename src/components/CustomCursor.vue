<template>
  <div ref="cursor" class="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none bg-white z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref(null)

let mouse = { x: 0, y: 0 }
let cursorPos = { x: 0, y: 0 }
let animationFrameId

const animateCursor = () => {
  cursorPos.x += (mouse.x - cursorPos.x) * 0.2
  cursorPos.y += (mouse.y - cursorPos.y) * 0.2

  cursor.value.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`

  animationFrameId = requestAnimationFrame(animateCursor)
}

const handleMouseMove = e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animationFrameId = requestAnimationFrame(animateCursor)

  // Hover effects
  document.querySelectorAll('a, button, .hover-target').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.value.style.transform += ' scale(2)'
      cursor.value.style.backgroundColor = 'rgba(255,255,255,0.8)'
    })
    el.addEventListener('mouseleave', () => {
      cursor.value.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
      cursor.value.style.backgroundColor = 'white'
    })
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
div {
  mix-blend-mode: difference;
}
</style>
