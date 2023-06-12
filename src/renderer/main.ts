import { createApp } from 'vue'
import './assets/style.css'
import App from '../renderer/App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')
