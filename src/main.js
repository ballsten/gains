import { createApp } from 'vue'
import App from './App.vue'

import { store } from './store'

store.db.on('ready', async () => {
  console.log(await store.startingWeight())
})

createApp(App).mount('#app')
