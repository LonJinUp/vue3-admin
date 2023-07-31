import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import router from './router'
import { setStorage, getStorage } from 'lonjin-helper'

import SvgIcon from './components/SvgIcon/SvgIcon.vue'

const app = createApp(App)
setupStore(app)
app.use(router)
app.mount('#app')
app.config.globalProperties.$setStorage = setStorage
app.config.globalProperties.$getStorage = getStorage

app.component('svg-icon', SvgIcon)

