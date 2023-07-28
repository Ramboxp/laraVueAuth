import './bootstrap';
import '../sass/app.scss'
import Router from './router/index'
import store from './store/index'
import { createApp } from 'vue/dist/vue.esm-bundler'

const app = createApp({})
app.use(Router)
app.use(store)
app.mount('#app')