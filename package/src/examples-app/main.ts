import './env.d.ts'

import { pluginHook } from 'virtual:plugin-hook'
import { createApp } from 'vue'

import App from './App.vue'
import { examplesAppRouter } from './router'
const app = createApp(App)
app.use(examplesAppRouter)
pluginHook(app)
app.mount('#app')
