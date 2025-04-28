<template>
  <a :href="link" class="block group">
    <div class="flex flex-col space-y-2">
      <div class="grid grid-cols-3 gap-2">
        <img
          v-for="img in images"
          :key="img"
          :src="img"
          class="w-full aspect-[4/5] object-cover rounded shadow group-hover:scale-105 transition-transform duration-300"
          alt=""
        />
      </div>
      <h2 class="text-lg font-semibold text-center mt-2 group-hover:underline">{{ title }}</h2>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: String,
  images: Array,
  link: String,
})
</script>
