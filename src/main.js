import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setStorage, getStorage} from 'lonjin-helper'

import SvgIcon from './components/SvgIcon/SvgIcon.vue'

const app = createApp(App)

app.config.globalProperties.$setStorage = setStorage
app.config.globalProperties.$getStorage = getStorage

app.use(createPinia())
app.use(router)

app.mount('#app')

app.component('svg-icon', SvgIcon)

