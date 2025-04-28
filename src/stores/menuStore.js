// stores/menuStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuOpen = ref(false)
  const showNav = ref(true)

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
    document.body.style.overflow = menuOpen.value ? 'hidden' : ''
  }

  const setShowNav = (value) => {
    showNav.value = value
  }

  return {
    menuOpen,
    showNav,
    toggleMenu,
    setShowNav
  }
})
