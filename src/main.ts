import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/style/app.scss'
import store from './store'
import i18n from './locales'

const app = createApp(App)

app.config.globalProperties.$t = i18n.global.t // 使用 $t 语法

app.use(store)
app.use(router)
app.use(Antd)
app.use(i18n)
app.mount("#app")
