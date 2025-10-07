<template>
  <div class="flex flex-col items-center justify-center h-screen text-center px-4">
    <h1 class="text-7xl font-extrabold mb-4 text-gray-800 dark:text-white animate-bounce">404</h1>
    <p class="text-2xl sm:text-3xl mb-6 text-gray-600 dark:text-gray-300">
      Oops! Page not found.
    </p>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      Redirecting you back home in <span class="font-semibold">{{ countdown }}</span> seconds...
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const countdown = ref(5)
const router = useRouter()

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      router.push('/')  // Automatically redirect home
    }
  }, 1000)
})
</script>


