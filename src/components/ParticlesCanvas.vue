<template>
  <canvas ref="canvas" class="w-full h-full"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let ctx, animationFrameId
let particles = []
let mouse = { x: null, y: null }

const PARTICLE_COUNT = 60

const initParticles = () => {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    })
  }
}

const drawParticles = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.fill()
    
    // Connect particles
    particles.forEach(p2 => {
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist/100})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    })
  })
}

const updateParticles = () => {
  particles.forEach(p => {
    p.x += p.speedX
    p.y += p.speedY

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.value.width) p.speedX *= -1
    if (p.y < 0 || p.y > canvas.value.height) p.speedY *= -1

    // Mouse attraction
    if (mouse.x && mouse.y) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        p.x += dx * 0.01
        p.y += dy * 0.01
      }
    }
  })
}

const animate = () => {
  drawParticles()
  updateParticles()
  animationFrameId = requestAnimationFrame(animate)
}

const resizeCanvas = () => {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  initParticles()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  window.addEventListener('mouseleave', () => {
    mouse.x = null
    mouse.y = null
  })
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
canvas {
  display: block;
}
</style>
