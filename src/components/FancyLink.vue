<template>
    <a :href="href" class="relative inline-block overflow-hidden h-[1.2em] group">
      <span
        class="block transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:-translate-y-full"
      >
        {{ text }}
      </span>
      <span
        class="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:translate-y-[-100%]"
      >
        {{ text }}
      </span>
    </a>
</template>
  
<script setup>
  defineProps({
    text: String,
    href: String
  })
</script>
  