<template>
  <Header />

  <main
    class="px-4 md:px-16 py-16 transition-colors duration-300"
    :class="isDark ? 'bg-dark-primary text-white' : 'bg-[#f0f7ff] text-gray-900'"
  >
    <!-- Intro Section -->
    <div class="h-[100px] sm:h-[150px] md:h-[200px]"></div>
    <section class="text-center max-w-3xl mx-auto mb-16">
      <h1 class="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
        We're a creative duo driven by one simple obsession capturing the world as we see it.  
        Through our lenses, pixels, and code, we turn ordinary moments into visual experiences that make people stop and feel something real.
      </p>
    </section>

    <!-- Team Section -->
    <section class="grid md:grid-cols-2 gap-12 items-center mb-20">
      <div>
        <img 
          src="" 
          alt="Yannick the Photographer" 
          class="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
        />
      </div>
      <div>
        <h2 class="text-3xl font-semibold mb-2">Yannick — Photographer</h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          Yannick is the eye behind the camera, the main photographer whose instinct for light, motion, and human emotion defines our style.
          Every shot reflects his dedication to storytelling through simplicity and precision.
        </p>
      </div>
    </section>

    <section class="grid md:grid-cols-2 gap-12 items-center mb-20 flex-col-reverse md:flex-row">
      <div class="order-2 md:order-1">
        <h2 class="text-3xl font-semibold mb-2">Godlyn — Art Direction & Video</h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          Godlyn leads our art direction, weaving together visuals, design, and development.  
          From motion videos to modern web experiences, he transforms creative ideas into digital stories that connect.
        </p>
      </div>
      <div class="order-1 md:order-2">
        <img 
          src="" 
          alt="Godlyn the Director" 
          class="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
        />
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="max-w-5xl mx-auto text-center mb-20">
      <h2 class="text-4xl font-bold mb-8">What We Do</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="p-6 rounded-xl shadow-md bg-white dark:bg-neutral-800 hover:-translate-y-2 transition-transform duration-300"
        >
          <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Philosophy / Outro -->
    <section class="text-center max-w-3xl mx-auto mb-24">
      <p class="italic text-lg text-gray-700 dark:text-gray-300">
        "For us, every frame, every pixel, and every line of code is a way to share how we see the world sharp, bold, and unfiltered."
      </p>
    </section>
  </main>

  <Footer />
</template>

<script setup>
import { inject } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const isDark = inject('isDark', false)

const services = [
  {
    title: 'Photography',
    description: 'Portraits, events, landscapes, and creative compositions that capture emotion and atmosphere.'
  },
  {
    title: 'Video & 360°',
    description: 'Cinematic video production and immersive 360° storytelling to make viewers part of the moment.'
  },
  {
    title: 'Web & Development',
    description: 'Modern, responsive websites and digital tools built with speed, design, and usability in mind.'
  },
  {
    title: 'Design & Branding',
    description: 'Art direction, creative concepts, and brand visuals that give identity and consistency to your story.'
  },
  {
    title: 'Hyperlapse & Motion',
    description: 'Dynamic timelapse and motion work that merges technology and artistic rhythm.'
  },
  {
    title: 'Creative Consulting',
    description: 'Helping you translate ideas into digital and visual strategies that actually work.'
  }
]
</script>

<style scoped>
h1, h2, h3 {
  font-family: 'Bebas Neue', sans-serif;
}

p {
  font-family: 'Inter', sans-serif;
}
</style>
