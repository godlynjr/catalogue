// src/composables/useTheme.js
import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)
  
  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateTheme()
    // Sauvegarder la préférence dans localStorage
    localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
  }
  
  // Fonction pour mettre à jour les classes sur l'élément html
  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  // Au montage du composant, vérifier la préférence sauvegardée ou préférence système
  onMounted(() => {
    // Vérifier d'abord si l'utilisateur a une préférence sauvegardée
    const savedTheme = localStorage.getItem('darkMode')
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Sinon, utiliser la préférence système
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    updateTheme()
    
    // Surveiller les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Uniquement si l'utilisateur n'a pas explicitement choisi un thème
      if (!localStorage.getItem('darkMode')) {
        isDark.value = e.matches
        updateTheme()
      }
    })
  })
  
  return {
    isDark,
    toggleDarkMode
  }
}