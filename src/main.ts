import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(head)

// Protection against right-click and inspection (TEMPORARILY DISABLED FOR DEBUGGING)

if (typeof window !== 'undefined') {
  // Disable right-click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable some keyboard shortcuts (F12, Ctrl+Shift+I, etc.)
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c'))
    ) {
      e.preventDefault();
    }
  });
}

app.mount('#app')
