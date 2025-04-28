<script setup>
import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import MainContent from './pages/MainContent.vue'

const showNav = ref(true)
provide('setHeaderVisible', (val) => (showHeader.value = val))
</script>

<template>
  <div class="bg-[#f0f7ff] text-black min-h-screen">
    <Header :show-nav="showNav" />
    <MainContent @hideHeader="showNav = false" @showHeader="showNav = true" />
  </div>
</template>
