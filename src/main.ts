import './assets/main.css'
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'

const app = createApp(App)
app.use(ArcoVue)
app.mount('#app')
