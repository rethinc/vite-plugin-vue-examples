import { createApp } from 'vue'

import App from './App.vue'
import { examplesAppRouter } from './router'

createApp(App).use(examplesAppRouter).mount('#app')
